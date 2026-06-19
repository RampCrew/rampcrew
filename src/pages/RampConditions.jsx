import React, { useState, useEffect, useCallback } from 'react'
import { Waves, AlertTriangle, CheckCircle, Clock, MapPin, RefreshCw, Navigation, X, Flag, ChevronRight, Wind, Thermometer, CloudRain, Car } from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

const RAMPS = [
  { id: 1, name: 'Higgens Point',           lake: "Lake Coeur d'Alene", status: 'good',   wait: '5 min',  notes: 'Ramp in excellent condition. Plenty of parking.', lat: 47.6748, lng: -116.7517 },
  { id: 2, name: 'City Park Ramp',          lake: "Lake Coeur d'Alene", status: 'busy',   wait: '35 min', notes: 'Very busy — weekend traffic. Consider Blackwell Island.', lat: 47.6736, lng: -116.7799 },
  { id: 3, name: 'Blackwell Island',        lake: "Lake Coeur d'Alene", status: 'good',   wait: '10 min', notes: 'Good alternative to City Park. Ramp is clear.', lat: 47.6833, lng: -116.8052 },
  { id: 4, name: 'Sandpoint City Ramp',     lake: 'Lake Pend Oreille',  status: 'good',   wait: '0 min',  notes: 'Perfect conditions. No wait.', lat: 48.2720, lng: -116.5418 },
  { id: 5, name: 'Hope Boat Basin',         lake: 'Lake Pend Oreille',  status: 'good',   wait: '5 min',  notes: 'Clear and calm. Easy access.', lat: 48.2393, lng: -116.3007 },
  { id: 6, name: 'Honeysuckle Beach Ramp',  lake: 'Hayden Lake',        status: 'closed', wait: 'N/A',    notes: 'Ramp under maintenance. Expected to reopen tomorrow.', lat: 47.7814, lng: -116.7878 },
]

const statusConfig = {
  good:   { color: 'text-green-400',  bg: 'bg-green-400/10',  icon: CheckCircle,   label: 'Good' },
  busy:   { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock,         label: 'Busy' },
  closed:  { color: 'text-red-400',    bg: 'bg-red-400/10',    icon: AlertTriangle, label: 'Closed' },
  unknown: { color: 'text-gray-400',   bg: 'bg-white/5',        icon: Clock,         label: 'No Data' },
}

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (diff < 1) return 'just now'
  if (diff < 60) return `${diff}m ago`
  return `${Math.floor(diff / 60)}h ago`
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

function driveEstimate(km) {
  // Rough estimate: average 70 km/h on North Idaho roads
  const mins = Math.round((km / 70) * 60)
  if (mins < 60) return `~${mins} min drive`
  return `~${Math.floor(mins/60)}h ${mins%60}m drive`
}

// Fetch weather from Open-Meteo (free, no API key)
async function fetchWeather(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code&wind_speed_unit=mph&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles`
  const res = await fetch(url)
  const data = await res.json()
  return data.current
}

function weatherDesc(code) {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 69) return 'Rain'
  if (code <= 79) return 'Snow'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

function windDir(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg/45) % 8]
}

// ── Report Sheet ──────────────────────────────────────────────────────────────
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
      setTimeout(() => { onSubmitted(); onClose() }, 1400)
    } catch { alert('Failed to submit. Try again.') }
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
            <div>
              <div className="text-xs text-gray-400 mb-2">Current status *</div>
              <div className="grid grid-cols-3 gap-2">
                {['good','busy','closed'].map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className={`py-2.5 rounded-xl text-xs font-semibold capitalize border transition-all ${status===s?'border-crew-teal bg-crew-teal/10 text-crew-teal':'border-white/10 text-gray-400'}`}>{s}</button>
                ))}
              </div>
            </div>
            {status && status !== 'closed' && (
              <div>
                <div className="text-xs text-gray-400 mb-2">Wait time (minutes)</div>
                <div className="grid grid-cols-4 gap-2">
                  {['0','10','20','30','45','60','90'].map(w => (
                    <button key={w} onClick={() => setWait(w)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${wait===w?'border-crew-teal bg-crew-teal/10 text-crew-teal':'border-white/10 text-gray-400'}`}>
                      {w==='0'?'None':`${w}m`}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {status && status !== 'closed' && (
              <div>
                <div className="text-xs text-gray-400 mb-2">Surface conditions</div>
                <div className="grid grid-cols-3 gap-2">
                  {['Glass','Calm','Slight chop','Choppy','Rough'].map(s => (
                    <button key={s} onClick={() => setSurface(s)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${surface===s?'border-crew-teal bg-crew-teal/10 text-crew-teal':'border-white/10 text-gray-400'}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="text-xs text-gray-400 mb-2">Anything else? (optional)</div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)}
                placeholder="e.g. one lane closed, debris in water..."
                className="w-full bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 p-3 resize-none h-16" />
            </div>
            <button onClick={submit} disabled={!status||submitting}
              className="w-full py-3 rounded-2xl font-semibold text-sm bg-crew-blue text-white disabled:opacity-40 transition-all">
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Ramp Detail ───────────────────────────────────────────────────────────────
function RampDetail({ ramp, liveData, userLocation, onBack, onReport }) {
  const live = liveData[ramp.id]
  const status = live?.status || 'unknown'
  const wait = live && live.wait_minutes != null ? `${live.wait_minutes} min` : '—'
  const surface = live?.surface || null
  const cfg = statusConfig[status]
  const StatusIcon = cfg.icon

  const [weather, setWeather] = useState(null)
  const [wxLoading, setWxLoading] = useState(true)

  useEffect(() => {
    fetchWeather(ramp.lat, ramp.lng)
      .then(w => { setWeather(w); setWxLoading(false) })
      .catch(() => setWxLoading(false))
  }, [ramp.id])

  const driveText = userLocation
    ? driveEstimate(haversineKm(userLocation.lat, userLocation.lng, ramp.lat, ramp.lng))
    : null

  // Google Maps links
  const gmapsNav  = `https://www.google.com/maps/dir/?api=1&destination=${ramp.lat},${ramp.lng}&travelmode=driving`
  const gmapsView = `https://maps.google.com/maps?q=${ramp.lat},${ramp.lng}&z=15&output=embed`
  const staticMap = `https://staticmap.openstreetmap.de/staticmap.php?center=${ramp.lat},${ramp.lng}&zoom=15&size=600x300&markers=${ramp.lat},${ramp.lng},red`

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl"><X size={16} className="text-gray-400" /></button>
        <div className="flex-1">
          <div className="font-bold text-white">{ramp.name}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><MapPin size={10} />{ramp.lake}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={`flex items-center gap-1 ${cfg.bg} ${cfg.color} text-xs font-medium px-2.5 py-1 rounded-full`}>
            <StatusIcon size={12} />{cfg.label}
          </div>
          {live?.is_operator && <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full"><span>📡</span> Official</div>}
        </div>
      </div>

      {/* Tappable map — opens Google Maps navigation */}
      <a href={gmapsNav} target="_blank" rel="noreferrer" className="mx-4 block rounded-2xl overflow-hidden border border-white/10 relative" style={{height:'180px'}}>
        <img
          src={`https://staticmap.openstreetmap.de/staticmap.php?center=${ramp.lat},${ramp.lng}&zoom=15&size=600x300&markers=${ramp.lat},${ramp.lng},red`}
          alt={ramp.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
        />
        <div style={{display:'none'}} className="w-full h-full bg-white/5 items-center justify-center flex-col gap-2">
          <MapPin size={28} className="text-crew-teal" />
          <span className="text-xs text-gray-400">Tap to open in Maps</span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1.5">
          <Navigation size={12} className="text-crew-teal" />
          <span className="text-xs text-white font-medium">Open in Maps</span>
        </div>
      </a>

      {/* Action buttons */}
      <div className="px-4 mt-3 flex gap-2">
        <a href={gmapsNav} target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-crew-blue text-white rounded-2xl py-3 text-sm font-semibold">
          <Navigation size={16} /> Get Directions
        </a>
        <button onClick={onReport}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white rounded-2xl py-3 text-sm font-semibold">
          <Flag size={16} /> Report
        </button>
      </div>

      {/* Drive time banner */}
      {driveText && (
        <div className="mx-4 mt-3 bg-white/5 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <Car size={14} className="text-crew-teal shrink-0" />
          <span className="text-xs text-gray-300"><span className="text-white font-semibold">{driveText}</span> from your location</span>
        </div>
      )}

      {/* Reports badge */}
      {live && (
        <div className="mx-4 mt-2 bg-crew-teal/10 border border-crew-teal/20 rounded-xl px-4 py-2 text-xs text-crew-teal">
          {live.report_count} boater report{live.report_count>1?'s':''} in the last 2 hrs · Updated {timeAgo(live.updated)}
        </div>
      )}

      {/* Wait + Surface */}
      {status !== 'closed' && (
        <div className="px-4 mt-3 grid grid-cols-2 gap-2">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">Wait</div>
            <div className="text-lg font-bold text-white mt-0.5">{wait}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">Surface</div>
            <div className="text-lg font-bold text-white mt-0.5">{surface || '—'}</div>
          </div>
        </div>
      )}

      {/* Live Weather */}
      <div className="px-4 mt-3">
        <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <span>🌤 Live Weather</span>
          <span className="text-gray-700">· Open-Meteo</span>
        </div>
        {wxLoading ? (
          <div className="bg-white/5 rounded-xl p-4 text-xs text-gray-500 text-center">Loading weather...</div>
        ) : weather ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
              <Thermometer size={16} className="text-orange-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Temp</div>
                <div className="text-sm font-semibold text-white">{Math.round(weather.temperature_2m)}°F</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
              <Wind size={16} className="text-blue-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Wind</div>
                <div className="text-sm font-semibold text-white">{Math.round(weather.wind_speed_10m)} mph {windDir(weather.wind_direction_10m)}</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
              <CloudRain size={16} className="text-teal-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Rain</div>
                <div className="text-sm font-semibold text-white">{weather.precipitation} mm</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2">
              <Waves size={16} className="text-crew-teal shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Conditions</div>
                <div className="text-sm font-semibold text-white">{weatherDesc(weather.weather_code)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl p-3 text-xs text-gray-500">Weather unavailable</div>
        )}
      </div>

      {/* Notes */}
      <div className="px-4 mt-3 mb-6">
        <div className="bg-white/5 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400">{ramp.notes}</p>
        </div>
        {!live && <div className="text-xs text-gray-600 px-1 mt-2">No live reports yet — be the first to report!</div>}
      </div>
    </>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RampConditions() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [reporting, setReporting] = useState(false)
  const [liveData, setLiveData] = useState({})
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [weather, setWeather] = useState({}) // keyed by ramp id

  // Get user location once
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {} // silent fail — not required
      )
    }
  }, [])

  async function fetchLive() {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_API}/getRampConditions`)
      const json = await res.json()
      if (json.conditions) setLiveData(json.conditions)
    } catch {}
    setLoading(false)
  }

  // Fetch weather for all ramps on list view
  async function fetchAllWeather() {
    const results = {}
    await Promise.all(RAMPS.map(async ramp => {
      try {
        const w = await fetchWeather(ramp.lat, ramp.lng)
        results[ramp.id] = w
      } catch {}
    }))
    setWeather(results)
  }

  useEffect(() => { fetchLive(); fetchAllWeather() }, [])

  const getRampStatus = (ramp) => liveData[ramp.id]?.status || 'unknown'
  const selectedRamp = RAMPS.find(r => r.id === selected)
  const filtered = filter === 'all' ? RAMPS : RAMPS.filter(r => getRampStatus(r) === filter)

  if (selectedRamp) {
    return (
      <>
        <RampDetail
          ramp={selectedRamp}
          liveData={liveData}
          userLocation={userLocation}
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Boat Ramps</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            {loading ? 'Loading live reports...' : userLocation ? '📍 Drive times from your location' : 'Tap a ramp for map & conditions'}
          </p>
        </div>
        <button onClick={() => { fetchLive(); fetchAllWeather() }} className="p-2 bg-white/5 rounded-xl">
          <RefreshCw size={16} className={`text-gray-400 ${loading?'animate-spin':''}`} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all','good','busy','closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${filter===f?'bg-crew-blue text-white':'bg-white/5 text-gray-400'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Ramp Cards */}
      <div className="space-y-3">
        {filtered.map(ramp => {
          const live = liveData[ramp.id]
          const status = live?.status || 'unknown'
          const wait = live && live.wait_minutes != null ? `${live.wait_minutes} min` : '—'
          const cfg = statusConfig[status]
          const StatusIcon = cfg.icon
          const wx = weather[ramp.id]
          const driveKm = userLocation ? haversineKm(userLocation.lat, userLocation.lng, ramp.lat, ramp.lng) : null
          const drive = driveKm ? driveEstimate(driveKm) : null

          return (
            <button key={ramp.id} onClick={() => setSelected(ramp.id)}
              className="w-full text-left bg-white/5 rounded-2xl p-4 space-y-3 active:scale-[0.98] transition-transform">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{ramp.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={10} />{ramp.lake}</div>
                    {drive && <div className="flex items-center gap-1 text-xs text-crew-teal"><Car size={10} />{drive}</div>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className={`flex items-center gap-1 ${cfg.bg} ${cfg.color} text-xs font-medium px-2 py-1 rounded-full`}>
                    <StatusIcon size={12} />{cfg.label}
                  </div>
                  {live?.is_operator && <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full"><span>📡</span> Official</div>}
                </div>
              </div>

              {/* Stats row */}
              {status !== 'closed' && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Wait</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{wait}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Temp</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{wx ? `${Math.round(wx.temperature_2m)}°F` : '—'}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Wind</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{wx ? `${Math.round(wx.wind_speed_10m)} mph` : '—'}</div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 flex-1 pr-2 line-clamp-1">{live?.notes || (status === 'unknown' ? 'No reports yet.' : '')}</p>
                <div className="flex items-center gap-1 text-xs text-crew-teal shrink-0">
                  {live ? `${live.report_count} report${live.report_count>1?'s':''}` : 'No reports'}
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
