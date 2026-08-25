import React, { useState } from 'react'
import {
  NavLink,
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Bell,
  LogOut,
  LayoutDashboard,
} from 'lucide-react'

import { useApp } from '../context/AppContext'
import { LANGUAGES } from '../data/mockData'
import translations from '../data/translations'

const LINKS = [
  { to: '/', key: 'home' },
  { to: '/report', key: 'report' },
  { to: '/track', key: 'track' },
  { to: '/map', key: 'map' },
  { to: '/participate', key: 'participate' },
  { to: '/transparency', key: 'transparency' },
  { to: '/how-it-works', key: 'howItWorks' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const {
    theme,
    setTheme,
    language,
    setLanguage,
    user,
    logout,
    notifications,
  } = useApp()

  const navigate = useNavigate()

  const unread = notifications.filter(
    (notification) => !notification.read
  ).length

  const currentLang = LANGUAGES.find(
    (item) => item.code === language
  )

  const t =
    translations[language] ||
    translations.en

  const changeLanguage = (code) => {
    setLanguage(code)
    setLangOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200 bg-paper-50/95 backdrop-blur dark:border-civic-700 dark:bg-civic-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-civic-700 font-display text-base font-semibold text-white">
            C
          </span>

          <span className="font-display text-lg font-semibold tracking-tight text-civic-800 dark:text-paper-50">
            CivicSathi
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-[6px] px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-civic-700 dark:text-marigold-400'
                    : 'text-civic-600/80 hover:text-civic-700 dark:text-paper-300 dark:hover:text-paper-50'
                }`
              }
            >
              {t[link.key]}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP CONTROLS */}

        <div className="hidden items-center gap-1.5 lg:flex">

          {/* LANGUAGE */}

          <div className="relative">
            <button
              onClick={() =>
                setLangOpen((value) => !value)
              }
              className="btn-ghost !px-2.5 !py-2"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t.chooseLanguage}
            >
              <Globe size={17} />

              <span className="font-mono text-xs">
                {currentLang?.code?.toUpperCase()}
              </span>
            </button>

            {langOpen && (
              <ul
                role="listbox"
                className="surface absolute right-0 mt-2 w-40 overflow-hidden py-1"
              >
                {LANGUAGES.map((item) => (
                  <li key={item.code}>
                    <button
                      role="option"
                      aria-selected={
                        language === item.code
                      }
                      onClick={() =>
                        changeLanguage(item.code)
                      }
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-paper-100 dark:hover:bg-civic-700 ${
                        language === item.code
                          ? 'font-semibold text-marigold-600'
                          : ''
                      }`}
                    >
                      <span>{item.label}</span>

                      <span className="text-paper-500">
                        {item.native}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DARK MODE */}

          <button
            onClick={() =>
              setTheme(
                theme === 'light'
                  ? 'dark'
                  : 'light'
              )
            }
            className="btn-ghost !px-2.5 !py-2"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? (
              <Moon size={17} />
            ) : (
              <Sun size={17} />
            )}
          </button>

          {/* USER */}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="btn-ghost relative !px-2.5 !py-2"
                aria-label={t.dashboard}
              >
                <Bell size={17} />

                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brick-500 text-[9px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </Link>

              <Link
                to={
                  user.role === 'admin'
                    ? '/admin'
                    : '/dashboard'
                }
                className="btn-ghost !px-2.5 !py-2"
                aria-label={t.dashboard}
              >
                <LayoutDashboard size={17} />
              </Link>

              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="btn-outline !px-3 !py-2"
              >
                <LogOut size={15} />

                {t.signOut}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn-primary"
            >
              {t.signIn}
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          className="btn-ghost !px-2 !py-2 lg:hidden"
          onClick={() =>
            setOpen((value) => !value)
          }
          aria-label="Menu"
        >
          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}

      {open && (
        <div className="border-t border-paper-200 px-4 pb-4 pt-2 lg:hidden dark:border-civic-700">

          <nav className="flex flex-col gap-0.5">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-[6px] px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50'
                      : 'text-civic-700 dark:text-paper-200'
                  }`
                }
              >
                {t[link.key]}
              </NavLink>
            ))}

            {user ? (
              <NavLink
                to={
                  user.role === 'admin'
                    ? '/admin'
                    : '/dashboard'
                }
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-[6px] px-3 py-2.5 text-sm font-medium text-civic-700 dark:text-paper-200"
              >
                {t.dashboard}
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-[6px] px-3 py-2.5 text-sm font-medium text-marigold-600"
              >
                {t.signIn}
              </NavLink>
            )}
          </nav>

          {/* MOBILE LANGUAGE */}

          <div className="mt-3 flex items-center gap-2 border-t border-paper-200 pt-3 dark:border-civic-700">

            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                onClick={() =>
                  changeLanguage(item.code)
                }
                className={`rounded-[6px] border px-2.5 py-1.5 text-xs font-medium ${
                  language === item.code
                    ? 'border-marigold-500 text-marigold-600'
                    : 'border-paper-300 text-civic-600 dark:border-civic-600 dark:text-paper-300'
                }`}
              >
                {item.native}
              </button>
            ))}

            {/* MOBILE DARK MODE */}

            <button
              onClick={() =>
                setTheme(
                  theme === 'light'
                    ? 'dark'
                    : 'light'
                )
              }
              className="btn-ghost ml-auto !px-2.5 !py-2"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Moon size={17} />
              ) : (
                <Sun size={17} />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}