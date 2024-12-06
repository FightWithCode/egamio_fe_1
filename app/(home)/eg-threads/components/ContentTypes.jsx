// app/(home)/eg-threads/components/ContentTypes.jsx
"use client"

const contentTypes = ['Discussions', 'Questions', 'Guides', 'News']

export default function ContentTypes() {
  return (
    <div className="my-6">
      <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
        Content Types
      </h3>
      <div className="space-y-2">
        {contentTypes.map((type) => (
          <button
            key={type}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
