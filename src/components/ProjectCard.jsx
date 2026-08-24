import React from 'react'
import { MapPin, IndianRupee, ThumbsUp, Check } from 'lucide-react'
import CategoryIcon from './CategoryIcon'
import { useApp } from '../context/AppContext'

function formatBudget(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`
  return `₹${n.toLocaleString('en-IN')}`
}

export default function ProjectCard({ project }) {
  const { voteProject, votedProjects } = useApp()
  const voted = !!votedProjects[project.id]

  return (
    <div className="surface flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <CategoryIcon categoryId={project.category} size={20} />
        <span className="font-mono text-xs text-paper-500">{project.id}</span>
      </div>

      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink dark:text-paper-50">
        {project.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-paper-600 dark:text-paper-300">{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-paper-500 dark:text-paper-400">
        <span className="flex items-center gap-1"><MapPin size={12} /> {project.ward}</span>
        <span className="flex items-center gap-1"><IndianRupee size={12} /> {formatBudget(project.budget)} estimated</span>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-civic-700 dark:text-paper-200">{project.supportPercentage}% community support</span>
          <span className="text-paper-500">{project.votes.toLocaleString('en-IN')} votes</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-paper-200 dark:bg-civic-700">
          <div
            className="h-full rounded-full bg-marigold-500 transition-all duration-500"
            style={{ width: `${project.supportPercentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => voteProject(project.id)}
        disabled={voted}
        className={voted ? 'btn-outline mt-4 !border-forest-400 !text-forest-600' : 'btn-accent mt-4'}
      >
        {voted ? (
          <>
            <Check size={15} /> Voted
          </>
        ) : (
          <>
            <ThumbsUp size={15} /> Vote for this project
          </>
        )}
      </button>
    </div>
  )
}
