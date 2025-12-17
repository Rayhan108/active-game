import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { message, Spin } from "antd";

const Terms = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Jodit Editor Configuration
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your privacy policy...",
      height: 600,
      iframe: false,
      toolbarButtonSize: "medium",
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "paragraph",
        "|",
        "align",
        "outdent",
        "indent",
        "|",
        "link",
        "image",
        "table",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "undo",
        "redo",
        "|",
        "fullsize",
        "preview",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      removeButtons: ["about"],
      showXPathInStatusbar: false,
      showCharsCounter: true,
      showWordsCounter: true,
      toolbarAdaptive: true,
    }),
    []
  );

  // Load content from localStorage on mount
  useEffect(() => {
    const loadContent = () => {
      try {
        const savedContent = localStorage.getItem("termsCondition");
        if (savedContent) {
          setContent(savedContent);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading delay (remove this in production)
    setTimeout(loadContent, 500);
  }, []);

  // Handle content change
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Save content to localStorage (later will be API call)
  const handleSave = async () => {
    if (!content.trim()) {
      message.warning("Please add some content before saving!");
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage for now
      localStorage.setItem("termsCondition", content);

      message.success("Terms & Condition saved successfully!");

      // TODO: Later replace with actual API call
      // const res = await fetch('/api/privacy', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ privacyPolicy: content })
      // });

    } catch (error) {
      console.error("Save error:", error);
      message.error("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset content
  const handleReset = () => {
    const savedContent = localStorage.getItem("termsCondition");
    setContent(savedContent || "");
    message.info("Content reset to last saved version");
  };

  // Clear all content
  const handleClear = () => {
    setContent("");
    message.info("Content cleared");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
        <span className="ml-3">Loading Terms & Condition...</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#2C3E50] px-4 py-3 rounded-md mb-6">
        <h1 className="text-white text-2xl md:text-3xl font-bold">
         Terms & Condition
        </h1>
        <button
          className={`px-6 py-2 text-white rounded-lg font-medium transition-all duration-300 ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1D69E1] hover:bg-[#1558c7] active:scale-95"
          }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Editor Container */}
      <div className="bg-white text-black rounded-lg shadow-md p-4">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleContentChange}
          onChange={() => {}}
        />
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          onClick={handleClear}
        >
          Clear
        </button>
        {/* <button
          className="px-8 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          onClick={handleReset}
        >
          Reset
        </button> */}
        <button
          className={`px-8 py-2 text-white rounded-lg font-medium transition-all duration-300 ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1D69E1] hover:bg-[#1558c7]"
          }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <Spin size="small" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>


    </div>
  );
};

export default Terms;