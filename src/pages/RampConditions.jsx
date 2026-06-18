import React, { useState, useEffect } from 'react'
import { Waves, AlertTriangle, CheckCircle, Clock, MapPin, RefreshCw, Navigation, X, Flag, ChevronRight } from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

const defaultRamps = [
  { id: 1, name: 'Higgens Point',       lake: "Lake Coeur d'Alene", status: 'good',   wait: '5 min',  water_temp: '68°F', wind: '8 mph NW',  surface: 'Calm',        notes: 'Ramp in excellent condition. Plenty of parking.', updated: 'No reports yet', lat: 47.5793, lng: -116.7368, gmaps: 'https://maps.google.com/?q=47.5793,-116.7368' },
  { id: 2, name: 'City Park Ramp',      lake: "Lake Coeur d'Alene", status: 'busy',   wait: '35 min', water_temp: '68°F', wind: '10 mph NW', surface: 'Slight chop', notes: 'Very busy — weekend traffic. Consider Blackwell Island.', updated: 'No reports yet', lat: 47.6735, lng: -116.7806, gmaps: 'https://maps.google.com/?q=47.6735,-116.7806' },
  { id: 3, name: 'Blackwell Island',    lake: "Lake Coeur d'Alene", status: 'good',   wait: '10 min', water_temp: '68°F', wind: '8 mph NW',  surface: 'Calm',        notes: 'Good alternative to City Park. Ramp is clear.', updated: 'No reports yet', lat: 47.6612, lng: -116.8021, gmaps: 'https://maps.google.com/?q=47.6612,-116.8021' },
  { id: 4, name: 'Sandpoint City Ramp', lake: 'Lake Pend Oreille',  status: 'good',   wait: '0 min',  water_temp: '62°F', wind: '5 mph S',   surface: 'Glass',       notes: 'Perfect conditions. No wait.', updated: 'No reports yet', lat: 48.2766, lng: -116.5535, gmaps: 'https://maps.google.com/?q=48.2766,-116.5535' },
  { id: 5, name: 'Hope Ramp',           lake: 'Lake Pend Oreille',  status: 'good',   wait: '5 min',  water_temp: '62°F', wind: '6 mph S',   surface: 'Calm',        notes: 'Clear and calm. Easy access.', updated: 'No reports yet', lat: 48.2393, lng: -116.3007, gmaps: 'https://maps.google.com/?q=48.2393,-116.3007' },
  { id: 6, name: 'Hayden Lake Ramp',    lake: 'Hayden Lake',        status: 'closed', wait: 'N/A',    water_temp: '70°F', wind: '12 mph',    surface: 'N/A',         notes: 'Ramp under maintenance. Expected to reopen tomorrow.', updated: 'No reports yet', lat: 47.7701, lng: -116.7862, gmaps: 'https://maps.google.com/?q=47.7701,-116.7862' },
]

const statusConfig = {
  good:   { color: 'text-green-400',  bg: 'bg-green-400/10',  icon: CheckCircle,   label: 'Good' },
  busy:   { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock,         label: 'Busy' },
  closed: { color: 'text-red-400',    bg: 'bg-red-400/10',    icon: AlertTriangle, label: 'Closed' },
}

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (diff < 1) return 'just now'
  if (diff < 60) return `${diff} min ago`
  return `${Math.floor(diff / 60)}h ago`
}

function ReportSheet({ ramp, onClose, onSubmitted }) {
  const [status, setStatus] = useState('')
  const [wait, setWait] = useState('')
  const [surface, setSurface] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function submit() {
    if (!status) return
    setSubmitting(true)
    try {
      await fetch(`${BASE_API}/submitRampReport`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ramp_id: ramp.id, ramp_name: ramp.name, lake: ramp.lake, status, wait_minutes: wait ? parseInt(wait) : null, surface: surface || null, notes }),
      })
      setDone(true)
      setTimeout(() => { onSubmitted(); onClose() }, 1200)
    } catch (e) {
      alert('Failed to submit. Try again.')
    }
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 max-w-md mx-auto">
      <div className="w-full bg-[#0d1b2e] rounded-t-3xl p-5 space-y-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="font-bold text-white">Report Conditions</div>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="text-xs text-gray-400">{ramp.name} · {ramp.lake}</div>

        {done ? (
          <div className="text-center py-6">
            <CheckCircle size={40} className="text-green-400 mx-auto mb-2" />
            <div className="text-white font-semibold">Report submitted!</div>
            <div className="text-xs text-gray-400 mt-1">Thanks for helping other boaters 🙌</div>
          </div>
        ) : (
          <>
            {/* Status */}
            <div>
              <div className="text-xs text-gray-400 mb-2">Current status *</div>
              <div className="grid grid-cols-3 gap-2">
                {['good', 'busy', 'closed'].map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className={`py-2.5 rounded-xl text-xs font-semibold capitalize border transition-all ${status === s ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Wait */}
            {status && status !== 'closed' && (
              <div>
                <div className="text-xs text-gray-400 mb-2">Wait time (minutes)</div>
                <div className="grid grid-cols-4 gap-2">
                  {['0', '10', '20', '30', '45', '60', '90'].map(w => (
                    <button key={w} onClick={() => setWait(w)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${wait === w ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                      {w === '0' ? 'None' : `${w}m`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Surface */}
            {status && status !== 'closed' && (
              <div>
                <div className="text-xs text-gray-400 mb-2">Surface conditions</div>
                <div className="grid grid-cols-3 gap-2">
                  {['Glass', 'Calm', 'Slight chop', 'Choppy', 'Rough'].map(s => (
                    <button key={s} onClick={() => setSurface(s)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${surface === s ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <div className="text-xs text-gray-400 mb-2">Anything else? (optional)</div>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. one lane closed, debris in water..."
                className="w-full bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 p-3 resize-none h-16"
              />
            </div>

            <button
              onClick={submit}
              disabled={!status || submitting}
              className="w-full py-3 rounded-2xl font-semibold text-sm bg-crew-blue text-white disabled:opacity-40 transition-all"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function RampDetail({ ramp, liveData, onBack, onReport }) {
  const live = liveData[ramp.id]
  const status = live?.status || ramp.status
  const wait = live ? (live.wait_minutes != null ? `${live.wait_minutes} min` : '—') : ramp.wait
  const surface = live?.surface || ramp.surface
  const updated = live ? timeAgo(live.updated) : ramp.updated
  const reportCount = live?.report_count || 0

  const cfg = statusConfig[status]
  const StatusIcon = cfg.icon
  const bbox = 0.012
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${ramp.lng - bbox}%2C${ramp.lat - bbox}%2C${ramp.lng + bbox}%2C${ramp.lat + bbox}&layer=mapnik&marker=${ramp.lat}%2C${ramp.lng}`

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl"><X size={16} className="text-gray-400" /></button>
        <div className="flex-1">
          <div className="font-bold text-white">{ramp.name}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><MapPin size={10} /> {ramp.lake}</div>
        </div>
        <div className={`flex items-center gap-1 ${cfg.bg} ${cfg.color} text-xs font-medium px-2.5 py-1 rounded-full`}>
          <StatusIcon size={12} /> {cfg.label}
        </div>
      </div>

      <div className="mx-4 rounded-2xl overflow-hidden border border-white/10" style={{ height: '200px' }}>
        <iframe title={ramp.name} width="100%" height="100%" src={mapSrc} style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} />
      </div>

      <div className="px-4 mt-3 flex gap-2">
        <a href={ramp.gmaps} target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-crew-blue text-white rounded-2xl py-3 text-sm font-semibold">
          <Navigation size={16} /> Navigate
        </a>
        <button onClick={onReport}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white rounded-2xl py-3 text-sm font-semibold">
          <Flag size={16} /> Report
        </button>
      </div>

      {reportCount > 0 && (
        <div className="mx-4 mt-3 bg-crew-teal/10 border border-crew-teal/20 rounded-xl px-4 py-2 text-xs text-crew-teal">
          {reportCount} boater report{reportCount > 1 ? 's' : ''} in the last 2 hrs · Updated {updated}
        </div>
      )}

      {status !== 'closed' && (
        <div className="px-4 mt-3 grid grid-cols-3 gap-2">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">Wait</div>
            <div className="text-sm font-bold text-white mt-0.5">{wait}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">Water</div>
            <div className="text-sm font-bold text-white mt-0.5">{ramp.water_temp}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">Wind</div>
            <div className="text-sm font-bold text-white mt-0.5">{ramp.wind}</div>
          </div>
        </div>
      )}

      <div className="px-4 mt-3 space-y-2">
        {status !== 'closed' && surface && (
          <div className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">Surface</span>
            <span className="text-xs text-white font-medium">{surface}</span>
          </div>
        )}
        <div className="bg-white/5 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400">{ramp.notes}</p>
        </div>
        {!live && <div className="text-xs text-gray-600 px-1">No live reports yet — be the first to report!</div>}
      </div>
    </div>
  )
}

export default function RampConditions() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [reporting, setReporting] = useState(false)
  const [liveData, setLiveData] = useState({})
  const [loading, setLoading] = useState(true)

  async function fetchLive() {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_API}/getRampConditions`)
      const json = await res.json()
      if (json.conditions) setLiveData(json.conditions)
    } catch (e) { /* fallback to defaults */ }
    setLoading(false)
  }

  useEffect(() => { fetchLive() }, [])

  const getRampStatus = (ramp) => liveData[ramp.id]?.status || ramp.status

  const selectedRamp = defaultRamps.find(r => r.id === selected)
  const filtered = filter === 'all' ? defaultRamps : defaultRamps.filter(r => getRampStatus(r) === filter)

  if (selectedRamp) {
    return (
      <>
        <RampDetail
          ramp={selectedRamp}
          liveData={liveData}
          onBack={() => setSelected(null)}
          onReport={() => setReporting(true)}
        />
        {reporting && (
          <ReportSheet
            ramp={selectedRamp}
            onClose={() => setReporting(false)}
            onSubmitted={() => fetchLive()}
          />
        )}
      </>
    )
  }

  return (
    <div className="px-4 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Boat Ramps</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            {loading ? 'Loading live reports...' : 'Tap a ramp for map & conditions'}
          </p>
        </div>
        <button onClick={fetchLive} className="p-2 bg-white/5 rounded-xl">
          <RefreshCw size={16} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex gap-2">
        {['all', 'good', 'busy', 'closed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${filter === f ? 'bg-crew-blue text-white' : 'bg-white/5 text-gray-400'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((ramp) => {
          const live = liveData[ramp.id]
          const status = live?.status || ramp.status
          const wait = live ? (live.wait_minutes != null ? `${live.wait_minutes} min` : '—') : ramp.wait
          const cfg = statusConfig[status]
          const StatusIcon = cfg.icon
          return (
            <button key={ramp.id} onClick={() => setSelected(ramp.id)}
              className="w-full text-left bg-white/5 rounded-2xl p-4 space-y-3 active:scale-[0.98] transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{ramp.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><MapPin size={10} /> {ramp.lake}</div>
                </div>
                <div className={`flex items-center gap-1 ${cfg.bg} ${cfg.color} text-xs font-medium px-2 py-1 rounded-full`}>
                  <StatusIcon size={12} /> {cfg.label}
                </div>
              </div>
              {status !== 'closed' && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Wait</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{wait}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Water</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{ramp.water_temp}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Wind</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{ramp.wind}</div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 flex-1 pr-2 line-clamp-1">{ramp.notes}</p>
                <div className="flex items-center gap-1 text-xs text-crew-teal shrink-0">
                  {live ? `${live.report_count} report${live.report_count > 1 ? 's' : ''}` : 'No reports'}
                  <ChevronRight size={12} />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
