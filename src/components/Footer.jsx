import React from 'react'
import { Link } from 'react-router-dom'
import { Github, PlayCircle, Globe2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-paper-200 bg-white dark:border-civic-700 dark:bg-civic-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Left Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-civic-700 font-display text-sm font-semibold text-white">
                C
              </span>

              <span className="font-display text-base font-semibold text-civic-800 dark:text-paper-50">
                CivicSathi
              </span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-600 dark:text-paper-300">
              Built for Smart India Hackathon 2026 — Problem Statement
              SOAIDEATHON-S36, "Evidence-Grounded Civic Grievance Triage and
              Participatory Budgeting Platform." This is a demonstration
              prototype. Complaints submitted through this website are for
              showcase purposes only and are not routed to any government
              department.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="eyebrow">Explore</h3>

            <ul className="mt-3 space-y-2 text-sm text-paper-600 dark:text-paper-300">
              <li>
                <Link
                  to="/report"
                  className="hover:text-civic-700 dark:hover:text-paper-50"
                >
                  Report an Issue
                </Link>
              </li>

              <li>
                <Link
                  to="/track"
                  className="hover:text-civic-700 dark:hover:text-paper-50"
                >
                  Track a Complaint
                </Link>
              </li>

              <li>
                <Link
                  to="/participate"
                  className="hover:text-civic-700 dark:hover:text-paper-50"
                >
                  Participate
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-civic-700 dark:hover:text-paper-50"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="eyebrow">Project Links</h3>

            <ul className="mt-3 space-y-2 text-sm text-paper-600 dark:text-paper-300">

              <li className="flex items-center gap-2">
                <Github size={14} />
                GitHub Repository — Placeholder
              </li>

              <li className="flex items-center gap-2">
                <PlayCircle size={14} />
                Demo Video — Placeholder
              </li>

              <li className="flex items-center gap-2">
                <Globe2 size={14} />
                Project Website — Placeholder
              </li>

            </ul>

            {/* Developer Credit */}
            <div className="mt-6 border-t border-paper-200 pt-4 dark:border-civic-700">

              <p className="text-xs uppercase tracking-widest text-paper-500 dark:text-paper-400">
                Designed & Developed By
              </p>

              <a
                href="https://github.com/swagatranjansahu"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-medium text-civic-800 transition-colors hover:text-civic-700 dark:text-paper-100"
              >
                <Github size={16} />
                Swagat Ranjan Sahu
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col gap-2 border-t border-paper-200 pt-6 text-xs text-paper-500 dark:border-civic-700 sm:flex-row sm:items-center sm:justify-between">

          <span>
            © 2026 CivicSathi. Smart India Hackathon Prototype.
          </span>

          <span>
            Report → Understand → Group → Route → Track → Participate
          </span>

        </div>

      </div>
    </footer>
  )
}