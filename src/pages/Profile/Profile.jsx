import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { Camera, Mail, ChevronRight, Edit2, X, User } from "lucide-react";
import { Link } from "react-router-dom";

// ==================== Edit Profile Modal ====================
function EditProfileModal({ isOpen, onClose, onSubmit, userData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  // Reset form when modal opens with user data
  useEffect(() => {
    if (isOpen && userData) {
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    }
  }, [isOpen, userData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      closeIcon={null}
      width={400}
      centered
      styles={{
        mask: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
        },
        content: {
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: 0,
        },
        body: {
          backgroundColor: "transparent",
          padding: 0,
        },
      }}
    >
      <div className="bg-[#2D2D2D] rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold">Edit Profile</h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          {/* First Name Field */}
          <div>
            <label className="text-white text-sm mb-2 block">First Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter first name..."
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                className="w-full bg-[#3D3D3D] text-gray-300 placeholder-gray-500 pl-12 pr-4 py-3 rounded-lg border border-transparent focus:border-[#4A8AFF] focus:outline-none transition-colors"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label className="text-white text-sm mb-2 block">Last Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter last name..."
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                className="w-full bg-[#3D3D3D] text-gray-300 placeholder-gray-500 pl-12 pr-4 py-3 rounded-lg border border-transparent focus:border-[#4A8AFF] focus:outline-none transition-colors"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4A8AFF] hover:bg-[#3A7AEF] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

// ==================== Main Profile Component ====================
export default function Profile() {
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
  });

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Edit Modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Handle Profile Update
  const handleProfileUpdate = (data) => {
    setUserData((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
    }));
    setIsEditModalOpen(false);
    console.log("Updated profile:", data);
  };

  // Get full name
  const fullName = `${userData.firstName} ${userData.lastName}`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#1A1A1A] rounded-2xl shadow-lg p-12">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="relative">
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#4A8AFF]"
              />
              {/* Camera Icon Button */}
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-1 right-1 w-10 h-10 bg-[#2D2D2D] rounded-full border-2 border-[#4A8AFF] flex items-center justify-center hover:bg-[#3D3D3D] transition-colors shadow-sm"
              >
                <Camera className="w-5 h-5 text-[#4A8AFF]" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Full Name with Edit Button */}
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-white text-xl font-semibold">{fullName}</h2>
            <button
              type="button"
              onClick={openEditModal}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#3D3D3D] transition-colors"
              title="Edit Profile"
            >
              <Edit2 className="w-4 h-4 text-[#4A8AFF]" />
            </button>
          </div>

          {/* Email Display */}
          <p className="text-gray-400 text-sm">{userData.email}</p>
        </div>

        {/* Email Field (Read Only) */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-2 block">Email</label>
          <div className="flex items-center gap-3 px-4 py-4 bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={userData.email}
              readOnly
              className="flex-1 bg-transparent outline-none text-gray-300 text-base cursor-not-allowed"
            />
          </div>
        </div>

        {/* Full Name Field (Read Only) */}
        <div className="mb-8">
          <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
          <div className="flex items-center gap-3 px-4 py-4 bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg">
            <User className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={fullName}
              readOnly
              className="flex-1 bg-transparent outline-none text-gray-300 text-base cursor-not-allowed"
            />
          </div>
        </div>

        {/* Change Password Button */}
        <Link to="/changePassword">
          <button
            type="button"
            className="w-full bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-4 px-6 rounded-xl flex items-center justify-between transition-colors group border border-[#3D3D3D]"
          >
            <span className="text-base font-medium">Change Password</span>
            <ChevronRight className="w-5 h-5 text-[#4A8AFF] group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleProfileUpdate}
        userData={userData}
      />
    </div>
  );
}