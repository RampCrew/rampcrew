import React, { useState, useEffect } from 'react'
import {
  Users, Calendar, Waves, CheckCircle, XCircle,
  LogOut, RefreshCw, Flag, Clock,
  ChevronDown, ChevronUp, AlertCircle, Shield, BarChart2
} from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

// ─── helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function StatusPill({ status }) {
  const styles = {
    pending:  { bg: '#422006', color: '#fbbf24', border: '#92400e' },
    approved: { bg: '#052e16', color: '#4ade80', border: '#166534' },
    rejected: { bg: '#3b0764', color: '#f87171', border: '#7f1d1d' },
  }
  const s = styles[status] || { bg: '#1e293b', color: '#94a3b8', border: '#334155' }
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      borderRadius: '999px', fontSize: '11px', fontWeight: 600,
      padding: '2px 10px', textTransform: 'capitalize', letterSpacing: '0.02em'
    }}>
      {status}
    </span>
  )
}

// ─── Application Card ─────────────────────────────────────────────────────────

function AppCard({ app, onUpdate }) {
  const [open, setOpen]         = useState(false)
  const [updating, setUpdating] = useState(false)
  const [notes, setNotes]       = useState(app.admin_notes || '')
  const [err, setErr]           = useState('')

  async function updateStatus(status) {
    setUpdating(true)
    setErr('')
    try {
      const res = await fetch(`${BASE_API}/updateHelperStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: app.id, status, admin_notes: notes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Update failed')
      onUpdate(app.id, status, notes)
    } catch (e) {
      setErr(e.message)
    } finally {
      setUpdating(false)
    }
  }

  const skills = app.skills ? app.skills.split(',').map(s => s.trim()).filter(Boolean) : []
  const days   = app.available_days ? app.available_days.split(',').map(d => d.trim()).filter(Boolean) : []
  const initial = (app.full_name || '?')[0].toUpperCase()

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Header row — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(26,86,219,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: 700, color: '#93c5fd', flexShrink: 0
          }}>
            {initial}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{app.full_name}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              {app.primary_lake} · {timeAgo(app.created_date)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <StatusPill status={app.status} />
          {open
            ? <ChevronUp size={15} color="#475569" />
            : <ChevronDown size={15} color="#475569" />}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
            {[
              ['Phone',      app.phone],
              ['Email',      app.email],
              ['DOB',        app.dob || '—'],
              ['Rate',       app.rate ? `${app.rate}/hr` : '—'],
              ['Experience', app.experience || '—'],
              ['Lake',       app.primary_lake || '—'],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{label}</div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', wordBreak: 'break-word' }}>{val}</div>
              </div>
            ))}

            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Address</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                {[app.address, app.city, app.state, app.zip].filter(Boolean).join(', ') || '—'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Emergency</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>{app.emergency_name || '—'}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Em. Phone</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>{app.emergency_phone || '—'}</div>
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map(s => (
                  <span key={s} style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '8px', fontSize: '11px', padding: '3px 10px' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Days */}
          {days.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Available Days</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {days.map(d => (
                  <span key={d} style={{ background: 'rgba(20,184,166,0.12)', color: '#2dd4bf', borderRadius: '8px', fontSize: '11px', padding: '3px 10px' }}>{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {app.bio && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Bio</div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>{app.bio}</p>
            </div>
          )}

          {/* Documents */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
            {app.id_file_name && (
              <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '11px', color: '#93c5fd' }}>
                📄 {app.id_file_name}
              </div>
            )}
            {app.photo_file_name && (
              <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '11px', color: '#93c5fd' }}>
                📷 {app.photo_file_name}
              </div>
            )}
          </div>

          {/* Admin notes */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Admin Notes</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Internal notes (not shown to helper)…"
              style={{
                width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                color: '#cbd5e1', fontSize: '12px', padding: '10px', resize: 'none',
                height: '64px', outline: 'none'
              }}
            />
          </div>

          {err && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '8px 12px', marginTop: '10px' }}>
              <AlertCircle size={12} color="#f87171" />
              <span style={{ fontSize: '12px', color: '#f87171' }}>{err}</span>
            </div>
          )}

          {/* Action buttons */}
          {app.status === 'pending' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
              <button
                onClick={() => updateStatus('approved')}
                disabled={updating}
                style={{
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                  color: '#4ade80', borderRadius: '12px', padding: '11px',
                  fontSize: '13px', fontWeight: 600, cursor: updating ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: updating ? 0.5 : 1
                }}
              >
                <CheckCircle size={14} /> Approve
              </button>
              <button
                onClick={() => updateStatus('rejected')}
                disabled={updating}
                style={{
                  background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                  color: '#f87171', borderRadius: '12px', padding: '11px',
                  fontSize: '13px', fontWeight: 600, cursor: updating ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: updating ? 0.5 : 1
                }}
              >
                <XCircle size={14} /> Reject
              </button>
            </div>
          ) : (
            <button
              onClick={() => updateStatus('pending')}
              disabled={updating}
              style={{
                width: '100%', marginTop: '14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8',
                borderRadius: '12px', padding: '10px', fontSize: '12px',
                fontWeight: 600, cursor: updating ? 'not-allowed' : 'pointer', opacity: updating ? 0.5 : 1
              }}
            >
              Reset to Pending
            </button>
          )}

          <div style={{ fontSize: '11px', color: '#334155', textAlign: 'right', marginTop: '10px' }}>
            Applied {new Date(app.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const RAMPS = [
  { id: 1, name: 'Higgens Point',          lake: "Lake CDA",  fullLake: "Lake Coeur d'Alene" },
  { id: 2, name: 'City Park Ramp',         lake: "Lake CDA",  fullLake: "Lake Coeur d'Alene" },
  { id: 3, name: 'Blackwell Island',       lake: "Lake CDA",  fullLake: "Lake Coeur d'Alene" },
  { id: 4, name: 'Sandpoint City Ramp',    lake: 'Lake Pend Oreille', fullLake: 'Lake Pend Oreille' },
  { id: 5, name: 'Hope Boat Basin',        lake: 'Lake Pend Oreille', fullLake: 'Lake Pend Oreille' },
  { id: 6, name: 'Honeysuckle Beach Ramp', lake: 'Hayden Lake', fullLake: 'Hayden Lake' },
]

const SURFACES = ['Glass', 'Calm', 'Slight chop', 'Choppy', 'Rough']
const WAIT_OPTS = [
  { label: 'No wait', value: 0 }, { label: '5 min', value: 5 }, { label: '10 min', value: 10 },
  { label: '15 min', value: 15 }, { label: '20 min', value: 20 }, { label: '30 min', value: 30 },
  { label: '45 min', value: 45 }, { label: '60+ min', value: 60 },
]

function timeAgoShort(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return m + 'm ago'
  const h = Math.floor(m / 60)
  if (h < 24) return h + 'h ago'
  return Math.floor(h / 24) + 'd ago'
}

function PostConditionSheet({ ramp, token, onClose, onPosted }) {
  const [status,  setStatus]  = useState('good')
  const [surface, setSurface] = useState('')
  const [wait,    setWait]    = useState(null)
  const [notes,   setNotes]   = useState('')
  const [posting, setPosting] = useState(false)
  const [err,     setErr]     = useState('')

  async function post() {
    setPosting(true); setErr('')
    try {
      const res = await fetch(BASE_API + '/submitRampReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ramp_id: ramp.id, ramp_name: ramp.name, lake: ramp.fullLake,
          status, surface: surface || null, wait_minutes: wait, notes,
          reporter_type: 'operator', admin_token: token,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Post failed')
      onPosted()
    } catch (e) { setErr(e.message) } finally { setPosting(false) }
  }

  const sc = { good: '#4ade80', busy: '#fbbf24', closed: '#f87171' }
  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(4px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div style={{ background:'#0f172a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'24px 24px 0 0', width:'100%', maxWidth:'480px', padding:'24px 20px 36px', display:'flex', flexDirection:'column', gap:'16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:'15px', fontWeight:700, color:'#f1f5f9' }}>Post Conditions</div>
            <div style={{ fontSize:'12px', color:'#64748b', marginTop:'2px' }}>{ramp.name} · {ramp.lake}</div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.06)', border:'none', borderRadius:'10px', padding:'8px', cursor:'pointer', color:'#64748b', fontSize:'18px', lineHeight:1 }}>✕</button>
        </div>

        <div>
          <div style={{ fontSize:'11px', color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'8px' }}>Ramp Status</div>
          <div style={{ display:'flex', gap:'8px' }}>
            {['good','busy','closed'].map(s => (
              <button key={s} onClick={() => setStatus(s)} style={{ flex:1, padding:'10px 0', borderRadius:'12px', border:'none', cursor:'pointer', background: status===s ? sc[s]+'22' : 'rgba(255,255,255,0.05)', color: status===s ? sc[s] : '#64748b', fontWeight:600, fontSize:'13px', textTransform:'capitalize', outline: status===s ? '1.5px solid '+sc[s]+'66' : 'none' }}>
                {s==='good'?'✅':s==='busy'?'⏳':'🚫'} {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize:'11px', color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'8px' }}>Wait Time</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {WAIT_OPTS.map(opt => (
              <button key={opt.value} onClick={() => setWait(wait===opt.value ? null : opt.value)} style={{ padding:'7px 12px', borderRadius:'10px', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600, background: wait===opt.value ? 'rgba(96,165,250,0.2)' : 'rgba(255,255,255,0.05)', color: wait===opt.value ? '#60a5fa' : '#64748b', outline: wait===opt.value ? '1.5px solid rgba(96,165,250,0.4)' : 'none' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize:'11px', color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'8px' }}>Water Surface</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {SURFACES.map(s => (
              <button key={s} onClick={() => setSurface(surface===s ? '' : s)} style={{ padding:'7px 12px', borderRadius:'10px', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600, background: surface===s ? 'rgba(45,212,191,0.15)' : 'rgba(255,255,255,0.05)', color: surface===s ? '#2dd4bf' : '#64748b', outline: surface===s ? '1.5px solid rgba(45,212,191,0.35)' : 'none' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize:'11px', color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'6px' }}>Notes (optional)</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Low water near east dock. Parking filling fast." style={{ width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', color:'#cbd5e1', fontSize:'13px', padding:'12px', resize:'none', height:'72px', outline:'none' }} />
        </div>

        {err && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'10px', padding:'10px 14px', fontSize:'12px', color:'#f87171' }}>{err}</div>}

        <button onClick={post} disabled={posting} style={{ width:'100%', padding:'14px', borderRadius:'14px', border:'none', background: posting ? 'rgba(255,255,255,0.06)' : '#1a56db', color: posting ? '#475569' : '#fff', fontWeight:700, fontSize:'14px', cursor: posting ? 'not-allowed' : 'pointer' }}>
          {posting ? 'Posting…' : '📡 Post Official Conditions'}
        </button>
      </div>
    </div>
  )
}

export default function AdminDashboard({ token, onLogout }) {
  const [tab, setTab]                 = useState('Overview')
  const [applications, setApps]       = useState([])
  const [appsLoading, setAppsLoading] = useState(false)
  const [rampData, setRampData]       = useState({})
  const [rampsLoading, setRampsLoading] = useState(false)
  const [appFilter, setAppFilter]     = useState('all')
  const [postingRamp, setPostingRamp] = useState(null)

  async function fetchApps(filter = appFilter) {
    setAppsLoading(true)
    try {
      const res = await fetch(BASE_API + '/getHelperApplications?status=' + filter)
      const json = await res.json()
      setApps(json.applications || [])
    } catch {}
    setAppsLoading(false)
  }

  async function fetchRamps() {
    setRampsLoading(true)
    try {
      const res = await fetch(BASE_API + '/getRampConditions')
      const json = await res.json()
      setRampData(json.conditions || {})
    } catch {}
    setRampsLoading(false)
  }

  useEffect(() => { fetchApps(); fetchRamps() }, [])
  useEffect(() => { if (tab === 'Applications') fetchApps() }, [tab])

  function handleUpdate(id, status, notes) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status, admin_notes: notes } : a))
  }

  const pending  = applications.filter(a => a.status === 'pending')
  const approved = applications.filter(a => a.status === 'approved')
  const filtered = appFilter === 'all' ? applications : applications.filter(a => a.status === appFilter)
  const TABS = ['Overview', 'Applications', 'Ramps', 'Reports']

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'#0f172a', color:'#fff' }}>

      {postingRamp && (
        <PostConditionSheet
          ramp={postingRamp} token={token}
          onClose={() => setPostingRamp(null)}
          onPosted={() => { setPostingRamp(null); fetchRamps() }}
        />
      )}

      <div style={{ padding:'48px 20px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', background:'#1a56db', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>⚓</div>
          <div>
            <div style={{ fontSize:'17px', fontWeight:700, color:'#f1f5f9' }}>Admin Dashboard</div>
            <div style={{ fontSize:'11px', color:'#475569', marginTop:'1px' }}>RampCrew Operations</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#94a3b8', borderRadius:'10px', padding:'8px 12px', fontSize:'12px', fontWeight:500, cursor:'pointer' }}>
          <LogOut size={13} /> Sign Out
        </button>
      </div>

      <div style={{ display:'flex', gap:'8px', padding:'16px 20px 0', overflowX:'auto' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ position:'relative', whiteSpace:'nowrap', padding:'8px 16px', borderRadius:'10px', fontSize:'13px', fontWeight:600, border:'none', cursor:'pointer', background: tab===t ? '#1a56db' : 'rgba(255,255,255,0.05)', color: tab===t ? '#fff' : '#64748b' }}>
            {t}
            {t === 'Applications' && pending.length > 0 && (
              <span style={{ position:'absolute', top:'-6px', right:'-6px', background:'#ef4444', color:'#fff', borderRadius:'50%', width:'18px', height:'18px', fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{pending.length}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ flex:1, padding:'20px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'14px' }}>

        {tab === 'Overview' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              {[
                { label:'Approved Helpers', value:approved.length, Icon:Users,    color:'#4ade80', bg:'rgba(34,197,94,0.1)' },
                { label:'Pending Review',   value:pending.length,  Icon:Clock,    color:'#fbbf24', bg:'rgba(251,191,36,0.1)' },
                { label:'Total Bookings',   value:0,               Icon:Calendar, color:'#60a5fa', bg:'rgba(96,165,250,0.1)' },
                { label:'Ramps Tracked',    value:6,               Icon:Waves,    color:'#2dd4bf', bg:'rgba(45,212,191,0.1)' },
              ].map(({ label, value, Icon, color, bg }) => (
                <div key={label} style={{ background:'rgba(255,255,255,0.04)', borderRadius:'16px', padding:'16px', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width:'34px', height:'34px', background:bg, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'10px' }}><Icon size={16} color={color} /></div>
                  <div style={{ fontSize:'26px', fontWeight:700, color:'#f1f5f9' }}>{value}</div>
                  <div style={{ fontSize:'12px', color:'#64748b', marginTop:'2px' }}>{label}</div>
                </div>
              ))}
            </div>
            {pending.length > 0 && (
              <button onClick={() => setTab('Applications')} style={{ width:'100%', background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.25)', color:'#fbbf24', borderRadius:'14px', padding:'13px', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>
                ⏳ Review {pending.length} pending application{pending.length !== 1 ? 's' : ''} →
              </button>
            )}
            <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:'16px', padding:'16px', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:'13px', fontWeight:600, color:'#f1f5f9', marginBottom:'12px', display:'flex', alignItems:'center', gap:'6px' }}><BarChart2 size={14} color="#60a5fa" /> Platform Summary</div>
              {[['Approved Helpers',approved.length],['Pending',pending.length],['Rejected',applications.filter(a=>a.status==='rejected').length],['Total Applications',applications.length]].map(([label,val]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'10px', marginBottom:'10px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize:'13px', color:'#94a3b8' }}>{label}</span>
                  <span style={{ fontSize:'13px', fontWeight:600, color:'#f1f5f9' }}>{val}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'Applications' && (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'14px', fontWeight:600, color:'#f1f5f9' }}>Helper Applications {filtered.length > 0 && <span style={{ color:'#64748b', fontWeight:400 }}>({filtered.length})</span>}</span>
              <button onClick={() => fetchApps()} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'6px', cursor:'pointer' }}><RefreshCw size={13} color="#64748b" style={{ display:'block', animation: appsLoading ? 'spin 1s linear infinite' : 'none' }} /></button>
            </div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {['all','pending','approved','rejected'].map(f => (
                <button key={f} onClick={() => { setAppFilter(f); fetchApps(f) }} style={{ padding:'6px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600, border:'none', cursor:'pointer', textTransform:'capitalize', background: appFilter===f ? '#1a56db' : 'rgba(255,255,255,0.06)', color: appFilter===f ? '#fff' : '#64748b' }}>
                  {f}{f==='pending' && pending.length > 0 && ' ('+pending.length+')'}
                </button>
              ))}
            </div>
            {appsLoading ? (
              <div style={{ textAlign:'center', color:'#475569', fontSize:'13px', padding:'40px 0' }}>Loading…</div>
            ) : filtered.length === 0 ? (
              <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:'16px', padding:'36px 20px', textAlign:'center', border:'1px solid rgba(255,255,255,0.06)' }}>
                <Users size={32} color="#334155" style={{ margin:'0 auto 12px' }} />
                <div style={{ fontSize:'14px', fontWeight:600, color:'#475569', marginBottom:'4px' }}>No applications</div>
              </div>
            ) : (
              filtered.map(app => <AppCard key={app.id} app={app} onUpdate={handleUpdate} />)
            )}
          </>
        )}

        {tab === 'Ramps' && (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'14px', fontWeight:600, color:'#f1f5f9' }}>Post Official Conditions</span>
              <button onClick={fetchRamps} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'6px', cursor:'pointer' }}><RefreshCw size={13} color="#64748b" style={{ display:'block', animation: rampsLoading ? 'spin 1s linear infinite' : 'none' }} /></button>
            </div>

            <div style={{ background:'rgba(26,86,219,0.08)', border:'1px solid rgba(26,86,219,0.2)', borderRadius:'14px', padding:'12px 14px', fontSize:'12px', color:'#93c5fd', lineHeight:'1.5' }}>
              📡 <strong>Operator posts are authoritative.</strong> They override crowd reports, show an "Official" badge on the public site, and stay live for 24 hours.
            </div>

            {RAMPS.map(ramp => {
              const live = rampData[ramp.id]
              const dot = { good:'#4ade80', busy:'#fbbf24', closed:'#f87171' }[live?.status] || '#334155'
              return (
                <button key={ramp.id} onClick={() => setPostingRamp(ramp)} style={{ width:'100%', textAlign:'left', background:'rgba(255,255,255,0.04)', borderRadius:'16px', padding:'14px 16px', border: live?.is_operator ? '1px solid rgba(26,86,219,0.4)' : '1px solid rgba(255,255,255,0.06)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:600, color:'#f1f5f9' }}>{ramp.name}</div>
                    <div style={{ fontSize:'12px', color:'#475569', marginTop:'2px' }}>{ramp.lake}</div>
                    {live?.is_operator && <div style={{ fontSize:'10px', color:'#60a5fa', marginTop:'4px', fontWeight:600 }}>📡 Official · posted {timeAgoShort(live.operator_posted)}</div>}
                    {!live && <div style={{ fontSize:'10px', color:'#475569', marginTop:'4px' }}>No data — tap to post</div>}
                    {live && !live.is_operator && <div style={{ fontSize:'10px', color:'#64748b', marginTop:'4px' }}>Crowd only · {live.report_count} report{live.report_count !== 1 ? 's' : ''}</div>}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
                    {live?.status && <div style={{ display:'flex', alignItems:'center', gap:'5px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', background:dot }} /><span style={{ fontSize:'12px', color:'#cbd5e1', textTransform:'capitalize' }}>{live.status}</span></div>}
                    <span style={{ fontSize:'18px', color:'#334155' }}>›</span>
                  </div>
                </button>
              )
            })}
          </>
        )}

        {tab === 'Reports' && (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'14px', fontWeight:600, color:'#f1f5f9' }}>Crowd Reports (last 2 hrs)</span>
              <button onClick={fetchRamps} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'6px', cursor:'pointer' }}><RefreshCw size={13} color="#64748b" style={{ display:'block' }} /></button>
            </div>
            {Object.values(rampData).every(d => !d || d.report_count === 0) ? (
              <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:'16px', padding:'36px 20px', textAlign:'center', border:'1px solid rgba(255,255,255,0.06)' }}>
                <Flag size={32} color="#334155" style={{ margin:'0 auto 12px' }} />
                <div style={{ fontSize:'14px', fontWeight:600, color:'#475569', marginBottom:'6px' }}>No active crowd reports</div>
                <p style={{ fontSize:'12px', color:'#334155', margin:0 }}>Boater reports expire after 2 hours.</p>
              </div>
            ) : (
              Object.entries(rampData).map(([id, data]) => {
                if (!data || data.report_count === 0) return null
                const ramp = RAMPS.find(r => r.id === Number(id))
                const dot = { good:'#4ade80', busy:'#fbbf24', closed:'#f87171' }[data?.status] || '#475569'
                return (
                  <div key={id} style={{ background:'rgba(255,255,255,0.04)', borderRadius:'14px', padding:'14px 16px', border:'1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
                      <span style={{ fontSize:'14px', fontWeight:600, color:'#f1f5f9' }}>{ramp?.name || 'Ramp #'+id}</span>
                      <div style={{ display:'flex', alignItems:'center', gap:'6px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', background:dot }} /><span style={{ fontSize:'12px', color:'#cbd5e1', textTransform:'capitalize' }}>{data.status}</span></div>
                    </div>
                    <div style={{ fontSize:'12px', color:'#64748b' }}>
                      {data.report_count} boater report{data.report_count !== 1 ? 's' : ''}
                      {data.wait_minutes != null ? ' · avg ' + data.wait_minutes + ' min wait' : ''}
                      {data.surface ? ' · ' + data.surface : ''}
                    </div>
                    {data.notes && <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'6px', fontStyle:'italic' }}>"{data.notes}"</div>}
                  </div>
                )
              })
            )}
          </>
        )}
      </div>
      <style>{'@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'}</style>
    </div>
  )
}
