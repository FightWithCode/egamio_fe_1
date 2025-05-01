"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import { toast } from "react-toastify";
import api from "@/services/api/axiosSetup";
import { useSelector } from 'react-redux';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

export default function CreateDiscussion() {
  const editorRef = useRef(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [games, setGames] = useState([])
  const [tagInput, setTagInput] = useState("");
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const predefinedTags = ["FPS", "Battle Royale", "MOBA", "RPG", "Strategy", "BGMI", "Valorant", "Call of Duty", "CS:GO", "Minecraft", "Fortnite", "Discussion", "Question", "Guide", "News", "Highlight", "PC", "Mobile", "Console", "PlayStation", "Xbox"];

  const fetchGames = async () => {
    try {
      const response = await api.get("/games/list-games");
      setGames(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch games:", err.message);
    }
  };

  const renderEditor = () => {
    if (!isMounted) {
      return <div>Loading editor...</div>;
    }
    return (
      <div className="mb-6">
        <style jsx global>{`
          /* Custom styling for editor container */
          .tox.tox-tinymce {
            background: transparent !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
          }

          /* Editor content area */
          .tox .tox-edit-area__iframe {
            background: transparent !important;
          }

          /* Toolbar styling */
          .tox .tox-toolbar,
          .tox .tox-toolbar__primary,
          .tox .tox-toolbar__overflow,
          .tox-editor-header {
            background: rgba(45, 45, 45, 0.75) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
          }

          /* Menu items and dropdowns */
          .tox .tox-menu {
            background: rgba(45, 45, 45, 0.9) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
          }

         
          .mce-content-body {
            background: transparent !important;
            color: #ffffff !important;
          }

          /* Custom border */
          .tox.tox-tinymce {
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 8px !important;
          }

          /* Toolbar buttons */
          .tox .tox-tbtn {
            color: #ffffff !important;
          }

          .tox .tox-tbtn:hover {
            background: rgba(255, 255, 255, 0.1) !important;
          }

          /* Toolbar separators */
          .tox .tox-toolbar__group {
            border-color: rgba(255, 255, 255, 0.1) !important;
          }

          /* Placeholder text */
          .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: rgba(255, 255, 255, 0.5) !important;
          }
        `}</style>
        <label className="block text-lg font-medium text-gray-300 mb-2">
          Content
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'blocks | ' +
              'bold italic underline strikethrough link image | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | help',
            image_advtab: false,
            image_uploadtab: false,
            image_description: false,
            image_title: false,

            // Custom theme colors and styles
            content_style: `
              body {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: #ffffff;
                background: transparent;
                padding: 20px;
              }
              p { margin: 0; padding: 0; }
            `,

            // Custom UI colors
            skin: 'oxide-dark',
            content_css: 'dark',
            body_class: 'transparent-body',

            // Custom editor colors
            custom_colors: true,
            custom_colors_default: '#FF5733',

            // Style formats with custom colors
            style_formats: [
              {
                title: 'Custom Styles',
                items: [
                  {
                    title: 'Highlight',
                    inline: 'span',
                    styles: { backgroundColor: '#FFD700', color: '#000000' }
                  },
                  {
                    title: 'Important',
                    inline: 'span',
                    styles: { backgroundColor: '#FF5733', color: '#FFFFFF' }
                  },
                  {
                    title: 'Success',
                    inline: 'span',
                    styles: { backgroundColor: '#00FF00', color: '#000000' }
                  }
                ]
              }
            ],

            // Custom UI colors
            setup: function (editor) {
              editor.on('init', function () {
                // Custom CSS for editor UI
                const css = `
                  .tox-editor-header { background-color: #2d2d2d !important; }
                  .tox-toolbar { background-color: #2d2d2d !important; }
                  .tox-toolbar__group { border-color: #3d3d3d !important; }
                  .tox-tbtn { color: #ffffff !important; }
                  .tox-tbtn:hover { background-color: #3d3d3d !important; }
                `;

                const style = editor.dom.create('style', { type: 'text/css' });
                style.innerHTML = css;
                editor.dom.doc.head.appendChild(style);
              });
            },
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    );
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    game: "",
    category: "Discussion",
    tags: [],
  });

  useEffect(() => {
    setIsMounted(true);
    fetchGames();
  }, []);

  const handleEditorChange = (content, editor) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.game) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {

      // Convert tags array to comma-separated string for meta_keywords
      const meta_keywords = formData.tags.join(', ');
      const body = {
        title: formData.title,
        content: formData.content,
        game: formData.game,
        meta_keywords: meta_keywords,
      }
      const response = await api.post(`/eg-threads/threads/create/`, body)

      const data = response.data;

      if (!response.status === 201) {
        throw new Error(data.errors || 'Failed to create thread');
      }

      toast.success('Thread created successfully!');

      // Redirect to the new thread
      router.push(`/eg-threads/${data.thread.thread_id}/${data.thread.slug}`);

    } catch (error) {
      toast.error(error.message || 'Failed to create thread');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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


  if (!isAuthenticated) {
    return (
      <ResponsiveContainer className="mt-32">
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
          <div className="backdrop-blur-sm border border-white/10 rounded-lg p-8 max-w-md w-full text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.364-9.364A9 9 0 0111.545 3.29a9 9 0 00-5.364 3.064A9 9 0 003.29 11.545a9 9 0 003.064 5.364 9 9 0 005.364 3.064 9 9 0 005.364-3.064 9 9 0 003.064-5.364 9 9 0 00-3.064-5.364z"
              />
            </svg>

            <h2 className="text-xl font-bold text-white mb-2">
              Authentication Required
            </h2>

            <p className="text-gray-300 mb-6">
              Please log in to create a new thread. Join our community to share your thoughts and engage with other gamers.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-accent hover:bg-darkaccent text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                Log In
              </button>

              <button
                onClick={() => router.push('/signup')}
                className="w-full bg-transparent hover:bg-white/5 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition duration-150 ease-in-out"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    );
  }
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
                <label className="block text-lg font-medium text-gray-300 mb-2">
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

              <div>
                <label className="block text-lg font-medium text-gray-300 mb-2">Game</label>
                <select
                  id="game"
                  name="game"
                  value={formData.game}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/20 
                           text-white focus:outline-none focus:border-highlight"
                >
                  <option value="">Select Game</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-lg font-medium text-gray-300 mb-2">
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
              {renderEditor()}

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
                  {isSubmitting ? "Creating Thread" : "Create Thread"}
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
