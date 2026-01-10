# ⚡ Quick Start - 2 Minutes

Get started generating Java questions in 2 minutes.

## 1️⃣ Install (30 seconds)

```bash
cd importer
pip install -r requirements.txt
```

## 2️⃣ Configure (30 seconds)

```bash
# Copy example
cp .env.example .env

# Edit .env and add your API key
# ANTHROPIC_API_KEY=sk-ant-api03-...
```

Get key: https://console.anthropic.com/

## 3️⃣ Generate (1 minute)

```bash
# Generate 5 questions for classes-and-objects
python generate_questions.py -q 5 -l classes-and-objects
```

**Output:** `importer/output/classes-and-objects_20260110_153000.json`

## 4️⃣ Import (30 seconds)

```bash
cd ..
npm run import-questions -- importer/output/classes-and-objects_20260110_153000.json
```

## ✅ Done!

Questions are now in your database. Visit http://localhost:3000 to see them!

---

## 📚 Common Commands

```bash
# List all lectures
python generate_questions.py --list-lectures

# Generate 10 questions for one lecture
python generate_questions.py -q 10 -l oop-concepts

# Generate 5 questions for ALL lectures
python generate_questions.py -q 5

# Import questions to database
npm run import-questions -- importer/output/oop-concepts_20260110_154500.json

# View database
npm run db:studio
```

---

## 💰 Cost Reference

| Questions | Estimated Cost |
|-----------|---------------|
| 1         | ~$0.20        |
| 10        | ~$2.00        |
| 50        | ~$10.00       |
| 100       | ~$20.00       |

---

## 🆘 Need Help?

- 📖 Full guide: [USAGE.md](USAGE.md)
- 📘 Details: [README.md](README.md)
- 🐛 Issues: [GitHub Issues](https://github.com/anthropics/claude-code/issues)

---

**That's it!** You're ready to generate exam-level Java questions. 🎓
