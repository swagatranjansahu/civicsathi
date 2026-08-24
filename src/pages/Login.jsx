import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, ShieldCheck, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [role, setRole] = useState('citizen')
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const finalName = name.trim() || (role === 'admin' ? 'Officer Rina Patnaik' : 'Anita Sahu')
    login(finalName, role)
    navigate(role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div>
      <PageHeader
        eyebrow="Account"
        title="Sign in to CivicSathi"
        description="Authentication is mocked for this prototype using local state — no password is checked. In production this would use Firebase Auth / JWT."
      />

      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="surface p-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setRole('citizen')}
              className={`flex flex-col items-center gap-1.5 rounded-[8px] border-2 py-3 text-sm font-medium ${
                role === 'citizen' ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-200 text-paper-600 dark:border-civic-700 dark:text-paper-300'
              }`}
            >
              <User size={17} /> Citizen
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex flex-col items-center gap-1.5 rounded-[8px] border-2 py-3 text-sm font-medium ${
                role === 'admin' ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-200 text-paper-600 dark:border-civic-700 dark:text-paper-300'
              }`}
            >
              <ShieldCheck size={17} /> Department officer
            </button>
          </div>

          <div className="mt-5 flex gap-4 border-b border-paper-200 text-sm font-medium dark:border-civic-700">
            <button
              onClick={() => setMode('signin')}
              className={`-mb-px border-b-2 px-1 py-2 ${mode === 'signin' ? 'border-civic-600 text-civic-700 dark:text-paper-50' : 'border-transparent text-paper-500'}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode('register')}
              className={`-mb-px border-b-2 px-1 py-2 ${mode === 'register' ? 'border-civic-600 text-civic-700 dark:text-paper-50' : 'border-transparent text-paper-500'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className="field-label">Full name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'admin' ? 'Officer Rina Patnaik' : 'Anita Sahu'}
                className="field-input"
              />
            </div>
            {mode === 'register' && (
              <div>
                <label htmlFor="ward" className="field-label">{role === 'admin' ? 'Department' : 'Ward'}</label>
                <input id="ward" placeholder={role === 'admin' ? 'Public Works Department' : 'Ward 14'} className="field-input" />
              </div>
            )}
            <div>
              <label htmlFor="phone" className="field-label">Phone or email</label>
              <input id="phone" placeholder="you@example.com" className="field-input" />
            </div>
            <button type="submit" className="btn-primary w-full !py-3">
              {mode === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight size={15} />
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-paper-500">
            Demo only — no real credentials are stored or verified.
          </p>
        </div>
      </div>
    </div>
  )
}
