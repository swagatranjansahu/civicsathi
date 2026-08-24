import React from 'react'

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="border-b border-paper-200 bg-white dark:border-civic-700 dark:bg-civic-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper-50 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-paper-600 dark:text-paper-300">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
