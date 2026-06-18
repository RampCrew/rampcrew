import React, { useState } from 'react'
import { Shield, UserPlus, CheckCircle, Clock, ChevronRight } from 'lucide-react'

export default function Marketplace() {
  const [showSignup, setShowSignup] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', location: '', skills: '', rate: '', bio: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function set(field) {
    return (e) => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit() {
    if (!form.name || !form.phone || !form.location) return
    setSubmitting(true)
    // Store via backend — for now we just show success and will wire to DB
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="px-4 py-16 flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Application Received!</h2>
        <p className="text-gray-400 text-sm max-w-xs">We'll review your info and reach out within 24 hours to complete ID and photo verification.</p>
        <button onClick={() => { setSubmitted(false); setShowSignup(false); setForm({ name: '', phone: '', location: '', skills: '', rate: '', bio: '' }) }}
          className="mt-4 bg-white/10 text-white px-6 py-3 rounded-2xl text-sm font-semibold">
          Back to Marketplace
        </button>
      </div>
    )
  }

  if (showSignup) {
    return (
      <div className="px-4 py-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSignup(false)} className="p-2 bg-white/5 rounded-xl">
            <ChevronRight size={16} className="text-gray-400 rotate-180" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Become a Helper</h1>
            <p className="text-xs text-gray-400">Apply to list on the RampCrew marketplace</p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-gray-300 space-y-1">
          <div className="font-semibold text-white mb-1">Verification required</div>
          <div>✓ Government ID check</div>
          <div>✓ Photo verification</div>
          <div>✓ Background review</div>
          <div className="text-gray-400 pt-1">We'll contact you after submission to complete verification.</div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Full Name *', field: 'name', placeholder: 'Your full legal name' },
            { label: 'Phone Number *', field: 'phone', placeholder: 'e.g. (208) 555-0100' },
          ].map(({ label, field, placeholder }) => (
            <div key={field}>
              <div className="text-xs text-gray-400 mb-1.5">{label}</div>
              <input value={form[field]} onChange={set(field)} placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 px-4 py-3" />
            </div>
          ))}

          <div>
            <div className="text-xs text-gray-400 mb-1.5">Primary Lake / Location *</div>
            <div className="grid grid-cols-3 gap-2">
              {["Lake Coeur d'Alene", 'Lake Pend Oreille', 'Hayden Lake'].map(loc => (
                <button key={loc} onClick={() => setForm(f => ({ ...f, location: loc }))}
                  className={`py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${form.location === loc ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                  {loc.replace('Lake ', '').replace("Coeur d'Alene", "CDA")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-1.5">Skills / Services</div>
            <div className="grid grid-cols-2 gap-2">
              {['Launch & Recovery', 'Trailer Backing', 'Concierge Launch', 'Parking Assist', 'Boat Washing', 'Full Service'].map(skill => {
                const selected = form.skills.includes(skill)
                return (
                  <button key={skill} onClick={() => setForm(f => ({
                    ...f,
                    skills: selected ? f.skills.replace(skill + ',', '').replace(',' + skill, '').replace(skill, '') : (f.skills ? f.skills + ',' + skill : skill)
                  }))}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${selected ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                    {skill}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-1.5">Hourly Rate</div>
            <div className="grid grid-cols-4 gap-2">
              {['$25', '$35', '$45', '$50', '$60', '$75'].map(r => (
                <button key={r} onClick={() => setForm(f => ({ ...f, rate: r }))}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all ${form.rate === r ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                  {r}/hr
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-1.5">Brief bio (optional)</div>
            <textarea value={form.bio} onChange={set('bio')} placeholder="Tell boaters about your experience..."
              className="w-full bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 p-3 resize-none h-20" />
          </div>

          <button onClick={handleSubmit} disabled={!form.name || !form.phone || !form.location || submitting}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-crew-blue text-white disabled:opacity-40 transition-all">
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </div>
    )
  }

  // Empty state — no fake helpers
  return (
    <div className="px-4 py-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Helper Marketplace</h1>
        <p className="text-gray-400 text-sm mt-1">Verified local helpers — ID checked, photo verified.</p>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3 flex items-center gap-3">
        <Shield size={18} className="text-green-400 shrink-0" />
        <p className="text-xs text-gray-300">All helpers are <span className="text-white font-semibold">ID verified</span> and <span className="text-white font-semibold">photo checked</span> by RampCrew before listing.</p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center text-center py-10 space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
          <UserPlus size={28} className="text-gray-500" />
        </div>
        <div>
          <div className="text-white font-semibold">No helpers listed yet</div>
          <div className="text-gray-500 text-xs mt-1 max-w-xs">We're verifying our first batch of helpers for North Idaho. Check back soon — or be the first to apply.</div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-blue-900/60 to-teal-900/40 border border-crew-teal/20 rounded-2xl p-5 space-y-3">
        <div className="font-bold text-white">Are you a local boater?</div>
        <p className="text-xs text-gray-400">Earn money helping others launch. Set your own hours and rate. RampCrew handles booking and payment.</p>
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
          <div className="bg-white/5 rounded-xl p-2"><div className="text-white font-semibold">You set</div>your rate</div>
          <div className="bg-white/5 rounded-xl p-2"><div className="text-white font-semibold">Flexible</div>schedule</div>
          <div className="bg-white/5 rounded-xl p-2"><div className="text-white font-semibold">Fast</div>payouts</div>
        </div>
        <button onClick={() => setShowSignup(true)}
          className="w-full bg-crew-blue text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
          <UserPlus size={16} /> Apply to Be a Helper
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Clock size={12} />
        <span>Helpers typically go live within 24–48 hrs of applying</span>
      </div>
    </div>
  )
}
