import type { BookletData, InterpretationData } from './types'

export const USC_INTERPRETATION: InterpretationData = {
  title: 'USC Clock Tower',
  description: 'A simplified Lego model of the iconic USC Village clock tower — a tall red-brick Gothic tower with a pointed spire, flanked by matching red-brick academic buildings with arched windows and terracotta rooftops. The plaza below features open courtyard space.',
  brickCountEstimate: 200,
  colors: ['red', 'tan', 'dark-grey', 'white', 'brown'],
  dominantShape: 'rectangular',
  complexity: 'advanced',
  suggestedApproach: 'Build the base plaza first, then construct the flanking wings, and finally stack the clock tower upward layer by layer to the pointed spire.',
}

export const USC_BOOKLET: BookletData = {
  id: 'demo-usc-village',
  title: 'USC Clock Tower',
  setNumber: 'LEGO-90210',
  totalBricks: 198,
  complexityTier: 'advanced',
  colors: ['red', 'tan', 'dark-grey', 'white', 'brown'],
  sourceDescription: 'USC Village clock tower',
  createdAt: new Date().toISOString(),
  inventory: [
    { id: 'red-2x4', name: '2x4 Brick', color: 'red', colorHex: '#CC0000', quantity: 32, width: 4, height: 2, type: 'brick' },
    { id: 'red-2x2', name: '2x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 24, width: 2, height: 2, type: 'brick' },
    { id: 'red-1x2', name: '1x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 20, width: 2, height: 1, type: 'brick' },
    { id: 'tan-2x4', name: '2x4 Plate', color: 'tan', colorHex: '#E4CD9E', quantity: 16, width: 4, height: 2, type: 'plate' },
    { id: 'tan-1x4', name: '1x4 Tile', color: 'tan', colorHex: '#E4CD9E', quantity: 12, width: 4, height: 1, type: 'tile' },
    { id: 'grey-2x2', name: '2x2 Brick', color: 'dark-grey', colorHex: '#595D60', quantity: 18, width: 2, height: 2, type: 'brick' },
    { id: 'grey-1x2', name: '1x2 Plate', color: 'dark-grey', colorHex: '#595D60', quantity: 14, width: 2, height: 1, type: 'plate' },
    { id: 'white-1x2', name: '1x2 Brick', color: 'white', colorHex: '#F4F4F4', quantity: 16, width: 2, height: 1, type: 'brick' },
    { id: 'brown-slope', name: '2x2 Slope', color: 'brown', colorHex: '#7B3F00', quantity: 12, width: 2, height: 2, type: 'slope' },
    { id: 'red-1x1', name: '1x1 Round', color: 'red', colorHex: '#CC0000', quantity: 8, width: 1, height: 1, type: 'round' },
    { id: 'grey-slope', name: '1x2 Slope', color: 'dark-grey', colorHex: '#595D60', quantity: 8, width: 2, height: 1, type: 'slope' },
    { id: 'tan-2x2', name: '2x2 Plate', color: 'tan', colorHex: '#E4CD9E', quantity: 18, width: 2, height: 2, type: 'plate' },
  ],
  steps: [
    {
      stepNumber: 1,
      bricks: [
        { id: 'tan-2x4', name: '2x4 Plate', color: 'tan', colorHex: '#E4CD9E', quantity: 6, width: 4, height: 2, type: 'plate' },
      ],
      instruction: 'Lay six 2x4 tan plates side by side to form the wide courtyard base.',
    },
    {
      stepNumber: 2,
      bricks: [
        { id: 'tan-2x2', name: '2x2 Plate', color: 'tan', colorHex: '#E4CD9E', quantity: 6, width: 2, height: 2, type: 'plate' },
        { id: 'grey-1x2', name: '1x2 Plate', color: 'dark-grey', colorHex: '#595D60', quantity: 4, width: 2, height: 1, type: 'plate' },
      ],
      instruction: 'Add tan 2x2 plates across the base and dark-grey 1x2 plates along the front edge to define the plaza walkway.',
    },
    {
      stepNumber: 3,
      bricks: [
        { id: 'red-2x4', name: '2x4 Brick', color: 'red', colorHex: '#CC0000', quantity: 6, width: 4, height: 2, type: 'brick' },
      ],
      instruction: 'Stack two rows of red 2x4 bricks on the left side to begin the west wing of the building.',
    },
    {
      stepNumber: 4,
      bricks: [
        { id: 'red-2x4', name: '2x4 Brick', color: 'red', colorHex: '#CC0000', quantity: 6, width: 4, height: 2, type: 'brick' },
      ],
      instruction: 'Mirror the west wing on the right side with two rows of red 2x4 bricks to build the east wing.',
    },
    {
      stepNumber: 5,
      bricks: [
        { id: 'white-1x2', name: '1x2 Brick', color: 'white', colorHex: '#F4F4F4', quantity: 8, width: 2, height: 1, type: 'brick' },
        { id: 'red-1x2', name: '1x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 4, width: 2, height: 1, type: 'brick' },
      ],
      instruction: 'Add alternating white and red 1x2 bricks along both wings to create the arched window detail.',
    },
    {
      stepNumber: 6,
      bricks: [
        { id: 'tan-1x4', name: '1x4 Tile', color: 'tan', colorHex: '#E4CD9E', quantity: 6, width: 4, height: 1, type: 'tile' },
        { id: 'brown-slope', name: '2x2 Slope', color: 'brown', colorHex: '#7B3F00', quantity: 4, width: 2, height: 2, type: 'slope' },
      ],
      instruction: 'Cap both wings with tan 1x4 tiles for the roofline, then add brown 2x2 slopes at the corners for the terracotta roof.',
    },
    {
      stepNumber: 7,
      bricks: [
        { id: 'grey-2x2', name: '2x2 Brick', color: 'dark-grey', colorHex: '#595D60', quantity: 4, width: 2, height: 2, type: 'brick' },
        { id: 'red-2x2', name: '2x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 4, width: 2, height: 2, type: 'brick' },
      ],
      instruction: 'Place dark-grey and red 2x2 bricks in the center of the base to begin the clock tower foundation.',
    },
    {
      stepNumber: 8,
      bricks: [
        { id: 'red-2x2', name: '2x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 8, width: 2, height: 2, type: 'brick' },
      ],
      instruction: 'Stack four layers of red 2x2 bricks upward to build the lower shaft of the clock tower.',
    },
    {
      stepNumber: 9,
      bricks: [
        { id: 'white-1x2', name: '1x2 Brick', color: 'white', colorHex: '#F4F4F4', quantity: 4, width: 2, height: 1, type: 'brick' },
        { id: 'grey-2x2', name: '2x2 Brick', color: 'dark-grey', colorHex: '#595D60', quantity: 4, width: 2, height: 2, type: 'brick' },
      ],
      instruction: 'Add a band of white 1x2 bricks around the tower, then continue upward with dark-grey 2x2 bricks for the clock face level.',
    },
    {
      stepNumber: 10,
      bricks: [
        { id: 'red-1x1', name: '1x1 Round', color: 'red', colorHex: '#CC0000', quantity: 4, width: 1, height: 1, type: 'round' },
        { id: 'grey-1x2', name: '1x2 Plate', color: 'dark-grey', colorHex: '#595D60', quantity: 4, width: 2, height: 1, type: 'plate' },
      ],
      instruction: 'Place red 1x1 round bricks on each face of the tower to represent the clock face, and grey plates to frame them.',
    },
    {
      stepNumber: 11,
      bricks: [
        { id: 'red-2x2', name: '2x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 4, width: 2, height: 2, type: 'brick' },
        { id: 'grey-slope', name: '1x2 Slope', color: 'dark-grey', colorHex: '#595D60', quantity: 4, width: 2, height: 1, type: 'slope' },
      ],
      instruction: 'Continue the tower with two more layers of red 2x2 bricks, then add dark-grey 1x2 slopes around the perimeter as the belfry overhang.',
    },
    {
      stepNumber: 12,
      bricks: [
        { id: 'brown-slope', name: '2x2 Slope', color: 'brown', colorHex: '#7B3F00', quantity: 4, width: 2, height: 2, type: 'slope' },
        { id: 'red-1x1', name: '1x1 Round', color: 'red', colorHex: '#CC0000', quantity: 1, width: 1, height: 1, type: 'round' },
      ],
      instruction: 'Top the tower with four brown 2x2 slopes angled inward to form the pointed Gothic spire, and finish with a single red 1x1 round brick at the very tip.',
    },
  ],
}
