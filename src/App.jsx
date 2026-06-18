import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Concierge from './pages/Concierge'
import BookRamp from './pages/BookRamp'
import RampConditions from './pages/RampConditions'
import Marketplace from './pages/Marketplace'
import RampMap from './pages/RampMap'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white max-w-md mx-auto relative">
      <Navbar />
      <main className="pb-20 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/book" element={<BookRamp />} />
          <Route path="/conditions" element={<RampConditions />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/map" element={<RampMap />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
