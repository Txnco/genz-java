#!/usr/bin/env python3
"""
Java Question Generator - TVZ Standard
Generates exam-level Java questions using Claude Opus 4.5

Usage:
  python generate_questions.py -q 10 -l classes-and-objects
  python generate_questions.py --questions 20 --lecture oop-concepts
  python generate_questions.py -q 5  # All lectures
"""

import argparse
import asyncio
import hashlib
import itertools
import json
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional, Set
from datetime import datetime

try:
    from anthropic import AsyncAnthropic
    from dotenv import load_dotenv
    from pydantic import BaseModel, Field, ValidationError
    from rich.console import Console
    from rich.progress import (
        Progress,
        SpinnerColumn,
        TextColumn,
        BarColumn,
        TaskProgressColumn,
    )
    from rich.panel import Panel
    from rich.table import Table
except ImportError as e:
    print(f"❌ Missing required dependency: {e}")
    print("\n💡 Install dependencies with:")
    print("   cd importer && pip install -r requirements.txt")
    sys.exit(1)


# ============================================================================
# CONFIGURATION
# ============================================================================

# Load environment variables
load_dotenv(Path(__file__).parent / ".env")

# Question types (matching the master prompt)
QUESTION_TYPES = [
    "SINGLE_CHOICE",
    "MULTIPLE_CHOICE",
    "TRUE_FALSE",
    "CODE_WILL_COMPILE",
    "CODE_RUNTIME_BEHAVIOR",
    "CODE_OUTPUT",
    "FIND_THE_ERROR",
    "WHAT_IS_MISSING",
    "WHAT_MUST_BE_FIXED",
    "WHICH_STATEMENTS_COMPILE",
    "WHICH_EXCEPTIONS_OCCUR",
    "WHICH_METHOD_IS_TERMINAL",
    "WHICH_TYPE_IS_RETURNED",
    "ORDER_OF_EXECUTION",
    "EDGE_CASE_BEHAVIOR",
]

# Create a round-robin cycle for balanced question type distribution
QUESTION_TYPE_CYCLE = itertools.cycle(QUESTION_TYPES)

# Anthropic Configuration
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-5")

# Paths
BASE_DIR = Path(__file__).parent.parent
LECTURES_DIR = BASE_DIR / "public" / "lectures"
PROMPTS_DIR = Path(__file__).parent / "prompts"
OUTPUT_DIR = Path(__file__).parent / "output"

# Cost tracking - Sonnet 4 pricing with prompt caching
# Regular pricing
INPUT_COST_PER_MTK = 3.00 / 1_000_000    # $3 per million input tokens
OUTPUT_COST_PER_MTK = 15.00 / 1_000_000  # $15 per million output tokens
# Prompt caching pricing (90% discount on cached portion)
CACHE_WRITE_COST_PER_MTK = 3.75 / 1_000_000   # $3.75 per million tokens (first write)
CACHE_READ_COST_PER_MTK = 0.30 / 1_000_000    # $0.30 per million tokens (reads)

# Rich console for beautiful output
console = Console()


# ============================================================================
# DATA MODELS (Pydantic for strict validation)
# ============================================================================

class QuestionOption(BaseModel):
    """Single question option (A-F)"""
    text: str
    isCorrect: bool


class Question(BaseModel):
    """Question schema matching Prisma model"""
    type: str = Field(
        ...,
        pattern="^(SINGLE_CHOICE|MULTIPLE_CHOICE|TRUE_FALSE|CODE_WILL_COMPILE|CODE_RUNTIME_BEHAVIOR|CODE_OUTPUT|FIND_THE_ERROR|WHAT_IS_MISSING|WHAT_MUST_BE_FIXED|WHICH_STATEMENTS_COMPILE|WHICH_EXCEPTIONS_OCCUR|WHICH_METHOD_IS_TERMINAL|WHICH_TYPE_IS_RETURNED|ORDER_OF_EXECUTION|EDGE_CASE_BEHAVIOR)$"
    )
    prompt: str
    codeSnippet: Optional[str] = None
    explanation: str
    difficulty: str = Field(..., pattern="^(EASY|MEDIUM|HARD)$")
    options: List[QuestionOption] = Field(..., min_length=6, max_length=6)

    def validate_options(self):
        """Ensure exactly 6 options"""
        if len(self.options) != 6:
            raise ValueError(f"Expected 6 options, got {len(self.options)}")


class GenerationResult(BaseModel):
    """Result of question generation"""
    lectureSlug: str
    questionsGenerated: int
    questionsRequested: int
    tokensUsed: Dict[str, int]
    cacheHitRate: float
    costUSD: float
    outputFile: str
    duration: float


# ============================================================================
# MASTER PROMPT LOADER
# ============================================================================

def load_master_prompt() -> str:
    """Load the master prompt template"""
    prompt_file = PROMPTS_DIR / "master_prompt.txt"

    if not prompt_file.exists():
        console.print(f"[red]❌ Master prompt not found: {prompt_file}[/red]")
        sys.exit(1)

    return prompt_file.read_text(encoding="utf-8")


# ============================================================================
# LECTURE CONTENT LOADER
# ============================================================================

def get_all_lectures() -> List[str]:
    """Get all available lecture slugs"""
    if not LECTURES_DIR.exists():
        console.print(f"[red]❌ Lectures directory not found: {LECTURES_DIR}[/red]")
        return []

    lectures = []
    for item in LECTURES_DIR.iterdir():
        if item.is_dir():
            lecture_file = item / "lecture.txt"
            if lecture_file.exists():
                lectures.append(item.name)

    return sorted(lectures)


def load_lecture_content(lecture_slug: str) -> Optional[str]:
    """Load lecture content from filesystem"""
    lecture_file = LECTURES_DIR / lecture_slug / "lecture.txt"

    if not lecture_file.exists():
        console.print(f"[yellow]⚠️  Lecture file not found: {lecture_file}[/yellow]")
        return None

    try:
        content = lecture_file.read_text(encoding="utf-8")

        if not content.strip():
            console.print(f"[yellow]⚠️  Lecture file is empty: {lecture_file}[/yellow]")
            return None

        return content
    except Exception as e:
        console.print(f"[red]❌ Error reading {lecture_file}: {e}[/red]")
        return None


# ============================================================================
# ANTHROPIC API CLIENT
# ============================================================================

class QuestionGenerator:
    """Handles Claude API calls and question generation with async + caching"""

    def __init__(self, api_key: str, model: str = ANTHROPIC_MODEL):
        if not api_key:
            console.print("[red]❌ ANTHROPIC_API_KEY not set in environment[/red]")
            console.print("\n💡 Create importer/.env file with:")
            console.print("   ANTHROPIC_API_KEY=your_key_here")
            sys.exit(1)

        self.client = AsyncAnthropic(api_key=api_key)
        self.model = model
        self.master_prompt = load_master_prompt()
        self.total_input_tokens = 0
        self.total_output_tokens = 0
        self.total_cache_creation_tokens = 0
        self.total_cache_read_tokens = 0
        self.seen_question_hashes: Set[str] = set()  # Track duplicates

    async def generate_question(
        self,
        lecture_slug: str,
        lecture_content: str,
        retry_count: int = 3,
        variation_seed: int = 0
    ) -> Optional[Question]:
        """
        Generate a single question using Claude API with prompt caching

        Args:
            variation_seed: Unique seed to encourage variation and prevent duplicates

        Returns:
            Question object if successful, None otherwise
        """
        # Use round-robin selection for balanced question type distribution
        question_type = next(QUESTION_TYPE_CYCLE)
        user_prompt = self._build_user_prompt(question_type, variation_seed)

        for attempt in range(retry_count):
            try:
                response = await self.client.messages.create(
                    model=self.model,
                    max_tokens=4096,
                    temperature=0.7,  # Balanced creativity with JSON reliability
                    system=[
                        {
                            "type": "text",
                            "text": self.master_prompt,
                            "cache_control": {"type": "ephemeral"}
                        },
                        {
                            "type": "text",
                            "text": f"**Lecture:** {lecture_slug}\n\n**Lecture Content:**\n```\n{lecture_content}\n```",
                            "cache_control": {"type": "ephemeral"}
                        }
                    ],
                    messages=[
                        {
                            "role": "user",
                            "content": user_prompt
                        }
                    ]
                )

                # Track token usage including cache tokens
                self.total_input_tokens += response.usage.input_tokens
                self.total_output_tokens += response.usage.output_tokens

                # Track cache usage
                if hasattr(response.usage, 'cache_creation_input_tokens'):
                    self.total_cache_creation_tokens += response.usage.cache_creation_input_tokens
                if hasattr(response.usage, 'cache_read_input_tokens'):
                    self.total_cache_read_tokens += response.usage.cache_read_input_tokens

                # Parse response
                raw_response = response.content[0].text.strip()
                question_data = self._parse_json_response(raw_response)

                if not question_data:
                    console.print(f"[yellow]⚠️  Attempt {attempt + 1}/{retry_count}: Failed to parse JSON[/yellow]")
                    continue

                # Validate with Pydantic
                question = Question(**question_data)
                question.validate_options()

                # Check for duplicates using hash of prompt + code snippet
                question_hash = self._hash_question(question.prompt, question.codeSnippet)
                if question_hash in self.seen_question_hashes:
                    console.print(f"[yellow]⚠️  Duplicate question detected, retrying...[/yellow]")
                    continue

                # Mark as seen and return
                self.seen_question_hashes.add(question_hash)
                return question

            except ValidationError as e:
                console.print(f"[yellow]⚠️  Attempt {attempt + 1}/{retry_count}: Validation error[/yellow]")
                if attempt == retry_count - 1:
                    console.print(f"[red]Validation errors: {e}[/red]")
                continue

            except Exception as e:
                error_str = str(e)
                console.print(f"[red]❌ API error (attempt {attempt + 1}/{retry_count}): {e}[/red]")
                if attempt < retry_count - 1:
                    # For rate limit errors (429), wait full minute to reset window
                    if "429" in error_str or "rate_limit_error" in error_str:
                        wait_time = 60
                        console.print(f"[yellow]⏳ Rate limit hit, waiting {wait_time}s for reset...[/yellow]")
                    else:
                        wait_time = 2 ** attempt  # Exponential backoff for other errors
                    await asyncio.sleep(wait_time)
                continue

        return None

    def _hash_question(self, prompt: str, code_snippet: Optional[str]) -> str:
        """Generate a hash to detect duplicate questions"""
        content = prompt + (code_snippet or "")
        return hashlib.sha256(content.encode()).hexdigest()

    def _build_user_prompt(self, question_type: str, variation_seed: int) -> str:
        """Build the user prompt (lecture content is in system for caching)"""
        return f"""Generate ONE high-quality exam question based on the lecture material provided in the system prompt.

**Instructions:**
- Generate exactly ONE question of type: {question_type}
- Follow ALL rules from the system prompt
- Output ONLY valid JSON (no markdown, no commentary)
- Ensure exactly 6 options (A-F)
- ALL text must be in CROATIAN
- The "type" field in the JSON must be: "{question_type}"
- Question variation seed: {variation_seed} (use this to ensure uniqueness - focus on different aspects, examples, or edge cases)

Return the question as a JSON object matching the schema."""

    def _parse_json_response(self, response: str) -> Optional[dict]:
        """Extract and parse JSON from API response"""
        # Remove markdown code blocks if present
        if "```json" in response:
            response = response.split("```json")[1].split("```")[0].strip()
        elif "```" in response:
            response = response.split("```")[1].split("```")[0].strip()

        try:
            return json.loads(response)
        except json.JSONDecodeError as e:
            console.print(f"[red]JSON parsing error: {e}[/red]")
            console.print(f"[dim]Response preview: {response[:200]}...[/dim]")
            return None

    async def generate_questions_parallel(
        self,
        lecture_slug: str,
        lecture_content: str,
        num_questions: int,
        batch_size: int = 5
    ) -> List[Optional[Question]]:
        """Generate multiple questions in parallel with batching to avoid rate limits"""
        questions = []

        # Auto-adjust batch size for large question counts to avoid rate limits
        original_batch_size = batch_size
        if num_questions > 30:
            batch_size = min(batch_size, 3)  # Max 3 at a time for 30+ questions
        elif num_questions > 20:
            batch_size = min(batch_size, 4)  # Max 4 at a time for 20+ questions

        if batch_size < original_batch_size:
            console.print(f"[yellow]ℹ️  Auto-adjusted batch size to {batch_size} (from {original_batch_size}) to avoid rate limits[/yellow]")

        # Calculate delay between batches based on rate limits
        # Rate limit: 30,000 tokens/minute. Each request ~5000-7000 tokens first time, ~300-500 cached
        # To be safe, wait longer for larger batches
        batch_delay = 15 if num_questions > 20 else 5

        for i in range(0, num_questions, batch_size):
            batch_count = min(batch_size, num_questions - i)
            # Pass unique variation seed to each question (0, 1, 2, 3, ...)
            tasks = [
                self.generate_question(lecture_slug, lecture_content, variation_seed=i + j)
                for j in range(batch_count)
            ]
            batch_results = await asyncio.gather(*tasks)
            questions.extend(batch_results)

            # Wait before next batch to avoid rate limits (except for last batch)
            if i + batch_size < num_questions:
                console.print(f"[dim]⏳ Waiting {batch_delay}s before next batch...[/dim]")
                await asyncio.sleep(batch_delay)

        return questions

    def get_total_cost(self) -> float:
        """Calculate total API cost in USD including cache costs"""
        input_cost = self.total_input_tokens * INPUT_COST_PER_MTK
        output_cost = self.total_output_tokens * OUTPUT_COST_PER_MTK
        cache_write_cost = self.total_cache_creation_tokens * CACHE_WRITE_COST_PER_MTK
        cache_read_cost = self.total_cache_read_tokens * CACHE_READ_COST_PER_MTK
        return input_cost + output_cost + cache_write_cost + cache_read_cost


# ============================================================================
# INCREMENTAL SAVER (CRITICAL FOR DATA SAFETY)
# ============================================================================

class IncrementalQuestionSaver:
    """Saves questions incrementally to prevent data loss"""

    def __init__(self, lecture_slug: str, output_dir: Path = OUTPUT_DIR):
        self.lecture_slug = lecture_slug
        self.output_dir = output_dir
        self.output_dir.mkdir(exist_ok=True, parents=True)

        # Create timestamped output file
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.output_file = self.output_dir / f"{lecture_slug}_{timestamp}.json"

        # Initialize empty JSON array
        self.questions: List[dict] = []
        self._save_to_disk()

    def add_question(self, question: Question):
        """Add a question and immediately save to disk"""
        self.questions.append(question.model_dump())
        self._save_to_disk()

    def _save_to_disk(self):
        """Write current questions to disk (atomic operation with Windows retry)"""
        temp_file = self.output_file.with_suffix(".tmp")

        # Write to temporary file first
        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(
                {
                    "lectureSlug": self.lecture_slug,
                    "generatedAt": datetime.now().isoformat(),
                    "questions": self.questions,
                },
                f,
                indent=2,
                ensure_ascii=False
            )

        # Atomic rename with retry for Windows file locking
        max_retries = 5
        for attempt in range(max_retries):
            try:
                temp_file.replace(self.output_file)
                break
            except PermissionError:
                if attempt == max_retries - 1:
                    # Last attempt failed, raise the error
                    raise
                # Windows file lock (likely file open in editor), wait and retry
                time.sleep(0.1 * (2 ** attempt))  # Exponential backoff: 0.1s, 0.2s, 0.4s, 0.8s, 1.6s

    def get_file_path(self) -> str:
        """Get the output file path"""
        return str(self.output_file)

    def get_count(self) -> int:
        """Get number of saved questions"""
        return len(self.questions)


# ============================================================================
# MAIN GENERATION LOGIC
# ============================================================================

async def generate_questions_for_lecture(
    lecture_slug: str,
    num_questions: int,
    generator: QuestionGenerator,
    batch_size: int = 5
) -> GenerationResult:
    """Generate questions for a single lecture using batched parallel API calls"""

    start_time = time.time()

    # Load lecture content
    lecture_content = load_lecture_content(lecture_slug)
    if not lecture_content:
        raise ValueError(f"Could not load lecture content for: {lecture_slug}")

    # Initialize incremental saver
    saver = IncrementalQuestionSaver(lecture_slug)

    console.print(f"\n[bold cyan]📚 Generating {num_questions} questions for: {lecture_slug}[/bold cyan]")
    console.print(f"[dim]Output: {saver.get_file_path()}[/dim]")
    console.print(f"[dim]Strategy: Batched parallel generation ({batch_size} at a time) with prompt caching[/dim]\n")

    # Generate all questions in parallel
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TaskProgressColumn(),
        console=console
    ) as progress:
        task = progress.add_task(
            f"[cyan]Generating {num_questions} questions in parallel...",
            total=num_questions
        )

        # Generate all questions in parallel
        questions = await generator.generate_questions_parallel(
            lecture_slug,
            lecture_content,
            num_questions,
            batch_size
        )

        # Save valid questions
        for i, question in enumerate(questions, 1):
            if question:
                saver.add_question(question)
                progress.advance(task)
            else:
                console.print(f"[red]❌ Failed to generate question {i}[/red]")

    duration = time.time() - start_time

    # Calculate cache statistics
    cache_hit_rate = 0.0
    if generator.total_cache_creation_tokens + generator.total_cache_read_tokens > 0:
        cache_hit_rate = generator.total_cache_read_tokens / (
            generator.total_cache_creation_tokens + generator.total_cache_read_tokens
        ) * 100

    return GenerationResult(
        lectureSlug=lecture_slug,
        questionsGenerated=saver.get_count(),
        questionsRequested=num_questions,
        tokensUsed={
            "input": generator.total_input_tokens,
            "output": generator.total_output_tokens,
            "cache_creation": generator.total_cache_creation_tokens,
            "cache_read": generator.total_cache_read_tokens,
        },
        cacheHitRate=cache_hit_rate,
        costUSD=generator.get_total_cost(),
        outputFile=saver.get_file_path(),
        duration=duration
    )


# ============================================================================
# CLI INTERFACE
# ============================================================================

def create_summary_table(results: List[GenerationResult]) -> Table:
    """Create a summary table of generation results"""
    table = Table(title="📊 Generation Summary", show_header=True, header_style="bold magenta")

    table.add_column("Lecture", style="cyan")
    table.add_column("Generated", justify="right", style="green")
    table.add_column("Tokens", justify="right", style="yellow")
    table.add_column("Cache Hit", justify="right", style="magenta")
    table.add_column("Cost", justify="right", style="red")
    table.add_column("Duration", justify="right", style="blue")

    total_cost = 0.0
    total_tokens = 0
    total_questions = 0

    for result in results:
        tokens = result.tokensUsed["input"] + result.tokensUsed["output"]
        cache_hit = f"{result.cacheHitRate:.1f}%" if result.cacheHitRate > 0 else "N/A"
        total_cost += result.costUSD
        total_tokens += tokens
        total_questions += result.questionsGenerated

        table.add_row(
            result.lectureSlug,
            f"{result.questionsGenerated}/{result.questionsRequested}",
            f"{tokens:,}",
            cache_hit,
            f"${result.costUSD:.4f}",
            f"{result.duration:.1f}s"
        )

    # Add totals row
    table.add_section()
    table.add_row(
        "[bold]TOTAL[/bold]",
        f"[bold]{total_questions}[/bold]",
        f"[bold]{total_tokens:,}[/bold]",
        "",
        f"[bold]${total_cost:.4f}[/bold]",
        ""
    )

    return table


async def main():
    """Main CLI entry point (async)"""

    # Parse arguments
    parser = argparse.ArgumentParser(
        description="Generate exam-level Java questions using Claude Sonnet 4 (optimized)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate 10 questions for a specific lecture
  python generate_questions.py -q 10 -l classes-and-objects

  # Generate 20 questions for all lectures
  python generate_questions.py -q 20

  # Use Opus 4.5 for higher quality (more expensive)
  ANTHROPIC_MODEL=claude-opus-4-5-20251101 python generate_questions.py -q 5 -l oop-concepts
        """
    )

    parser.add_argument(
        "-q", "--questions",
        type=int,
        required=True,
        help="Number of questions to generate per lecture"
    )

    parser.add_argument(
        "-l", "--lecture",
        type=str,
        help="Specific lecture slug (e.g., 'classes-and-objects'). If omitted, generates for all lectures."
    )

    parser.add_argument(
        "-m", "--model",
        type=str,
        default=ANTHROPIC_MODEL,
        help=f"Anthropic model to use (default: {ANTHROPIC_MODEL})"
    )

    parser.add_argument(
        "--list-lectures",
        action="store_true",
        help="List all available lectures and exit"
    )

    parser.add_argument(
        "-b", "--batch-size",
        type=int,
        default=5,
        help="Number of questions to generate in parallel per batch (default: 5)"
    )

    args = parser.parse_args()

    # Print banner
    console.print(Panel.fit(
        "[bold cyan]🎓 Java Question Generator - TVZ Standard[/bold cyan]\n"
        f"[dim]Model: {args.model}[/dim]",
        border_style="cyan"
    ))

    # List lectures if requested
    if args.list_lectures:
        lectures = get_all_lectures()
        console.print("\n[bold]Available lectures:[/bold]")
        for lecture in lectures:
            console.print(f"  • {lecture}")
        return

    # Determine which lectures to process
    if args.lecture:
        lectures = [args.lecture]
        # Validate lecture exists
        if not (LECTURES_DIR / args.lecture / "lecture.txt").exists():
            console.print(f"[red]❌ Lecture not found: {args.lecture}[/red]")
            console.print("\n💡 List available lectures with: --list-lectures")
            sys.exit(1)
    else:
        lectures = get_all_lectures()
        if not lectures:
            console.print("[red]❌ No lectures found in public/lectures/[/red]")
            sys.exit(1)

    console.print(f"\n[bold]Lectures to process:[/bold] {', '.join(lectures)}")
    console.print(f"[bold]Questions per lecture:[/bold] {args.questions}")
    console.print(f"[bold]Total questions:[/bold] {args.questions * len(lectures)}\n")

    # Initialize generator
    generator = QuestionGenerator(
        api_key=ANTHROPIC_API_KEY,
        model=args.model
    )

    # Generate questions
    results: List[GenerationResult] = []

    try:
        for lecture_slug in lectures:
            result = await generate_questions_for_lecture(
                lecture_slug=lecture_slug,
                num_questions=args.questions,
                generator=generator,
                batch_size=args.batch_size
            )
            results.append(result)

    except KeyboardInterrupt:
        console.print("\n[yellow]⚠️  Generation interrupted by user[/yellow]")

    except Exception as e:
        console.print(f"\n[red]❌ Fatal error: {e}[/red]")
        import traceback
        traceback.print_exc()
        sys.exit(1)

    # Display summary
    if results:
        console.print("\n")
        console.print(create_summary_table(results))

        console.print("\n[bold green]✅ Generation complete![/bold green]")
        console.print("\n[bold]Output files:[/bold]")
        for result in results:
            console.print(f"  • {result.outputFile}")


if __name__ == "__main__":
    asyncio.run(main())
