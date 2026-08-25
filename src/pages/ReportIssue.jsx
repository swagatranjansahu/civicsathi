import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import VoiceInput from '../components/VoiceInput'

export default function ReportIssue() {
  const { t } = useApp()
  const [activeStep, setActiveStep] = useState(1)
  const [reportType, setReportType] = useState('text')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Let AI detect it')
  const [location, setLocation] = useState('')
  const [photo, setPhoto] = useState(null)

  const steps = [
    { number: 1, label: 'Describe' },
    { number: 2, label: 'Review' },
    { number: 3, label: 'Processing' },
    { number: 4, label: 'Result' },
  ]

  const categories = [
    '✨ Let AI detect it',
    'Road Infrastructure',
    'Water Supply',
    'Sanitation & Waste',
    'Street Lighting',
    'Drainage',
    'Electricity',
    'Police & Public Safety',
    'Healthcare',
    'Veterinary & Animal Welfare',
    'Environment',
    'Public Transport',
    'Education',
    'Agriculture',
    'Fire & Emergency',
    'Revenue & Land Records',
    'Excise & Illegal Activities',
  ]

  const handleTranscript = (transcriptText) => {
    setDescription((prev) => (prev ? `${prev} ${transcriptText}` : transcriptText))
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-gray-900 font-sans w-full overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 bg-[#F8F7F4] border-b border-gray-200/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1A3835] rounded-md flex items-center justify-center font-bold text-white text-base">
            C
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#1A3835]">
            CivicSathi
          </span>
        </div>
        <button type="button" className="p-1.5 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-xl mx-auto px-4 py-6">
        {/* Intro Section */}
        <section className="mb-6">
          <p className="text-[10px] font-bold tracking-widest text-[#2D5A56] uppercase mb-1">
            REPORT AN ISSUE
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
            What's wrong, and where?
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('reportIssueDescription') ||
              'Describe the issue the way you would to a neighbour. You can type it, speak it, or attach a photo — CivicSathi will handle the rest.'}
          </p>
        </section>

        {/* Responsive Step Bar */}
        <div className="w-full overflow-x-auto pb-2 mb-6 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max text-xs">
            {steps.map((step, idx) => {
              const isActive = step.number === activeStep
              const isCompleted = step.number < activeStep

              return (
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                        isActive
                          ? 'bg-[#1A3835] text-white'
                          : isCompleted
                          ? 'bg-[#2D5A56] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className={`font-medium ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-6 h-[1px] bg-gray-300" />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Card Input Wrapper */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-sm space-y-5">
          {/* Input Type Options */}
          <div>
            <h2 className="text-xs font-semibold text-gray-800 mb-2.5">
              How would you like to report it?
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'text', label: 'Text', icon: 'M8 6h8M8 10h8M8 14h5' },
                { id: 'voice', label: 'Voice', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
                { id: 'photo', label: 'Photo', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setReportType(opt.id)}
                  className={`flex flex-col items-center justify-center py-3.5 rounded-xl border-2 transition-all ${
                    reportType === opt.id
                      ? 'border-[#1A3835] text-[#1A3835] bg-white'
                      : 'border-gray-200 text-gray-500 bg-white hover:border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={opt.icon} />
                  </svg>
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Issue Description Area */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-2">
              Describe the issue
            </h3>
            {reportType === 'voice' && (
              <div className="mb-3">
                <VoiceInput onTranscript={handleTranscript} />
              </div>
            )}
            <textarea
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Large pothole near the main road junction, close to the pedestrian crossing"
              className="w-full p-3 border border-gray-300/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3835] placeholder:text-gray-400"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              {description.length}/500 characters
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
              Category
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isAI = cat.includes('AI')
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? isAI
                          ? 'border-[#D97706] bg-[#FFFBEB] text-[#B45309]'
                          : 'border-[#1A3835] bg-[#F0F5F4] text-[#1A3835]'
                        : isAI
                        ? 'border-[#F59E0B] text-[#D97706] bg-white'
                        : 'border-gray-300/80 text-gray-600 bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-2">
              Location
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Landmark, street or ward"
                className="flex-1 p-2.5 border border-gray-300/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3835] placeholder:text-gray-400"
              />
              <button
                type="button"
                className="p-2.5 border border-gray-300/80 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm9 4c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9zm-9-7v2m0 10v2m7-9h2m-18 0h2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-2">
              Evidence photo (optional)
            </h3>
            <label className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-all bg-gray-50/50">
              <input type="file" accept="image/*" className="hidden" />
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-xs font-medium text-gray-600">
                Upload a photo of the issue
              </span>
            </label>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="w-full py-3 bg-[#8DA3A1] text-white rounded-xl font-medium text-xs sm:text-sm hover:bg-[#7A9391] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            Continue to review
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}