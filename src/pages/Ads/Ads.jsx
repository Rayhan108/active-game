import { useState } from "react"
import { Search, Pencil, Trash2, X, AlertTriangle } from "lucide-react"
import AdsModal from "./AdsModal"
import img from '../../assets/Rectangle 6.png'

export default function Ads() {
  const [ads, setAds] = useState([
    {
      id: 1,
      image: img,
      title: "Wake Up!",
      subtitle: "It's Time To Take The Action",
      cta: "Start Training TODAY",
      sponsored: true,
    },
    {
      id: 2,
      image: img,
      title: "Get Fit!",
      subtitle: "Transform Your Body",
      cta: "Join Now",
      sponsored: false,
    },
    {
      id: 3,
      image: img,
      title: "Stay Strong!",
      subtitle: "Build Your Strength",
      cta: "Start Today",
      sponsored: true,
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAd, setEditingAd] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingAdId, setDeletingAdId] = useState(null)

  const handleAddAd = () => {
    setEditingAd(null)
    setIsModalOpen(true)
  }

  const handleEditAd = (e, ad) => {
    e.stopPropagation()
    setEditingAd(ad)
    setIsModalOpen(true)
  }

  const handleSaveAd = (adData) => {
    if (editingAd) {
      setAds(ads.map((ad) => (ad.id === editingAd.id ? { ...ad, ...adData } : ad)))
    } else {
      setAds([...ads, { ...adData, id: Date.now() }])
    }
    setIsModalOpen(false)
    setEditingAd(null)
  }

  // Open delete confirmation modal
  const handleDeleteClick = (e, id) => {
    e.stopPropagation()
    setDeletingAdId(id)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete
  const handleConfirmDelete = () => {
    setAds(ads.filter((ad) => ad.id !== deletingAdId))
    setIsDeleteModalOpen(false)
    setDeletingAdId(null)
  }

  // Cancel delete
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setDeletingAdId(null)
  }

  const filteredAds = ads.filter(
    (ad) =>
      ad.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search ads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <button
            onClick={handleAddAd}
            className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
          >
            <span className="text-xl">+</span> Add New Ad
          </button>
        </div>

        {/* Ads Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className=" rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 "
            >
              {/* Image Section */}
              <div className="relative">
                {ad.sponsored && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      ✨ Sponsored
                    </span>
                  </div>
                )}
                
                {/* Image Container */}
                <div className="relative  overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-48 object-contain transition-transform duration-500 "
                  />
                  {/* Decorative overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

       

              {/* Action Buttons - Bottom */}
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-tr from-pink-300 to-rose-300  border-t border-gray-100">
                <button
                  onClick={(e) => handleEditAd(e, ad)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-300 font-medium text-sm group/btn"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={(e) => handleDeleteClick(e, ad.id)}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-300 font-medium text-sm group/btn"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAds.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-500 text-lg">No ads found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <AdsModal
          ad={editingAd}
          onClose={() => {
            setIsModalOpen(false)
            setEditingAd(null)
          }}
          onSave={handleSaveAd}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Delete Ad</h3>
              </div>
              <button
                onClick={handleCancelDelete}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-white text-center">
                Are you sure you want to delete this ad? 
                <br />
                <span className="text-red-500 font-medium">This action cannot be undone.</span>
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 bg-gray-100">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/40"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}