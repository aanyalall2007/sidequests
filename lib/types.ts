export type ComplexityTier = 'simple' | 'standard' | 'advanced'

export interface BrickItem {
  id: string
  name: string
  color: string
  colorHex: string
  quantity: number
  width: number   // in studs
  height: number  // in studs
  type: 'brick' | 'plate' | 'tile' | 'round' | 'slope' | 'special'
}

export interface SubStep {
  number: number
  description: string
  bricks: BrickItem[]
}

export interface InstructionStep {
  stepNumber: number
  bricks: BrickItem[]
  instruction: string
  subSteps?: SubStep[]
  notes?: string
}

export interface BookletData {
  id: string
  title: string
  setNumber: string
  totalBricks: number
  complexityTier: ComplexityTier
  colors: string[]
  inventory: BrickItem[]
  steps: InstructionStep[]
  sourceDescription: string
  createdAt: string
}

export interface InterpretationData {
  title: string
  description: string
  brickCountEstimate: number
  colors: string[]
  dominantShape: string
  complexity: ComplexityTier
  suggestedApproach: string
}
