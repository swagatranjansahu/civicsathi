import React, { useMemo, useState } from 'react'
import { Landmark } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function Participate() {
  const { projects } = useApp()
  const [category, setCategory] = useState('all')

  const filtered = useMemo(
    () => projects.filter((p) => category === 'all' || p.category === category),
    [projects, category],
  )

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0)

  return (
    <div>
      <PageHeader
        eyebrow="Participatory budgeting"
        title="Help decide what gets built next"
        description="These are proposed local projects, drawn from patterns in reported complaints. Vote for the ones you think matter most — community support directly informs how the ward budget is prioritized."
      >
        <div className="mt-6 flex flex-wrap gap-8 font-mono text-xs text-paper-500 dark:text-paper-400">
          <span className="flex items-center gap-1.5">
            <Landmark size={14} className="text-civic-600" />
            <strong className="text-ink dark:text-paper-100">₹{(totalBudget / 100000).toFixed(1)} L</strong> across {projects.length} proposals
          </span>
          <span><strong className="text-ink dark:text-paper-100">{totalVotes.toLocaleString('en-IN')}</strong> votes cast this cycle</span>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              category === 'all' ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
            }`}
          >
            All proposals
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                category === c.id ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-paper-500">
          One vote per citizen account per proposal, in this prototype tracked for your current session only.
        </p>
      </div>
    </div>
  )
}
