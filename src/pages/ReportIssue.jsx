import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Type,
  Mic,
  Camera,
  MapPin,
  LocateFixed,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Route as RouteIcon,
  Sparkles,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CategoryIcon, { getCategory } from '../components/CategoryIcon'
import Stamp, { priorityTone } from '../components/Stamp'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'
import {
  detectCategory,
  detectPriority,
  findSimilarComplaints,
  routeDepartment,
  generateComplaintId,
  confidenceScore,
  PIPELINE_STEPS,
} from '../utils/aiSimulation'

const STEPS = ['Describe', 'Review', 'Processing', 'Result']

export default function ReportIssue() {
  const { addComplaint, pushToast, language } = useApp()
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState('text')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('auto')
  const [location, setLocation] = useState('')
  const [fileName, setFileName] = useState('')
  const [voiceCaptured, setVoiceCaptured] = useState(false)
  const [pipelineIndex, setPipelineIndex] = useState(0)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const canContinueStep0 = description.trim().length > 8 && location.trim().length > 2

  useEffect(() => {
    if (step !== 2) return
    setPipelineIndex(0)
    const interval = setInterval(() => {
      setPipelineIndex((i) => {
        if (i >= PIPELINE_STEPS.length - 1) {
          clearInterval(interval)
          window.setTimeout(() => finalizeAnalysis(), 500)
          return i
        }
        return i + 1
      })
    }, 650)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  function finalizeAnalysis() {
    const detected = category === 'auto' ? detectCategory(description) : category
    const priority = detectPriority(description)
    const dept = routeDepartment(detected)
    const similar = findSimilarComplaints(description, detected)
    const confidence = confidenceScore(description)
    const id = generateComplaintId()

    const newComplaint = {
      id,
      title: description.slice(0, 72),
      description,
      category: detected,
      department: dept.id,
      priority,
      status: 'AI Verified',
      language,
      ward: 'Ward 14',
      location: { area: location, lat: 20.29, lng: 85.82 },
      submittedDate: new Date().toISOString().slice(0, 10),
      reporter: 'You',
      supportCount: 1,
      duplicateGroup: similar.length > 0 ? similar[0].complaint.duplicateGroup || similar[0].complaint.id : null,
      similarComplaints: similar.map((s) => s.complaint.id),
      aiConfidence: confidence,
      evidence: { before: fileName ? 'uploaded' : null, progress: null, resolution: null },
      timeline: [
        { step: 'Submitted', date: new Date().toISOString().slice(0, 10), note: `Reported via ${mode} complaint.` },
        { step: 'AI Verified', date: new Date().toISOString().slice(0, 10), note: `Category and priority detected automatically (${confidence}% confidence).` },
      ],
    }

    setResult({ detected, priority, dept, similar, confidence, id, newComplaint })
    addComplaint(newComplaint)
    setStep(3)
  }

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (f) setFileName(f.name)
  }

  function handleDetectLocation() {
    setLocation('Basant Chowk, near market junction')
    pushToast('Location detected from device.', 'success')
  }

  function handleSubmitReview() {
    setStep(2)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Report an issue"
        title="What's wrong, and where?"
        description="Describe the issue the way you would to a neighbour. You can type it, speak it, or attach a photo — CivicSathi will handle the rest."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Stepper */}
        <ol className="mb-8 flex items-center gap-2 text-xs font-medium text-paper-500">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] ${
                  i <= step ? 'bg-civic-700 text-white' : 'bg-paper-200 text-paper-500 dark:bg-civic-700'
                }`}
              >
                {i + 1}
              </span>
              <span className={i === step ? 'text-ink dark:text-paper-50' : ''}>{s}</span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-paper-300 dark:bg-civic-600" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="surface animate-rise-in space-y-6 p-6">
            <div>
              <span className="field-label">How would you like to report it?</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'text', label: 'Text', icon: Type },
                  { id: 'voice', label: 'Voice', icon: Mic },
                  { id: 'image', label: 'Photo', icon: Camera },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-[8px] border-2 py-3 text-sm font-medium transition-colors ${
                      mode === m.id
                        ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50'
                        : 'border-paper-200 text-paper-600 hover:border-paper-300 dark:border-civic-700 dark:text-paper-300'
                    }`}
                  >
                    <m.icon size={18} />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {mode === 'voice' && (
              <div className="rounded-[8px] border border-dashed border-paper-300 p-4 text-center dark:border-civic-600">
                <button
                  type="button"
                  onClick={() => setVoiceCaptured(true)}
                  className={voiceCaptured ? 'btn-outline !border-forest-400 !text-forest-600 mx-auto' : 'btn-primary mx-auto'}
                >
                  <Mic size={15} /> {voiceCaptured ? 'Recording captured' : 'Tap to record'}
                </button>
                <p className="mt-2 text-xs text-paper-500">
                  Demo only — for the prototype, please also type a short summary below so the AI pipeline has text to analyze.
                </p>
              </div>
            )}

            <div>
              <label className="field-label" htmlFor="description">
                Describe the issue
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Large pothole near the main road junction, close to the pedestrian crossing"
                className="field-input resize-none"
              />
              <p className="mt-1 text-xs text-paper-500">{description.length}/500 characters</p>
            </div>

            <div>
              <span className="field-label">Category</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('auto')}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                    category === 'auto' ? 'border-marigold-500 bg-marigold-50 text-marigold-700' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
                  }`}
                >
                  <Sparkles size={13} /> Let AI detect it
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                      category === c.id ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="location">Location</label>
              <div className="flex gap-2">
                <input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Landmark, street or ward"
                  className="field-input"
                />
                <button type="button" onClick={handleDetectLocation} className="btn-outline shrink-0 !px-3">
                  <LocateFixed size={15} />
                </button>
              </div>
            </div>

            <div>
              <span className="field-label">Evidence photo (optional)</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center gap-2 rounded-[8px] border border-dashed border-paper-300 px-4 py-3 text-sm text-paper-600 hover:border-civic-400 dark:border-civic-600 dark:text-paper-300"
              >
                <Upload size={16} />
                {fileName || 'Upload a photo of the issue'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>

            <button
              disabled={!canContinueStep0}
              onClick={() => setStep(1)}
              className="btn-primary w-full !py-3"
            >
              Continue to review <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="surface animate-rise-in space-y-5 p-6">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-paper-50">Review before you submit</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-paper-100 pb-3 dark:border-civic-700">
                <dt className="text-paper-500">Description</dt>
                <dd className="text-right text-ink dark:text-paper-100">{description}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-paper-100 pb-3 dark:border-civic-700">
                <dt className="text-paper-500">Category</dt>
                <dd className="text-ink dark:text-paper-100">{category === 'auto' ? 'Detected automatically' : getCategory(category).label}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-paper-100 pb-3 dark:border-civic-700">
                <dt className="text-paper-500">Location</dt>
                <dd className="flex items-center gap-1 text-ink dark:text-paper-100"><MapPin size={13} /> {location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-paper-500">Evidence</dt>
                <dd className="text-ink dark:text-paper-100">{fileName || 'No photo attached'}</dd>
              </div>
            </dl>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-outline">
                <ArrowLeft size={15} /> Edit
              </button>
              <button onClick={handleSubmitReview} className="btn-accent flex-1">
                Submit complaint
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="surface animate-rise-in p-8 text-center">
            <Loader2 className="mx-auto animate-spin text-civic-600" size={28} />
            <p className="mt-4 font-display text-base font-semibold text-ink dark:text-paper-50">
              Running the CivicSathi AI pipeline
            </p>
            <p className="mt-1 text-xs text-paper-500">This is a simulated pipeline for demonstration purposes.</p>
            <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
              {PIPELINE_STEPS.map((label, i) => (
                <li key={label} className="flex items-center gap-2.5 text-sm">
                  {i < pipelineIndex ? (
                    <CheckCircle2 size={16} className="shrink-0 text-forest-500" />
                  ) : i === pipelineIndex ? (
                    <Loader2 size={16} className="shrink-0 animate-spin text-marigold-500" />
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border-2 border-paper-300 dark:border-civic-600" />
                  )}
                  <span className={i <= pipelineIndex ? 'text-ink dark:text-paper-100' : 'text-paper-400'}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 3 && result && (
          <div className="animate-rise-in space-y-5">
            <div className="surface p-6">
              <div className="flex items-center gap-2 text-forest-600">
                <CheckCircle2 size={20} />
                <h2 className="font-display text-lg font-semibold">Complaint submitted</h2>
              </div>
              <p className="mt-1 text-sm text-paper-600 dark:text-paper-300">
                Your complaint <span className="font-mono font-semibold text-ink dark:text-paper-100">{result.id}</span> has
                been recorded and verified.
              </p>
            </div>

            <div className="surface p-6">
              <h3 className="eyebrow">AI complaint analysis</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-paper-500">Language</p>
                  <p className="mt-0.5 text-sm font-medium text-ink dark:text-paper-100">
                    {{ en: 'English', hi: 'Hindi', or: 'Odia' }[language]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-paper-500">Category</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-ink dark:text-paper-100">
                    <CategoryIcon categoryId={result.detected} size={13} className="!p-0.5" /> {getCategory(result.detected).label}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-paper-500">Priority</p>
                  <Stamp label={result.priority} tone={priorityTone(result.priority)} className="mt-1" />
                </div>
                <div>
                  <p className="text-xs text-paper-500">Suggested department</p>
                  <p className="mt-0.5 text-sm font-medium text-ink dark:text-paper-100">{result.dept.name}</p>
                </div>
                <div>
                  <p className="text-xs text-paper-500">Similar complaints</p>
                  <p className="mt-0.5 text-sm font-medium text-ink dark:text-paper-100">{result.similar.length} found</p>
                </div>
                <div>
                  <p className="text-xs text-paper-500">AI confidence</p>
                  <p className="mt-0.5 text-sm font-medium text-ink dark:text-paper-100">{result.confidence}%</p>
                </div>
              </div>
              <div className="mt-4 rounded-[8px] bg-paper-100 p-3 text-xs leading-relaxed text-paper-600 dark:bg-civic-700 dark:text-paper-300">
                <strong className="text-ink dark:text-paper-100">Reasoning: </strong>
                Matched keywords place this under {getCategory(result.detected).label.toLowerCase()}.
                {result.similar.length > 0
                  ? ` It closely resembles ${result.similar.length} existing report(s), so it has been linked into the same case group.`
                  : ' No closely matching reports were found, so it has been filed as a new case.'}
                {' '}Priority was set to {result.priority.toLowerCase()} based on the description and location context.
              </div>
            </div>

            {result.similar.length > 0 && (
              <div className="surface p-6">
                <h3 className="eyebrow flex items-center gap-1.5"><Copy size={13} /> Duplicate detection</h3>
                <p className="mt-2 text-sm text-paper-600 dark:text-paper-300">Your complaint:</p>
                <p className="mt-1 rounded-[8px] border border-marigold-300 bg-marigold-50 px-3 py-2 text-sm text-ink">
                  "{description}"
                </p>
                <p className="mt-3 text-sm text-paper-600 dark:text-paper-300">Grouped with similar reports:</p>
                <ul className="mt-2 space-y-2">
                  {result.similar.map((s) => (
                    <li key={s.complaint.id} className="flex items-center justify-between rounded-[8px] border border-paper-200 px-3 py-2 text-sm dark:border-civic-700">
                      <span className="text-ink dark:text-paper-100">"{s.complaint.title}"</span>
                      <span className="font-mono text-xs text-paper-500">{s.complaint.id}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-paper-500">
                  These reports are now combined into one case, giving departments a clearer picture of how many
                  citizens are affected.
                </p>
              </div>
            )}

            <div className="surface p-6">
              <h3 className="eyebrow flex items-center gap-1.5"><RouteIcon size={13} /> Smart department routing</h3>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
                {['Complaint', 'AI Analysis', 'Category Detection', 'Priority Detection', 'Department Matching', result.dept.name].map(
                  (label, i, arr) => (
                    <React.Fragment key={label}>
                      <span
                        className={`rounded-[6px] px-2.5 py-1.5 ${
                          i === arr.length - 1
                            ? 'bg-civic-700 text-white'
                            : 'bg-paper-100 text-paper-600 dark:bg-civic-700 dark:text-paper-300'
                        }`}
                      >
                        {label}
                      </span>
                      {i < arr.length - 1 && <ArrowRight size={12} className="text-paper-400" />}
                    </React.Fragment>
                  ),
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to={`/track/${result.id}`} className="btn-primary">
                Track this complaint <ArrowRight size={15} />
              </Link>
              <Link to="/dashboard" className="btn-outline">
                Go to dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
