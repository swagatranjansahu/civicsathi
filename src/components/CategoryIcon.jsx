import React from 'react'
import { Construction, Droplets, Trash2, Lightbulb, Waves, Zap, HelpCircle } from 'lucide-react'
import { CATEGORIES } from '../data/mockData'

const ICONS = {
  Construction,
  Droplets,
  Trash2,
  Lightbulb,
  Waves,
  Zap,
}

const COLOR_CLASSES = {
  brick: 'bg-brick-50 text-brick-600',
  civic: 'bg-civic-50 text-civic-700',
  forest: 'bg-forest-50 text-forest-600',
  marigold: 'bg-marigold-50 text-marigold-600',
  gold: 'bg-marigold-50 text-gold-500',
}

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]
}

export default function CategoryIcon({ categoryId, size = 18, className = '' }) {
  const cat = getCategory(categoryId)
  const Icon = ICONS[cat.icon] || HelpCircle
  const colorClass = COLOR_CLASSES[cat.color] || COLOR_CLASSES.civic
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[6px] p-1.5 ${colorClass} ${className}`}
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  )
}
