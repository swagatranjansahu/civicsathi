import React from 'react'

const TONE_CLASSES = {
  neutral: 'border-civic-300 text-civic-600 dark:border-civic-400 dark:text-civic-200',
  progress: 'border-marigold-400 text-marigold-600',
  active: 'border-gold-500 text-gold-500',
  success: 'border-forest-500 text-forest-500',
  danger: 'border-brick-500 text-brick-500',
}

const DOT_CLASSES = {
  neutral: 'bg-civic-400',
  progress: 'bg-marigold-500',
  active: 'bg-gold-500',
  success: 'bg-forest-500',
  danger: 'bg-brick-500',
}

const STATUS_TONE = {
  Submitted: 'neutral',
  'AI Verified': 'neutral',
  'Department Assigned': 'progress',
  'Under Review': 'progress',
  'Work in Progress': 'active',
  Resolved: 'success',
}

const PRIORITY_TONE = {
  High: 'danger',
  Medium: 'progress',
  Low: 'neutral',
}

export function statusTone(status) {
  return STATUS_TONE[status] || 'neutral'
}
export function priorityTone(priority) {
  return PRIORITY_TONE[priority] || 'neutral'
}

export default function Stamp({ label, tone = 'neutral', pulse = false, className = '' }) {
  return (
    <span className={`stamp ${TONE_CLASSES[tone]} ${className}`}>
      <span className={`stamp-dot ${DOT_CLASSES[tone]} ${pulse ? 'animate-pulse-dot' : ''}`} />
      {label}
    </span>
  )
}
