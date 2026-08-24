import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, MapPin, Users, ArrowRight, CheckCircle2, Copy, Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CategoryIcon, { getCategory } from '../components/CategoryIcon'
import Stamp, { statusTone, priorityTone } from '../components/Stamp'
import Timeline from '../components/Timeline'
import EmptyState from '../components/EmptyState'
import { DEPARTMENTS, STATUS_STEPS } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function Admin() {
  const { user, login, complaints, advanceComplaintStatus } = useApp()
  const [department, setDepartment] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const queue = useMemo(() => {
    const order = { High: 0, Medium: 1, Low: 2 }
    return complaints
      .filter((c) => c.status !== 'Resolved')
      .filter((c) => department === 'all' || c.department === department)
      .sort((a, b) => order[a.priority] - order[b.priority])
  }, [complaints, department])

  const selected = complaints.find((c) => c.id === selectedId) || queue[0]

  if (!user || user.role !== 'admin') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShieldAlert}
          title="Department sign-in required"
          description="The admin dashboard is a role-based view for municipal department officers. Sign in with a department account to review incoming complaints."
          action={
            <button onClick={() => login('Officer Rina Patnaik', 'admin')} className="btn-primary mt-2">
              Sign in as a department officer
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Department dashboard"
        title={`Welcome, ${user.name}`}
        description="Review incoming complaints, check evidence, and move cases through resolution."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-paper-500"><Filter size={13} /> Department</span>
          <button
            onClick={() => setDepartment('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              department === 'all' ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
            }`}
          >
            All queues
          </button>
          {DEPARTMENTS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDepartment(d.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                department === d.id ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-2 text-xs font-medium text-paper-500">{queue.length} open cases, sorted by priority</p>
            <div className="space-y-2">
              {queue.map((c) => {
                const dept = DEPARTMENTS.find((d) => d.id === c.department)
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`surface flex w-full items-center gap-3 p-3 text-left transition-shadow hover:shadow-lift ${
                      selected?.id === c.id ? 'ring-2 ring-civic-500' : ''
                    }`}
                  >
                    <CategoryIcon categoryId={c.category} size={16} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink dark:text-paper-50">{c.title}</p>
                      <p className="text-xs text-paper-500">{c.id} · {dept?.name}</p>
                    </div>
                    <Stamp label={c.priority} tone={priorityTone(c.priority)} className="!py-0.5" />
                  </button>
                )
              })}
              {queue.length === 0 && (
                <EmptyState icon={CheckCircle2} title="Queue clear" description="No open cases match this filter right now." />
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-paper-500">{selected.id}</p>
                    <h2 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-paper-50">{selected.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Stamp label={selected.status} tone={statusTone(selected.status)} />
                    <Stamp label={selected.priority} tone={priorityTone(selected.priority)} />
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-paper-600 dark:text-paper-300">{selected.description}</p>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-paper-100 pt-4 text-sm dark:border-civic-700">
                  <div>
                    <dt className="flex items-center gap-1 text-xs text-paper-500"><MapPin size={12} /> Location</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">{selected.location.area}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper-500">Category</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">{getCategory(selected.category).label}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1 text-xs text-paper-500"><Users size={12} /> Citizen support</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">{selected.supportCount}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper-500">AI confidence</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">{selected.aiConfidence}%</dd>
                  </div>
                </dl>

                {selected.similarComplaints.length > 0 && (
                  <div className="mt-4 flex items-start gap-2 rounded-[8px] bg-paper-100 p-3 text-xs text-paper-600 dark:bg-civic-700 dark:text-paper-300">
                    <Copy size={14} className="mt-0.5 shrink-0" />
                    Grouped with {selected.similarComplaints.length} similar report(s): {selected.similarComplaints.join(', ')}
                  </div>
                )}

                <div className="mt-6 border-t border-paper-100 pt-5 dark:border-civic-700">
                  <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">Status timeline</h3>
                  <div className="mt-4">
                    <Timeline timeline={selected.timeline} currentStatus={selected.status} />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-paper-100 pt-5 dark:border-civic-700">
                  {selected.status !== 'Resolved' ? (
                    <button onClick={() => advanceComplaintStatus(selected.id)} className="btn-primary">
                      Move to "{STATUS_STEPS[STATUS_STEPS.indexOf(selected.status) + 1]}" <ArrowRight size={15} />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-forest-600">
                      <CheckCircle2 size={16} /> Case resolved
                    </span>
                  )}
                  <Link to={`/track/${selected.id}`} className="btn-outline">
                    View citizen-facing page
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState title="Select a case" description="Choose a complaint from the queue to review it." />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
