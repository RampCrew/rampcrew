import React, { useState } from 'react'
import { Shield, X, ChevronDown } from 'lucide-react'

const WAIVER_TEXT = `RELEASE OF LIABILITY, WAIVER OF CLAIMS, AND INDEMNIFICATION AGREEMENT

Last updated: June 2026

PLEASE READ THIS ENTIRE AGREEMENT CAREFULLY BEFORE PROCEEDING. BY TAPPING "I AGREE," YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND VOLUNTARILY AGREE TO BE BOUND BY ALL TERMS BELOW.

1. PARTIES
"RampCrew" refers to RampCrew LLC, its owners, officers, employees, independent contractors, volunteers, helpers, agents, and assigns. "You" or "User" refers to the person requesting helper services and/or booking a ramp slot through the RampCrew platform.

2. NATURE OF SERVICES
RampCrew helpers provide dock assistance, launch guidance, coordination support, and load/unload spotting only. Helpers do not:
• Drive, operate, or control your vehicle, truck, or SUV
• Back your trailer into the water on your behalf
• Operate, pilot, or board your boat
• Make decisions about water safety or launch suitability

You remain in full control of and fully responsible for your vehicle, trailer, and vessel at all times.

3. ASSUMPTION OF RISK
You acknowledge that boating, boat ramp use, trailer operation, and water activities involve inherent risks, including but not limited to: personal injury, death, property damage or loss, equipment failure, adverse weather, and unpredictable water conditions. You voluntarily assume all such risks.

4. RELEASE OF LIABILITY
To the fullest extent permitted by law, you release, waive, and forever discharge RampCrew, its helpers, and all associated parties from any and all claims, demands, actions, or liability arising out of or related to:
• Your use of RampCrew services
• Any injury to you or your passengers
• Damage to your vehicle, trailer, boat, or equipment
• Any accident, collision, sinking, or loss occurring at or near the ramp

This release applies whether or not the claim arises from the negligence of RampCrew or its helpers.

5. INDEMNIFICATION
You agree to indemnify and hold harmless RampCrew and its helpers from any claims, damages, costs, or expenses (including reasonable legal fees) arising from your use of the service or your breach of this agreement.

6. HELPER INDEPENDENT CONTRACTOR STATUS
RampCrew helpers are independent contractors, not employees of RampCrew. RampCrew does not guarantee the availability, qualifications, or actions of any individual helper.

7. NO WARRANTIES
RampCrew services are provided "as is." RampCrew makes no warranty that services will be available, uninterrupted, or error-free. Ramp conditions, water levels, and access may change without notice.

8. GOVERNING LAW
This agreement is governed by the laws of the State of Idaho. Any disputes shall be resolved in Kootenai County, Idaho.

9. SEVERABILITY
If any portion of this agreement is found unenforceable, the remaining provisions continue in full force.

By tapping "I Agree & Continue," you confirm you are 18 years of age or older, you have read and understood this entire agreement, and you voluntarily accept its terms.`

export default function WaiverModal({ onAgree, onCancel, title = 'Before We Connect You with a Helper' }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const [checked, setChecked] = useState(false)

  function handleScroll(e) {
    const el = e.target
    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 40
    if (atBottom) setScrolledToBottom(true)
  }

  const canAgree = scrolledToBottom && checked

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px 24px 0 0',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', background: 'rgba(96,165,250,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={18} color="#60a5fa" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9' }}>{title}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Read and agree to continue</div>
              </div>
            </div>
            <button onClick={onCancel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
              <X size={18} color="#475569" />
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        {!scrolledToBottom && (
          <div style={{ background: 'rgba(96,165,250,0.08)', borderBottom: '1px solid rgba(96,165,250,0.15)', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <ChevronDown size={13} color="#60a5fa" />
            <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 500 }}>Scroll to the bottom to continue</span>
          </div>
        )}

        {/* Waiver text */}
        <div
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            fontSize: '11.5px',
            lineHeight: '1.7',
            color: '#94a3b8',
            whiteSpace: 'pre-wrap',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {WAIVER_TEXT}
          <div style={{ height: '8px' }} />
        </div>

        {/* Checkbox + Agree button */}
        <div style={{ padding: '16px 20px 28px', borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0f172a', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
            <div
              onClick={() => scrolledToBottom && setChecked(c => !c)}
              style={{
                width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                border: `2px solid ${checked ? '#3b82f6' : '#334155'}`,
                background: checked ? '#3b82f6' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: scrolledToBottom ? 'pointer' : 'not-allowed',
                opacity: scrolledToBottom ? 1 : 0.4,
                transition: 'all 0.15s',
              }}
            >
              {checked && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>
              I confirm I am 18 or older, I have read and understood this Release of Liability, and I voluntarily accept all terms.
            </span>
          </label>

          <button
            onClick={() => canAgree && onAgree()}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              border: 'none',
              fontWeight: 700,
              fontSize: '14px',
              cursor: canAgree ? 'pointer' : 'not-allowed',
              background: canAgree ? '#3b82f6' : 'rgba(255,255,255,0.06)',
              color: canAgree ? '#fff' : '#475569',
              transition: 'all 0.2s',
            }}
          >
            {canAgree ? 'I Agree & Continue →' : 'Scroll to bottom to enable'}
          </button>

          <p style={{ fontSize: '10px', color: '#334155', textAlign: 'center', lineHeight: '1.5' }}>
            Your agreement is recorded with a timestamp. This does not create a membership or charge.
          </p>
        </div>
      </div>
    </div>
  )
}
