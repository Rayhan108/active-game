

import { useState, useRef } from "react"
import { X, Camera } from "lucide-react"

export default function AdsModal({ ad, onClose, onSave }) {
  const [imagePreview, setImagePreview] = useState(ad?.image || "")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleImageUpload(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    handleImageUpload(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      image: imagePreview,
      title: e.target.title?.value || ad?.title,
      subtitle: e.target.subtitle?.value || ad?.subtitle,
      cta: e.target.cta?.value || ad?.cta,
      sponsored: true,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#4A4D55] rounded-2xl w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">{ad ? "Edit Ads" : "Add New Ads"}</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragging ? "border-blue-500 bg-blue-500/10" : "border-gray-600 hover:border-gray-500"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white text-sm">Click to change image</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Camera className="w-12 h-12 text-white mx-auto mb-3" />
                <p className="text-white text-base">Upload avatar image</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            Add Level
          </button>
        </form>
      </div>
    </div>
  )
}
