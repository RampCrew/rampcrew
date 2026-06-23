import React, { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const BASE_API = 'https://superagent-9068a6ba.base44.app/functions'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BASE_API}/submitContact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-navy-900 mb-2">Message Sent!</h2>
        <p className="text-navy-900/60 text-sm">We'll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-navy-900 mb-1">Contact Us</h1>
      <p className="text-navy-900/50 text-sm mb-6">Have a question? We'd love to hear from you.</p>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-navy-900/60 uppercase tracking-wide mb-1 block">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full bg-white border border-navy-900/10 rounded-xl text-sm text-navy-900 placeholder-navy-900/30 p-3 outline-none focus:border-navy-900/30"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy-900/60 uppercase tracking-wide mb-1 block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full bg-white border border-navy-900/10 rounded-xl text-sm text-navy-900 placeholder-navy-900/30 p-3 outline-none focus:border-navy-900/30"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy-900/60 uppercase tracking-wide mb-1 block">Message</label>
          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            rows={5}
            className="w-full bg-white border border-navy-900/10 rounded-xl text-sm text-navy-900 placeholder-navy-900/30 p-3 outline-none focus:border-navy-900/30 resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={loading || !form.name || !form.email || !form.message}
          className="w-full bg-navy-900 text-white rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Send size={16} />
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
