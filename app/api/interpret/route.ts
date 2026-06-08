import { NextRequest, NextResponse } from 'next/server'
import { interpretInput } from '@/lib/claude'
import type { ComplexityTier } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const description = formData.get('description') as string || ''
    const complexity = (formData.get('complexity') as ComplexityTier) || 'standard'
    const imageFile = formData.get('image') as File | null

    let imageBase64: string | undefined
    let mimeType: string | undefined

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer()
      imageBase64 = Buffer.from(bytes).toString('base64')
      mimeType = imageFile.type
    }

    if (!description && !imageBase64) {
      return NextResponse.json({ error: 'Provide a description or image' }, { status: 400 })
    }

    const interpretation = await interpretInput(description, imageBase64, mimeType, complexity)
    return NextResponse.json(interpretation)
  } catch (err) {
    console.error('Interpret error:', err)
    return NextResponse.json({ error: 'Failed to interpret input' }, { status: 500 })
  }
}
