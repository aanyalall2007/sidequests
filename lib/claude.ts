import { GoogleGenerativeAI } from '@google/generative-ai'
import type { ComplexityTier, BookletData, InterpretationData } from './types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

const BRICK_COUNT: Record<ComplexityTier, number> = {
  simple: 50,
  standard: 100,
  advanced: 200,
}

export async function interpretInput(
  description: string,
  imageBase64?: string,
  mimeType?: string,
  complexity: ComplexityTier = 'standard'
): Promise<InterpretationData> {
  const parts: Parameters<typeof model.generateContent>[0] extends { contents: infer C } ? never : any[] = []

  if (imageBase64 && mimeType) {
    parts.push({ inlineData: { data: imageBase64, mimeType } })
  }

  parts.push({
    text: `You are a Lego set designer. Analyse this ${imageBase64 ? 'photo' : 'description'} and describe how you would simplify it into a Lego model.

${!imageBase64 ? `Description: "${description}"` : description ? `Additional context: "${description}"` : ''}

Target complexity: ${complexity} (~${BRICK_COUNT[complexity]} bricks)

Respond with ONLY valid JSON matching this exact shape:
{
  "title": "short catchy set name (2-4 words)",
  "description": "2-3 sentences describing the Lego model you'll build — what it looks like, key features, how it captures the subject",
  "brickCountEstimate": number,
  "colors": ["color1", "color2", "color3"],
  "dominantShape": "one word describing main shape (e.g. rectangular, curved, cylindrical)",
  "complexity": "${complexity}",
  "suggestedApproach": "one sentence on how you'll build it layer by layer"
}`
  })

  const result = await model.generateContent(parts)
  const text = result.response.text()
  return JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())
}

export async function generateBooklet(
  interpretation: InterpretationData,
  description: string,
  imageBase64?: string,
  mimeType?: string,
  id?: string
): Promise<BookletData> {
  const brickCount = BRICK_COUNT[interpretation.complexity]
  const parts: any[] = []

  if (imageBase64 && mimeType) {
    parts.push({ inlineData: { data: imageBase64, mimeType } })
  }

  parts.push({
    text: `You are a Lego set designer creating official building instructions.

Model to build: "${interpretation.title}"
Description: "${interpretation.description}"
${description ? `Original input: "${description}"` : ''}
Target bricks: ~${brickCount}
Colors to use: ${interpretation.colors.join(', ')}

Generate complete Lego building instructions as ONLY valid JSON:

{
  "title": "${interpretation.title}",
  "setNumber": "LEGO-${Math.floor(10000 + Math.random() * 90000)}",
  "totalBricks": number,
  "colors": ${JSON.stringify(interpretation.colors)},
  "inventory": [
    {
      "id": "unique-id",
      "name": "brick name (e.g. 2x4 Brick, 1x2 Plate)",
      "color": "color name",
      "colorHex": "#hexcode",
      "quantity": number,
      "width": number,
      "height": number,
      "type": "brick|plate|tile|round|slope|special"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "bricks": [{ "id": "matches inventory id", "name": "...", "color": "...", "colorHex": "#...", "quantity": 1, "width": 2, "height": 4, "type": "brick" }],
      "instruction": "clear one-sentence instruction for this step",
      "subSteps": null,
      "notes": null
    }
  ]
}

Rules:
- Use 8–20 steps. Each step adds 2–15 bricks.
- Inventory lists every unique brick type with total quantity.
- ColorHex must be realistic Lego colors: red #CC0000, yellow #F7D117, blue #006CB7, green #237841, black #1B2A34, white #F4F4F4, grey #9BA19D, tan #E4CD9E, orange #FE8A18, light-blue #9FC3E9, dark-grey #595D60, brown #7B3F00.
- Build from bottom up (base → walls → details → finishing).
- Keep instructions child-friendly and clear.`
  })

  const result = await model.generateContent(parts)
  const text = result.response.text()
  const data = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())

  return {
    ...data,
    id: id || crypto.randomUUID(),
    complexityTier: interpretation.complexity,
    sourceDescription: description,
    createdAt: new Date().toISOString(),
  } as BookletData
}
