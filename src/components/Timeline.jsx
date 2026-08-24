import React from 'react'
import { Check } from 'lucide-react'
import { STATUS_STEPS } from '../data/mockData'

export default function Timeline({ timeline, currentStatus }) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus)

  return (
    <ol className="relative ml-3 border-l-2 border-paper-200 dark:border-civic-700">
      {STATUS_STEPS.map((step, i) => {
        const entry = timeline.find((t) => t.step === step)
        const done = i <= currentIndex
        const isCurrent = i === currentIndex
        return (
          <li key={step} className="relative pb-8 pl-6 last:pb-0">
            <span
              className={`absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                done
                  ? isCurrent
                    ? 'border-marigold-500 bg-marigold-500 text-white animate-pulse-dot'
                    : 'border-forest-500 bg-forest-500 text-white'
                  : 'border-paper-300 bg-white dark:border-civic-600 dark:bg-civic-800'
              }`}
            >
              {done && <Check size={12} strokeWidth={3} />}
            </span>
            <p className={`font-display text-sm font-semibold ${done ? 'text-ink dark:text-paper-50' : 'text-paper-400'}`}>
              {step}
            </p>
            {entry ? (
              <>
                <p className="mt-0.5 font-mono text-xs text-paper-500">{entry.date}</p>
                <p className="mt-1 text-sm text-paper-600 dark:text-paper-300">{entry.note}</p>
              </>
            ) : (
              !done && <p className="mt-0.5 text-xs text-paper-400">Not yet reached</p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
