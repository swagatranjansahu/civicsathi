import { CATEGORIES, COMPLAINTS, DEPARTMENTS } from '../data/mockData'

const KEYWORDS = {
  road: ['pothole', 'road', 'crack', 'footpath', 'pavement', 'traffic', 'bump'],
  water: ['water', 'leak', 'pipe', 'tap', 'supply', 'pressure'],
  sanitation: ['garbage', 'waste', 'trash', 'bin', 'dump', 'smell', 'sanitation'],
  lighting: ['light', 'lamp', 'dark', 'bulb', 'street light'],
  drainage: ['drain', 'sewage', 'flood', 'stagnant', 'mosquito', 'waterlog'],
  electricity: ['transformer', 'wire', 'spark', 'shock', 'electric', 'power cut'],
}

const HIGH_PRIORITY_SIGNALS = ['spark', 'shock', 'danger', 'urgent', 'children', 'school', 'accident', 'flood', 'health']

export function detectCategory(text) {
  const lower = text.toLowerCase()
  let best = { id: 'road', score: 0 }
  for (const cat of CATEGORIES) {
    const words = KEYWORDS[cat.id] || []
    const score = words.reduce((acc, w) => (lower.includes(w) ? acc + 1 : acc), 0)
    if (score > best.score) best = { id: cat.id, score }
  }
  return best.id
}

export function detectPriority(text) {
  const lower = text.toLowerCase()
  const hits = HIGH_PRIORITY_SIGNALS.reduce((acc, w) => (lower.includes(w) ? acc + 1 : acc), 0)
  if (hits >= 1) return 'High'
  if (text.length > 80) return 'Medium'
  return 'Medium'
}

export function findSimilarComplaints(text, categoryId) {
  const lower = text.toLowerCase()
  const words = new Set(lower.split(/\W+/).filter((w) => w.length > 3))
  return COMPLAINTS.filter((c) => c.category === categoryId)
    .map((c) => {
      const cWords = new Set(c.title.toLowerCase().split(/\W+/).filter((w) => w.length > 3))
      let overlap = 0
      cWords.forEach((w) => {
        if (words.has(w)) overlap += 1
      })
      return { complaint: c, overlap }
    })
    .filter((r) => r.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
}

export function routeDepartment(categoryId) {
  return DEPARTMENTS.find((d) => d.handles.includes(categoryId)) || DEPARTMENTS[DEPARTMENTS.length - 1]
}

export function generateComplaintId() {
  const n = 2050 + Math.floor(Math.random() * 900)
  return `CIV-${n}`
}

export function confidenceScore(text) {
  const base = 82
  const bonus = Math.min(14, Math.floor(text.length / 12))
  return Math.min(98, base + bonus)
}

export const PIPELINE_STEPS = [
  'Analyzing complaint…',
  'Detecting language…',
  'Understanding issue…',
  'Checking duplicate complaints…',
  'Determining priority…',
  'Finding responsible department…',
]
