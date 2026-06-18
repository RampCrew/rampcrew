import React from 'react'
import { Anchor } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-navy-900/95 backdrop-blur-sm border-b border-blue-900/40 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-crew-blue rounded-xl flex items-center justify-center">
          <Anchor size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-lg">RampCrew</span>
        <span className="text-xs text-crew-teal bg-crew-teal/10 px-2 py-0.5 rounded-full">North Idaho</span>
      </div>
    </nav>
  )
}
