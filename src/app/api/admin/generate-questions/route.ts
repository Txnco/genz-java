import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { decrypt } from '@/lib/encryption'
import { checkRateLimit, AI_GENERATE_RATE_LIMIT } from '@/lib/rate-limit'
import OpenAI from 'openai'
import { z } from 'zod'

const generateSchema = z.object({
  lectureId: z.string(),
  count: z.number().min(1).max(10).default(5),
  topics: z.array(z.string()).optional(),
})

const questionSchema = z.object({
  type: z.enum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_BLANK', 'CODE_WILL_COMPILE', 'SHORT_TEXT']),
  prompt: z.string(),
  codeSnippet: z.string().optional(),
  explanation: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  options: z.array(z.object({
    text: z.string(),
    isCorrect: z.boolean(),
  })),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    // Rate limiting za AI generiranje
    const rateLimitResult = checkRateLimit(
      `ai-gen:${session.user.id}`,
      AI_GENERATE_RATE_LIMIT
    )
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Previše zahtjeva za AI generiranje. Molimo pričekajte prije sljedećeg pokušaja.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { lectureId, count, topics } = generateSchema.parse(body)

    // Get user's OpenAI settings
    const aiSettings = await prisma.openAISettings.findUnique({
      where: { userId: session.user.id },
    })

    if (!aiSettings?.apiKey) {
      return NextResponse.json(
        { error: 'Molimo konfigurirajte svoj OpenAI API ključ u postavkama' },
        { status: 400 }
      )
    }

    // Decrypt the API key
    let decryptedApiKey: string
    try {
      decryptedApiKey = decrypt(aiSettings.apiKey)
    } catch (error) {
      console.error('Greška pri dekriptiranju API ključa:', error)
      return NextResponse.json(
        { error: 'Neispravan API ključ. Molimo ažurirajte svoje postavke.' },
        { status: 400 }
      )
    }

    // Get lecture content
    const lecture = await prisma.lecture.findUnique({
      where: { id: lectureId },
    })

    if (!lecture) {
      return NextResponse.json({ error: 'Predavanje nije pronađeno' }, { status: 404 })
    }

    const openai = new OpenAI({ apiKey: decryptedApiKey })

    const topicsContext = topics?.length
      ? `Focus on these specific topics: ${topics.join(', ')}`
      : ''

    const systemPrompt = `You are an expert Java programming instructor creating exam questions for university students.
Generate ${count} questions about Java programming for a lecture titled "${lecture.title}".
${lecture.description ? `Lecture description: ${lecture.description}` : ''}
${lecture.content ? `Lecture content: ${lecture.content.substring(0, 2000)}` : ''}
${topicsContext}

Generate a mix of question types:
- SINGLE_CHOICE: One correct answer from multiple options
- MULTIPLE_CHOICE: Multiple correct answers
- TRUE_FALSE: Statement that is either true or false
- CODE_WILL_COMPILE: Show Java code and ask if it will compile/run/throw exception
- FILL_IN_BLANK: Short answer question
- SHORT_TEXT: Brief explanation question

For code questions, include realistic Java code snippets.
Vary the difficulty (EASY, MEDIUM, HARD).
Include clear explanations for each answer.

Respond with a JSON array of questions in this exact format:
[
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Question text here",
    "codeSnippet": "optional Java code",
    "explanation": "Explanation of the correct answer",
    "difficulty": "MEDIUM",
    "options": [
      {"text": "Option A", "isCorrect": true},
      {"text": "Option B", "isCorrect": false}
    ]
  }
]`

    const completion = await openai.chat.completions.create({
      model: aiSettings.preferredModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate ${count} Java exam questions for the lecture "${lecture.title}". Return only valid JSON.` },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json({ error: 'Nema odgovora od AI-ja' }, { status: 500 })
    }

    let parsedQuestions
    try {
      const parsed = JSON.parse(content)
      parsedQuestions = parsed.questions || parsed
      if (!Array.isArray(parsedQuestions)) {
        throw new Error('Neispravan format odgovora')
      }
    } catch {
      return NextResponse.json({ error: 'Neuspješno parsiranje AI odgovora' }, { status: 500 })
    }

    // Validate and create questions
    const createdQuestions = []
    for (const q of parsedQuestions) {
      try {
        const validated = questionSchema.parse(q)

        const question = await prisma.question.create({
          data: {
            lectureId,
            type: validated.type,
            prompt: validated.prompt,
            codeSnippet: validated.codeSnippet || null,
            explanation: validated.explanation,
            difficulty: validated.difficulty,
            tags: ['ai-generated'],
            options: {
              create: validated.options.map((opt, index) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
                order: index,
              })),
            },
          },
          include: { options: true },
        })

        createdQuestions.push(question)
      } catch (err) {
        console.error('Neuspješno stvaranje pitanja:', err)
        // Continue with other questions
      }
    }

    return NextResponse.json({
      success: true,
      created: createdQuestions.length,
      questions: createdQuestions,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Greška pri generiranju pitanja:', error)
    return NextResponse.json(
      { error: 'Neuspješno generiranje pitanja. Molimo pokušajte ponovno.' },
      { status: 500 }
    )
  }
}
