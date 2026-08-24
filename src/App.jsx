import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastHost from './components/ToastHost'

import Landing from './pages/Landing'
import ReportIssue from './pages/ReportIssue'
import Track from './pages/Track'
import ComplaintDetail from './pages/ComplaintDetail'
import Dashboard from './pages/Dashboard'
import CommunityMap from './pages/CommunityMap'
import Participate from './pages/Participate'
import Transparency from './pages/Transparency'
import Admin from './pages/Admin'
import HowItWorks from './pages/HowItWorks'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/track" element={<Track />} />
          <Route path="/track/:id" element={<ComplaintDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<CommunityMap />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastHost />
    </div>
  )
}
