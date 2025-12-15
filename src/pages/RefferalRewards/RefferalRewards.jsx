
import { useState } from "react"
import { Search, Plus, Star, Pencil, Trash2 } from "lucide-react"
import RewardLevelModal from "../../components/RewardLevel/RewardLevelModal"


export default function RefferalRewards() {
  const [rewardLevels, setRewardLevels] = useState([
    { id: "1", referrals: 10, avatar: "Master" },
    { id: "2", referrals: 10, avatar: "Master" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLevel, setEditingLevel] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddLevel = (data) => {
    const newLevel = {
      id: Date.now().toString(),
      referrals: data.referrals,
      avatar: data.avatar,
    }
    setRewardLevels([...rewardLevels, newLevel])
    setIsModalOpen(false)
  }

  const handleEditLevel = (data) => {
    if (editingLevel) {
      setRewardLevels(
        rewardLevels.map((level) =>
          level.id === editingLevel.id ? { ...level, referrals: data.referrals, avatar: data.avatar } : level
        )
      )
      setEditingLevel(null)
      setIsModalOpen(false)
    }
  }

  const handleDeleteLevel = (id) => {
    setRewardLevels(rewardLevels.filter((level) => level.id !== id))
  }

  const openAddModal = () => {
    setEditingLevel(null)
    setIsModalOpen(true)
  }

  const openEditModal = (level) => {
    setEditingLevel(level)
    setIsModalOpen(true)
  }

  return (
    <div className="p-8 font-poppins">
      <div className="">
 <div className="flex items-center justify-between mb-8">
  {/* "Referral Reward" */}
  <div>
    <p className="text-xl font-medium text-white">Referral Reward</p>
  </div>

  {/* Right side: Search and Add Reward Level button */}
  <div className="flex items-center gap-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      onClick={openAddModal}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
    >
      <Plus className="w-5 h-5" />
      Add Reward Level
    </button>
  </div>
</div>

        {/* Reward Levels List */}
        <div className="space-y-3">
          {rewardLevels.map((level) => (
            <div key={level.id} className="bg-[#3D4046] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2C2E33] flex items-center justify-center">
                  <Star className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-base">{level.referrals} Referrals</h3>
                  <p className="text-gray-400 text-sm">
                    Earn <span className="text-blue-500 font-medium">{level.avatar}</span> avatar
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(level)}
                  className="w-10 h-10 rounded-lg bg-[#2C2E33] hover:bg-[#373A40] flex items-center justify-center transition-colors"
                >
                  <Pencil className="w-4.5 h-4.5 text-gray-300" />
                </button>
                <button
                  onClick={() => handleDeleteLevel(level.id)}
                  className="w-10 h-10 rounded-lg bg-[#2C2E33] hover:bg-[#373A40] flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4.5 h-4.5 text-gray-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <RewardLevelModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingLevel(null)
        }}
        onSubmit={editingLevel ? handleEditLevel : handleAddLevel}
        initialData={editingLevel}
        isEdit={!!editingLevel}
      />
    </div>
  )
}
