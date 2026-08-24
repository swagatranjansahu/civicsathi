import React from 'react'

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-100 text-paper-500 dark:bg-civic-700 dark:text-paper-300">
          <Icon size={22} />
        </span>
      )}
      <h3 className="font-display text-base font-semibold text-ink dark:text-paper-50">{title}</h3>
      {description && <p className="max-w-sm text-sm text-paper-600 dark:text-paper-300">{description}</p>}
      {action}
    </div>
  )
}
