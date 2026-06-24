import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LifeBuoy, Calendar, Waves, Users, ChevronRight, MapPin, Map, Loader } from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

const modules = [
  { path: '/concierge',  icon: LifeBuoy, title: 'Concierge Launch Help', desc: 'Expert help getting your boat in and out of the water', color: 'from-blue-600 to-blue-800',   badge: 'Most Popular' },
  { path: '/book',       icon: Calendar, title: 'Book a Ramp Slot',      desc: 'Reserve your launch time — no more waiting in line',  color: 'from-teal-600 to-teal-800',   badge: null },
  { path: '/conditions', icon: Waves,    title: 'Ramp Conditions',       desc: 'Live updates on ramp status, water levels & wait times', color: 'from-cyan-600 to-cyan-800', badge: 'Live' },
  { path: '/helpers',    icon: Users,    title: 'Helper Marketplace',    desc: 'Hire verified local helpers for your launch day',     color: 'from-orange-600 to-orange-800', badge: null },
]

const RAMPS = [
  { id: 1, name: 'Higgens Point',          lake: "Lake Coeur d'Alene" },
  { id: 2, name: 'City Park Ramp',         lake: "Lake Coeur d'Alene" },
  { id: 3, name: 'Blackwell Island',       lake: "Lake Coeur d'Alene" },
  { id: 4, name: 'Sandpoint City Ramp',    lake: 'Lake Pend Oreille'  },
  { id: 5, name: 'Hope Boat Basin',        lake: 'Lake Pend Oreille'  },
  { id: 6, name: 'Honeysuckle Beach Ramp', lake: 'Hayden Lake'        },
]

const statusStyles = {
  good:    { pill: 'bg-green-400/15 text-green-400',  dot: '#4ade80', label: 'Good'   },
  busy:    { pill: 'bg-yellow-400/15 text-yellow-400', dot: '#fbbf24', label: 'Busy'   },
  closed:  { pill: 'bg-red-400/15 text-red-400',      dot: '#f87171', label: 'Closed' },
  default: { pill: 'bg-white/10 text-gray-400',       dot: '#475569', label: 'No data'},
}

export default function Home() {
  const [rampData, setRampData] = useState({})
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetch(`${BASE_API}/getRampConditions`)
      .then(r => r.json())
      .then(d => setRampData(d.conditions || {}))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="px-4 py-6 space-y-6">

      {/* Hero */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-crew-blue/20 text-crew-teal text-xs font-medium px-3 py-1 rounded-full">
          <MapPin size={12} /> North Idaho Lakes
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Your Boat Launch,<br /><span className="text-crew-teal">Done Right.</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Concierge help, ramp booking, live conditions & verified helpers — all in one app.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{ value: '3', label: 'Lakes' }, { value: '6', label: 'Ramp Sites' }, { value: 'Live', label: 'Conditions' }].map(s => (
          <div key={s.label} className="bg-white/5 rounded-2xl p-3 text-center">
            <div className="text-xl font-bold text-crew-teal">{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Boat Ramps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Boat Ramps</h2>
          <Link to="/map" className="flex items-center gap-1 text-xs text-crew-teal">
            <Map size={12} /> View Map
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 gap-2 text-gray-500 text-sm">
            <Loader size={16} className="animate-spin" /> Loading conditions…
          </div>
        ) : (
          RAMPS.map(ramp => {
            const live  = rampData[ramp.id]
            const key   = live?.status || 'default'
            const style = statusStyles[key] || statusStyles.default
            return (
              <Link
                key={ramp.id}
                to="/conditions"
                className="block bg-white/5 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Waves size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{ramp.name}</div>
                      <div className="text-xs text-gray-500">{ramp.lake}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.pill}`}>
                      {style.label}
                    </span>
                    {live?.wait_minutes != null && (
                      <span className="text-xs text-gray-500">{live.wait_minutes} min wait</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      {/* Services */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h2>
        {modules.map(({ path, icon: Icon, title, desc, color, badge }) => (
          <Link
            key={path}
            to={path}
            className={`block bg-gradient-to-r ${color} rounded-2xl p-4 relative overflow-hidden group`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-sm">{title}</span>
                    {badge && (
                      <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{badge}</span>
                    )}
                  </div>
                  <p className="text-white/70 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/50 group-hover:text-white transition flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>


      {/* Footer */}
      <div className="flex items-center justify-center gap-4 py-4 border-t border-white/5 mt-2">
        <Link to="/about" className="text-xs text-gray-500 hover:text-gray-300 transition">About</Link>
        <span className="text-gray-700 text-xs">·</span>
        <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition">Contact</Link>
        <span className="text-gray-700 text-xs">·</span>
        <Link to="/helper-terms" className="text-xs text-gray-500 hover:text-gray-300 transition">Terms</Link>
      </div>

      {/* Disclaimer */}
      <div className="px-1 pt-2 pb-4">
        <p className="text-xs text-gray-600 leading-relaxed text-center">
          RampCrew availability may vary by ramp, date, weather, and helper schedule. RampCrew does not guarantee ramp access, launch timing, or water conditions.
        </p>
      </div>
    </div>
  )
}
