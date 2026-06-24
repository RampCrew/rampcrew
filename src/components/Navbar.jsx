import React from 'react'
import { Anchor } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-white border-b border-navy-800/10 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-navy-800 rounded-xl flex items-center justify-center">
          <Anchor size={16} className="text-white" />
        </div>
        <span className="font-bold text-navy-800 text-lg">RampCrew</span>
        <span className="text-xs text-crew-blue bg-crew-blue/10 px-2 py-0.5 rounded-full">North Idaho</span>
      </div>
    </nav>
  )
}
