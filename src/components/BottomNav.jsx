import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, Waves, Users, LifeBuoy } from 'lucide-react'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/concierge', icon: LifeBuoy, label: 'Concierge' },
  { path: '/book', icon: Calendar, label: 'Book Ramp' },
  { path: '/conditions', icon: Waves, label: 'Conditions' },
  { path: '/marketplace', icon: Users, label: 'Helpers' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-navy-900 border-t border-blue-900/40 px-2 py-2">
      <div className="flex justify-around items-center">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                active ? 'text-crew-teal bg-crew-teal/10' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
