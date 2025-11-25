You are a senior full-stack engineer.
Build a production-ready web application for students to learn Java through quizzes and gamified progress tracking.

1. Tech Stack & General Requirements

Use the following stack unless there is a very strong reason not to:

Frontend / Full stack framework: Next.js (latest stable, App Router)

Language: TypeScript everywhere (frontend + backend)

Styling: TailwindCSS

Database: PostgreSQL (via Prisma ORM)

Auth: NextAuth (or a simple credentials/email provider) with secure session handling

API layer: Next.js Route Handlers (app/api/.../route.ts)

AI: OpenAI API (user can plug in their own API key)

Package manager: pnpm or npm (choose one and stick to it)

Tests: basic unit tests for core logic (e.g. question evaluation functions) using Jest or Vitest

Project goal:
Create a Java-learning platform where students can:

Register / log in

Answer various types of questions related to Java

Study based on university lectures

Track their progress

Get gamified feedback (XP, streaks, levels, etc.)

Optionally generate more questions using their own OpenAI API key

Optimize for clean architecture, clear folder structure, and extensibility.

2. Core Concepts & Data Model

Design a Prisma schema (PostgreSQL) with at least the following entities:

User

id

name

email (unique)

passwordHash (if using credentials auth)

role (enum: STUDENT, ADMIN)

createdAt, updatedAt

Lecture

Represents a unit from university Java course (e.g. “Intro to Java”, “OOP”, “Exceptions”).

Fields:

id

title

slug (unique)

description

order (for sorting in the UI)

content (rich text / markdown; can be used as base material for question generation)

createdAt, updatedAt

Question

A question related to Java.

Fields:

id

lectureId (FK → Lecture)

type (enum: SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE, FILL_IN_BLANK, CODE_WILL_COMPILE, CODE_WILL_CRASH, SHORT_TEXT)

prompt (string, can contain code blocks)

codeSnippet (optional text, Java code, used especially for compile/crash questions)

explanation (text shown after answering)

difficulty (enum: EASY, MEDIUM, HARD)

tags (string[] or a separate Tag table)

createdAt, updatedAt

QuestionOption

For choice-based questions.

Fields:

id

questionId (FK → Question)

text

isCorrect (boolean)

order (for display)

UserQuestionAnswer

Tracks each attempt by a user.

Fields:

id

userId (FK → User)

questionId (FK → Question)

selectedOptionIds (string[] or relation table if needed)

textAnswer (for FILL_IN_BLANK or SHORT_TEXT)

isCorrect (boolean)

createdAt

UserProgress

Aggregated per-lecture stats for each user.

Fields:

id

userId

lectureId

questionsAnswered

questionsCorrect

lastActivityAt

Gamification / XP

You can either:

Add fields on User: xp, level, currentStreak, longestStreak

Or create a separate UserStats table.

XP rules (simple initial logic):

+10 XP for each correct answer

+2 XP for each incorrect answer attempted (to encourage trying)

Streak logic:

A “streak” can be defined as answering at least one question on a given day.

OpenAISettings

Per-user storage for OpenAI API usage.

Fields:

id

userId

apiKey (encrypted or securely stored; do not log it)

preferredModel (string, e.g. "gpt-4.1-mini")

createdAt, updatedAt

You can adjust field types as needed, but keep the concepts above.

3. Authentication & Authorization

Implement a basic auth system:

Allow sign up and login for students.

Use email + password (credentials) or another simple method.

Restrict admin features (like creating lectures and questions) to role = ADMIN.

Protect routes:

Students must be authenticated to:

Start quizzes

View progress

Use OpenAI integration

Only admins can:

Create/update/delete lectures

Create/update/delete questions

Use middleware or Next.js route protection patterns to enforce this.

4. Main Features & Pages
4.1 Public Landing Page

Route: /

Simple marketing-style page:

Hero section: title, description (“Practice Java exam-style questions, gamified.”)

CTA buttons: “Sign up” and “Log in”

Short explanation of features:

Lecture-based learning

Exam-style questions

Gamification & progress tracking

Optional AI-generated questions (with user’s own OpenAI credits)

4.2 Auth Pages

Routes: /auth/register, /auth/login

Simple forms with:

Email, password, confirm password (for register)

Email, password (for login)

Tailwind styling

Proper validation & error messages

After login, redirect to /dashboard.

4.3 Student Dashboard

Route: /dashboard

Show:

Overview of XP, level, current streak

Quick stats:

Total questions answered

Overall accuracy (%)

List of lectures with progress bars

Each lecture should link to its detail page: /lectures/[slug]

4.4 Lecture List & Detail

Lecture List: /lectures

List all lectures with:

Title

Short description

Progress (e.g., “40/120 questions answered, 75% correct”)

Lecture Detail: /lectures/[slug]

Show:

Lecture title and description

A button “Start Quiz” or “Continue Quiz”

Basic stats for this lecture

5. Quiz Engine

Route: /lectures/[slug]/quiz

Functionality:

Fetch a batch of questions for the selected lecture.

Support these question types:

SINGLE_CHOICE – radio buttons

MULTIPLE_CHOICE – checkboxes

TRUE_FALSE – two buttons

FILL_IN_BLANK – text input

CODE_WILL_COMPILE / CODE_WILL_CRASH – show Java code snippet and options like:

“Will compile and run”

“Will not compile”

“Compiles but throws runtime exception”

SHORT_TEXT – short textual answer

For each question:

Show the prompt and code snippet (if present) in a nicely formatted code block.

Allow the student to submit an answer.

Evaluate correctness client-side or server-side:

For choice questions: compare selected options with correct options.

For fill/short text: start with simple exact/trim-lowercase comparison.

On submission:

Save the answer result in the database (UserQuestionAnswer).

Update UserProgress and XP/streak.

Show whether the answer was correct.

Show the explanation text.

Provide “Next question” button.

Question selection logic (initial version):

Random questions from that lecture.

Avoid repeating questions already answered correctly too many times in the same session.

You can implement simple logic like:

Prefer unanswered or incorrectly answered questions.

6. Gamification

Implement a first version of gamification:

XP & Levels:

Store xp and level for each user.

Define a simple level formula, for example:

Level 1 at 0 XP, Level 2 at 100 XP, Level 3 at 250 XP, etc.

After each answered question:

Award XP based on correctness.

Check if the user’s level should increase.

Streaks:

Track currentStreak and longestStreak per user.

A “streak day” means the user answered at least one question on that day.

Update streaks automatically when recording question answers.

Badges (optional for v1, but prepare model/structure):

Example badges:

“First 50 questions”

“100 questions in one lecture”

“7-day streak”

You can define this as a simple table or as code-based rules.

Show gamification data on:

Dashboard

Maybe a small header widget (“XP: 340 • Level: 3 • Streak: 4 days”)

7. Admin Area

Only accessible to ADMIN users.

Routes: /admin, /admin/lectures, /admin/questions, etc.

7.1 Lecture Management

List lectures, create new, edit existing, delete.

Lecture form:

Title

Slug

Description

Order

Content (text/markdown)

7.2 Question Management

For each lecture, list its questions.

Create question form:

Select lecture

Type (enum)

Prompt

Code snippet (optional, especially for compile/crash questions)

Explanation

Difficulty

Tags

Options (for choice questions):

Ability to add multiple options and choose which ones are correct.

Editing and deleting questions.

Keep UI simple but usable для admins.

8. OpenAI Integration (User API Key)

We want OpenAI integration but it should be optional and not block the core features.

8.1 User Settings Page

Route: /settings/ai

Fields:

“OpenAI API Key” (input + save button)

“Preferred Model” (dropdown, e.g. gpt-4.1-mini, gpt-4.1, gpt-4.1-preview depending on what you assume available)

Store this data securely in OpenAISettings table.

Do NOT log the API key.

If possible, encrypt API key at rest.

8.2 Question Generation with OpenAI

Admin-only or user-level features (start with admin-only):

On the lecture page in admin panel, provide a button:

“Generate questions with AI”

When clicked:

Use the lecture’s content as context.

Call OpenAI’s API using the stored API key of the current admin (or fall back to a server-side key if you choose to).

Ask the model to generate a structured set of questions in JSON with:

type

prompt

codeSnippet (if relevant)

options

correct answers

explanation

difficulty

Parse the response and create Question + QuestionOption records.

Show a preview to the admin before final save if possible, but at minimum, create them and list them after generation.

8.3 Model Switching

Respect the user’s preferredModel field when making OpenAI calls.

If missing, use a sensible default.

9. UI/UX Guidelines

Use TailwindCSS for all styling.

Design should be:

Responsive (desktop & mobile)

Clean and minimal

Dark/light mode optional, but at least not ugly in dark backgrounds.

Components to include:

Navigation bar with:

App name/logo

Links: Dashboard, Lectures, Settings

Profile dropdown with “Log out”

Reusable button, card, badge components.

A generic “QuestionCard” component that handles different question types.

10. Implementation Order (Milestones)

Build in stages so that the app is functional early:

Project Setup

Initialize Next.js + TypeScript

Configure TailwindCSS

Set up Prisma + PostgreSQL, run initial migrations

Auth & Basic Layout

User model

Register / login / logout

Protected routes with basic layout (navbar, container)

Lectures & Questions (Core)

Implement Lecture and Question models

Admin CRUD for lectures and questions

Student lecture list & detail pages

Quiz Engine

Fetch questions for a lecture

Implement UI for all question types

Save answers, evaluate correctness

Store UserQuestionAnswer and update progress

Progress & Gamification

UserProgress, XP, level, streaks

Dashboard with stats

OpenAI Integration

Settings page for user OpenAI API key + model

API route for generating questions from lecture content

Admin UI for AI-based question generation

Polish & Tests

Add validation and error handling

Add tests for question evaluation logic

Refine UI and fix bugs

11. Non-Functional Requirements

Use environment variables for configuration:

Database URL

NextAuth secret

(Optional) default OpenAI API key if needed

Do not log sensitive data (API keys, passwords).

Keep the code modular and well-organized:

Separate components, hooks, services (e.g. services/openai, services/quiz).

Add basic README with setup instructions:

How to run migrations

How to start dev server

How to create an admin user

Task:
Implement this application end-to-end as described above, including database schema, API routes, frontend pages, components, basic tests, and minimal styling.