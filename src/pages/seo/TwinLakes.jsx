import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Shield, ChevronRight } from 'lucide-react'

const RAMPS = [
  { name: "Twin Lakes Village Ramp", desc: "Community ramp serving both Upper and Lower Twin Lakes. Small but functional — best for trailered boats under 24 ft.", coords: "47.9004,-116.9178" },
]

export default function TwinLakes() {
  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-crew-teal text-xs font-medium">
          <MapPin size={12} /> North Idaho · Twin Lakes
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Boat Launch Help at Twin Lakes, Idaho
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          RampCrew is building a helper network at Twin Lakes (Upper and Lower) to provide launch guidance and dock support for local boaters and anglers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/concierge" className="bg-crew-blue text-white py-3 rounded-2xl text-sm font-semibold text-center">Book a Helper</Link>
        <Link to="/conditions" className="bg-white/10 text-white py-3 rounded-2xl text-sm font-semibold text-center">View Conditions</Link>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3 flex items-center gap-3">
        <span className="text-yellow-400 text-lg">🚀</span>
        <p className="text-xs text-yellow-200">RampCrew is expanding to Twin Lakes. <Link to="/helpers" className="font-semibold text-crew-teal underline">Apply to be a local helper</Link> and be first on the platform.</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Ramps We'll Cover</h2>
        {RAMPS.map(r => (
          <div key={r.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm font-semibold text-white">{r.name}</div>
              <a href={`https://maps.google.com/?q=${r.coords}`} target="_blank" rel="noopener noreferrer"
                className="text-crew-teal text-xs shrink-0 flex items-center gap-1">
                <MapPin size={11} /> Directions
              </a>
            </div>
            <p className="text-xs text-gray-400">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-white">What RampCrew Helpers Do</h2>
        {['Ramp lane guidance', 'Coaching for new boaters and anglers', 'Dock hold while you park your trailer', 'Load-out and retrieval coordination', 'Local lake tips and ramp etiquette'].map(s => (
          <div key={s} className="flex items-start gap-2 text-xs text-gray-300">
            <span className="text-green-400 mt-0.5">✓</span> {s}
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">⚠️ Safety Policy</div>
        <p className="text-xs text-gray-300 leading-relaxed">Helpers provide guidance and dock support only. <span className="text-white font-semibold">Boat owners remain responsible for operating their vehicle, trailer, and vessel.</span></p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">About Twin Lakes</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Twin Lakes — Upper and Lower — sit just west of Rathdrum in Kootenai County. Together they cover about 700 acres and are a favorite for bass fishing, paddleboarding, and family boating. The lakes are connected and relatively calm, making them ideal for smaller vessels. RampCrew is bringing professional launch support to this local favorite.
        </p>
      </div>

      <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">
        <Shield size={18} className="text-green-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-white">All Helpers Verified</div>
          <p className="text-xs text-gray-400 mt-1">Every helper passes a government ID check, photo verification, and background review before listing on RampCrew.</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">More RampCrew Lakes</div>
        {[
          { to: '/launch/lake-coeur-dalene', label: "Lake Coeur d'Alene Boat Launch Help" },
          { to: '/launch/spirit-lake', label: 'Spirit Lake Boat Launch Help' },
          { to: '/launch/hayden-lake', label: 'Hayden Lake Boat Launch Help' },
        ].map(l => (
          <Link key={l.to} to={l.to} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white">
            {l.label} <ChevronRight size={14} className="text-gray-600" />
          </Link>
        ))}
      </div>

      <Link to="/" className="block text-center text-xs text-crew-teal py-2">← Back to RampCrew Home</Link>
    </div>
  )
}
