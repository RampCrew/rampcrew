import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Shield, ChevronRight } from 'lucide-react'

const RAMPS = [
  { name: "Sandpoint City Boat Ramp", desc: "Downtown Sandpoint's main public ramp on Lake Pend Oreille. Large staging area, 3 lanes, close to the Long Bridge.", coords: "48.2766,-116.5535" },
  { name: "Hope Boat Basin", desc: "Quieter alternative east of Sandpoint near the town of Hope. Ideal for anglers and those exploring the eastern basin.", coords: "48.2396,-116.2973" },
]

export default function Sandpoint() {
  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-crew-teal text-xs font-medium">
          <MapPin size={12} /> North Idaho · Sandpoint / Lake Pend Oreille
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Boat Launch Help in Sandpoint, Idaho
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          RampCrew provides verified launch helpers and live ramp conditions at Sandpoint City Ramp and Hope Boat Basin on Lake Pend Oreille — Idaho's deepest and largest lake.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/concierge" className="bg-crew-blue text-white py-3 rounded-2xl text-sm font-semibold text-center">Book a Helper</Link>
        <Link to="/conditions" className="bg-white/10 text-white py-3 rounded-2xl text-sm font-semibold text-center">Live Conditions</Link>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Boat Ramps We Serve</h2>
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
        {['Ramp lane guidance and staging', 'Trailer backing coaching for beginners', 'Dock hold during peak launch windows', 'Retrieval and load-out coordination', 'Local intel on lake conditions and hazards'].map(s => (
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
        <h2 className="text-sm font-semibold text-white">About Lake Pend Oreille & Sandpoint</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Lake Pend Oreille is Idaho's largest lake at 148 square miles and over 1,100 feet deep. Sandpoint sits at its northern tip and is one of North Idaho's most popular summer destinations. The city ramp handles serious boat traffic during July and August — RampCrew helps you launch without the headache.
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
          { to: '/launch/priest-lake', label: 'Priest Lake Boat Launch Help' },
          { to: '/launch/spirit-lake', label: 'Spirit Lake Boat Launch Help' },
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
