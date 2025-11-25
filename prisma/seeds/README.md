# Question Seeds Directory

This directory contains modular question seeders for the GenZ Java project. Each file contains 30 comprehensive questions for a specific lecture topic.

## Structure

```
prisma/seeds/
├── seed-questions.ts                    # Main seeder that orchestrates all question seeders
├── questions-classes-and-objects.ts     # ✅ 30 questions for "Klase i objekti" lecture
├── questions-oop-concepts.ts            # ✅ 30 questions for "OOP Koncepti"
├── questions-exceptions.ts              # ✅ 30 questions for "Iznimke"
├── questions-javadoc.ts                 # ✅ 30 questions for "Javadoc"
├── questions-collections.ts             # ✅ 30 questions for "Kolekcije"
├── questions-generics.ts                # ✅ 30 questions for "Generici"
├── questions-lambda-expressions.ts      # ✅ 30 questions for "Lambda izrazi"
├── questions-stream-api.ts              # ✅ 30 questions for "Stream API"
├── questions-sorting.ts                 # ✅ 30 questions for "Sortiranje"
├── questions-code-behavior.ts           # ✅ 30 questions for "Predviđanje ponašanja koda"
└── questions-java-basics.ts             # ✅ 30 questions for "Java osnove"
```

## How to Create a New Question Seeder

1. **Create a new file** in this directory following the naming pattern:
   ```
   questions-[lecture-slug].ts
   ```

2. **Copy the structure** from `questions-classes-and-objects.ts`:
   ```typescript
   import { QuestionType, Difficulty } from '@prisma/client'

   export const yourTopicQuestions = {
     lectureSlug: 'your-lecture-slug',
     questions: [
       {
         type: 'SINGLE_CHOICE' as QuestionType,
         prompt: 'Your question here?',
         explanation: 'Detailed explanation',
         difficulty: 'EASY' as Difficulty,
         options: [
           { text: 'Option 1', isCorrect: true },
           { text: 'Option 2', isCorrect: false },
         ],
       },
       // ... 29 more questions
     ],
   }
   ```

3. **Add to the main seeder** (`seed-questions.ts`):
   ```typescript
   import { yourTopicQuestions } from './questions-your-topic'
   
   const questionSeeders = [
     classesAndObjectsQuestions,
     yourTopicQuestions,  // Add here
   ]
   ```

## Question Types

The following question types are supported:

- **SINGLE_CHOICE**: One correct answer from multiple options (4 options recommended)
- **MULTIPLE_CHOICE**: Multiple correct answers (mark multiple options as `isCorrect: true`)
- **TRUE_FALSE**: Boolean questions (2 options: "True" and "False")
- **CODE_WILL_COMPILE**: Code analysis with 3 specific options:
  - "Will compile and run successfully"
  - "Will not compile (compilation error)"
  - "Compiles but throws runtime exception"
- **FILL_IN_BLANK**: Short answer (1 option with correct answer)
- **SHORT_TEXT**: Short text answer
- **CODE_WILL_CRASH**: Similar to CODE_WILL_COMPILE

## Difficulty Levels

- **EASY**: Basic concepts, definitions, simple syntax
- **MEDIUM**: Application of concepts, code reading, problem-solving
- **HARD**: Complex scenarios, edge cases, advanced topics

## Best Practices

1. **30 questions per lecture**: Ensure comprehensive coverage of the topic
2. **Balanced difficulty**: Mix of EASY (40%), MEDIUM (40%), HARD (20%)
3. **Diverse question types**: Use different question types to test various skills
4. **Croatian language**: All questions and answers must be in Croatian
5. **Modern Java**: Use Java 21+ features and syntax where applicable
6. **Clear explanations**: Every question must have a detailed explanation
7. **Code snippets**: Use backticks for inline code and codeSnippet field for multi-line code
8. **Realistic scenarios**: Questions should reflect real-world Java programming

## Running the Seeders

```bash
# Run all seeders (lectures + questions)
npm run db:seed

# Run only question seeders
npx ts-node prisma/seeds/seed-questions.ts

# After making changes to seeders, regenerate Prisma client
npm run db:generate
```

## Validation Checklist

Before committing a new question seeder, verify:

- [ ] Exactly 30 questions
- [ ] All questions have `lectureSlug` matching an existing lecture
- [ ] All questions have explanations
- [ ] CODE_WILL_COMPILE questions use the correct 3 option texts
- [ ] Multiple choice questions have at least 2 correct answers
- [ ] Single choice/True-False questions have exactly 1 correct answer
- [ ] All text is in Croatian
- [ ] Code examples compile (if type is CODE_WILL_COMPILE with success)
- [ ] Added to `questionSeeders` array in `seed-questions.ts`

## Example Topics to Cover

For "Klase i objekti" lecture (completed):
- ✅ Što je klasa, što je objekt
- ✅ Polja i metode
- ✅ Konstruktor(i) & overloading
- ✅ this keyword
- ✅ static polja/metode
- ✅ Statički inicijalizatori
- ✅ Object lifecycle (stack, heap)
- ✅ Reference vs vrijednosti
- ✅ Kapsulacija (getteri/setteri)
- ✅ Memory diagrams

## Support

For questions about the seeder structure or how to add new questions, refer to:
- Main project README.md
- INSTRUCTIONS.md
- AI_QUESTION_GENERATION_TEMPLATE.md
