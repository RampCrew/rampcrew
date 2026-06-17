import React from 'react'
import { Link } from 'react-router-dom'
import { LifeBuoy, Calendar, Waves, Users, ChevronRight, MapPin, Star } from 'lucide-react'

const modules = [
  {
    path: '/concierge',
    icon: LifeBuoy,
    title: 'Concierge Launch Help',
    desc: 'Expert help getting your boat in and out of the water',
    color: 'from-blue-600 to-blue-800',
    badge: 'Most Popular',
  },
  {
    path: '/book',
    icon: Calendar,
    title: 'Book a Ramp Slot',
    desc: 'Reserve your launch time — no more waiting in line',
    color: 'from-teal-600 to-teal-800',
    badge: null,
  },
  {
    path: '/conditions',
    icon: Waves,
    title: 'Ramp Conditions',
    desc: 'Live updates on ramp status, water levels & wait times',
    color: 'from-cyan-600 to-cyan-800',
    badge: 'Live',
  },
  {
    path: '/marketplace',
    icon: Users,
    title: 'Helper Marketplace',
    desc: 'Hire verified local helpers for your launch day',
    color: 'from-orange-600 to-orange-800',
    badge: null,
  },
]

const lakes = [
  { name: 'Lake Coeur d\'Alene', ramps: 8, helpers: 24 },
  { name: 'Lake Pend Oreille', ramps: 6, helpers: 18 },
  { name: 'Hayden Lake', ramps: 3, helpers: 9 },
]

export default function Home() {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Hero */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-crew-blue/20 text-crew-teal text-xs font-medium px-3 py-1 rounded-full">
          <MapPin size={12} />
          North Idaho Lakes
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          Your Boat Launch,<br />
          <span className="text-crew-teal">Done Right.</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Concierge help, ramp booking, live conditions & verified helpers — all in one app.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: '3', label: 'Lakes Covered' },
          { value: '17+', label: 'Ramp Sites' },
          { value: '51+', label: 'Verified Helpers' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-2xl p-3 text-center">
            <div className="text-xl font-bold text-crew-teal">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
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
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{title}</span>
                    {badge && (
                      <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{badge}</span>
                    )}
                  </div>
                  <p className="text-white/70 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/50 group-hover:text-white transition" />
            </div>
          </Link>
        ))}
      </div>

      {/* Lakes */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Coverage Areas</h2>
        {lakes.map((lake) => (
          <div key={lake.name} className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Waves size={14} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">{lake.name}</div>
                <div className="text-xs text-gray-500">{lake.ramps} ramps · {lake.helpers} helpers</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={12} fill="currentColor" />
              <span className="text-xs text-gray-400">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
