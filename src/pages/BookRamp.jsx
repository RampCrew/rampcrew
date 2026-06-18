import React, { useState } from 'react'
import { Calendar, Clock, MapPin, CheckCircle, ChevronDown } from 'lucide-react'
import WaiverModal from '../components/WaiverModal'

const ramps = [
  { id: 1, name: 'Higgens Point Ramp',    lake: "Lake Coeur d'Alene",  slots: 4 },
  { id: 2, name: 'City Park Ramp - CDA', lake: "Lake Coeur d'Alene",  slots: 2 },
  { id: 3, name: 'Blackwell Island',      lake: "Lake Coeur d'Alene",  slots: 6 },
  { id: 4, name: 'Sandpoint City Ramp',   lake: 'Lake Pend Oreille',   slots: 3 },
  { id: 5, name: 'Hope Ramp',             lake: 'Lake Pend Oreille',   slots: 5 },
  { id: 6, name: 'Hayden Lake Ramp',      lake: 'Hayden Lake',         slots: 4 },
]

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

export default function BookRamp() {
  const [selectedRamp, setSelectedRamp] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)
  const [showWaiver, setShowWaiver]     = useState(false)
  const [booked, setBooked]             = useState(false)

  const ramp = ramps.find(r => r.id === selectedRamp)
  const canBook = selectedRamp && selectedDate && selectedTime

  // Tapping Confirm opens the waiver
  function handleConfirmClick() {
    if (canBook) setShowWaiver(true)
  }

  // User agreed to waiver → complete booking
  function handleWaiverAgree() {
    setShowWaiver(false)
    setBooked(true)
  }

  // ── Confirmation screen ────────────────────────────────────────────────────
  if (booked) {
    return (
      <div className="px-4 py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Ramp Slot Booked!</h2>
        <div className="bg-white/5 rounded-2xl p-4 w-full text-left space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-crew-teal" />
            <span className="text-gray-300">{ramp?.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-crew-teal" />
            <span className="text-gray-300">{selectedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} className="text-crew-teal" />
            <span className="text-gray-300">{selectedTime}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">Your liability waiver was recorded at {new Date().toLocaleString()}.</p>
        <button
          onClick={() => { setBooked(false); setSelectedRamp(null); setSelectedDate(''); setSelectedTime(null) }}
          className="mt-2 bg-crew-blue text-white px-6 py-3 rounded-2xl font-semibold"
        >
          Book Another Slot
        </button>
      </div>
    )
  }

  // ── Booking form ───────────────────────────────────────────────────────────
  return (
    <>
      {showWaiver && (
        <WaiverModal
          title="Before We Assign Your Helper"
          onAgree={handleWaiverAgree}
          onCancel={() => setShowWaiver(false)}
        />
      )}

      <div className="px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white">Book a Ramp Slot</h1>
          <p className="text-gray-400 text-sm mt-1">Reserve your launch time. No more waiting in line.</p>
        </div>

        {/* Ramp Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Select Ramp</label>
          <div className="space-y-2">
            {ramps.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRamp(r.id)}
                className={`w-full text-left rounded-2xl p-3 border transition-all ${
                  selectedRamp === r.id ? 'bg-crew-blue/20 border-crew-blue' : 'bg-white/5 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.lake}</div>
                  </div>
                  <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                    {r.slots} slots open
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-crew-blue"
          />
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedTime === time ? 'bg-crew-blue text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleConfirmClick}
          disabled={!canBook}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
            canBook ? 'bg-crew-blue hover:bg-blue-600' : 'bg-white/10 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirm Booking
        </button>

        {/* Safety Rules */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>⚠️</span> Safety Rules
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            RampCrew helpers assist with guidance, preparation, dock support, and launch/load coordination.{' '}
            <span className="text-white font-semibold">Boat owners remain responsible for operating their vehicle, trailer, and vessel.</span>
          </p>
          <p className="text-xs text-amber-300/80 leading-relaxed">
            Helpers do not drive trucks, back trailers, or operate boats on behalf of customers.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="px-1 pt-2 pb-4">
          <p className="text-xs text-gray-600 leading-relaxed text-center">
            A liability waiver must be agreed to before any helper is assigned. RampCrew does not guarantee ramp access, launch timing, or water conditions.
          </p>
        </div>
      </div>
    </>
  )
}
