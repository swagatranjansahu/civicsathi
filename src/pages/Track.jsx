import React, { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, FileSearch } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ComplaintCard from '../components/ComplaintCard'
import EmptyState from '../components/EmptyState'
import { CATEGORIES, STATUS_STEPS } from '../data/mockData'
import { useApp } from '../context/AppContext'

const PRIORITIES = ['High', 'Medium', 'Low']
const SORTS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'priority', label: 'Priority' },
  { id: 'support', label: 'Most supported' },
]

export default function Track() {
  const { complaints } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [priority, setPriority] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    let list = complaints.filter((c) => {
      const matchesQuery =
        query.trim() === '' ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.location.area.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || c.category === category
      const matchesPriority = priority === 'all' || c.priority === priority
      const matchesStatus = status === 'all' || c.status === status
      return matchesQuery && matchesCategory && matchesPriority && matchesStatus
    })

    if (sort === 'priority') {
      const order = { High: 0, Medium: 1, Low: 2 }
      list = [...list].sort((a, b) => order[a.priority] - order[b.priority])
    } else if (sort === 'support') {
      list = [...list].sort((a, b) => b.supportCount - a.supportCount)
    } else {
      list = [...list].sort((a, b) => (a.submittedDate < b.submittedDate ? 1 : -1))
    }
    return list
  }, [complaints, query, category, priority, status, sort])

  return (
    <div>
      <PageHeader
        eyebrow="Track a complaint"
        title="Search and follow any reported issue"
        description="Look up a complaint by ID, keyword or location — or browse everything reported across India."
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-paper-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by complaint ID, keyword, or area"
              className="field-input pl-9"
            />
          </div>
          <button onClick={() => setShowFilters((v) => !v)} className="btn-outline shrink-0">
            <SlidersHorizontal size={15} /> Filters
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="field-input shrink-0 sm:w-44">
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {showFilters && (
          <div className="surface animate-rise-in mt-3 grid gap-4 p-4 sm:grid-cols-3">
            <div>
              <span className="field-label">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-input">
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="field-label">Priority</span>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="field-input">
                <option value="all">All priorities</option>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="field-label">Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="field-input">
                <option value="all">All statuses</option>
                {STATUS_STEPS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <p className="mt-6 mb-3 text-sm text-paper-500">{results.length} complaint{results.length !== 1 ? 's' : ''} found</p>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileSearch}
            title="No complaints match your filters"
            description="Try a different search term or clear a filter to see more results."
          />
        )}
      </div>
    </div>
  )
}
