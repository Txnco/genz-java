# 📖 Complete Usage Guide - Question Generator

Step-by-step guide for generating and importing Java questions.

## 🎯 Complete Workflow

```
1. Generate questions (Python)
   ↓
2. Review JSON output
   ↓
3. Import to database (TypeScript)
   ↓
4. Questions available in app!
```

---

## 📦 Step 1: Setup

### Install Python Dependencies

```bash
cd importer
pip install -r requirements.txt
```

### Configure API Key

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your key
# ANTHROPIC_API_KEY=sk-ant-api03-...
```

Get your API key from: https://console.anthropic.com/

---

## 🎨 Step 2: Generate Questions

### List Available Lectures

```bash
python generate_questions.py --list-lectures
```

**Output:**
```
Available lectures:
  • classes-and-objects
  • oop-concepts
  • exceptions
  • collections
  • generics
  • lambda-expressions
  • files-and-folders
  • javafx
  • javadb
  • javadoc
```

### Generate for One Lecture

```bash
# Generate 10 questions for classes-and-objects
python generate_questions.py -q 10 -l classes-and-objects
```

**Output:**
```
🎓 Java Question Generator - TVZ Standard

Lectures to process: classes-and-objects
Questions per lecture: 10
Total questions: 10

📚 Generating 10 questions for: classes-and-objects
Output: importer/output/classes-and-objects_20260110_153000.json

Generating questions... ━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00

📊 Generation Summary
┌──────────────────────┬───────────┬─────────┬──────────┬──────────┐
│ Lecture              │ Generated │ Tokens  │ Cost     │ Duration │
├──────────────────────┼───────────┼─────────┼──────────┼──────────┤
│ classes-and-objects  │ 10/10     │ 23,456  │ $1.7592  │ 45.3s    │
└──────────────────────┴───────────┴─────────┴──────────┴──────────┘

✅ Generation complete!

Output files:
  • importer/output/classes-and-objects_20260110_153000.json
```

### Generate for All Lectures (Batch Mode)

```bash
# Generate 5 questions for ALL lectures
python generate_questions.py -q 5
```

**Cost Estimate:**
- Per question: ~$0.15-0.25
- 10 questions: ~$2-3
- 100 questions: ~$15-25

### Interrupt Safely

Questions are saved **after each generation**:

```bash
python generate_questions.py -q 100 -l oop-concepts

# Press Ctrl+C after 47 questions
^C
⚠️  Generation interrupted by user

# Result: 47 questions saved! ✅
```

---

## 🔍 Step 3: Review Generated Questions

### Check Output File

```bash
cat importer/output/classes-and-objects_20260110_153000.json
```

**Example Question:**

```json
{
  "type": "CODE_WILL_COMPILE",
  "prompt": "How many compile-time errors exist in the following code?",
  "codeSnippet": "public class Test {\n    static int x;\n    void method() {\n        static int y = 5;\n    }\n}",
  "explanation": "There is 1 compile-time error. Local variables cannot be declared static (line 4). The static variable x is valid at class level.",
  "difficulty": "MEDIUM",
  "options": [
    { "text": "0", "isCorrect": false },
    { "text": "1", "isCorrect": true },
    { "text": "2", "isCorrect": false },
    { "text": "3", "isCorrect": false },
    { "text": "4", "isCorrect": false },
    { "text": "5", "isCorrect": false }
  ]
}
```

### Validate Structure

All questions must have:
- ✅ Exactly 6 options
- ✅ At least one correct answer
- ✅ Valid type enum
- ✅ Valid difficulty enum
- ✅ English-only text
- ✅ Comprehensive explanation

---

## 💾 Step 4: Import to Database

### Single File Import

```bash
npm run import-questions -- importer/output/classes-and-objects_20260110_153000.json
```

**Output:**
```
📚 Java Question Importer - Database Integration

📖 Reading file: importer/output/classes-and-objects_20260110_153000.json
✓ Loaded 10 questions for lecture: classes-and-objects

🔍 Validating lecture: classes-and-objects
✓ Lecture found: Klase i objekti (ID: cm5x6y2z30000...)

✅ Validating questions...
✓ All 10 questions are valid

💾 Importing questions to database...
  ✓ Question 1: Imported
  ✓ Question 2: Imported
  ✓ Question 3: Imported
  ...
  ✓ Question 10: Imported

============================================================
📊 Import Summary
============================================================
Lecture:        classes-and-objects
Total questions: 10
Imported:       10
Skipped:        0
============================================================

✅ Import complete!
```

### Batch Import (Multiple Files)

```bash
# Import all generated questions
for file in importer/output/*.json; do
  npm run import-questions -- "$file"
done
```

### Duplicate Detection

The importer automatically skips duplicates:

```
  ✓ Question 1: Imported
  ⚠️  Question 2: Already exists (skipping)
  ✓ Question 3: Imported
```

---

## 🚀 Complete Example Workflow

### Example: Generate 20 Questions for OOP Concepts

```bash
# 1. Generate questions
cd importer
python generate_questions.py -q 20 -l oop-concepts

# Output: importer/output/oop-concepts_20260110_154500.json
# Cost: ~$3-5
# Duration: ~90 seconds

# 2. Review questions
cat output/oop-concepts_20260110_154500.json | jq '.questions[0]'

# 3. Import to database
cd ..
npm run import-questions -- importer/output/oop-concepts_20260110_154500.json

# 4. Verify in database
npm run db:studio
# Navigate to Question table and filter by lectureId

# 5. Test in app
npm run dev
# Visit http://localhost:3000
```

---

## 🎓 Production Workflow

### Monthly Question Generation

```bash
#!/bin/bash
# generate-all-questions.sh

LECTURES=(
  "classes-and-objects"
  "oop-concepts"
  "exceptions"
  "collections"
  "generics"
  "lambda-expressions"
)

for lecture in "${LECTURES[@]}"; do
  echo "Generating 30 questions for $lecture..."
  python importer/generate_questions.py -q 30 -l "$lecture"

  # Find the latest output file for this lecture
  latest=$(ls -t importer/output/${lecture}_*.json | head -1)

  # Import to database
  npm run import-questions -- "$latest"

  echo "✓ Completed $lecture"
  echo ""
done

echo "🎉 All questions generated and imported!"
```

Make it executable:

```bash
chmod +x generate-all-questions.sh
./generate-all-questions.sh
```

---

## 🐛 Troubleshooting

### Issue: Missing API Key

```
❌ ANTHROPIC_API_KEY not set in environment
```

**Solution:**
```bash
cd importer
cp .env.example .env
# Edit .env and add: ANTHROPIC_API_KEY=your_key_here
```

### Issue: Lecture Not Found

```
❌ Lecture not found in database: invalid-lecture
```

**Solution:**
```bash
# Make sure lectures are seeded
npm run db:seed

# List available lectures
python importer/generate_questions.py --list-lectures
```

### Issue: Validation Errors

```
⚠️  Attempt 1/3: Validation error
```

**Solution:** The script retries automatically. Claude Opus 4.5 is very reliable, but occasional retries are normal.

### Issue: Rate Limits

**Solution:** The script includes:
- Automatic retries with exponential backoff
- Respectful API usage
- Built-in delays between requests

---

## 📊 Cost Optimization Tips

### 1. Start Small

```bash
# Test with 1 question first
python generate_questions.py -q 1 -l classes-and-objects
# Cost: ~$0.20
```

### 2. Batch by Difficulty

```bash
# Generate easier questions first (cheaper)
python generate_questions.py -q 10 -l classes-and-objects --difficulty EASY
```

### 3. Use Question Banks

Generate once, reuse forever:
- Store generated questions in git
- Import as needed
- No regeneration costs

### 4. Monitor Costs

The script shows real-time costs:
```
📊 Generation Summary
Cost: $3.3518
```

---

## 🔐 Security Best Practices

### Never Commit API Keys

```bash
# ❌ BAD - Don't commit .env
git add importer/.env

# ✅ GOOD - .env is gitignored
git status  # Should not show .env
```

### Environment Variables

```bash
# Option 1: .env file (recommended)
ANTHROPIC_API_KEY=sk-ant-...

# Option 2: Shell environment
export ANTHROPIC_API_KEY=sk-ant-...
python generate_questions.py -q 10 -l oop-concepts
```

---

## 📈 Monitoring & Analytics

### Track Question Quality

```sql
-- Check question distribution by difficulty
SELECT difficulty, COUNT(*) as count
FROM Question
GROUP BY difficulty;

-- Check questions per lecture
SELECT l.title, COUNT(q.id) as question_count
FROM Lecture l
LEFT JOIN Question q ON q.lectureId = l.id
GROUP BY l.id, l.title
ORDER BY question_count DESC;

-- Check average options per question
SELECT AVG(option_count) as avg_options
FROM (
  SELECT questionId, COUNT(*) as option_count
  FROM QuestionOption
  GROUP BY questionId
) as counts;
```

### Track API Costs

```bash
# Create a cost log
echo "$(date),classes-and-objects,10,$1.7592" >> importer/cost-log.csv

# Analyze monthly costs
awk -F',' '{sum+=$4} END {print "Total: $"sum}' importer/cost-log.csv
```

---

## 🎉 Success!

You now have:
- ✅ High-quality exam questions
- ✅ Strict JSON validation
- ✅ Database integration
- ✅ Cost tracking
- ✅ Incremental saving (no data loss)
- ✅ English-only output

**Next Steps:**
1. Generate questions for your lectures
2. Review and refine
3. Import to database
4. Test in the app
5. Collect student feedback
6. Iterate and improve

---

**Questions?** Check [README.md](README.md) or open an issue.
