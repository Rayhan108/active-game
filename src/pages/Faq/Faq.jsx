import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { X, Pencil, Trash2, ChevronRight } from "lucide-react";

// ==================== Main Component ====================
export default function Faq() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How I read a book ??",
      answer: "You can read a book by opening it and reading the pages.",
    },
    {
      id: 2,
      question: "How to reset password?",
      answer: "Go to settings and click on reset password option.",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  // Add FAQ Handler
  const handleAddFaq = (data) => {
    const newFaq = {
      id: Date.now(),
      question: data.question,
      answer: data.answer,
    };
    setFaqs((prev) => [...prev, newFaq]);
    setIsAddModalOpen(false);
  };

  // Edit FAQ Handler
  const handleEditFaq = (data) => {
    if (!editingFaq) return;
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === editingFaq.id
          ? { ...faq, question: data.question, answer: data.answer }
          : faq
      )
    );
    setIsEditModalOpen(false);
    setEditingFaq(null);
  };

  // Delete FAQ Handler
  const handleDeleteFaq = (id) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  // Open Add Modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setIsEditModalOpen(true);
  };

  // Close Add Modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingFaq(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <FAQList
        faqs={faqs}
        onAddClick={openAddModal}
        onEditClick={openEditModal}
        onDeleteClick={handleDeleteFaq}
      />

      {/* Add FAQ Modal */}
      <AddFAQModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddFaq}
      />

      {/* Edit FAQ Modal */}
      <EditFAQModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditFaq}
        faqData={editingFaq}
      />
    </div>
  );
}

// ==================== FAQ List Component ====================
function FAQList({ faqs, onAddClick, onEditClick, onDeleteClick }) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-2xl font-semibold">FAQ</h1>
        <button
          onClick={onAddClick}
          className="bg-[#4A8AFF] hover:bg-[#3A7AEF] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Add FAQ
        </button>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No FAQs found. Add your first FAQ!</p>
          </div>
        ) : (
          faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={index}
              onEdit={onEditClick}
              onDelete={onDeleteClick}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ==================== FAQ Item Component ====================
function FAQItem({ faq, index, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#2D2D2D] rounded-lg overflow-hidden group hover:bg-[#3D3D3D] transition-colors">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Edit and Delete Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(faq)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(faq.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Question Text */}
          <div className="flex-1">
            <p className="text-gray-300 text-sm">
              Q:{String(index + 1).padStart(2, "0")} {faq.question}
            </p>
          </div>
        </div>

        {/* Chevron Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-all duration-200"
        >
          <ChevronRight
            size={20}
            className={`transform transition-transform duration-200 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {/* Answer Section */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="pl-16 border-l-2 border-[#4A8AFF] ml-4">
            <p className="text-gray-400 text-sm">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== Add FAQ Modal ====================
function AddFAQModal({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      reset({ question: "", answer: "" });
    }
  }, [isOpen, reset]);

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
        content: {
          padding: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <div className="bg-[#2D2D2D] rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold">Add FAQ</h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          {/* Question Field */}
          <div>
            <label className="text-white text-sm mb-2 block">Question</label>
            <input
              type="text"
              placeholder="Enter your question..."
              {...register("question", {
                required: "Question is required",
                minLength: {
                  value: 5,
                  message: "Question must be at least 5 characters",
                },
              })}
              className="w-full bg-[#3D3D3D] text-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg border border-transparent focus:border-[#4A8AFF] focus:outline-none transition-colors"
            />
            {errors.question && (
              <p className="text-red-500 text-xs mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* Answer Field */}
          <div>
            <label className="text-white text-sm mb-2 block">Answer</label>
            <textarea
              placeholder="Enter your answer..."
              rows={3}
              {...register("answer", {
                required: "Answer is required",
                minLength: {
                  value: 10,
                  message: "Answer must be at least 10 characters",
                },
              })}
              className="w-full bg-[#3D3D3D] text-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg border border-transparent focus:border-[#4A8AFF] focus:outline-none transition-colors resize-none"
            />
            {errors.answer && (
              <p className="text-red-500 text-xs mt-1">
                {errors.answer.message}
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
              Add FAQ
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

// ==================== Edit FAQ Modal ====================
function EditFAQModal({ isOpen, onClose, onSubmit, faqData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  // Reset form with FAQ data when modal opens or faqData changes
  useEffect(() => {
    if (isOpen && faqData) {
      reset({
        question: faqData.question,
        answer: faqData.answer,
      });
    }
  }, [isOpen, faqData, reset]);

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
    
    >
      <div className="bg-[#2D2D2D] rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold">Edit FAQ</h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          {/* Question Field */}
          <div>
            <label className="text-white text-sm mb-2 block">Question</label>
            <input
              type="text"
              placeholder="Enter your question..."
              {...register("question", {
                required: "Question is required",
                minLength: {
                  value: 5,
                  message: "Question must be at least 5 characters",
                },
              })}
              className="w-full bg-[#3D3D3D] text-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg border border-transparent focus:border-[#4A8AFF] focus:outline-none transition-colors"
            />
            {errors.question && (
              <p className="text-red-500 text-xs mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* Answer Field */}
          <div>
            <label className="text-white text-sm mb-2 block">Answer</label>
            <textarea
              placeholder="Enter your answer..."
              rows={3}
              {...register("answer", {
                required: "Answer is required",
                minLength: {
                  value: 10,
                  message: "Answer must be at least 10 characters",
                },
              })}
              className="w-full bg-[#3D3D3D] text-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg border border-transparent focus:border-[#4A8AFF] focus:outline-none transition-colors resize-none"
            />
            {errors.answer && (
              <p className="text-red-500 text-xs mt-1">
                {errors.answer.message}
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
              Update FAQ
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}