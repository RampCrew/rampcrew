import React, { useState } from 'react'
import { LifeBuoy, Clock, CheckCircle, ChevronDown, Phone } from 'lucide-react'

const services = [
  { id: 1, name: 'Full Launch & Recovery', price: '$75', duration: '~45 min', desc: 'We handle everything — backing trailer, launching, docking, and recovery.' },
  { id: 2, name: 'Launch Only', price: '$45', duration: '~20 min', desc: 'Expert help getting your boat in the water safely.' },
  { id: 3, name: 'Recovery Only', price: '$45', duration: '~20 min', desc: 'We load your boat back onto the trailer at end of day.' },
  { id: 4, name: 'Trailer Parking Assist', price: '$25', duration: '~15 min', desc: 'Spotting and guidance for trailer parking at the ramp.' },
]

export default function Concierge() {
  const [selected, setSelected] = useState(null)
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    if (selected) setBooked(true)
  }

  if (booked) {
    return (
      <div className="px-4 py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Concierge Booked!</h2>
        <p className="text-gray-400 text-sm">Your crew will meet you at the ramp. You'll receive a confirmation shortly.</p>
        <button
          onClick={() => { setBooked(false); setSelected(null) }}
          className="mt-4 bg-crew-blue text-white px-6 py-3 rounded-2xl font-semibold"
        >
          Book Another
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Concierge Launch Help</h1>
        <p className="text-gray-400 text-sm mt-1">Professional launch crew — certified, insured, and local.</p>
      </div>

      <div className="bg-crew-blue/10 border border-crew-blue/30 rounded-2xl p-4 flex items-center gap-3">
        <Clock size={18} className="text-crew-teal shrink-0" />
        <p className="text-sm text-gray-300">Typical response time: <span className="text-white font-semibold">15–30 minutes</span></p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Choose a Service</h2>
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`w-full text-left rounded-2xl p-4 border transition-all ${
              selected === s.id
                ? 'bg-crew-blue/20 border-crew-blue'
                : 'bg-white/5 border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{s.name}</span>
              <div className="text-right">
                <div className="text-crew-teal font-bold">{s.price}</div>
                <div className="text-xs text-gray-500">{s.duration}</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-1">{s.desc}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleBook}
        disabled={!selected}
        className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
          selected ? 'bg-crew-blue hover:bg-blue-600' : 'bg-white/10 text-gray-500 cursor-not-allowed'
        }`}
      >
        {selected ? 'Book Concierge Now' : 'Select a Service'}
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <Phone size={14} />
        <span>Or call us: <a href="tel:+12085550100" className="text-crew-teal">(208) 555-0100</a></span>
      </div>

      {/* Disclaimer */}
      <div className="px-1 pt-2 pb-4">
        <p className="text-xs text-gray-600 leading-relaxed text-center">
          RampCrew availability may vary by ramp, date, weather, and helper schedule. RampCrew does not guarantee ramp access, launch timing, or water conditions.
        </p>
      </div>
    </div>
  )
}
