import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Waves, Calendar, Map, Users } from 'lucide-react'

const tabs = [
  { path: '/',           icon: Home,     label: 'Home' },
  { path: '/conditions', icon: Waves,    label: 'Boat Ramps' },
  { path: '/book',       icon: Calendar, label: 'Book' },
  { path: '/map',        icon: Map,      label: 'Map' },
  { path: '/helpers',    icon: Users,    label: 'Helpers' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white border-t border-navy-800/10 px-2 py-2 shadow-sm">
      <div className="flex justify-around items-center">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                active ? 'text-crew-blue font-bold' : 'text-navy-800'
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
