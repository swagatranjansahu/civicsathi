import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <Compass size={28} className="text-paper-400" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink dark:text-paper-50">Page not found</h1>
      <p className="mt-2 text-sm text-paper-600 dark:text-paper-300">
        The page you're looking for doesn't exist, or may have moved.
      </p>
      <Link to="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  )
}
