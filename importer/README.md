# 🎓 Java Question Generator - TVZ Standard

Generates exam-level Java questions using **Claude Opus 4.5** with strict quality controls and incremental saving.

## ✨ Features

- ✅ **Command-line arguments** for questions count and lecture selection
- ✅ **Incremental saving** - no data loss on errors or interruptions
- ✅ **Cost tracking** - monitor API costs in real-time
- ✅ **Strict JSON validation** using Pydantic
- ✅ **Rich progress bars** with time estimates
- ✅ **Retry logic** with exponential backoff
- ✅ **English-only output** (questions + answers)
- ✅ **Filesystem-driven** from `public/lectures/<lectureSlug>/*.txt`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd importer
pip install -r requirements.txt
```

### 2. Configure API Key

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Get your API key from: https://console.anthropic.com/

### 3. Generate Questions

```bash
# Generate 10 questions for a specific lecture
python generate_questions.py -q 10 -l classes-and-objects

# Generate 20 questions for ALL lectures
python generate_questions.py -q 20

# List available lectures
python generate_questions.py --list-lectures
```

## 📖 Usage

### Command-Line Arguments

```
usage: generate_questions.py [-h] -q QUESTIONS [-l LECTURE] [-m MODEL] [--list-lectures]

required arguments:
  -q, --questions QUESTIONS   Number of questions to generate per lecture

optional arguments:
  -l, --lecture LECTURE       Specific lecture slug (e.g., 'classes-and-objects')
                              If omitted, generates for all lectures
  -m, --model MODEL           Anthropic model (default: claude-opus-4-5-20251101)
  --list-lectures             List all available lectures and exit
```

### Examples

```bash
# Generate 10 questions for "classes-and-objects"
python generate_questions.py -q 10 -l classes-and-objects

# Generate 5 questions for "oop-concepts"
python generate_questions.py -q 5 -l oop-concepts

# Generate 15 questions for ALL lectures (batch mode)
python generate_questions.py -q 15

# List all available lectures
python generate_questions.py --list-lectures
```

## 📂 Output Format

Questions are saved to `importer/output/<lectureSlug>_<timestamp>.json`:

```json
{
  "lectureSlug": "classes-and-objects",
  "generatedAt": "2026-01-10T15:30:00",
  "questions": [
    {
      "type": "SINGLE_CHOICE",
      "prompt": "What is the purpose of the 'this' keyword in Java?",
      "codeSnippet": null,
      "explanation": "The 'this' keyword refers to the current object...",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "It refers to the current object instance", "isCorrect": true },
        { "text": "It refers to the parent class", "isCorrect": false },
        { "text": "It creates a new object", "isCorrect": false },
        { "text": "It is used for method forwarding", "isCorrect": false },
        { "text": "It enables dynamic reference binding", "isCorrect": false },
        { "text": "It allows implicit resource closing", "isCorrect": false }
      ]
    }
  ]
}
```

## 🔒 Data Safety

### Incremental Saving

The script saves **after each question** is generated:

- ✅ No data loss on errors
- ✅ No data loss on interruptions (Ctrl+C)
- ✅ Atomic file writes (temporary file + rename)
- ✅ Timestamped output files

### Example

```bash
# Start generating 100 questions
python generate_questions.py -q 100 -l classes-and-objects

# Press Ctrl+C after 47 questions
^C
⚠️  Generation interrupted by user

# Result: 47 questions saved to output file! ✅
```

## 💰 Cost Tracking

The script tracks API usage and costs:

```
📊 Generation Summary
┌──────────────────────┬───────────┬─────────┬──────────┬──────────┐
│ Lecture              │ Generated │ Tokens  │ Cost     │ Duration │
├──────────────────────┼───────────┼─────────┼──────────┼──────────┤
│ classes-and-objects  │ 10/10     │ 23,456  │ $1.7592  │ 45.3s    │
│ oop-concepts         │ 10/10     │ 21,234  │ $1.5926  │ 42.1s    │
├──────────────────────┼───────────┼─────────┼──────────┼──────────┤
│ TOTAL                │ 20        │ 44,690  │ $3.3518  │          │
└──────────────────────┴───────────┴─────────┴──────────┴──────────┘
```

**Pricing** (Claude Opus 4.5):
- Input: $15 per million tokens
- Output: $75 per million tokens

**Estimated cost per question:** ~$0.15-0.25

## 🎯 Question Quality Standards

### Strict Requirements

- ✅ **Exactly 6 options (A-F)** per question
- ✅ **English-only** output (no Croatian)
- ✅ **Strict JSON** format (no markdown, no comments)
- ✅ **Comprehensive explanations** for all options
- ✅ **Code snippets** for code-based questions
- ✅ **Pedantic and unforgiving** - 60% failure rate target

### Question Types

1. **SINGLE_CHOICE** - One correct answer
2. **MULTIPLE_CHOICE** - Multiple correct answers
3. **TRUE_FALSE** - Boolean questions
4. **CODE_WILL_COMPILE** - Compilation analysis

### Difficulty Levels

- **EASY** - Basic concepts
- **MEDIUM** - Intermediate understanding
- **HARD** - Advanced edge cases and traps

## 🏗️ Project Structure

```
importer/
├── generate_questions.py    # Main script
├── requirements.txt          # Python dependencies
├── .env.example             # Environment template
├── .env                     # Your API key (gitignored)
├── README.md                # This file
├── prompts/
│   └── master_prompt.txt    # Question generation prompt
└── output/
    ├── classes-and-objects_20260110_153000.json
    ├── oop-concepts_20260110_154500.json
    └── ...
```

## 🐛 Troubleshooting

### Missing API Key

```
❌ ANTHROPIC_API_KEY not set in environment

💡 Create importer/.env file with:
   ANTHROPIC_API_KEY=your_key_here
```

**Solution:** Create `.env` file with your API key

### Missing Lecture

```
❌ Lecture not found: invalid-lecture

💡 List available lectures with: --list-lectures
```

**Solution:** Use `--list-lectures` to see available lectures

### JSON Parsing Errors

```
⚠️  Attempt 1/3: Failed to parse JSON
```

**Solution:** The script retries automatically (3 attempts). If all fail, the question is skipped.

### Rate Limits

The script includes:
- Exponential backoff on errors
- Automatic retries (3 attempts)
- Respectful API usage

## 🔄 Integration with Database

### Option 1: Manual Import (Recommended)

Review generated questions first:

```bash
# 1. Generate questions
python generate_questions.py -q 10 -l classes-and-objects

# 2. Review output file
cat output/classes-and-objects_20260110_153000.json

# 3. Import to database (create TypeScript importer)
npm run import-questions -- output/classes-and-objects_20260110_153000.json
```

### Option 2: Direct Database Import

Add direct Prisma integration (future enhancement):

```python
# Future: Direct database import
python generate_questions.py -q 10 -l oop-concepts --import-to-db
```

## 📝 License

Part of the Java Repeater project - TVZ educational platform.

## 🤝 Contributing

Questions should follow TVZ exam standards:
- Strict and pedantic
- Test deep understanding
- Include edge cases and traps
- 60% student failure rate target

---

**Need help?** Open an issue or contact the development team.
