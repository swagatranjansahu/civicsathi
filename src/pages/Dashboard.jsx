import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, Clock, ListChecks, Bell, MapPin, ArrowRight, BellOff } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ComplaintCard from '../components/ComplaintCard'
import EmptyState from '../components/EmptyState'
import { useApp } from '../context/AppContext'

const STAT_ICONS = {
  active: ListChecks,
  resolved: CheckCircle2,
  pending: Clock,
  high: AlertTriangle,
}

export default function Dashboard() {
  const { complaints, notifications, markNotificationsRead, projects, user } = useApp()

  const mine = useMemo(
    () => complaints.filter((c) => c.mine || c.reporter === 'You'),
    [complaints],
  )
  const nearby = useMemo(
    () => complaints.filter((c) => !c.mine && c.reporter !== 'You').slice(0, 4),
    [complaints],
  )

  const stats = {
    active: mine.filter((c) => c.status !== 'Resolved').length,
    resolved: mine.filter((c) => c.status === 'Resolved').length,
    pending: mine.filter((c) => c.status === 'Submitted' || c.status === 'AI Verified').length,
    high: mine.filter((c) => c.priority === 'High' && c.status !== 'Resolved').length,
  }

  const topProjects = [...projects].sort((a, b) => b.votes - a.votes).slice(0, 2)

  return (
    <div>
      <PageHeader
        eyebrow="Citizen dashboard"
        title={user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Your civic activity'}
        description="Everything you've reported, how it's progressing, and what's happening around you."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { key: 'active', label: 'Active complaints', tone: 'text-civic-600' },
            { key: 'resolved', label: 'Resolved', tone: 'text-forest-500' },
            { key: 'pending', label: 'Pending review', tone: 'text-marigold-600' },
            { key: 'high', label: 'High priority', tone: 'text-brick-500' },
          ].map(({ key, label, tone }) => {
            const Icon = STAT_ICONS[key]
            return (
              <div key={key} className="surface p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-paper-500">{label}</span>
                  <Icon size={16} className={tone} />
                </div>
                <p className={`mt-2 font-display text-3xl font-semibold ${tone}`}>{stats[key]}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-ink dark:text-paper-50">Your complaints</h2>
                <Link to="/report" className="text-sm font-semibold text-civic-600 hover:underline dark:text-marigold-400">
                  + Report new
                </Link>
              </div>
              {mine.length > 0 ? (
                <div className="space-y-3">
                  {mine.map((c) => (
                    <ComplaintCard key={c.id} complaint={c} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="You haven't reported anything yet"
                  description="Once you report an issue, you'll be able to track its progress here."
                  action={<Link to="/report" className="btn-primary mt-2">Report an issue</Link>}
                />
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-ink dark:text-paper-50">Nearby civic issues</h2>
                <Link to="/map" className="text-sm font-semibold text-civic-600 hover:underline dark:text-marigold-400">
                  View map
                </Link>
              </div>
              <div className="space-y-3">
                {nearby.map((c) => (
                  <ComplaintCard key={c.id} complaint={c} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-1.5 font-display text-base font-semibold text-ink dark:text-paper-50">
                  <Bell size={16} /> Notifications
                </h2>
                {notifications.some((n) => !n.read) && (
                  <button onClick={markNotificationsRead} className="text-xs font-semibold text-civic-600 hover:underline dark:text-marigold-400">
                    Mark all read
                  </button>
                )}
              </div>
              <ul className="mt-3 space-y-3">
                {notifications.map((n) => (
                  <li key={n.id} className="flex gap-2.5 border-b border-paper-100 pb-3 last:border-0 last:pb-0 dark:border-civic-700">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? 'bg-paper-300 dark:bg-civic-600' : 'bg-marigold-500'}`} />
                    <div>
                      <p className={`text-sm ${n.read ? 'text-paper-600 dark:text-paper-300' : 'text-ink dark:text-paper-50 font-medium'}`}>
                        {n.message}
                      </p>
                      <p className="mt-0.5 text-xs text-paper-400">{n.time}</p>
                    </div>
                  </li>
                ))}
                {notifications.length === 0 && (
                  <li className="flex flex-col items-center gap-2 py-6 text-center text-paper-400">
                    <BellOff size={18} />
                    <span className="text-xs">No notifications yet</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="surface p-5">
              <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Community voting activity</h2>
              <div className="mt-3 space-y-4">
                {topProjects.map((p) => (
                  <div key={p.id}>
                    <p className="text-sm font-medium text-ink dark:text-paper-100">{p.name}</p>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-paper-200 dark:bg-civic-700">
                      <div className="h-full rounded-full bg-marigold-500" style={{ width: `${p.supportPercentage}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-paper-500">{p.supportPercentage}% support · {p.votes} votes</p>
                  </div>
                ))}
              </div>
              <Link to="/participate" className="mt-4 flex items-center gap-1 text-sm font-semibold text-civic-600 hover:underline dark:text-marigold-400">
                Vote on projects <ArrowRight size={13} />
              </Link>
            </div>

            <div className="surface flex items-start gap-2.5 p-5 text-sm text-paper-600 dark:text-paper-300">
              <MapPin size={16} className="mt-0.5 shrink-0 text-civic-500" />
              Showing activity for Basantnagar. Ward-level personalization isn't wired up in this prototype.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
