# AI Question Generation Template for GenZ Java

This document provides templates for generating questions that can be used with AI tools or manually converted to SQL inserts.

## Database Schema Reference

### Question Types (Enum)
- `SINGLE_CHOICE` - One correct answer from multiple options
- `MULTIPLE_CHOICE` - Multiple correct answers (checkboxes)
- `TRUE_FALSE` - Statement that is either true or false
- `FILL_IN_BLANK` - Text input answer
- `SHORT_TEXT` - Brief explanation answer
- `CODE_WILL_COMPILE` - Show Java code and ask about compilation/runtime behavior
- `CODE_WILL_CRASH` - Show Java code and ask about runtime behavior

### Difficulty Levels (Enum)
- `EASY`
- `MEDIUM`
- `HARD`

### Standard Options for CODE_WILL_COMPILE/CODE_WILL_CRASH Questions
Always use these three options:
1. `Will compile and run successfully`
2. `Will not compile (compilation error)`
3. `Compiles but throws runtime exception`

Mark ONE as correct based on the actual code behavior.

## JSON Template for AI Tools (ChatGPT, Claude, etc.)

### Prompt Template

Copy and paste this prompt to an AI tool, replacing `[LECTURE_TITLE]` and `[TOPICS]`:

```
You are an expert Java programming instructor creating exam questions for university students.

Generate 10 high-quality Java exam questions about: [LECTURE_TITLE]

Topics to cover: [TOPICS]

IMPORTANT RULES:
1. Use EXACT question types from this list: SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE, FILL_IN_BLANK, CODE_WILL_COMPILE, SHORT_TEXT
2. Use EXACT difficulty levels: EASY, MEDIUM, HARD
3. For CODE_WILL_COMPILE questions, use EXACTLY these three option texts:
   - "Will compile and run successfully"
   - "Will not compile (compilation error)"
   - "Compiles but throws runtime exception"
4. For SINGLE_CHOICE/CODE_WILL_COMPILE: Mark EXACTLY ONE option as correct
5. For MULTIPLE_CHOICE: Can have multiple options marked as correct
6. For TRUE_FALSE: Provide exactly 2 options ("True" and "False")
7. For FILL_IN_BLANK/SHORT_TEXT: Provide options with correct answer(s)
8. Include realistic Java code snippets for CODE_WILL_COMPILE questions
9. Provide clear explanations for each question
10. Use a mix of difficulty levels

Respond with ONLY valid JSON in this EXACT format:
{
  "questions": [
    {
      "type": "SINGLE_CHOICE",
      "prompt": "What is the output of this code?",
      "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        int x = 5;\n        System.out.println(x++);\n    }\n}",
      "explanation": "The post-increment operator prints the value before incrementing, so 5 is printed.",
      "difficulty": "EASY",
      "options": [
        {"text": "4", "isCorrect": false},
        {"text": "5", "isCorrect": true},
        {"text": "6", "isCorrect": false}
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "What will happen when this code is compiled and executed?",
      "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        String s = null;\n        System.out.println(s.length());\n    }\n}",
      "explanation": "The code compiles successfully but throws NullPointerException at runtime when trying to call a method on null.",
      "difficulty": "MEDIUM",
      "options": [
        {"text": "Will compile and run successfully", "isCorrect": false},
        {"text": "Will not compile (compilation error)", "isCorrect": false},
        {"text": "Compiles but throws runtime exception", "isCorrect": true}
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Which of the following are valid access modifiers in Java? (Select all that apply)",
      "explanation": "Java has four access modifiers: public, private, protected, and default (no modifier).",
      "difficulty": "EASY",
      "options": [
        {"text": "public", "isCorrect": true},
        {"text": "private", "isCorrect": true},
        {"text": "protected", "isCorrect": true},
        {"text": "package", "isCorrect": false}
      ]
    }
  ]
}
```

### Example Lectures and Topics

#### Classes and Objects
```
LECTURE: Classes and Objects (Klase i objekti)
TOPICS: Class definition, object instantiation, constructors, constructor overloading, this keyword, static fields/methods, object lifecycle, reference vs value, encapsulation (getters/setters)
```

#### OOP Concepts
```
LECTURE: OOP Concepts
TOPICS: Inheritance (extends), method overriding vs overloading, polymorphism, abstract classes, interfaces, final keyword, access modifiers (public/private/protected/default), super keyword
```

#### Exceptions
```
LECTURE: Exceptions
TOPICS: try-catch-finally, checked vs unchecked exceptions, throw vs throws, custom exceptions, exception hierarchy, multiple catch blocks
```

#### Collections
```
LECTURE: Collections Framework
TOPICS: List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Iterator, Collection methods, generics with collections
```

#### Generics
```
LECTURE: Java Generics
TOPICS: Generic classes, generic methods, bounded type parameters, wildcards (? extends, ? super), type erasure
```

## SQL Insert Template

If you prefer to directly create SQL inserts, use this template:

```sql
-- First, get the lecture ID
SELECT id FROM Lecture WHERE slug = 'your-lecture-slug';

-- Replace {LECTURE_ID} with the actual ID from above

-- Insert Question
INSERT INTO Question (id, lectureId, type, prompt, codeSnippet, explanation, difficulty, tags, createdAt, updatedAt)
VALUES (
  'clxxx_generated_id_1',
  '{LECTURE_ID}',
  'CODE_WILL_COMPILE',
  'What will happen when this code is executed?',
  'public class Test {\n    public static void main(String[] args) {\n        int[] arr = new int[5];\n        System.out.println(arr[5]);\n    }\n}',
  'The code compiles but throws ArrayIndexOutOfBoundsException at runtime when accessing index 5 of an array with length 5.',
  'MEDIUM',
  '["ai-generated"]',
  NOW(),
  NOW()
);

-- Insert Options for the question above
INSERT INTO QuestionOption (id, questionId, text, isCorrect, `order`)
VALUES
  ('clxxx_opt_1', 'clxxx_generated_id_1', 'Will compile and run successfully', false, 0),
  ('clxxx_opt_2', 'clxxx_generated_id_1', 'Will not compile (compilation error)', false, 1),
  ('clxxx_opt_3', 'clxxx_generated_id_1', 'Compiles but throws runtime exception', true, 2);

-- For SINGLE_CHOICE question
INSERT INTO Question (id, lectureId, type, prompt, codeSnippet, explanation, difficulty, tags, createdAt, updatedAt)
VALUES (
  'clxxx_generated_id_2',
  '{LECTURE_ID}',
  'SINGLE_CHOICE',
  'Which keyword is used to inherit from a class in Java?',
  NULL,
  'The extends keyword is used for class inheritance in Java. implements is used for interfaces.',
  'EASY',
  '["ai-generated"]',
  NOW(),
  NOW()
);

INSERT INTO QuestionOption (id, questionId, text, isCorrect, `order`)
VALUES
  ('clxxx_opt_4', 'clxxx_generated_id_2', 'extends', true, 0),
  ('clxxx_opt_5', 'clxxx_generated_id_2', 'implements', false, 1),
  ('clxxx_opt_6', 'clxxx_generated_id_2', 'inherits', false, 2),
  ('clxxx_opt_7', 'clxxx_generated_id_2', 'super', false, 3);
```

## Important Notes

### For CODE_WILL_COMPILE Questions
These questions test knowledge of Java compilation and runtime behavior. Always consider:

1. **Will not compile** - Syntax errors, type mismatches, undefined variables, abstract class instantiation, unimplemented abstract methods
2. **Compiles but throws runtime exception** - NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException, ArithmeticException
3. **Will compile and run successfully** - Valid Java code with no runtime issues

### Question Quality Guidelines

1. **Be specific**: Avoid ambiguous wording
2. **Test understanding**: Not just memorization
3. **Realistic code**: Use patterns students will encounter
4. **Clear explanations**: Help students learn from mistakes
5. **Appropriate difficulty**: Match the lecture level
6. **Mix question types**: Don't use only one type per lecture

### Common Pitfalls to Avoid

❌ **Wrong**: Using different option texts for CODE_WILL_COMPILE questions
✅ **Correct**: Use the exact three options listed above

❌ **Wrong**: Marking multiple options as correct for SINGLE_CHOICE
✅ **Correct**: Mark exactly ONE option as correct

❌ **Wrong**: Code snippets without proper formatting
✅ **Correct**: Use `\n` for newlines in JSON, proper indentation

❌ **Wrong**: Vague explanations like "This is wrong"
✅ **Correct**: Explain WHY it's wrong and what the correct answer demonstrates

## Using the Generated JSON

Once you have the JSON response from AI:

1. **Validate the JSON**: Use a JSON validator tool
2. **Review questions**: Check for accuracy and quality
3. **Import via API**: Use the `/api/admin/generate-questions` endpoint (requires OpenAI API key)
4. **Manual import**: Convert to SQL inserts using the template above

## Conversion Script (Optional)

If you generate questions frequently, you can create a Node.js script:

```javascript
// convert-questions.js
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importQuestions(lectureSlug, questionsJsonFile) {
  const questions = JSON.parse(fs.readFileSync(questionsJsonFile, 'utf-8'));
  
  const lecture = await prisma.lecture.findUnique({
    where: { slug: lectureSlug }
  });

  if (!lecture) {
    throw new Error(`Lecture not found: ${lectureSlug}`);
  }

  for (const q of questions.questions) {
    await prisma.question.create({
      data: {
        lectureId: lecture.id,
        type: q.type,
        prompt: q.prompt,
        codeSnippet: q.codeSnippet || null,
        explanation: q.explanation,
        difficulty: q.difficulty,
        tags: ['ai-generated'],
        options: {
          create: q.options.map((opt, index) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
            order: index
          }))
        }
      }
    });
  }

  console.log(`Imported ${questions.questions.length} questions for ${lecture.title}`);
}

// Usage: node convert-questions.js classes-and-objects questions.json
const [lectureSlug, jsonFile] = process.argv.slice(2);
importQuestions(lectureSlug, jsonFile)
  .then(() => process.exit(0))
  .catch(console.error);
```

## Getting Questions from Themes.md

The `Themes.md` file contains all the lecture topics. Use those topics when generating questions to ensure alignment with the curriculum.
