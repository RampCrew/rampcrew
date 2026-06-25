import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

export default function HelperTerms() {
  const navigate = useNavigate()

  return (
    <div className="px-4 py-6 pb-24 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 bg-white border border-navy-800/10 shadow-sm rounded-xl">
          <ArrowLeft size={16} className="text-navy-700" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-navy-800">Helper Terms of Service</h1>
          <p className="text-xs text-navy-700/70">Effective June 1, 2026</p>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3 flex items-center gap-3">
        <Shield size={16} className="text-blue-400 shrink-0" />
        <p className="text-xs text-navy-700">Please read these terms carefully before submitting your helper application.</p>
      </div>

      {[
        {
          title: '1. Eligibility',
          body: `To become a RampCrew Helper you must be at least 18 years of age, hold a valid government-issued ID, be legally authorized to work in the United States, and reside in or regularly operate in the North Idaho service area (Lake Coeur d'Alene, Lake Pend Oreille, or Hayden Lake).`,
        },
        {
          title: '2. Identity Verification & Background Check',
          body: `By applying, you consent to RampCrew verifying your identity using the government-issued ID and profile photo you provide. You also consent to a third-party background check. Helpers who do not pass verification will not be listed on the platform. All documents are encrypted and stored securely — they are never displayed publicly.`,
        },
        {
          title: '3. Independent Contractor Status',
          body: `You are an independent contractor, not an employee of RampCrew. You are responsible for your own taxes, insurance, and compliance with applicable laws. RampCrew does not withhold taxes on your behalf. Nothing in these terms creates an employment, partnership, or agency relationship.`,
        },
        {
          title: '4. Services & Conduct',
          body: `You agree to provide services in a professional, safe, and courteous manner. You must not operate boats, trailers, or equipment you are not qualified to handle. You must not be under the influence of alcohol or drugs while performing services. Harassment, discrimination, or unsafe behavior of any kind is grounds for immediate removal from the platform.`,
        },
        {
          title: '5. Rates & Payment',
          body: `You set your own hourly rate. RampCrew facilitates payments between you and customers. A platform service fee is deducted from each transaction. Payouts are processed within 3–5 business days of service completion. You are responsible for ensuring your payment information is accurate.`,
        },
        {
          title: '6. Liability & Insurance',
          body: `RampCrew is not liable for any injury, property damage, or loss that occurs during the performance of your services. You are strongly encouraged to carry personal liability insurance. By accepting a booking, you assume responsibility for the safe handling of the customer's property.`,
        },
        {
          title: '8. Cancellations',
          body: `Repeated cancellations or no-shows may result in your listing being suspended or removed. If you need to cancel a confirmed booking, you must do so at least 2 hours in advance through the RampCrew platform and notify the customer promptly.`,
        },
        {
          title: '9. Termination',
          body: `RampCrew reserves the right to suspend or remove any helper from the platform at any time, with or without cause, including but not limited to: failed background check, customer complaints, policy violations, or inactivity for more than 90 days.`,
        },
        {
          title: '10. Privacy',
          body: `Your personal information is collected solely for the purpose of operating the RampCrew platform. We do not sell your data to third parties. Your ID documents are deleted after verification is complete. For full details, see our Privacy Policy.`,
        },
        {
          title: '11. Amendments',
          body: `RampCrew may update these terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the updated terms. We will notify active helpers of material changes via email.`,
        },
        {
          title: '12. Contact',
          body: `For questions about these terms, reach us through the Contact page.`,
        },
      ].map(({ title, body }) => (
        <div key={title} className="space-y-1.5">
          <div className="text-sm font-semibold text-navy-800">{title}</div>
          <p className="text-xs text-navy-700 leading-relaxed">{body}</p>
        </div>
      ))}

      <div className="text-xs text-navy-700/60 pt-4 border-t border-navy-800/10">
        © 2026 RampCrew. All rights reserved. North Idaho, USA.
      </div>
    </div>
  )
}
