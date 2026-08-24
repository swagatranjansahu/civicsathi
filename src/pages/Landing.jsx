import React from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  MapPinned,
  Vote,
  LayoutGrid,
  Languages,
  BrainCircuit,
  Copy,
  Route as RouteIcon,
  ShieldCheck,
  Landmark,
  ArrowRight,
} from 'lucide-react'
import ComplaintCard from '../components/ComplaintCard'
import Stamp from '../components/Stamp'
import { COMPLAINTS, TRANSPARENCY_STATS, CITY_NAME } from '../data/mockData'

const WORKFLOW = [
  { step: 'Report', icon: FileText, text: 'Citizens submit issues via text, voice or image, with location and evidence.' },
  { step: 'Understand', icon: BrainCircuit, text: 'AI reads the complaint, detects category, priority and language.' },
  { step: 'Group', icon: Copy, text: 'Semantic grouping merges reports describing the same underlying issue.' },
  { step: 'Route', icon: RouteIcon, text: 'The complaint is sent to the department actually responsible for it.' },
  { step: 'Track', icon: MapPinned, text: 'Real-time status updates with photo evidence at every stage.' },
  { step: 'Participate', icon: Vote, text: 'Citizens vote on which local projects get funded next.' },
]

const DIFFERENTIATORS = [
  {
    icon: Languages,
    title: 'Report in your own language',
    text: 'Text, voice or a photo — in English, Hindi or Odia. CivicSathi is built for how people actually speak, not just how forms expect them to.',
  },
  {
    icon: BrainCircuit,
    title: 'AI that reads the complaint',
    text: 'Every report is parsed for category, urgency and location context, so nothing sits in a queue waiting for someone to read it manually.',
  },
  {
    icon: Copy,
    title: 'No more duplicate cases',
    text: 'Ten people reporting the same pothole become one grouped case with ten voices behind it — not ten separate files nobody connects.',
  },
  {
    icon: RouteIcon,
    title: 'Sent to the right desk, first time',
    text: 'Complaints are matched to the department actually responsible, instead of bouncing between offices before anyone takes ownership.',
  },
  {
    icon: ShieldCheck,
    title: 'Evidence, not just a status label',
    text: 'Before-and-after photos, timestamps and inspection notes travel with the complaint — proof, not a vague "in progress."',
  },
  {
    icon: Landmark,
    title: 'A say in what gets built next',
    text: 'Citizens vote directly on local project proposals and see exactly how much support each one has before budgets are decided.',
  },
]

const QUICK_ACTIONS = [
  { to: '/report', icon: FileText, title: 'Report an Issue', text: 'Tell us what\u2019s wrong, in your own words.' },
  { to: '/track', icon: MapPinned, title: 'Track a Complaint', text: 'Check the status and evidence on a case.' },
  { to: '/participate', icon: Vote, title: 'Vote on Projects', text: 'Help decide what gets fixed next.' },
  { to: '/map', icon: LayoutGrid, title: 'View Community Issues', text: 'See what\u2019s been reported nearby.' },
]

export default function Landing() {
  const recent = COMPLAINTS.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-paper-200 bg-paper-50 dark:border-civic-700 dark:bg-civic-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(31,74,78,0.06) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(31,74,78,0.06) 28px)',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-rise-in">
              <span className="stamp border-civic-400 text-civic-600 dark:border-civic-300 dark:text-civic-200">
                <span className="stamp-dot bg-civic-500" /> SIH 2026 · SOAIDEATHON-S36
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink dark:text-paper-50 sm:text-5xl">
                Tell us what&rsquo;s wrong.
                <br />
                We&rsquo;ll help get it to the right place.
              </h1>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-paper-600 dark:text-paper-300">
                CivicSathi is an AI-assisted civic grievance platform for {CITY_NAME}. Report issues the way you'd
                describe them to a neighbour, track resolutions with real evidence, and vote on which local
                projects deserve funding.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/report" className="btn-accent !px-5 !py-3 text-[15px]">
                  Report an Issue <ArrowRight size={16} />
                </Link>
                <Link to="/track" className="btn-outline !px-5 !py-3 text-[15px]">
                  Track a Complaint
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-paper-500 dark:text-paper-400">
                <span><strong className="text-ink dark:text-paper-100">{TRANSPARENCY_STATS.totalComplaints.toLocaleString('en-IN')}</strong> complaints reported</span>
                <span><strong className="text-ink dark:text-paper-100">{TRANSPARENCY_STATS.resolved.toLocaleString('en-IN')}</strong> resolved</span>
                <span><strong className="text-ink dark:text-paper-100">{TRANSPARENCY_STATS.avgResponseDays}d</strong> avg. response</span>
              </div>
            </div>

            <div className="animate-rise-in [animation-delay:150ms]">
              <div className="surface mx-auto max-w-sm p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-paper-500">CIV-2041 · Analysis</span>
                  <Stamp label="AI Verified" tone="progress" />
                </div>
                <p className="mt-3 text-sm text-ink dark:text-paper-100">
                  "Large pothole near the main road junction, close to the pedestrian crossing."
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-paper-200 pt-4 text-xs dark:border-civic-700">
                  <div>
                    <dt className="text-paper-500">Category</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">Road Infrastructure</dd>
                  </div>
                  <div>
                    <dt className="text-paper-500">Priority</dt>
                    <dd className="mt-0.5 font-medium text-brick-500">High</dd>
                  </div>
                  <div>
                    <dt className="text-paper-500">Department</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">Public Works</dd>
                  </div>
                  <div>
                    <dt className="text-paper-500">Similar reports</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">3 grouped as CIV-204</dd>
                  </div>
                </dl>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-200 dark:bg-civic-700">
                  <div className="h-full w-[94%] rounded-full bg-marigold-500" />
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-paper-500">94% confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="eyebrow">How a complaint moves</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50 sm:text-3xl">
          Six steps, from a photo on your phone to a completed repair.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {WORKFLOW.map((w, i) => (
            <div key={w.step} className="relative">
              <div className="surface flex h-full flex-col gap-3 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-civic-700 font-mono text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <w.icon size={18} className="text-civic-600 dark:text-civic-300" />
                </div>
                <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">{w.step}</h3>
                <p className="text-xs leading-relaxed text-paper-600 dark:text-paper-300">{w.text}</p>
              </div>
              {i < WORKFLOW.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-paper-300 lg:block">›</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-y border-paper-200 bg-white py-16 dark:border-civic-700 dark:bg-civic-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">What makes it different</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50 sm:text-3xl">
            Built around the six things that actually slow grievance systems down.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="rounded-card border border-paper-200 p-5 dark:border-civic-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-marigold-400">
                  <d.icon size={19} />
                </span>
                <h3 className="mt-3 font-display text-[15px] font-semibold text-ink dark:text-paper-50">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-600 dark:text-paper-300">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="surface group flex flex-col gap-3 p-5 transition-shadow hover:shadow-lift"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-marigold-50 text-marigold-600">
                <a.icon size={19} />
              </span>
              <h3 className="font-display text-[15px] font-semibold text-ink dark:text-paper-50">{a.title}</h3>
              <p className="text-sm text-paper-600 dark:text-paper-300">{a.text}</p>
              <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-civic-600 group-hover:gap-2 dark:text-marigold-400">
                Go <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="border-t border-paper-200 bg-white py-16 dark:border-civic-700 dark:bg-civic-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">From {CITY_NAME}, this week</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">Recently reported</h2>
            </div>
            <Link to="/track" className="hidden text-sm font-semibold text-civic-600 hover:underline dark:text-marigold-400 sm:block">
              View all
            </Link>
          </div>
          <div className="mt-8 space-y-3">
            {recent.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
