import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { PROJECTS, NOTIFICATIONS, COMPLAINTS, STATUS_STEPS } from '../data/mockData'

const AppContext = createContext(null)

let toastId = 0

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState(null) // { name, role: 'citizen' | 'admin' }
  const [projects, setProjects] = useState(PROJECTS)
  const [votedProjects, setVotedProjects] = useState({})
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [complaints, setComplaints] = useState(COMPLAINTS)
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const pushToast = useCallback((message, tone = 'default') => {
    const id = ++toastId
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3600)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const voteProject = useCallback(
    (projectId) => {
      if (votedProjects[projectId]) return
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, votes: p.votes + 1 } : p)),
      )
      setVotedProjects((v) => ({ ...v, [projectId]: true }))
      pushToast('Your vote has been counted. Thank you for participating.', 'success')
    },
    [votedProjects, pushToast],
  )

  const markNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const addComplaint = useCallback((complaint) => {
    setComplaints((prev) => [complaint, ...prev])
  }, [])

  const supportComplaint = useCallback((complaintId) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, supportCount: c.supportCount + 1 } : c)),
    )
  }, [])

  const advanceComplaintStatus = useCallback(
    (complaintId, note) => {
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c
          const currentIndex = STATUS_STEPS.indexOf(c.status)
          if (currentIndex >= STATUS_STEPS.length - 1) return c
          const nextStatus = STATUS_STEPS[currentIndex + 1]
          const entry = {
            step: nextStatus,
            date: new Date().toISOString().slice(0, 10),
            note: note || `Updated to "${nextStatus}" by the department officer.`,
          }
          return {
            ...c,
            status: nextStatus,
            timeline: [...c.timeline, entry],
            evidence:
              nextStatus === 'Resolved'
                ? { ...c.evidence, resolution: c.evidence.resolution || 'uploaded' }
                : nextStatus === 'Work in Progress'
                ? { ...c.evidence, progress: c.evidence.progress || 'uploaded' }
                : c.evidence,
          }
        }),
      )
      pushToast(`${complaintId} moved to the next stage.`, 'success')
    },
    [pushToast],
  )

  const login = useCallback(
    (name, role) => {
      setUser({ name, role })
      pushToast(`Signed in as ${name}.`, 'success')
    },
    [pushToast],
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    user,
    login,
    logout,
    projects,
    voteProject,
    votedProjects,
    notifications,
    markNotificationsRead,
    complaints,
    addComplaint,
    supportComplaint,
    advanceComplaintStatus,
    toasts,
    pushToast,
    dismissToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
