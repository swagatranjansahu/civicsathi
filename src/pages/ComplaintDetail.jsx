import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Users, ThumbsUp, ImageOff, Image as ImageIcon, ArrowLeft } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Timeline from '../components/Timeline'
import Stamp, { statusTone, priorityTone } from '../components/Stamp'
import CategoryIcon, { getCategory } from '../components/CategoryIcon'
import EmptyState from '../components/EmptyState'
import { DEPARTMENTS } from '../data/mockData'
import { useApp } from '../context/AppContext'

function EvidenceSlot({ label, value }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-paper-500">{label}</p>
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[8px] border border-paper-200 bg-paper-100 dark:border-civic-700 dark:bg-civic-800">
        {value && value !== 'uploaded' ? (
          <img src={value} alt={`${label} evidence`} className="h-full w-full object-cover" loading="lazy" />
        ) : value === 'uploaded' ? (
          <div className="flex flex-col items-center gap-1.5 text-paper-400">
            <ImageIcon size={20} />
            <span className="text-[11px]">Photo attached at submission</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-paper-300 dark:text-civic-600">
            <ImageOff size={20} />
            <span className="text-[11px]">Not yet available</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ComplaintDetail() {
  const { id } = useParams()
  const { complaints, supportComplaint, pushToast } = useApp()
  const complaint = complaints.find((c) => c.id === id)

  if (!complaint) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title={`We couldn't find complaint ${id}`}
          description="Double-check the complaint ID, or search from the tracking page."
          action={
            <Link to="/track" className="btn-primary mt-2">
              <ArrowLeft size={15} /> Back to tracking
            </Link>
          }
        />
      </div>
    )
  }

  const dept = DEPARTMENTS.find((d) => d.id === complaint.department)
  const category = getCategory(complaint.category)

  function handleSupport() {
    supportComplaint(complaint.id)
    pushToast('Added your support to this complaint.', 'success')
  }

  return (
    <div>
      <PageHeader eyebrow={complaint.id} title={complaint.title}>
        <div className="mt-4 flex flex-wrap gap-2">
          <Stamp label={complaint.status} tone={statusTone(complaint.status)} pulse={complaint.status === 'Work in Progress'} />
          <Stamp label={`${complaint.priority} priority`} tone={priorityTone(complaint.priority)} />
          {complaint.duplicateGroup && <Stamp label={`Group ${complaint.duplicateGroup}`} tone="neutral" />}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="surface p-6">
              <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Description</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper-600 dark:text-paper-300">{complaint.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-paper-100 pt-5 text-sm dark:border-civic-700">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-paper-500"><CategoryIcon categoryId={complaint.category} size={12} className="!p-0" /> Category</dt>
                  <dd className="mt-1 font-medium text-ink dark:text-paper-100">{category.label}</dd>
                </div>
                <div>
                  <dt className="text-xs text-paper-500">Department</dt>
                  <dd className="mt-1 font-medium text-ink dark:text-paper-100">{dept?.name}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-paper-500"><MapPin size={12} /> Location</dt>
                  <dd className="mt-1 font-medium text-ink dark:text-paper-100">{complaint.location.area}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-paper-500"><Calendar size={12} /> Submitted</dt>
                  <dd className="mt-1 font-medium text-ink dark:text-paper-100">{complaint.submittedDate}</dd>
                </div>
              </dl>
            </div>

            <div className="surface p-6">
              <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Evidence</h2>
              <p className="mt-1 text-xs text-paper-500">Photos travel with the case at every stage — not just a status label.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <EvidenceSlot label="Before" value={complaint.evidence.before} />
                <EvidenceSlot label="In progress" value={complaint.evidence.progress} />
                <EvidenceSlot label="Resolution" value={complaint.evidence.resolution} />
              </div>
            </div>

            {complaint.similarComplaints.length > 0 && (
              <div className="surface p-6">
                <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Similar reports in this group</h2>
                <ul className="mt-3 space-y-2">
                  {complaint.similarComplaints.map((sid) => (
                    <li key={sid}>
                      <Link to={`/track/${sid}`} className="flex items-center justify-between rounded-[8px] border border-paper-200 px-3 py-2 text-sm hover:border-civic-400 dark:border-civic-700">
                        <span className="text-ink dark:text-paper-100">{sid}</span>
                        <span className="text-xs text-civic-600 dark:text-marigold-400">View →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="surface p-6">
              <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Status timeline</h2>
              <div className="mt-5">
                <Timeline timeline={complaint.timeline} currentStatus={complaint.status} />
              </div>
            </div>

            <div className="surface p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-paper-600 dark:text-paper-300">
                  <Users size={15} /> {complaint.supportCount} citizens support this
                </span>
              </div>
              <button onClick={handleSupport} className="btn-outline mt-3 w-full">
                <ThumbsUp size={14} /> I have this issue too
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
