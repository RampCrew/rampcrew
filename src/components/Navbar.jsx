import React from 'react'
import { Link } from 'react-router-dom'
import { Settings, Anchor } from 'lucide-react'

export default function Navbar({ isAdmin, setIsAdmin }) {
  return (
    <nav className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-navy-900 border-b border-blue-900/40 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-crew-blue rounded-full flex items-center justify-center">
          <Anchor size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">RampCrew</span>
        <span className="text-xs text-crew-teal font-medium bg-crew-teal/10 px-2 py-0.5 rounded-full">North Idaho</span>
      </Link>
      <Link to="/admin" className="p-2 rounded-full hover:bg-white/10 transition">
        <Settings size={20} className="text-gray-400" />
      </Link>
    </nav>
  )
}
