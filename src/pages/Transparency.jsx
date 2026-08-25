import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from 'recharts'
import { CheckCircle2, Clock, FileText, Timer } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { TRANSPARENCY_STATS } from '../data/mockData'

function Card({ icon: Icon, label, value, tone }) {
  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-paper-500">{label}</span>
        <Icon size={16} className={tone} />
      </div>
      <p className={`mt-2 font-display text-3xl font-semibold ${tone}`}>{value}</p>
    </div>
  )
}

export default function Transparency() {
  const s = TRANSPARENCY_STATS

  return (
    <div>
      <PageHeader
        eyebrow="Public transparency"
        title="How India is responding"
        description="City-wide numbers on how complaints are reported, resolved and handled by department — updated as cases move through the system."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={FileText} label="Total complaints" value={s.totalComplaints.toLocaleString('en-IN')} tone="text-civic-600" />
          <Card icon={CheckCircle2} label="Resolved" value={s.resolved.toLocaleString('en-IN')} tone="text-forest-500" />
          <Card icon={Clock} label="Pending" value={s.pending.toLocaleString('en-IN')} tone="text-marigold-600" />
          <Card icon={Timer} label="Avg. response" value={`${s.avgResponseDays} days`} tone="text-brick-500" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="surface p-5">
            <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Reported vs. resolved, last 6 months</h2>
            <p className="mt-1 text-xs text-paper-500">Monthly volume across all departments.</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={s.monthly} margin={{ left: -20, right: 10, top: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E6DD" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8A8677" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#8A8677" />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="reported" name="Reported" stroke="#1F4A4E" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#DD8623" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface p-5">
            <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Most reported categories</h2>
            <p className="mt-1 text-xs text-paper-500">Total complaints filed by category, all time.</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={s.byCategory} layout="vertical" margin={{ left: 10, right: 20, top: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E6DD" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="#8A8677" />
                  <YAxis dataKey="category" type="category" width={130} tick={{ fontSize: 11 }} stroke="#8A8677" />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="surface mt-6 overflow-hidden p-5">
          <h2 className="font-display text-base font-semibold text-ink dark:text-paper-50">Department performance</h2>
          <p className="mt-1 text-xs text-paper-500">Average response time and resolution rate, by department.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-paper-200 text-xs text-paper-500 dark:border-civic-700">
                  <th className="pb-2 font-medium">Department</th>
                  <th className="pb-2 font-medium">Avg. response</th>
                  <th className="pb-2 font-medium">Resolution rate</th>
                </tr>
              </thead>
              <tbody>
                {s.departmentPerformance.map((d) => (
                  <tr key={d.department} className="border-b border-paper-100 last:border-0 dark:border-civic-700">
                    <td className="py-2.5 font-medium text-ink dark:text-paper-100">{d.department}</td>
                    <td className="py-2.5 text-paper-600 dark:text-paper-300">{d.avgDays} days</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-paper-200 dark:bg-civic-700">
                          <div className="h-full rounded-full bg-forest-500" style={{ width: `${d.resolvedRate}%` }} />
                        </div>
                        <span className="text-xs text-paper-500">{d.resolvedRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-paper-500">
          Figures shown are illustrative prototype data for demonstration purposes.
        </p>
      </div>
    </div>
  )
}
