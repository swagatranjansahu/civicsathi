import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, Globe, Bell, LogOut, LayoutDashboard } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LANGUAGES } from '../data/mockData'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/report', label: 'Report an Issue' },
  { to: '/track', label: 'Track a Complaint' },
  { to: '/map', label: 'Community Map' },
  { to: '/participate', label: 'Participate' },
  { to: '/transparency', label: 'Transparency' },
  { to: '/how-it-works', label: 'How It Works' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { theme, setTheme, language, setLanguage, user, logout, notifications } = useApp()
  const navigate = useNavigate()
  const unread = notifications.filter((n) => !n.read).length
  const currentLang = LANGUAGES.find((l) => l.code === language)

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200 bg-paper-50/95 backdrop-blur dark:border-civic-700 dark:bg-civic-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-civic-700 font-display text-base font-semibold text-white">
            C
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-civic-800 dark:text-paper-50">
            CivicSathi
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-[6px] px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-civic-700 dark:text-marigold-400'
                    : 'text-civic-600/80 hover:text-civic-700 dark:text-paper-300 dark:hover:text-paper-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="btn-ghost !px-2.5 !py-2"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Choose language"
            >
              <Globe size={17} />
              <span className="font-mono text-xs">{currentLang?.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="surface absolute right-0 mt-2 w-40 overflow-hidden py-1"
              >
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={language === l.code}
                      onClick={() => {
                        setLanguage(l.code)
                        setLangOpen(false)
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-paper-100 dark:hover:bg-civic-700 ${
                        language === l.code ? 'text-marigold-600 font-semibold' : ''
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-paper-500">{l.native}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="btn-ghost !px-2.5 !py-2"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {user ? (
            <>
              <Link to="/dashboard" className="btn-ghost !px-2.5 !py-2 relative" aria-label="Dashboard">
                <Bell size={17} />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brick-500 text-[9px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </Link>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="btn-ghost !px-2.5 !py-2"
                aria-label="Dashboard"
              >
                <LayoutDashboard size={17} />
              </Link>
              <button onClick={() => { logout(); navigate('/') }} className="btn-outline !px-3 !py-2">
                <LogOut size={15} /> Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Sign in
            </Link>
          )}
        </div>

        <button className="lg:hidden btn-ghost !px-2 !py-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-200 px-4 pb-4 pt-2 lg:hidden dark:border-civic-700">
          <nav className="flex flex-col gap-0.5">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-[6px] px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'text-civic-700 dark:text-paper-200'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <NavLink to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)} className="rounded-[6px] px-3 py-2.5 text-sm font-medium text-civic-700 dark:text-paper-200">
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)} className="rounded-[6px] px-3 py-2.5 text-sm font-medium text-marigold-600">
                Sign in
              </NavLink>
            )}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-paper-200 pt-3 dark:border-civic-700">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`rounded-[6px] border px-2.5 py-1.5 text-xs font-medium ${
                  language === l.code
                    ? 'border-marigold-500 text-marigold-600'
                    : 'border-paper-300 text-civic-600 dark:border-civic-600 dark:text-paper-300'
                }`}
              >
                {l.native}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="btn-ghost ml-auto !px-2.5 !py-2"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
