import React from 'react'
import {
  Users,
  Server,
  BrainCircuit,
  Database,
  ArrowRight,
  CheckCircle,
  Github,
  PlayCircle,
  Globe2,
  BookOpen,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'

const ARCHITECTURE = [
  { label: 'Citizen', sub: 'Web / Mobile', icon: Users },
  { label: 'API Gateway', sub: '', icon: Server },
  { label: 'Application Server', sub: 'Node.js / Express', icon: Server },
  { label: 'AI / NLP Engine', sub: 'Python, spaCy, HF models', icon: BrainCircuit },
  { label: 'Database & Storage', sub: 'PostgreSQL / MongoDB', icon: Database },
]

const DATA_FLOW = ['Input', 'Process', 'Analyze', 'Route', 'Store', 'Update']

const TECH_GROUPS = [
  { label: 'Frontend', items: ['React.js', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express.js'] },
  { label: 'Database', items: ['PostgreSQL', 'MongoDB'] },
  { label: 'AI / NLP', items: ['Python', 'spaCy', 'Hugging Face models'] },
  { label: 'Image processing', items: ['OpenCV'] },
  { label: 'Maps & location', items: ['Google Maps API'] },
  { label: 'Authentication', items: ['Firebase Auth', 'JWT'] },
  { label: 'Cloud & storage', items: ['Firebase', 'AWS S3'] },
]

const CHALLENGES = [
  { challenge: 'Language & dialect diversity', mitigation: 'Multilingual NLP with translation support' },
  { challenge: 'Duplicate / spam complaints', mitigation: 'Semantic similarity and clustering' },
  { challenge: 'Correct department routing', mitigation: 'AI + rule-based routing' },
  { challenge: 'Sensitive citizen information', mitigation: 'Anonymization and role-based access' },
  { challenge: 'Varying complaint formats', mitigation: 'Standardized complaint structure' },
]

const WHY_VIABLE = [
  { label: 'Scalable', text: 'Handles a growing volume of complaints as more wards come online.' },
  { label: 'Cost-effective', text: 'Optimizes department time and manual triage effort.' },
  { label: 'Secure', text: 'Designed around data privacy and role-based access from the start.' },
  { label: 'Citizen-centric', text: 'Faster resolution and clearer communication, end to end.' },
]

const IMPACT = [
  { label: 'Social Impact', text: 'Faster response and stronger citizen trust.' },
  { label: 'Governance Impact', text: 'Transparent tracking improves accountability.' },
  { label: 'Economic Impact', text: 'Less duplicate work and better resource use.' },
  { label: 'Data Impact', text: 'Recurring complaints become planning insights.' },
  { label: 'Participation Impact', text: 'Citizens help prioritize public projects.' },
]

const IMPACT_CHAIN = ['Empowered Citizens', 'Efficient Governance', 'Better Public Services', 'Sustainable Communities', 'Stronger Nation']

const REFERENCES = [
  { title: 'Multilingual NLP', text: 'Supports multilingual text and voice understanding for citizen complaints.' },
  { title: 'Semantic similarity & duplicate detection', text: 'Groups complaints describing the same underlying civic issue.' },
  { title: 'Participatory budgeting', text: 'Research supports citizen participation, transparency and local priority setting.' },
]

const GOV_SYSTEMS = [
  { title: 'CPGRAMS — Government of India', text: '24×7 grievance registration, tracking, departmental routing and appeals; a key reference for CivicSathi.' },
  { title: 'Open Government / Civic Data', text: 'Supports civic categories, locations and evidence-based prioritization.' },
]

export default function HowItWorks() {
  return (
    <div>
      <PageHeader
        eyebrow="How it works"
        title="The approach behind CivicSathi"
        description="System architecture, technology choices, feasibility, and the impact this platform is designed to have — as proposed for Smart India Hackathon 2026."
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        {/* Architecture */}
        <section>
          <p className="eyebrow">System architecture</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">From a citizen's report to stored, actionable data</h2>
          <div className="surface mt-6 overflow-x-auto p-6">
            <div className="flex min-w-[720px] items-center justify-between gap-2">
              {ARCHITECTURE.map((a, i) => (
                <React.Fragment key={a.label}>
                  <div className="flex flex-1 flex-col items-center gap-2 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-marigold-400">
                      <a.icon size={20} />
                    </span>
                    <p className="text-sm font-semibold text-ink dark:text-paper-50">{a.label}</p>
                    {a.sub && <p className="text-[11px] text-paper-500">{a.sub}</p>}
                  </div>
                  {i < ARCHITECTURE.length - 1 && <ArrowRight size={18} className="shrink-0 text-paper-300" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="surface mt-4 p-6">
            <p className="mb-4 text-xs font-medium text-paper-500">Key data flow</p>
            <div className="flex flex-wrap items-center gap-2">
              {DATA_FLOW.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="rounded-[6px] bg-paper-100 px-3 py-1.5 font-mono text-xs font-medium text-civic-700 dark:bg-civic-700 dark:text-paper-100">
                    {step}
                  </span>
                  {i < DATA_FLOW.length - 1 && <ArrowRight size={14} className="text-paper-300" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section>
          <p className="eyebrow">Technologies</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">The intended production stack</h2>
          <p className="mt-2 max-w-2xl text-sm text-paper-600 dark:text-paper-300">
            This prototype is a frontend-only demonstration built with React and Tailwind CSS. The list below is the
            full stack proposed for a production CivicSathi deployment, with the AI pipeline shown here simulated
            rather than live.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_GROUPS.map((g) => (
              <div key={g.label} className="rounded-card border border-paper-200 p-4 dark:border-civic-700">
                <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">{g.label}</h3>
                <ul className="mt-2 space-y-1">
                  {g.items.map((item) => (
                    <li key={item} className="text-xs text-paper-600 dark:text-paper-300">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Feasibility */}
        <section>
          <p className="eyebrow">Feasibility & viability</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">Known challenges, and how the design responds</h2>
          <div className="surface mt-6 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-paper-200 bg-paper-50 text-xs text-paper-500 dark:border-civic-700 dark:bg-civic-800">
                  <th className="px-4 py-3 font-medium">Key challenge</th>
                  <th className="px-4 py-3 font-medium">Mitigation strategy</th>
                </tr>
              </thead>
              <tbody>
                {CHALLENGES.map((c) => (
                  <tr key={c.challenge} className="border-b border-paper-100 last:border-0 dark:border-civic-700">
                    <td className="px-4 py-3 text-ink dark:text-paper-100">{c.challenge}</td>
                    <td className="px-4 py-3 text-paper-600 dark:text-paper-300">{c.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_VIABLE.map((w) => (
              <div key={w.label} className="rounded-card border border-paper-200 p-4 dark:border-civic-700">
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-forest-500" />
                  <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">{w.label}</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-paper-600 dark:text-paper-300">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section>
          <p className="eyebrow">Impact & benefits</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">Why this matters beyond the app itself</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {IMPACT.map((im) => (
              <div key={im.label} className="rounded-card border border-paper-200 p-4 dark:border-civic-700">
                <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">{im.label}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-paper-600 dark:text-paper-300">{im.text}</p>
              </div>
            ))}
          </div>
          <div className="surface mt-6 overflow-x-auto p-6">
            <div className="flex min-w-[640px] items-center justify-between gap-2">
              {IMPACT_CHAIN.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="whitespace-nowrap text-center font-display text-sm font-semibold text-civic-700 dark:text-paper-100">
                    {step}
                  </span>
                  {i < IMPACT_CHAIN.length - 1 && <ArrowRight size={16} className="shrink-0 text-marigold-500" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Research & references */}
        <section>
          <p className="eyebrow">Research & references</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper-50">Grounded in existing research and systems</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="surface p-5">
              <h3 className="flex items-center gap-1.5 font-display text-sm font-semibold text-ink dark:text-paper-50">
                <BookOpen size={15} /> Academic / technical references
              </h3>
              <ul className="mt-3 space-y-3">
                {REFERENCES.map((r) => (
                  <li key={r.title} className="border-b border-paper-100 pb-3 last:border-0 last:pb-0 dark:border-civic-700">
                    <p className="text-sm font-medium text-ink dark:text-paper-100">{r.title}</p>
                    <p className="mt-0.5 text-xs text-paper-600 dark:text-paper-300">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface p-5">
              <h3 className="font-display text-sm font-semibold text-ink dark:text-paper-50">Government / existing systems</h3>
              <ul className="mt-3 space-y-3">
                {GOV_SYSTEMS.map((r) => (
                  <li key={r.title} className="border-b border-paper-100 pb-3 last:border-0 last:pb-0 dark:border-civic-700">
                    <p className="text-sm font-medium text-ink dark:text-paper-100">{r.title}</p>
                    <p className="mt-0.5 text-xs text-paper-600 dark:text-paper-300">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="surface mt-4 flex flex-wrap gap-6 p-5 text-sm text-paper-600 dark:text-paper-300">
            <span className="flex items-center gap-2"><Github size={15} /> GitHub repository — placeholder for this submission</span>
            <span className="flex items-center gap-2"><PlayCircle size={15} /> Demo video — placeholder for this submission</span>
            <span className="flex items-center gap-2"><Globe2 size={15} /> Project website — placeholder for this submission</span>
          </div>
        </section>
      </div>
    </div>
  )
}
