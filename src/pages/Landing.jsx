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

import { useApp } from '../context/AppContext' // Use context hook
import ComplaintCard from '../components/ComplaintCard'
import Stamp from '../components/Stamp'
import translations from '../data/translations'

import {
  COMPLAINTS,
  TRANSPARENCY_STATS,
  DEPARTMENTS,
  CATEGORIES,
  LANGUAGES,
  CITY_NAME,
} from '../data/mockData'

export default function Landing() {
  // Grab language directly from AppContext
  const { language } = useApp()
  const t = translations[language] || translations.en

  const WORKFLOW = [
    { step: t.reportStep, icon: FileText, text: t.reportText },
    { step: t.understandStep, icon: BrainCircuit, text: t.understandText },
    { step: t.groupStep, icon: Copy, text: t.groupText },
    { step: t.routeStep, icon: RouteIcon, text: t.routeText },
    { step: t.trackStep, icon: MapPinned, text: t.trackText },
    { step: t.participateStep, icon: Vote, text: t.participateText },
  ]

  const DIFFERENTIATORS = [
    { icon: Languages, title: t.ownLanguage, text: t.ownLanguageText },
    { icon: BrainCircuit, title: t.aiReads, text: t.aiReadsText },
    { icon: Copy, title: t.noDuplicates, text: t.noDuplicatesText },
    { icon: RouteIcon, title: t.rightDesk, text: t.rightDeskText },
    { icon: ShieldCheck, title: t.evidence, text: t.evidenceText },
    { icon: Landmark, title: t.voteProjects, text: t.voteProjectsText },
  ]

  const QUICK_ACTIONS = [
    { to: '/report', icon: FileText, title: t.reportIssue, text: t.quickReport },
    { to: '/track', icon: MapPinned, title: t.trackComplaint, text: t.quickTrack },
    { to: '/participate', icon: Vote, title: t.participate, text: t.quickParticipate },
    { to: '/map', icon: LayoutGrid, title: t.map, text: t.quickMap },
  ]

  const featured = COMPLAINTS[0]
  const featuredDepartment = DEPARTMENTS.find(
    (department) => department.id === featured.department
  )
  const featuredCategory = CATEGORIES.find(
    (category) => category.id === featured.category
  )
  const recent = COMPLAINTS.slice(0, 3)

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-paper-200 bg-paper-50 dark:border-civic-700 dark:bg-civic-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(31,74,78,0.06) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(31,74,78,0.06) 28px)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="animate-rise-in">
              <span className="stamp border-civic-400 text-civic-600 dark:border-civic-300 dark:text-civic-200">
                <span className="stamp-dot bg-civic-500" />
                SIH 2026 · SOAIDEATHON-S36
              </span>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink dark:text-paper-50 sm:text-5xl">
                {t.heroTitle1}
                <br />
                {t.heroTitle2}
              </h1>

              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-paper-600 dark:text-paper-300">
                {t.heroDescription}
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/report"
                  className="btn-accent !px-5 !py-3 text-[15px]"
                >
                  {t.reportIssue}
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/track"
                  className="btn-outline !px-5 !py-3 text-[15px]"
                >
                  {t.trackComplaint}
                </Link>
              </div>

              {/* STATISTICS */}
              <div className="mt-10 grid grid-cols-2 gap-6 font-mono text-xs sm:grid-cols-4">
                <div>
                  <p className="text-3xl font-bold text-civic-700 dark:text-civic-300">
                    {TRANSPARENCY_STATS.totalComplaints}
                  </p>
                  <p className="text-paper-500">{t.complaints}</p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-civic-700 dark:text-civic-300">
                    {DEPARTMENTS.length}
                  </p>
                  <p className="text-paper-500">{t.departments}</p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-civic-700 dark:text-civic-300">
                    {CATEGORIES.length}
                  </p>
                  <p className="text-paper-500">{t.categories}</p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-civic-700 dark:text-civic-300">
                    {LANGUAGES.length}
                  </p>
                  <p className="text-paper-500">{t.languages}</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FEATURED CARD */}
            <div className="animate-rise-in [animation-delay:150ms]">
              <div className="surface mx-auto max-w-sm p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-paper-500">
                    {featured.id} · AI Analysis
                  </span>
                  <Stamp label="AI Verified" tone="progress" />
                </div>

                <h3 className="mt-3 text-lg font-semibold text-ink dark:text-paper-50">
                  {featured.title}
                </h3>

                <p className="mt-2 text-sm text-ink dark:text-paper-100">
                  {featured.description}
                </p>

                <p className="mt-2 text-xs text-paper-500">
                  📍 {featured.location.area}
                </p>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-paper-200 pt-4 text-xs dark:border-civic-700">
                  <div>
                    <dt className="text-paper-500">{t.categories}</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">
                      {featuredCategory?.label || 'Unknown'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-paper-500">Priority</dt>
                    <dd className="mt-0.5 font-medium text-brick-500">
                      {featured.priority}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-paper-500">{t.departments}</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">
                      {featuredDepartment?.name || 'Not assigned'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-paper-500">Citizen Support</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-paper-100">
                      {featured.supportCount} citizens
                    </dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-200 dark:bg-civic-700">
                    <div
                      className="h-full rounded-full bg-marigold-500"
                      style={{ width: `${featured.aiConfidence}%` }}
                    />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-paper-500">
                    {featured.aiConfidence}% AI Confidence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="eyebrow">{t.howItWorks}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50 sm:text-3xl">
          {t.workflowTitle}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {WORKFLOW.map((workflow, index) => {
            const Icon = workflow.icon
            return (
              <div key={workflow.step} className="relative">
                <div className="surface flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-civic-700 font-mono text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <Icon
                      size={18}
                      className="text-civic-600 dark:text-civic-300"
                    />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">
                    {workflow.step}
                  </h3>
                  <p className="text-xs leading-relaxed text-paper-600 dark:text-paper-300">
                    {workflow.text}
                  </p>
                </div>
                {index < WORKFLOW.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-paper-300 lg:block">
                    ›
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="border-y border-paper-200 bg-white py-16 dark:border-civic-700 dark:bg-civic-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">{t.whatMakesDifferent}</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-card border border-paper-200 p-5 dark:border-civic-700"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-marigold-400">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-semibold text-ink dark:text-paper-50">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper-600 dark:text-paper-300">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.to}
                to={action.to}
                className="surface group flex flex-col gap-3 p-5 transition-shadow hover:shadow-lift"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-marigold-50 text-marigold-600">
                  <Icon size={19} />
                </span>
                <h3 className="font-display text-[15px] font-semibold text-ink dark:text-paper-50">
                  {action.title}
                </h3>
                <p className="text-sm text-paper-600 dark:text-paper-300">
                  {action.text}
                </p>
                <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-civic-600 group-hover:gap-2 dark:text-marigold-400">
                  {t.go}
                  <ArrowRight size={13} />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="border-t border-paper-200 bg-white py-16 dark:border-civic-700 dark:bg-civic-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">From {CITY_NAME}, this week</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">
                {t.recentlyReported}
              </h2>
            </div>

            <Link
              to="/track"
              className="hidden text-sm font-semibold text-civic-600 hover:underline dark:text-marigold-400 sm:block"
            >
              {t.viewAll}
            </Link>
          </div>

          <div className="mt-8 space-y-3">
            {recent.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}