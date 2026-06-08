import type { BookletData, InterpretationData } from './types'

// Helpers — defined first so they're available for USC_BOOKLET initialization
function buildGrid(
  layers: { color: string; rows: number[]; cols: number[] }[],
  numRows: number,
  numCols: number
): string[][] {
  const grid: string[][] = Array.from({ length: numRows }, () => Array(numCols).fill(''))
  for (const layer of layers) {
    for (const r of layer.rows) {
      for (const c of layer.cols) {
        if (r < numRows && c < numCols) grid[r][c] = layer.color
      }
    }
  }
  return grid
}

function allCells(regions: { rows: number[]; cols: number[] }[]): [number, number][] {
  const cells: [number, number][] = []
  for (const r of regions) for (const row of r.rows) for (const col of r.cols) cells.push([row, col])
  return cells
}

export const USC_INTERPRETATION: InterpretationData = {
  title: 'USC Clock Tower',
  description: 'A simplified Lego model of the iconic USC Village clock tower — a tall red-brick Gothic tower with a pointed spire, flanked by matching red-brick academic buildings with arched windows and terracotta rooftops.',
  brickCountEstimate: 200,
  colors: ['red', 'tan', 'dark-grey', 'white', 'brown'],
  dominantShape: 'rectangular',
  complexity: 'advanced',
  suggestedApproach: 'Build the base plaza first, then the two flanking wings, then stack the clock tower upward.',
}

// Each step includes a grid showing the TOP-DOWN view of all placed bricks.
// grid: 2D array of color strings ('' = empty, color hex = filled)
// newCells: coordinates [row, col] of bricks added THIS step (highlighted bright)

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
    { id: 'red-2x4',    name: '2x4 Brick',   color: 'red',       colorHex: '#CC0000', quantity: 32, width: 4, height: 2, type: 'brick' },
    { id: 'red-2x2',    name: '2x2 Brick',   color: 'red',       colorHex: '#CC0000', quantity: 24, width: 2, height: 2, type: 'brick' },
    { id: 'red-1x2',    name: '1x2 Brick',   color: 'red',       colorHex: '#CC0000', quantity: 20, width: 2, height: 1, type: 'brick' },
    { id: 'tan-2x4',    name: '2x4 Plate',   color: 'tan',       colorHex: '#E4CD9E', quantity: 16, width: 4, height: 2, type: 'plate' },
    { id: 'tan-1x4',    name: '1x4 Tile',    color: 'tan',       colorHex: '#E4CD9E', quantity: 12, width: 4, height: 1, type: 'tile' },
    { id: 'grey-2x2',   name: '2x2 Brick',   color: 'dark-grey', colorHex: '#595D60', quantity: 18, width: 2, height: 2, type: 'brick' },
    { id: 'grey-1x2',   name: '1x2 Plate',   color: 'dark-grey', colorHex: '#595D60', quantity: 14, width: 2, height: 1, type: 'plate' },
    { id: 'white-1x2',  name: '1x2 Brick',   color: 'white',     colorHex: '#F4F4F4', quantity: 16, width: 2, height: 1, type: 'brick' },
    { id: 'brown-slope', name: '2x2 Slope',  color: 'brown',     colorHex: '#7B3F00', quantity: 12, width: 2, height: 2, type: 'slope' },
    { id: 'red-1x1',    name: '1x1 Round',   color: 'red',       colorHex: '#CC0000', quantity: 8,  width: 1, height: 1, type: 'round' },
    { id: 'grey-slope', name: '1x2 Slope',   color: 'dark-grey', colorHex: '#595D60', quantity: 8,  width: 2, height: 1, type: 'slope' },
    { id: 'tan-2x2',    name: '2x2 Plate',   color: 'tan',       colorHex: '#E4CD9E', quantity: 18, width: 2, height: 2, type: 'plate' },
  ],
  steps: [
    {
      stepNumber: 1,
      bricks: [{ id: 'tan-2x4', name: '2x4 Plate', color: 'tan', colorHex: '#E4CD9E', quantity: 6, width: 4, height: 2, type: 'plate' }],
      instruction: 'Place 6 tan 2x4 plates in a row to form the wide courtyard base (12 studs wide × 2 studs deep).',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
      ], 8, 16),
      newCells: allCells([{ rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] }]),
    },
    {
      stepNumber: 2,
      bricks: [{ id: 'red-2x4', name: '2x4 Brick', color: 'red', colorHex: '#CC0000', quantity: 3, width: 4, height: 2, type: 'brick' }],
      instruction: 'On the left side (columns 0–3), stack one row of 3 red 2x4 bricks on top of the base to start the west wing wall.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
      ], 8, 16),
      newCells: allCells([{ rows: [2,3], cols: [0,1,2,3,4,5,6,7,8,9,10,11] }]),
    },
    {
      stepNumber: 3,
      bricks: [{ id: 'red-2x4', name: '2x4 Brick', color: 'red', colorHex: '#CC0000', quantity: 3, width: 4, height: 2, type: 'brick' }],
      instruction: 'Add a second row of 3 red 2x4 bricks directly on top of step 2 bricks — the west wing is now 2 layers tall.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
      ], 8, 16),
      newCells: allCells([{ rows: [4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] }]),
    },
    {
      stepNumber: 4,
      bricks: [
        { id: 'white-1x2', name: '1x2 Brick', color: 'white', colorHex: '#F4F4F4', quantity: 4, width: 2, height: 1, type: 'brick' },
        { id: 'red-1x2',   name: '1x2 Brick', color: 'red',   colorHex: '#CC0000', quantity: 2, width: 2, height: 1, type: 'brick' },
      ],
      instruction: 'Add window detail row: alternate 2 white 1x2 bricks, 1 red 1x2, 2 white 1x2, 1 red 1x2 across the top of the wall — these represent arched windows.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#F4F4F4', rows: [6], cols: [0,1,2,3,6,7,8,9] },
        { color: '#CC0000', rows: [6], cols: [4,5,10,11] },
      ], 8, 16),
      newCells: allCells([{ rows: [6], cols: [0,1,2,3,4,5,6,7,8,9,10,11] }]),
    },
    {
      stepNumber: 5,
      bricks: [
        { id: 'tan-1x4',    name: '1x4 Tile',  color: 'tan',   colorHex: '#E4CD9E', quantity: 3, width: 4, height: 1, type: 'tile' },
        { id: 'brown-slope', name: '2x2 Slope', color: 'brown', colorHex: '#7B3F00', quantity: 2, width: 2, height: 2, type: 'slope' },
      ],
      instruction: 'Cap the west wing: lay 3 tan 1x4 tiles flat across the top (cols 0–11), then place 1 brown 2x2 slope at each end corner for the terracotta roof pitch.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#F4F4F4', rows: [6], cols: [0,1,2,3,6,7,8,9] },
        { color: '#CC0000', rows: [6], cols: [4,5,10,11] },
        { color: '#E4CD9E', rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
      ], 8, 16),
      newCells: allCells([{ rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] }]),
    },
    {
      stepNumber: 6,
      bricks: [
        { id: 'grey-2x2', name: '2x2 Brick', color: 'dark-grey', colorHex: '#595D60', quantity: 2, width: 2, height: 2, type: 'brick' },
        { id: 'red-2x2',  name: '2x2 Brick', color: 'red',       colorHex: '#CC0000', quantity: 2, width: 2, height: 2, type: 'brick' },
      ],
      instruction: 'Start the clock tower in the centre (cols 5–8). Place 2 dark-grey 2x2 bricks side by side, then 2 red 2x2 bricks behind them — this is the tower foundation (2×4 footprint).',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#F4F4F4', rows: [6], cols: [0,1,2,3,6,7,8,9] },
        { color: '#CC0000', rows: [6], cols: [4,5,10,11] },
        { color: '#E4CD9E', rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#595D60', rows: [2,3], cols: [4,5,6,7] },
        { color: '#CC0000', rows: [4,5], cols: [4,5,6,7] },
      ], 16, 16),
      newCells: allCells([{ rows: [2,3,4,5], cols: [4,5,6,7] }]),
    },
    {
      stepNumber: 7,
      bricks: [{ id: 'red-2x2', name: '2x2 Brick', color: 'red', colorHex: '#CC0000', quantity: 4, width: 2, height: 2, type: 'brick' }],
      instruction: 'Stack 4 more red 2x2 bricks (2 pairs) directly on top of the tower foundation — the tower is now 3 layers tall at the centre.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#E4CD9E', rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#595D60', rows: [2,3], cols: [4,5,6,7] },
        { color: '#CC0000', rows: [4,5,6,7,8,9], cols: [4,5,6,7] },
      ], 16, 16),
      newCells: allCells([{ rows: [6,7,8,9], cols: [4,5,6,7] }]),
    },
    {
      stepNumber: 8,
      bricks: [
        { id: 'white-1x2', name: '1x2 Brick',   color: 'white',     colorHex: '#F4F4F4', quantity: 4, width: 2, height: 1, type: 'brick' },
        { id: 'grey-1x2',  name: '1x2 Plate',   color: 'dark-grey', colorHex: '#595D60', quantity: 2, width: 2, height: 1, type: 'plate' },
      ],
      instruction: 'Clock face level: place 2 white 1x2 bricks on the front face (cols 4–5) and 2 on the back face (cols 6–7) of the tower. Add grey 1x2 plates on the side faces as the clock surround.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#E4CD9E', rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#595D60', rows: [2,3], cols: [4,5,6,7] },
        { color: '#CC0000', rows: [4,5,6,7,8,9], cols: [4,5,6,7] },
        { color: '#F4F4F4', rows: [10], cols: [4,5,6,7] },
        { color: '#595D60', rows: [10], cols: [4,7] },
      ], 16, 16),
      newCells: allCells([{ rows: [10], cols: [4,5,6,7] }]),
    },
    {
      stepNumber: 9,
      bricks: [
        { id: 'red-2x2',  name: '2x2 Brick', color: 'red',       colorHex: '#CC0000', quantity: 2, width: 2, height: 2, type: 'brick' },
        { id: 'grey-slope', name: '1x2 Slope', color: 'dark-grey', colorHex: '#595D60', quantity: 4, width: 2, height: 1, type: 'slope' },
      ],
      instruction: 'Add 2 more red 2x2 bricks above the clock face. Then place 4 grey 1x2 slopes around the perimeter (one on each side), angled outward — this is the belfry overhang.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#E4CD9E', rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#595D60', rows: [2,3], cols: [4,5,6,7] },
        { color: '#CC0000', rows: [4,5,6,7,8,9,10,11,12,13], cols: [4,5,6,7] },
        { color: '#F4F4F4', rows: [10], cols: [4,5,6,7] },
        { color: '#595D60', rows: [12], cols: [3,4,5,6,7,8] },
      ], 16, 16),
      newCells: allCells([{ rows: [10,11,12,13], cols: [4,5,6,7] }, { rows: [12], cols: [3,8] }]),
    },
    {
      stepNumber: 10,
      bricks: [
        { id: 'brown-slope', name: '2x2 Slope', color: 'brown', colorHex: '#7B3F00', quantity: 4, width: 2, height: 2, type: 'slope' },
        { id: 'red-1x1',    name: '1x1 Round',  color: 'red',   colorHex: '#CC0000', quantity: 1, width: 1, height: 1, type: 'round' },
      ],
      instruction: 'Finish the spire: place 4 brown 2x2 slopes pointing inward on all four sides of the tower top, then cap the very tip with 1 red 1x1 round stud.',
      grid: buildGrid([
        { color: '#E4CD9E', rows: [0,1], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#CC0000', rows: [2,3,4,5], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#E4CD9E', rows: [7], cols: [0,1,2,3,4,5,6,7,8,9,10,11] },
        { color: '#595D60', rows: [2,3], cols: [4,5,6,7] },
        { color: '#CC0000', rows: [4,5,6,7,8,9,10,11,12,13], cols: [4,5,6,7] },
        { color: '#F4F4F4', rows: [10], cols: [4,5,6,7] },
        { color: '#595D60', rows: [12], cols: [3,4,5,6,7,8] },
        { color: '#7B3F00', rows: [14,15], cols: [4,5,6,7] },
        { color: '#CC0000', rows: [15], cols: [5,6] },
      ], 16, 16),
      newCells: allCells([{ rows: [14,15], cols: [4,5,6,7] }]),
    },
  ],
}

