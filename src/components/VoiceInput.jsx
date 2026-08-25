// src/components/VoiceInput.jsx
import React, { useEffect, useRef, useState } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function VoiceInput({ onTranscript }) {
  const recognitionRef = useRef(null)

  const [isListening, setIsListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSupported(false)
      return
    }

    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-IN'

    recognition.onstart = () => {
      setIsListening(true)
      setError('')
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript

      if (transcript && onTranscript) {
        onTranscript(transcript)
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setError(`Microphone error: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [onTranscript])

  function startListening() {
    if (!recognitionRef.current) return

    try {
      setError('')
      recognitionRef.current.start()
    } catch (err) {
      console.error(err)
    }
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  if (!supported) {
    return (
      <div className="rounded-[8px] border border-gray-300 p-4 text-center">
        <p className="text-sm font-medium text-gray-900">
          Speech recognition is not supported
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Please use Google Chrome or Microsoft Edge.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
          isListening
            ? 'border-2 border-red-500 text-red-600 bg-red-50'
            : 'bg-[#1A3835] text-white hover:bg-[#2D5A56]'
        }`}
      >
        {isListening ? (
          <>
            <MicOff size={16} />
            Stop listening
          </>
        ) : (
          <>
            <Mic size={16} />
            Speak your complaint
          </>
        )}
      </button>

      {isListening && (
        <p className="text-xs text-amber-600 animate-pulse">
          Listening... Please speak clearly.
        </p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}