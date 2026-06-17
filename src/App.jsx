import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Concierge from './pages/Concierge'
import BookRamp from './pages/BookRamp'
import RampConditions from './pages/RampConditions'
import Marketplace from './pages/Marketplace'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-navy-900 text-white max-w-md mx-auto relative">
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="pb-20 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/book" element={<BookRamp />} />
          <Route path="/conditions" element={<RampConditions />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
