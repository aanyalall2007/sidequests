import { NextRequest, NextResponse } from 'next/server'
import { generateBooklet } from '@/lib/claude'
import type { InterpretationData } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const interpretationRaw = formData.get('interpretation') as string
    const description = formData.get('description') as string || ''
    const id = formData.get('id') as string || crypto.randomUUID()
    const imageFile = formData.get('image') as File | null

    if (!interpretationRaw) {
      return NextResponse.json({ error: 'Interpretation data required' }, { status: 400 })
    }

    const interpretation: InterpretationData = JSON.parse(interpretationRaw)

    let imageBase64: string | undefined
    let mimeType: string | undefined

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer()
      imageBase64 = Buffer.from(bytes).toString('base64')
      mimeType = imageFile.type
    }

    const booklet = await generateBooklet(interpretation, description, imageBase64, mimeType, id)
    return NextResponse.json(booklet)
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json({ error: 'Failed to generate booklet' }, { status: 500 })
  }
}
