import React, { useState } from 'react'
import { Star, Shield, CheckCircle, MapPin, Clock, Filter } from 'lucide-react'

const helpers = [
  {
    id: 1,
    name: 'Jake Morrison',
    rating: 4.9,
    reviews: 87,
    location: 'Lake Coeur d\'Alene',
    specialties: ['Launch & Recovery', 'Trailer Backing'],
    rate: '$45/hr',
    verified: true,
    available: true,
    bio: 'Boating on CDA for 15 years. Former marina staff at Hagadone Marine.',
    jobs: 213,
  },
  {
    id: 2,
    name: 'Sarah Tanner',
    rating: 4.8,
    reviews: 64,
    location: 'Lake Coeur d\'Alene',
    specialties: ['Concierge Launch', 'Parking Assist'],
    rate: '$40/hr',
    verified: true,
    available: true,
    bio: 'Certified boating safety instructor. 10+ years on North Idaho lakes.',
    jobs: 158,
  },
  {
    id: 3,
    name: 'Mike Deluca',
    rating: 4.7,
    reviews: 41,
    location: 'Lake Pend Oreille',
    specialties: ['Full Service Launch', 'Boat Washing'],
    rate: '$50/hr',
    verified: true,
    available: false,
    bio: 'Based in Sandpoint. Available weekends year-round.',
    jobs: 97,
  },
  {
    id: 4,
    name: 'Tom Bridger',
    rating: 4.6,
    reviews: 29,
    location: 'Hayden Lake',
    specialties: ['Launch Only', 'Recovery Only'],
    rate: '$35/hr',
    verified: true,
    available: true,
    bio: 'Hayden Lake local. Fast, reliable, and friendly.',
    jobs: 62,
  },
]

export default function Marketplace() {
  const [selected, setSelected] = useState(null)
  const [hired, setHired] = useState(false)

  if (hired) {
    const helper = helpers.find(h => h.id === selected)
    return (
      <div className="px-4 py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Helper Hired!</h2>
        <p className="text-gray-400 text-sm">{helper?.name} has been notified and will confirm shortly.</p>
        <button
          onClick={() => { setHired(false); setSelected(null) }}
          className="mt-4 bg-crew-blue text-white px-6 py-3 rounded-2xl font-semibold"
        >
          Back to Helpers
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Helper Marketplace</h1>
        <p className="text-gray-400 text-sm mt-1">Verified local helpers — ID checked, photo verified.</p>
      </div>

      {/* Verification Badge */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3 flex items-center gap-3">
        <Shield size={18} className="text-green-400 shrink-0" />
        <p className="text-xs text-gray-300">All helpers are <span className="text-white font-semibold">ID verified</span> and <span className="text-white font-semibold">photo checked</span> by RampCrew before listing.</p>
      </div>

      {/* Helper Cards */}
      <div className="space-y-3">
        {helpers.map((helper) => (
          <div
            key={helper.id}
            className={`bg-white/5 rounded-2xl p-4 space-y-3 border transition-all ${
              selected === helper.id ? 'border-crew-blue' : 'border-transparent'
            }`}
            onClick={() => setSelected(helper.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                  {helper.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white text-sm">{helper.name}</span>
                    {helper.verified && <Shield size={12} className="text-green-400" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={10} />
                    {helper.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-crew-teal font-bold text-sm">{helper.rate}</div>
                <div className={`text-xs mt-0.5 ${helper.available ? 'text-green-400' : 'text-gray-500'}`}>
                  {helper.available ? '● Available' : '○ Busy'}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400">{helper.bio}</p>

            <div className="flex flex-wrap gap-1.5">
              {helper.specialties.map((s) => (
                <span key={s} className="text-xs bg-crew-blue/20 text-crew-teal px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" fill="currentColor" />
                <span className="text-sm font-semibold text-white">{helper.rating}</span>
                <span className="text-xs text-gray-500">({helper.reviews} reviews)</span>
              </div>
              <span className="text-xs text-gray-500">{helper.jobs} jobs done</span>
            </div>

            {selected === helper.id && helper.available && (
              <button
                onClick={() => setHired(true)}
                className="w-full bg-crew-blue text-white py-3 rounded-xl font-semibold text-sm"
              >
                Hire {helper.name.split(' ')[0]}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
