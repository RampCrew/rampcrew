import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Shield, ChevronRight } from 'lucide-react'

const RAMPS = [
  { name: "Spirit Lake City Ramp", desc: "Town-managed ramp off Maine Street. Easy access, single lane, good for smaller boats and pontoons.", coords: "47.9672,-116.8686" },
]

export default function SpiritLake() {
  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-crew-teal text-xs font-medium">
          <MapPin size={12} /> North Idaho · Spirit Lake
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Boat Launch Help at Spirit Lake, Idaho
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          RampCrew is coming to Spirit Lake with verified local helpers for launch assistance and dock support at the Spirit Lake City Ramp.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/concierge" className="bg-crew-blue text-white py-3 rounded-2xl text-sm font-semibold text-center">Book a Helper</Link>
        <Link to="/conditions" className="bg-white/10 text-white py-3 rounded-2xl text-sm font-semibold text-center">View Conditions</Link>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3 flex items-center gap-3">
        <span className="text-yellow-400 text-lg">🚀</span>
        <p className="text-xs text-yellow-200">RampCrew is expanding to Spirit Lake this season. <Link to="/helpers" className="font-semibold text-crew-teal underline">Apply to become a helper</Link> in your community.</p>
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
        {['Launch lane guidance', 'Coaching for first-time launchers', 'Dock hold while you park', 'Load and retrieval coordination', 'Local ramp tips'].map(s => (
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
        <h2 className="text-sm font-semibold text-white">About Spirit Lake</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Spirit Lake is a 1,400-acre lake in Kootenai County, known for excellent bass and trout fishing and a tight-knit small-town community. At just 20 miles north of Coeur d'Alene, it's a popular local getaway that sees steady traffic on summer weekends. RampCrew is building a helper network here to serve the Spirit Lake community.
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
          { to: '/launch/hayden-lake', label: 'Hayden Lake Boat Launch Help' },
          { to: '/launch/twin-lakes', label: 'Twin Lakes Boat Launch Help' },
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
