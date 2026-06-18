import React, { useState, useEffect } from 'react'
import { Users, Calendar, Waves, DollarSign, Shield, CheckCircle, XCircle, AlertTriangle, LogOut, RefreshCw, Flag } from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

const tabs = ['Overview', 'Helpers', 'Ramps', 'Reports']

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('Overview')
  const [rampReports, setRampReports] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchReports() {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_API}/getRampConditions`)
      const json = await res.json()
      setRampReports(json.conditions || {})
    } catch (e) {}
    setLoading(false)
  }

  useEffect(() => { fetchReports() }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center justify-between border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">RampCrew Operations Center</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-2 rounded-xl">
          <LogOut size={13} /> Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${tab === t ? 'bg-crew-blue text-white' : 'bg-white/5 text-gray-400'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 py-5 space-y-4">

        {/* OVERVIEW */}
        {tab === 'Overview' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Bookings',    value: '0', icon: Calendar,    color: 'text-blue-400',   bg: 'bg-blue-400/10' },
                { label: 'Active Helpers',    value: '0', icon: Users,       color: 'text-green-400',  bg: 'bg-green-400/10' },
                { label: 'Monthly Revenue',   value: '$0', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                { label: 'Ramps Monitored',   value: '6', icon: Waves,       color: 'text-teal-400',   bg: 'bg-teal-400/10' },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white/5 rounded-2xl p-4 space-y-2">
                  <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center`}>
                    <Icon size={16} className={color} />
                  </div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <div className="font-semibold text-white text-sm mb-3">Platform Status</div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between"><span>Total Bookings</span><span className="text-white">0</span></div>
                <div className="flex justify-between"><span>Completed Jobs</span><span className="text-white">0</span></div>
                <div className="flex justify-between"><span>Helper Applications</span><span className="text-white">0</span></div>
                <div className="flex justify-between"><span>Avg Booking Value</span><span className="text-white">—</span></div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Live data will populate as bookings and applications come in.</p>
            </div>
          </>
        )}

        {/* HELPERS */}
        {tab === 'Helpers' && (
          <div className="space-y-3">
            <div className="bg-white/5 rounded-2xl p-5 flex flex-col items-center text-center gap-3">
              <Users size={32} className="text-gray-500" />
              <div className="text-white font-semibold">No helper applications yet</div>
              <p className="text-xs text-gray-500 max-w-xs">When boaters apply through the app, they'll appear here for review and ID verification.</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-gray-300 space-y-1">
              <div className="font-semibold text-white mb-1">Verification checklist</div>
              <div className="flex items-center gap-2"><Shield size={11} className="text-blue-400" /> Government ID review</div>
              <div className="flex items-center gap-2"><Shield size={11} className="text-blue-400" /> Photo match confirmation</div>
              <div className="flex items-center gap-2"><Shield size={11} className="text-blue-400" /> Background check</div>
            </div>
          </div>
        )}

        {/* RAMPS */}
        {tab === 'Ramps' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Live Ramp Status</div>
              <button onClick={fetchReports} className="p-2 bg-white/5 rounded-xl">
                <RefreshCw size={13} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {[
              { id: 1, name: 'Higgens Point',       lake: "Lake CDA" },
              { id: 2, name: 'City Park Ramp',      lake: "Lake CDA" },
              { id: 3, name: 'Blackwell Island',    lake: "Lake CDA" },
              { id: 4, name: 'Sandpoint City Ramp', lake: 'Lake Pend Oreille' },
              { id: 5, name: 'Hope Ramp',           lake: 'Lake Pend Oreille' },
              { id: 6, name: 'Hayden Lake Ramp',    lake: 'Hayden Lake' },
            ].map(ramp => {
              const live = rampReports[ramp.id]
              const status = live?.status || 'no data'
              const dot = { good: 'bg-green-400', busy: 'bg-yellow-400', closed: 'bg-red-400' }[status] || 'bg-gray-600'
              return (
                <div key={ramp.id} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white font-medium">{ramp.name}</div>
                    <div className="text-xs text-gray-500">{ramp.lake}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${dot}`} />
                      <span className="text-xs text-gray-300 capitalize">{status}</span>
                    </div>
                    {live && <span className="text-xs text-gray-600">{live.report_count} report{live.report_count !== 1 ? 's' : ''}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* REPORTS */}
        {tab === 'Reports' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Crowd Reports (last 2hrs)</div>
              <button onClick={fetchReports} className="p-2 bg-white/5 rounded-xl">
                <RefreshCw size={13} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {Object.keys(rampReports).length === 0 ? (
              <div className="bg-white/5 rounded-2xl p-5 flex flex-col items-center text-center gap-3">
                <Flag size={28} className="text-gray-500" />
                <div className="text-white font-semibold">No reports in the last 2 hours</div>
                <p className="text-xs text-gray-500">Boater condition reports will appear here in real time.</p>
              </div>
            ) : (
              Object.entries(rampReports).map(([id, data]) => data && (
                <div key={id} className="bg-white/5 rounded-xl px-4 py-3 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">Ramp #{id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                      data.status === 'good' ? 'bg-green-400/10 text-green-400' :
                      data.status === 'busy' ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>{data.status}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {data.report_count} report{data.report_count !== 1 ? 's' : ''} · {data.wait_minutes != null ? `${data.wait_minutes} min avg wait` : 'no wait data'} · {data.surface || ''}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}
