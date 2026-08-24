import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, MapPin, X, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CategoryIcon, { getCategory } from '../components/CategoryIcon'
import Stamp, { statusTone, priorityTone } from '../components/Stamp'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'

const BOUNDS = { latMin: 20.262, latMax: 20.306, lngMin: 85.788, lngMax: 85.846 }

function project(lat, lng) {
  const x = ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100
  const y = (1 - (lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin)) * 100
  return { x: Math.min(96, Math.max(4, x)), y: Math.min(94, Math.max(8, y)) }
}

const DOT_COLORS = {
  brick: '#B94A3B',
  civic: '#1F4A4E',
  forest: '#2E7D4F',
  marigold: '#DD8623',
  gold: '#BC9226',
}

export default function CommunityMap() {
  const { complaints } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState(null)

  const visible = useMemo(
    () => complaints.filter((c) => activeCategory === 'all' || c.category === activeCategory),
    [complaints, activeCategory],
  )

  return (
    <div>
      <PageHeader
        eyebrow="Community issues"
        title="What's been reported near you"
        description="A city-wide view of civic reports. Filter by category, and select a marker for details."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              activeCategory === 'all' ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
            }`}
          >
            All issues
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                activeCategory === c.id ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: DOT_COLORS[c.color] }} />
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="surface relative aspect-[4/3] overflow-hidden lg:col-span-2 lg:aspect-auto lg:min-h-[520px]">
            <div
              className="absolute inset-0 bg-paper-100 dark:bg-civic-800"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(31,74,78,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(31,74,78,0.08) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute left-3 top-3 rounded-[6px] bg-white/90 px-2.5 py-1 font-mono text-[10px] text-paper-500 dark:bg-civic-900/90">
              Basantnagar — stylized map (no live map data)
            </div>

            {visible.map((c) => {
              const { x, y } = project(c.location.lat, c.location.lng)
              const cat = getCategory(c.category)
              const isSelected = selected?.id === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 ${
                    isSelected ? 'z-20 scale-125' : 'z-10'
                  }`}
                  aria-label={c.title}
                >
                  <span
                    className="block h-4 w-4 rounded-full border-2 border-white shadow-lift"
                    style={{ background: DOT_COLORS[cat.color] }}
                  />
                  <span
                    className="mx-auto block h-2 w-0.5"
                    style={{ background: DOT_COLORS[cat.color] }}
                  />
                </button>
              )
            })}
          </div>

          <div>
            {selected ? (
              <div className="surface animate-rise-in p-5">
                <div className="flex items-start justify-between gap-2">
                  <CategoryIcon categoryId={selected.category} size={18} />
                  <button onClick={() => setSelected(null)} className="text-paper-400 hover:text-paper-600" aria-label="Close">
                    <X size={16} />
                  </button>
                </div>
                <p className="mt-2 font-mono text-xs text-paper-500">{selected.id}</p>
                <h3 className="mt-0.5 font-display text-base font-semibold text-ink dark:text-paper-50">{selected.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-paper-500"><MapPin size={12} /> {selected.location.area}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Stamp label={selected.status} tone={statusTone(selected.status)} />
                  <Stamp label={`${selected.priority} priority`} tone={priorityTone(selected.priority)} />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-paper-600 dark:text-paper-300">
                  <Users size={14} /> {selected.supportCount} citizens support this
                </p>
                <Link to={`/track/${selected.id}`} className="btn-primary mt-4 w-full">
                  View full details <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="surface flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-paper-500">
                <MapPin size={22} />
                <p className="text-sm">Select a marker to see complaint details.</p>
              </div>
            )}

            <div className="surface mt-4 p-4">
              <p className="text-xs font-medium text-paper-500">Showing</p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink dark:text-paper-50">{visible.length}</p>
              <p className="text-xs text-paper-500">reported issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
