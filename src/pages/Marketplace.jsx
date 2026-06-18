import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Shield, UserPlus, CheckCircle, Clock, Search, Camera, FileText, Star, AlertCircle, Users, ChevronRight, MapPin, DollarSign } from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

function sanitize(val) {
  if (typeof val !== 'string') return val
  return val.replace(/[<>"'`]/g, '').trim()
}

const SKILLS = ['Launch & Recovery', 'Trailer Backing', 'Concierge Launch', 'Parking Assist', 'Boat Washing', 'Full Service', 'Dock Assistance', 'Equipment Rental']
const RATES  = ['$25', '$35', '$45', '$50', '$60', '$75', '$85', '$100']
const DAYS   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const LAKES  = ["Lake Coeur d'Alene", 'Lake Pend Oreille', 'Hayden Lake']

// ── Shared UI Atoms ──────────────────────────────────────────
function FileUploadBox({ label, hint, icon: Icon, value, onChange, accept }) {
  const ref = useRef()
  return (
    <div>
      <div className="text-xs text-gray-400 mb-1.5">{label}</div>
      <div
        onClick={() => ref.current.click()}
        className={`w-full border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${value ? 'border-crew-teal/60 bg-crew-teal/5' : 'border-white/10 hover:border-white/20'}`}
      >
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={e => onChange(e.target.files[0])} />
        {value ? (
          <>
            <CheckCircle size={22} className="text-crew-teal" />
            <span className="text-xs text-crew-teal font-medium">{value.name}</span>
            <span className="text-xs text-gray-500">Tap to replace</span>
          </>
        ) : (
          <>
            <Icon size={22} className="text-gray-500" />
            <span className="text-xs text-white font-medium">{hint}</span>
            <span className="text-xs text-gray-500">Tap to upload</span>
          </>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-crew-teal uppercase tracking-wider border-b border-white/5 pb-1">{title}</div>
      {children}
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</div>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-crew-teal/40"
    />
  )
}

// ── Browse Tab ───────────────────────────────────────────────
function BrowseHelpers({ onApply }) {
  return (
    <div className="space-y-5">
      {/* Trust badge */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3 flex items-center gap-3">
        <Shield size={18} className="text-green-400 shrink-0" />
        <p className="text-xs text-gray-300">All helpers are <span className="text-white font-semibold">ID verified</span> and <span className="text-white font-semibold">background checked</span> by RampCrew.</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All Lakes", "Lake CDA", "Pend Oreille", "Hayden Lake"].map(f => (
          <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-white/10 text-gray-400 bg-white/5">
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center text-center py-10 space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
          <Users size={28} className="text-gray-500" />
        </div>
        <div>
          <div className="text-white font-semibold">No helpers listed yet</div>
          <div className="text-gray-500 text-xs mt-1 max-w-xs">
            We're verifying our first batch of helpers for North Idaho. Check back soon — or be the first to apply.
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock size={12} />
          <span>Helpers typically go live within 24–48 hrs of applying</span>
        </div>
      </div>

      {/* Become a helper CTA */}
      <div className="bg-gradient-to-br from-blue-900/60 to-teal-900/40 border border-crew-teal/20 rounded-2xl p-5 space-y-3">
        <div className="font-bold text-white">Are you a local boater?</div>
        <p className="text-xs text-gray-400">Earn money helping others launch. Set your own hours and rate.</p>
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
          <div className="bg-white/5 rounded-xl p-2"><div className="text-white font-semibold">You set</div>your rate</div>
          <div className="bg-white/5 rounded-xl p-2"><div className="text-white font-semibold">Flexible</div>schedule</div>
          <div className="bg-white/5 rounded-xl p-2"><div className="text-white font-semibold">Fast</div>payouts</div>
        </div>
        <button
          onClick={onApply}
          className="w-full bg-crew-blue text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <UserPlus size={16} /> Apply to Be a Helper
        </button>
      </div>
    </div>
  )
}

// ── Apply Tab ────────────────────────────────────────────────
function ApplyForm() {
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [agreed, setAgreed]         = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [idFile, setIdFile]         = useState(null)
  const [photoFile, setPhotoFile]   = useState(null)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedDays, setSelectedDays]     = useState([])

  const [form, setForm] = useState({
    name: '', phone: '', email: '', dob: '',
    address: '', city: '', state: 'ID', zip: '',
    location: '', rate: '', bio: '', experience: '',
    emergencyName: '', emergencyPhone: '',
  })

  function set(field) { return e => setForm(f => ({ ...f, [field]: e.target.value })) }

  function toggleSkill(skill) {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])
  }
  function toggleDay(day) {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }

  const canSubmit = form.name && form.phone && form.email && form.location &&
    form.address && form.city && form.zip && idFile && photoFile && agreed

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const payload = {
        full_name:       sanitize(form.name),
        phone:           sanitize(form.phone),
        email:           sanitize(form.email),
        dob:             sanitize(form.dob),
        address:         sanitize(form.address),
        city:            sanitize(form.city),
        state:           sanitize(form.state),
        zip:             sanitize(form.zip),
        primary_lake:    sanitize(form.location),
        skills:          selectedSkills.join(','),
        experience:      sanitize(form.experience),
        rate:            sanitize(form.rate),
        available_days:  selectedDays.join(','),
        bio:             sanitize(form.bio),
        emergency_name:  sanitize(form.emergencyName),
        emergency_phone: sanitize(form.emergencyPhone),
        id_file_name:    idFile ? idFile.name : '',
        photo_file_name: photoFile ? photoFile.name : '',
      }
      const res = await fetch(`${BASE_API}/submitHelperApplication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 space-y-4">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Application Submitted!</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          We'll review your info and reach out within 24–48 hours. Welcome to the crew!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Verification info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-gray-300 space-y-1">
        <div className="flex items-center gap-2 text-blue-300 font-semibold mb-1">
          <Shield size={13} /> What we verify
        </div>
        <div className="flex items-center gap-2"><CheckCircle size={11} className="text-green-400" /> Government-issued ID</div>
        <div className="flex items-center gap-2"><CheckCircle size={11} className="text-green-400" /> Profile photo match</div>
        <div className="flex items-center gap-2"><CheckCircle size={11} className="text-green-400" /> Background check consent</div>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information">
        <Field label="Full Legal Name" required>
          <TextInput value={form.name} onChange={set('name')} placeholder="John Smith" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone" required>
            <TextInput type="tel" value={form.phone} onChange={set('phone')} placeholder="(208) 555-0100" />
          </Field>
          <Field label="Date of Birth" required>
            <TextInput type="date" value={form.dob} onChange={set('dob')} placeholder="MM/DD/YYYY" />
          </Field>
        </div>
        <Field label="Email" required>
          <TextInput type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
        </Field>
      </Section>

      {/* Address */}
      <Section title="Home Address">
        <Field label="Street Address" required>
          <TextInput value={form.address} onChange={set('address')} placeholder="123 Lake Dr" />
        </Field>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <Field label="City" required>
              <TextInput value={form.city} onChange={set('city')} placeholder="CDA" />
            </Field>
          </div>
          <div className="col-span-1">
            <Field label="State">
              <TextInput value={form.state} onChange={set('state')} placeholder="ID" />
            </Field>
          </div>
          <div className="col-span-1">
            <Field label="ZIP" required>
              <TextInput value={form.zip} onChange={set('zip')} placeholder="83814" />
            </Field>
          </div>
        </div>
      </Section>

      {/* Service Area */}
      <Section title="Service Area">
        <Field label="Primary Lake / Location" required>
          <div className="grid grid-cols-3 gap-2">
            {LAKES.map(loc => (
              <button key={loc} onClick={() => setForm(f => ({ ...f, location: loc }))}
                className={`py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${form.location === loc ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                {loc.replace('Lake ', '').replace("Coeur d'Alene", 'CDA')}
              </button>
            ))}
          </div>
        </Field>
      </Section>

      {/* Skills & Rate */}
      <Section title="Skills & Services">
        <Field label="Services You Offer">
          <div className="grid grid-cols-2 gap-2">
            {SKILLS.map(skill => (
              <button key={skill} onClick={() => toggleSkill(skill)}
                className={`py-2 rounded-xl text-xs font-medium border transition-all ${selectedSkills.includes(skill) ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                {skill}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Years of Boating Experience">
          <div className="grid grid-cols-4 gap-2">
            {['1–2 yrs', '3–5 yrs', '6–10 yrs', '10+ yrs'].map(exp => (
              <button key={exp} onClick={() => setForm(f => ({ ...f, experience: exp }))}
                className={`py-2 rounded-xl text-xs font-medium border transition-all ${form.experience === exp ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                {exp}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Hourly Rate">
          <div className="grid grid-cols-4 gap-2">
            {RATES.map(r => (
              <button key={r} onClick={() => setForm(f => ({ ...f, rate: r }))}
                className={`py-2 rounded-xl text-xs font-medium border transition-all ${form.rate === r ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                {r}/hr
              </button>
            ))}
          </div>
        </Field>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <Field label="Days Available">
          <div className="grid grid-cols-7 gap-1.5">
            {DAYS.map(day => (
              <button key={day} onClick={() => toggleDay(day)}
                className={`py-2 rounded-xl text-xs font-medium border transition-all ${selectedDays.includes(day) ? 'border-crew-teal bg-crew-teal/10 text-crew-teal' : 'border-white/10 text-gray-400'}`}>
                {day}
              </button>
            ))}
          </div>
        </Field>
      </Section>

      {/* ID & Photo */}
      <Section title="Identity Verification">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-yellow-200">
          <AlertCircle size={13} className="shrink-0 mt-0.5" />
          <span>Your documents are encrypted and used only for verification. Never shared publicly.</span>
        </div>
        <FileUploadBox label="Government-Issued ID *" hint="Driver's license, passport, or state ID" icon={FileText} value={idFile} onChange={setIdFile} accept="image/*,.pdf" />
        <FileUploadBox label="Profile Photo *" hint="Clear photo of your face (no sunglasses)" icon={Camera} value={photoFile} onChange={setPhotoFile} accept="image/*" />
      </Section>

      {/* Emergency Contact */}
      <Section title="Emergency Contact">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Contact Name">
            <TextInput value={form.emergencyName} onChange={set('emergencyName')} placeholder="Full name" />
          </Field>
          <Field label="Contact Phone">
            <TextInput type="tel" value={form.emergencyPhone} onChange={set('emergencyPhone')} placeholder="(208) 555-0100" />
          </Field>
        </div>
      </Section>

      {/* Bio */}
      <Section title="About You">
        <Field label="Brief Bio (optional)">
          <textarea value={form.bio} onChange={set('bio')}
            placeholder="Tell boaters about your experience, certifications, time on the water..."
            className="w-full bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 p-3 resize-none h-24 focus:outline-none focus:border-crew-teal/40" />
        </Field>
      </Section>

      {/* Agreement */}
      <div className="bg-white/3 border border-white/10 rounded-xl p-4 space-y-3">
        <div className="text-xs text-gray-400 leading-relaxed">
          By submitting you agree to RampCrew's <Link to="/helper-terms" className="text-crew-teal underline">Helper Terms of Service</Link>, consent to a background check, and confirm all information is accurate.
        </div>
        <button onClick={() => setAgreed(a => !a)} className="flex items-center gap-3 w-full">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${agreed ? 'border-crew-teal bg-crew-teal' : 'border-white/20'}`}>
            {agreed && <CheckCircle size={12} className="text-white" />}
          </div>
          <span className="text-xs text-gray-300 text-left">I agree to the terms and confirm all information is accurate</span>
        </button>
      </div>

      {/* Validation warning */}
      {!canSubmit && (form.name || form.phone) && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-300 flex items-start gap-2">
          <AlertCircle size={13} className="shrink-0 mt-0.5" />
          <span>Still needed: {[!form.name && 'Full name', !form.phone && 'Phone', !form.email && 'Email', !form.address && 'Address', !form.city && 'City', !form.zip && 'ZIP', !form.location && 'Primary lake', !idFile && 'Government ID', !photoFile && 'Profile photo', !agreed && 'Agreement'].filter(Boolean).join(', ')}</span>
        </div>
      )}

      {submitError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-300 flex items-start gap-2">
          <AlertCircle size={13} className="shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <button onClick={handleSubmit} disabled={!canSubmit || submitting}
        className="w-full py-4 rounded-2xl font-semibold text-sm bg-crew-blue text-white disabled:opacity-40 transition-all">
        {submitting ? 'Submitting…' : 'Submit Application'}
      </button>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────
export default function Marketplace() {
  const [tab, setTab] = useState('browse')

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white">Helper Marketplace</h1>
        <p className="text-gray-400 text-sm mt-0.5">Find or become a verified launch helper</p>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-white/5 rounded-2xl p-1 mb-5">
        <button
          onClick={() => setTab('browse')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'browse' ? 'bg-crew-blue text-white shadow' : 'text-gray-400'}`}
        >
          Find a Helper
        </button>
        <button
          onClick={() => setTab('apply')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'apply' ? 'bg-crew-blue text-white shadow' : 'text-gray-400'}`}
        >
          Become a Helper
        </button>
      </div>

      {/* Tab content */}
      {tab === 'browse'
        ? <BrowseHelpers onApply={() => setTab('apply')} />
        : <ApplyForm />
      }
    </div>
  )
}
