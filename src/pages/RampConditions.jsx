import React, { useState } from 'react'
import { Waves, Wind, Thermometer, AlertTriangle, CheckCircle, Clock, MapPin, RefreshCw } from 'lucide-react'

const rampData = [
  {
    id: 1,
    name: 'Higgens Point',
    lake: 'Lake Coeur d\'Alene',
    status: 'good',
    wait: '5 min',
    water_temp: '68°F',
    wind: '8 mph NW',
    surface: 'Calm',
    notes: 'Ramp in excellent condition. Plenty of parking.',
    updated: '10 min ago',
  },
  {
    id: 2,
    name: 'City Park Ramp',
    lake: 'Lake Coeur d\'Alene',
    status: 'busy',
    wait: '35 min',
    water_temp: '68°F',
    wind: '10 mph NW',
    surface: 'Slight chop',
    notes: 'Very busy — weekend traffic. Consider Blackwell Island instead.',
    updated: '5 min ago',
  },
  {
    id: 3,
    name: 'Blackwell Island',
    lake: 'Lake Coeur d\'Alene',
    status: 'good',
    wait: '10 min',
    water_temp: '68°F',
    wind: '8 mph NW',
    surface: 'Calm',
    notes: 'Good alternative to City Park. Ramp is clear.',
    updated: '15 min ago',
  },
  {
    id: 4,
    name: 'Sandpoint City Ramp',
    lake: 'Lake Pend Oreille',
    status: 'good',
    wait: '0 min',
    water_temp: '62°F',
    wind: '5 mph S',
    surface: 'Glass',
    notes: 'Perfect conditions. No wait.',
    updated: '8 min ago',
  },
  {
    id: 5,
    name: 'Hayden Lake Ramp',
    lake: 'Hayden Lake',
    status: 'closed',
    wait: 'N/A',
    water_temp: '70°F',
    wind: '12 mph',
    surface: 'N/A',
    notes: 'Ramp under maintenance. Expected to reopen tomorrow.',
    updated: '2 hrs ago',
  },
]

const statusConfig = {
  good: { color: 'text-green-400', bg: 'bg-green-400/10', icon: CheckCircle, label: 'Good' },
  busy: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock, label: 'Busy' },
  closed: { color: 'text-red-400', bg: 'bg-red-400/10', icon: AlertTriangle, label: 'Closed' },
}

export default function RampConditions() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? rampData : rampData.filter(r => r.status === filter)

  return (
    <div className="px-4 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Ramp Conditions</h1>
          <p className="text-gray-400 text-xs mt-0.5">Live updates · refreshed every 10 min</p>
        </div>
        <button className="p-2 bg-white/5 rounded-xl">
          <RefreshCw size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'good', 'busy', 'closed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
              filter === f ? 'bg-crew-blue text-white' : 'bg-white/5 text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ramp Cards */}
      <div className="space-y-3">
        {filtered.map((ramp) => {
          const cfg = statusConfig[ramp.status]
          const StatusIcon = cfg.icon
          return (
            <div key={ramp.id} className="bg-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{ramp.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <MapPin size={10} />
                    {ramp.lake}
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${cfg.bg} ${cfg.color} text-xs font-medium px-2 py-1 rounded-full`}>
                  <StatusIcon size={12} />
                  {cfg.label}
                </div>
              </div>

              {ramp.status !== 'closed' && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500">Wait</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{ramp.wait}</div>
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

              <p className="text-xs text-gray-400">{ramp.notes}</p>
              <div className="text-xs text-gray-600">Updated {ramp.updated}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
