

import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"

export default function RewardLevelModal({ isOpen, onClose, onSubmit, initialData, isEdit }) {
  const [referrals, setReferrals] = useState("")
  const [avatar, setAvatar] = useState("")

 useEffect(() => {
  const timer = setTimeout(() => {
    if (initialData) {
      setReferrals(initialData.referrals.toString());
      setAvatar(initialData.avatar);
    } else {
      setReferrals("");
      setAvatar("");
    }
  }, 0);

  return () => clearTimeout(timer); // Cleanup the timer
}, [initialData, isOpen]);


  if (!isOpen) return null

  const handleSubmit = () => {
    if (referrals && avatar) {
      onSubmit({
        referrals: Number.parseInt(referrals),
        avatar,
      })
      setReferrals("")
      setAvatar("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#4A4D55] rounded-2xl w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-medium">{isEdit ? "Edit Reward level" : "Add New Reward Level"}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* Number of Referrals Required */}
        <div className="mb-6">
          <label className="block text-white text-sm font-normal mb-3">Number of Referrals Required</label>
          <input
            type="text"
            placeholder="Type here..."
            value={referrals}
            onChange={(e) => setReferrals(e.target.value)}
            className="w-full bg-[#5A5D66] text-white placeholder-gray-500 px-4 py-3.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reward Avatar */}
        <div className="mb-8">
          <label className="block text-white text-sm font-normal mb-3">Reward Avatar</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search to select"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-[#5A5D66] text-white placeholder-gray-500 pl-4 pr-12 py-3.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {isEdit ? "Save Changes" : "Add Level"}
          </button>
        </div>
      </div>
    </div>
  )
}
