import React from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ToastHost() {
  const { toasts, dismissToast } = useApp()
  if (toasts.length === 0) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:right-4 sm:left-auto">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-rise-in pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-card border border-paper-200 bg-white px-4 py-3 shadow-lift dark:border-civic-600 dark:bg-civic-800"
        >
          {t.tone === 'success' ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-forest-500" />
          ) : (
            <Info size={18} className="mt-0.5 shrink-0 text-civic-500" />
          )}
          <p className="flex-1 text-sm text-ink dark:text-paper-100">{t.message}</p>
          <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="text-paper-400 hover:text-paper-600">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
