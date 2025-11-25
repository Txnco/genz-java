# GenZ Java - AI Coding Agent Instructions

## Project Overview

GenZ Java is a gamified learning platform for Java programming students. Built with Next.js 15 (App Router), TypeScript, Prisma ORM (MySQL), NextAuth.js, and optional OpenAI integration for AI-generated questions.

**Key Architecture**: This is a full-stack Next.js app using Route Handlers for API endpoints, server components for pages, and server-side auth checks. All data flows through Prisma ORM to MySQL.

## Critical Developer Workflows

### Database Operations
```bash
npm run db:generate    # Generate Prisma client after schema changes
npm run db:push        # Push schema to DB (dev)
npm run db:migrate     # Create & run migrations (production)
npm run db:seed        # Seed with admin/student users + lectures
npm run db:studio      # Open Prisma Studio GUI
```

**Always run `db:generate` after modifying `prisma/schema.prisma`** before starting dev server.

### Testing
```bash
npm run test           # Vitest watch mode
npm run test:run       # Single run
```

Tests use Vitest with jsdom. Core logic in `src/lib/__tests__/` (gamification, question-evaluator). Mock Prisma client for unit tests.

### Development
```bash
npm run dev            # Start on localhost:3000
```

Default accounts after seeding: `admin@example.com / admin123` and `student@example.com / student123`.

## Authentication & Authorization Pattern

**NextAuth.js with JWT strategy** (`src/lib/auth.ts`):
- Session contains: `user.id`, `user.email`, `user.role` (STUDENT or ADMIN)
- Credentials provider with bcrypt password hashing
- Custom type declarations in `src/types/next-auth.d.ts`

**Server-Side Protection**:
```typescript
// In API routes (src/app/api/**/route.ts)
const session = await getServerSession(authOptions)
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
// For admin-only routes:
if (session.user.role !== 'ADMIN') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

**Layout-Level Protection**: `src/app/(protected)/layout.tsx` checks session and redirects unauthenticated users to `/auth/login`.

## Data Model Key Relationships

- **User** → many **UserQuestionAnswer** (tracks every quiz attempt)
- **User** → many **UserProgress** (aggregated stats per lecture)
- **Lecture** → many **Question** (cascade delete)
- **Question** → many **QuestionOption** (cascade delete)
- **User** → optional **OpenAISettings** (1:1, stores API key)

**Important**: `UserProgress` uses composite unique key `@@unique([userId, lectureId])` - use `upsert` pattern in `src/app/api/quiz/submit/route.ts` as reference.

## Gamification System

**XP Rules** (`src/lib/gamification.ts`):
- Correct answer: +10 XP
- Incorrect attempt: +2 XP
- Half-points mode (repeat questions): divide by 2

**Streak Logic**:
- `isStreakDay()`: Check if already answered today (don't increment)
- `shouldIncrementStreak()`: Last activity was yesterday (increment)
- `shouldResetStreak()`: Gap >1 day (reset to 1)

**Level Calculation**: Use `calculateLevel(xp)` function with predefined thresholds in `levelThresholds` array.

**Implementation Pattern**: See `src/app/api/quiz/submit/route.ts` for complete flow using `prisma.$transaction()` to atomically:
1. Create UserQuestionAnswer
2. Upsert UserProgress
3. Update User (xp, level, streaks)

## Question Evaluation Logic

**Core Module**: `src/lib/question-evaluator.ts`

- **SINGLE_CHOICE/TRUE_FALSE/CODE_WILL_COMPILE/CODE_WILL_CRASH**: Exactly one correct option, compare `selectedOptionIds[0]` with correct option ID
- **MULTIPLE_CHOICE**: Check Set equality between selected and correct option IDs
- **FILL_IN_BLANK/SHORT_TEXT**: Normalize text (lowercase, trim, remove punctuation) and compare against correct option texts

**Always return**: `{ isCorrect: boolean, correctAnswers?: string[], feedback?: string }`

## AI Question Generation

**Two Methods Available**:

### 1. Built-in OpenAI Integration (Admin UI)
**Flow** (`src/app/api/admin/generate-questions/route.ts`):
1. Admin configures OpenAI API key in Settings → AI Settings (`OpenAISettings` table)
2. Navigate to Admin → Lectures → [Select Lecture] → Click "Generate Questions (AI)" button
3. Specify number of questions (1-10)
4. API fetches lecture content and sends to OpenAI with structured prompt
5. Zod validates response and creates Questions + QuestionOptions in DB

**UI Location**: Green "Generate Questions (AI)" button in `src/app/(protected)/admin/lectures/[id]/page.tsx`

**Prompt Pattern**: System message includes lecture title/description/content + request for JSON array. Uses `preferredModel` from user's settings (default: "gpt-4o-mini").

### 2. External AI Tools (Manual Import)
**Use Case**: Bulk generation, using different AI models, or no OpenAI API key

**Process**: See `AI_QUESTION_GENERATION_TEMPLATE.md` for:
- Copy-paste prompt templates for ChatGPT/Claude/etc.
- JSON structure with validation rules
- SQL insert templates for manual import
- Node.js conversion script

**Critical Format Rules**:
- CODE_WILL_COMPILE questions MUST use exactly these three option texts:
  - "Will compile and run successfully"
  - "Will not compile (compilation error)"
  - "Compiles but throws runtime exception"
- SINGLE_CHOICE/CODE_WILL_COMPILE: Exactly ONE option marked `isCorrect: true`
- MULTIPLE_CHOICE: Can have multiple options marked correct
- TRUE_FALSE: Exactly two options ("True" / "False")

## Project-Specific Conventions

### Route Organization
- `src/app/(protected)/` - All authenticated routes (uses layout auth check)
- `src/app/(protected)/admin/` - Admin-only pages
- `src/app/api/admin/` - Admin-only API routes
- `src/app/api/quiz/` - Student quiz endpoints

### Component Patterns
- Server components by default (pages in `app/` dir)
- Client components for interactivity (use `"use client"` directive)
- Shared components in `src/components/` (navbar, theme-toggle, xp-badge, etc.)

### Data Fetching
- Use Prisma client from `src/lib/prisma.ts` (singleton pattern)
- API routes use `NextResponse.json()` for responses
- Use Zod for request validation (see `submitSchema` pattern in quiz submit route)

### Styling
- TailwindCSS with DaisyUI component library
- Classes like `btn`, `card`, `badge`, `modal` from DaisyUI
- Theme toggle uses DaisyUI themes (see `Themes.md` for lecture topics, not styling themes)

## Question Type Enum Values

Use exact Prisma enum values:
- `SINGLE_CHOICE`, `MULTIPLE_CHOICE`, `TRUE_FALSE`
- `FILL_IN_BLANK`, `SHORT_TEXT`
- `CODE_WILL_COMPILE`, `CODE_WILL_CRASH`

## Common Patterns to Follow

**Error Handling in API Routes**:
```typescript
try {
  // ... logic
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
  }
  console.error('Error context:', error)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

**Transactions for Multi-Step Updates**: Always use `prisma.$transaction([...])` when updating UserQuestionAnswer + UserProgress + User together to maintain data consistency.

**JSON Fields**: `selectedOptionIds` and `tags` are stored as `Json` type in Prisma (MySQL). Pass arrays, Prisma handles serialization.

## Key Files Reference

- `INSTRUCTIONS.md` - Original project specification (627 lines, comprehensive requirements)
- `Themes.md` - University lecture topics for Java (Croatian language)
- `AI_QUESTION_GENERATION_TEMPLATE.md` - Templates and prompts for AI question generation
- `prisma/seed.ts` - Seeding logic with sample lectures and questions (762 lines)
- `src/lib/gamification.ts` - Complete XP/level/streak calculation functions
- `src/app/api/quiz/submit/route.ts` - Full quiz submission flow example
- `src/app/(protected)/admin/lectures/[id]/page.tsx` - Admin lecture editor with AI generation button

## Database Note

Schema uses **MySQL** (`datasource db { provider = "mysql" }`), not PostgreSQL. Connection string format: `mysql://user:password@host:port/database`.
