# GenZ Java

A production-ready web application for students to learn Java through quizzes and gamified progress tracking.

## Features

- **Lecture-Based Learning**: Study Java topics organized by university lecture structure
- **Multiple Question Types**: Single choice, multiple choice, true/false, fill-in-blank, code analysis
- **Gamification**: XP system, levels, streaks to keep students motivated
- **Progress Tracking**: Track performance by lecture and difficulty
- **AI Question Generation**: Generate new questions using OpenAI API (optional)
- **Admin Dashboard**: Manage lectures and questions

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: OpenAI API (optional)
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd java-repeater
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
DATABASE_URL="postgresql://user:password@localhost:5432/java_repeater"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Default Accounts

After seeding, you can log in with:

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Admin   | admin@example.com   | admin123   |
| Student | student@example.com | student123 |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (protected)/        # Authenticated routes
│   │   ├── admin/          # Admin pages
│   │   ├── dashboard/      # Student dashboard
│   │   ├── lectures/       # Lecture pages & quiz
│   │   └── settings/       # User settings
│   ├── api/                # API routes
│   └── auth/               # Auth pages
├── components/             # React components
├── lib/                    # Utility functions
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   ├── gamification.ts     # XP/level logic
│   └── question-evaluator.ts # Answer evaluation
└── types/                  # TypeScript types
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio |

## Question Types

| Type | Description |
|------|-------------|
| SINGLE_CHOICE | One correct answer from multiple options |
| MULTIPLE_CHOICE | Multiple correct answers |
| TRUE_FALSE | Statement evaluation |
| FILL_IN_BLANK | Text input answer |
| CODE_WILL_COMPILE | Java code analysis |
| CODE_WILL_CRASH | Runtime behavior analysis |
| SHORT_TEXT | Brief explanation |

## Gamification

- **XP System**: +10 XP for correct answers, +2 XP for attempts
- **Levels**: Progressive thresholds (Level 1: 0, Level 2: 100, Level 3: 250, etc.)
- **Streaks**: Daily activity tracking for motivation

## AI Question Generation

Admins can generate questions using OpenAI:

1. Go to Settings > AI Settings
2. Enter your OpenAI API key
3. Select preferred model
4. Use "Generate Questions" in admin lecture pages

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/*` | * | NextAuth endpoints |
| `/api/register` | POST | User registration |
| `/api/quiz` | GET | Get next question |
| `/api/quiz/submit` | POST | Submit answer |
| `/api/admin/lectures` | GET, POST | Manage lectures |
| `/api/admin/questions` | GET, POST | Manage questions |
| `/api/admin/generate-questions` | POST | AI generation |
| `/api/settings/ai` | GET, POST, DELETE | AI settings |

## Development

### Running Tests

```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

### Database Management

```bash
# View data in browser
npm run db:studio

# Reset database
npx prisma db push --force-reset
npm run db:seed
```

## Lectures (Topics)

Based on university Java curriculum:

1. Classes and Objects
2. OOP Concepts
3. Exceptions
4. Javadoc
5. Collections
6. Generics
7. Lambda Expressions
8. Stream API
9. Sorting
10. Code Behavior Prediction
11. Java Basics

## License

ISC
