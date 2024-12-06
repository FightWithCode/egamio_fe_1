// app/(home)/eg-threads/components/TagsList.jsx
"use client"

const tags = ['Esports', 'Tips', 'Bugs', 'Updates', 'Team Recruitment']

export default function TagsList() {
  return (
    <div className="my-6">
      <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 rounded-full bg-gray-700 text-sm text-foreground hover:bg-gray-600 transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  )
}
