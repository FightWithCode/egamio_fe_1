"use client";
import React, { useState, useEffect } from "react";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import Editor from "./Editor";
export default function CreateDiscussion() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    game: "",
    category: "Discussion",
    tags: [],
    media: [] // Array to store media files
  });
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [tagInput, setTagInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const predefinedTags = ["FPS", "Battle Royale", "MOBA", "RPG", "Strategy", "BGMI", "Valorant", "Call of Duty", "CS:GO", "Minecraft", "Fortnite", "Discussion", "Question", "Guide", "News", "Highlight", "PC", "Mobile", "Console", "PlayStation", "Xbox"];

  // File upload handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));

    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...newFiles]
    }));
  };

  const removeMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const gameCategories = ["BGMI", "Valorant", "Call of Duty", "Other"];
  const contentTypes = ["Discussion", "Question", "Poll", "News"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleEditorChange(event, editor) {
    // setData(editor.getData())
    setFormData((prev) => ({
      ...prev,
      ["content"]: editor.getData(),
    }));
  }

  const handleTagSelect = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };


  return (
    <ResponsiveContainer className="mt-32">

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Mobile Guidelines */}
        <div className="lg:hidden w-full">
          <button
            onClick={() => setIsGuidelinesOpen(!isGuidelinesOpen)}
            className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 
                     text-left flex justify-between items-center mb-4"
          >
            <span className="text-lg font-semibold text-gray-300">
              Posting Guidelines & Tips
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform ${isGuidelinesOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Collapsible Guidelines Content */}
          <div
            className={`space-y-4 overflow-hidden transition-all duration-300 ${isGuidelinesOpen ? "max-h-[1000px] mb-4" : "max-h-0"
              }`}
          >
            <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
              <h2 className="text-lg font-semibold mb-4">Posting Guidelines</h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Be respectful and constructive in discussions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  No hate speech or harassment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Stay on topic and avoid spam
                </li>
              </ul>
            </div>

            <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
              <h2 className="text-lg font-semibold mb-4">Formatting Tips</h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Use clear and concise titles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Add relevant tags for better discovery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-highlight">•</span>
                  Break long content into paragraphs
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <div className="bg-transparent p-4 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
            <h1 className="text-2xl font-bold mb-6">Create New eGThread</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/20 
                           text-white focus:outline-none focus:border-highlight"
                  placeholder="Enter your discussion title"
                  required
                />
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>

                {/* Selected Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-transparent border border-white/20 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Predefined Tags Categories */}
                <div className="space-y-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {predefinedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagSelect(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors
                          ${formData.tags.includes(tag)
                            ? 'bg-highlight text-white'
                            : 'bg-transparent border border-white/20 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Tag Input */}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 bg-transparent border border-white/20 
                           text-white focus:outline-none focus:border-highlight"
                  placeholder="Enter custom tags and press Enter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                {/* <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/20 
                         text-white focus:outline-none focus:border-highlight resize-y"
                  placeholder="Write your discussion content here..."
                  required
                /> */}
                <Editor
                  name="content"
                  value={formData.content}
                  data={formData.content}
                  onChange={handleEditorChange}
                />
              </div>

              {/* Media Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Media Upload
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors
                    ${dragActive
                      ? "border-highlight bg-highlight/10"
                      : "border-gray-700 hover:border-gray-500"
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-400 mt-2 justify-center">
                      <label className="relative cursor-pointer rounded-md font-medium text-highlight hover:text-highlight/80">
                        <span>Upload files</span>
                        <input
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileInput}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Images and videos up to 10MB
                    </p>
                  </div>
                </div>

                {/* Preview Section */}
                {formData.media.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {formData.media.map((media, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden"
                      >
                        {media.type === 'image' ? (
                          <img
                            src={media.preview}
                            alt={`Upload ${index + 1}`}
                            className="h-32 w-full object-cover"
                          />
                        ) : (
                          <video
                            src={media.preview}
                            className="h-32 w-full object-cover"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full 
                                   text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 
                           hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-highlight text-white 
                           hover:bg-darkhighlight transition-colors"
                >
                  Create Discussion
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Desktop Guidelines (right side) */}
        <div className="hidden lg:block lg:w-1/4 space-y-6">
          <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-4">Posting Guidelines</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-highlight">•</span>
                Be respectful and constructive in discussions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight">•</span>
                No hate speech or harassment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight">•</span>
                Stay on topic and avoid spam
              </li>
            </ul>
          </div>

          <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-4">Formatting Tips</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-highlight">•</span>
                Use clear and concise titles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight">•</span>
                Add relevant tags for better discovery
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight">•</span>
                Break long content into paragraphs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
