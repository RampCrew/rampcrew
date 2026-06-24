import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Users, Shield, Anchor } from 'lucide-react'

const lakes = [
  "Lake Coeur d'Alene",
  "Lake Pend Oreille",
  "Hayden Lake",
  "Priest Lake",
  "Spirit Lake",
  "Twin Lakes",
]

export default function About() {
  return (
    <div className="px-4 py-6 space-y-8">

      {/* Hero */}
      <div className="text-center space-y-3 pt-2">
        <div className="w-16 h-16 bg-crew-blue/10 rounded-2xl flex items-center justify-center mx-auto">
          <Anchor size={32} className="text-crew-blue" />
        </div>
        <h1 className="text-2xl font-bold text-navy-800">About RampCrew</h1>
        <p className="text-navy-700 text-sm leading-relaxed max-w-sm mx-auto">
          We're building the easiest way to get your boat on the water — and off it — without the stress.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl p-5 space-y-2 shadow-sm border border-navy-800/10">
        <h2 className="text-navy-800 font-semibold text-base">Our Mission</h2>
        <p className="text-navy-700 text-sm leading-relaxed">
          North Idaho's lakes are some of the most beautiful in the country. But busy summer ramps can turn a perfect day into an hour of stress. RampCrew connects boaters with experienced local helpers who know the ramps, know the water, and know how to get your launch done right.
        </p>
      </div>

      {/* What we offer */}
      <div className="space-y-3">
        <h2 className="text-navy-800 font-semibold text-base">What We Offer</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: <Users size={18} className="text-crew-blue" />, title: 'Concierge Launch Help', desc: 'On-demand helpers at the ramp — launch, load, and everything in between.' },
            { icon: <Shield size={18} className="text-crew-blue" />, title: 'Verified Helpers', desc: 'Every helper is background-checked and verified before joining the platform.' },
            { icon: <MapPin size={18} className="text-crew-blue" />, title: 'Live Ramp Conditions', desc: 'Real-time wait times and surface conditions reported by boaters on the water.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 flex gap-3 items-start shadow-sm border border-navy-800/10">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <div className="text-navy-800 text-sm font-semibold">{item.title}</div>
                <div className="text-navy-700 text-xs mt-0.5 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage */}
      <div className="space-y-3">
        <h2 className="text-navy-800 font-semibold text-base">Where We Operate</h2>
        <p className="text-navy-700 text-xs mb-2">Currently serving North Idaho's premier boating lakes:</p>
        <div className="grid grid-cols-2 gap-2">
          {lakes.map((lake, i) => (
            <div key={i} className="bg-white rounded-xl px-3 py-2 flex items-center gap-2 border border-navy-800/10">
              <MapPin size={12} className="text-crew-blue shrink-0" />
              <span className="text-navy-800 text-xs">{lake}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-3 pb-4">
        <Link
          to="/helpers"
          className="block w-full bg-navy-800 text-white text-center py-3.5 rounded-2xl font-semibold text-sm"
        >
          Become a Helper
        </Link>
        <Link
          to="/contact"
          className="block w-full bg-white text-navy-800 border border-navy-800/20 text-center py-3.5 rounded-2xl font-semibold text-sm"
        >
          Get in Touch
        </Link>
      </div>

    </div>
  )
}
