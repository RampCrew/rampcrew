import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, MapPin, Clock, Shield, ChevronRight, Star, AlertCircle } from 'lucide-react'

const RAMPS = [
  { name: "Higgens Point Boat Ramp", desc: "Largest ramp on CDA Lake — 4 lanes, ample parking, paved surface. Busy on weekends; arrive early.", coords: "47.6421,-116.6813" },
  { name: "City Park Boat Ramp", desc: "Centrally located in downtown Coeur d'Alene. Walking distance to restaurants and marina.", coords: "47.6736,-116.7799" },
  { name: "Blackwell Island Ramp", desc: "Near Riverstone, shaded parking. Great for anglers heading to the northern reaches of the lake.", coords: "47.7138,-116.7930" },
]

export default function LakeCDA() {
  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      {/* Hero */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-crew-teal text-xs font-medium">
          <MapPin size={12} /> North Idaho · Lake Coeur d'Alene
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Boat Launch Help on Lake Coeur d'Alene
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          RampCrew provides verified launch helpers, live ramp conditions, and slot booking at all three Lake Coeur d'Alene boat ramps — Higgens Point, City Park, and Blackwell Island.
        </p>
      </div>

      {/* CTA */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/concierge" className="bg-crew-blue text-white py-3 rounded-2xl text-sm font-semibold text-center">
          Book a Helper
        </Link>
        <Link to="/conditions" className="bg-white/10 text-white py-3 rounded-2xl text-sm font-semibold text-center">
          Live Conditions
        </Link>
      </div>

      {/* Ramps */}
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

      {/* What we do */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-white">What RampCrew Helpers Do</h2>
        {['Guide your trailer to the ramp lane', 'Coach first-time launchers step by step', 'Hold your vessel at the dock while you park', 'Assist with retrieval and load coordination', 'Provide dock support during busy periods'].map(s => (
          <div key={s} className="flex items-start gap-2 text-xs text-gray-300">
            <span className="text-green-400 mt-0.5">✓</span> {s}
          </div>
        ))}
      </div>

      {/* Safety */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">⚠️ Safety Policy</div>
        <p className="text-xs text-gray-300 leading-relaxed">Helpers provide guidance and dock support only. <span className="text-white font-semibold">Boat owners remain responsible for operating their vehicle, trailer, and vessel.</span> Helpers do not drive trucks or operate boats.</p>
      </div>

      {/* Why CDA */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Why Lake Coeur d'Alene?</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          At 30 miles long and over 25,000 acres, Lake Coeur d'Alene is one of Idaho's premier recreational lakes. Summer weekends bring heavy traffic at all three public ramps. RampCrew was built specifically for CDA — helping boaters skip the chaos, launch confidently, and spend more time on the water.
        </p>
      </div>

      {/* Trust */}
      <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">
        <Shield size={18} className="text-green-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-white">All Helpers Verified</div>
          <p className="text-xs text-gray-400 mt-1">Every RampCrew helper on Lake Coeur d'Alene passes a government ID check, photo verification, and background review before working on the platform.</p>
        </div>
      </div>

      {/* Internal links */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">More RampCrew Lakes</div>
        {[
          { to: '/launch/hayden-lake', label: 'Hayden Lake Boat Launch Help' },
          { to: '/launch/sandpoint', label: 'Sandpoint Boat Launch Help' },
          { to: '/launch/priest-lake', label: 'Priest Lake Boat Launch Help' },
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
