import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Concierge from './pages/Concierge'
import BookRamp from './pages/BookRamp'
import RampConditions from './pages/RampConditions'
import Marketplace from './pages/Marketplace'
import RampMap from './pages/RampMap'
import AdminDashboard from './pages/AdminDashboard'

const ADMIN_PASSWORD = 'rampcrew2026'

function AdminGate() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('rc_admin') === '1')
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  function login() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('rc_admin', '1')
      setAuthed(true)
    } else {
      setError(true)
      setPw('')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">⚓</div>
            <h1 className="text-2xl font-bold text-white">RampCrew Admin</h1>
            <p className="text-gray-400 text-sm">Authorized access only</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Admin password"
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white px-4 py-3 text-sm placeholder-gray-600 outline-none focus:border-crew-teal transition"
            />
            {error && <p className="text-red-400 text-xs text-center">Incorrect password</p>}
            <button onClick={login}
              className="w-full bg-crew-blue text-white py-3 rounded-xl font-semibold text-sm">
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminDashboard
      onLogout={() => { sessionStorage.removeItem('rc_admin'); setAuthed(false) }}
    />
  )
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-navy-900 text-white max-w-md mx-auto relative">
      <Navbar />
      <main className="pb-20 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/book" element={<BookRamp />} />
          <Route path="/conditions" element={<RampConditions />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/map" element={<RampMap />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-navy-900 text-white max-w-md mx-auto">
        <AdminGate />
      </div>
    )
  }

  return <PublicLayout />
}
