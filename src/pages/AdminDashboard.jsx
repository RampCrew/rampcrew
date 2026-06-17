import React, { useState } from 'react'
import { Users, Calendar, Waves, DollarSign, Shield, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Total Bookings', value: '247', icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Active Helpers', value: '18', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Monthly Revenue', value: '$4,820', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { label: 'Ramps Monitored', value: '17', icon: Waves, color: 'text-teal-400', bg: 'bg-teal-400/10' },
]

const pendingHelpers = [
  { id: 1, name: 'Chris Waldron', location: 'Lake CDA', submitted: '2 hrs ago', status: 'pending' },
  { id: 2, name: 'Amy Flores', location: 'Hayden Lake', submitted: '1 day ago', status: 'pending' },
]

const recentBookings = [
  { id: 1, user: 'R. Thompson', ramp: 'Higgens Point', time: '8:00 AM', status: 'confirmed' },
  { id: 2, user: 'J. Martinez', ramp: 'Blackwell Island', time: '9:00 AM', status: 'confirmed' },
  { id: 3, user: 'K. Wilson', ramp: 'City Park', time: '10:00 AM', status: 'pending' },
  { id: 4, user: 'D. Baker', ramp: 'Sandpoint Ramp', time: '11:00 AM', status: 'confirmed' },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview')
  const [helperStatus, setHelperStatus] = useState({})

  const approveHelper = (id) => setHelperStatus(prev => ({ ...prev, [id]: 'approved' }))
  const rejectHelper = (id) => setHelperStatus(prev => ({ ...prev, [id]: 'rejected' }))

  return (
    <div className="px-4 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-xs mt-0.5">RampCrew Operations Center</p>
        </div>
        <div className="w-8 h-8 bg-crew-blue/20 rounded-full flex items-center justify-center">
          <Shield size={16} className="text-crew-blue" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['overview', 'bookings', 'helpers', 'ramps'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-all ${
              tab === t ? 'bg-crew-blue text-white' : 'bg-white/5 text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
                  <Icon size={20} className={s.color} />
                  <div className="text-xl font-bold text-white mt-2">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              )
            })}
          </div>

          <div className="bg-white/5 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-crew-teal" />
              <span className="text-sm font-semibold text-white">This Week</span>
            </div>
            {[
              { label: 'New Users', value: '+23' },
              { label: 'Completed Jobs', value: '41' },
              { label: 'Helper Applications', value: '5' },
              { label: 'Avg Booking Value', value: '$38' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'bookings' && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Today's Bookings</h2>
          {recentBookings.map((b) => (
            <div key={b.id} className="bg-white/5 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">{b.user}</div>
                <div className="text-xs text-gray-500">{b.ramp} · {b.time}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                b.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
              }`}>
                {b.status}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'helpers' && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Pending Verification</h2>
          {pendingHelpers.map((h) => {
            const status = helperStatus[h.id]
            return (
              <div key={h.id} className="bg-white/5 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{h.name}</div>
                    <div className="text-xs text-gray-500">{h.location} · {h.submitted}</div>
                  </div>
                  {status && (
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      status === 'approved' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                    }`}>
                      {status}
                    </div>
                  )}
                </div>
                {!status && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveHelper(h.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 text-green-400 py-2 rounded-xl text-sm font-medium"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => rejectHelper(h.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-400 py-2 rounded-xl text-sm font-medium"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'ramps' && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Ramp Status Control</h2>
          {[
            { name: 'Higgens Point', status: 'open' },
            { name: 'City Park Ramp', status: 'open' },
            { name: 'Blackwell Island', status: 'open' },
            { name: 'Sandpoint City Ramp', status: 'open' },
            { name: 'Hayden Lake Ramp', status: 'closed' },
          ].map((ramp) => (
            <div key={ramp.name} className="bg-white/5 rounded-2xl p-3 flex items-center justify-between">
              <span className="text-sm text-white">{ramp.name}</span>
              <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                ramp.status === 'open' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
              }`}>
                {ramp.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
