import React, { useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Concierge from './pages/Concierge'
import BookRamp from './pages/BookRamp'
import RampConditions from './pages/RampConditions'
import Marketplace from './pages/Marketplace'
import RampMap from './pages/RampMap'
import AdminDashboard from './pages/AdminDashboard'
import HelperTerms from './pages/HelperTerms'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

function AdminGate() {
  const [token, setToken]     = useState(() => sessionStorage.getItem('rc_admin_token'))
  const [expiry, setExpiry]   = useState(() => Number(sessionStorage.getItem('rc_admin_expiry') || 0))
  const [pw, setPw]           = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const isAuthed = token && expiry > Date.now()

  async function login() {
    if (!pw.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BASE_API}/adminLogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Incorrect password')
        setPw('')
      } else {
        sessionStorage.setItem('rc_admin_token', data.token)
        sessionStorage.setItem('rc_admin_expiry', String(data.expiresAt))
        setToken(data.token)
        setExpiry(data.expiresAt)
      }
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    sessionStorage.removeItem('rc_admin_token')
    sessionStorage.removeItem('rc_admin_expiry')
    setToken(null)
    setExpiry(0)
    setPw('')
  }

  if (!isAuthed) {
    return (
      <div
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        className="bg-navy-900"
      >
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚓</div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: 0 }}>RampCrew Admin</h1>
            <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px' }}>Authorized access only</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && !loading && login()}
              placeholder="Enter admin password"
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                color: '#fff', padding: '12px 16px', fontSize: '14px', outline: 'none'
              }}
            />
            {error && (
              <p style={{ color: '#f87171', fontSize: '12px', textAlign: 'center', margin: 0 }}>{error}</p>
            )}
            <button
              onClick={login}
              disabled={loading || !pw.trim()}
              style={{
                width: '100%', background: loading || !pw.trim() ? 'rgba(26,86,219,0.4)' : '#1a56db',
                color: '#fff', border: 'none', borderRadius: '12px',
                padding: '13px', fontSize: '14px', fontWeight: 600, cursor: loading || !pw.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard token={token} onLogout={logout} />
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-navy-900 text-white max-w-md mx-auto relative">
      <Navbar />
      <main className="pb-20 pt-16">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/concierge"  element={<Concierge />} />
          <Route path="/book"       element={<BookRamp />} />
          <Route path="/conditions" element={<RampConditions />} />
          <Route path="/helpers"    element={<Marketplace />} />
          <Route path="/helper-terms" element={<HelperTerms />} />
          <Route path="/map"        element={<RampMap />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  // Admin route — completely isolated, NO public nav/header
  if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) {
    return (
      <div
        style={{ minHeight: '100vh', maxWidth: '480px', margin: '0 auto', background: '#0f172a', color: '#fff', position: 'relative' }}
      >
        <AdminGate />
      </div>
    )
  }

  return <PublicLayout />
}
