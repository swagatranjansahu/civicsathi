import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Users, ChevronRight } from 'lucide-react'
import CategoryIcon, { getCategory } from './CategoryIcon'
import Stamp, { statusTone, priorityTone } from './Stamp'
import { DEPARTMENTS } from '../data/mockData'

export default function ComplaintCard({ complaint }) {
  const category = getCategory(complaint.category)
  const dept = DEPARTMENTS.find((d) => d.id === complaint.department)

  return (
    <Link
      to={`/track/${complaint.id}`}
      className="surface group flex flex-col gap-3 p-4 transition-shadow hover:shadow-lift sm:flex-row sm:items-center sm:gap-4"
    >
      <CategoryIcon categoryId={complaint.category} size={20} className="shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-paper-500">{complaint.id}</span>
          {complaint.duplicateGroup && (
            <span className="rounded-[3px] bg-paper-200 px-1.5 py-0.5 font-mono text-[10px] text-paper-600 dark:bg-civic-700 dark:text-paper-300">
              Group {complaint.duplicateGroup}
            </span>
          )}
        </div>
        <h3 className="mt-0.5 truncate font-display text-[15px] font-semibold text-ink dark:text-paper-50">
          {complaint.title}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-paper-600 dark:text-paper-300">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {complaint.location.area}
          </span>
          <span>{category.label}</span>
          <span>{dept?.name}</span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {complaint.supportCount} supporting
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
        <Stamp label={complaint.status} tone={statusTone(complaint.status)} pulse={complaint.status === 'Work in Progress'} />
        <Stamp label={`${complaint.priority} priority`} tone={priorityTone(complaint.priority)} />
      </div>

      <ChevronRight size={18} className="hidden shrink-0 text-paper-400 group-hover:text-civic-600 sm:block" />
    </Link>
  )
}
