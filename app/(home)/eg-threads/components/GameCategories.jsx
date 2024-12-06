"use client"

const categories = ['Action', 'RPG', 'Strategy', 'Sports', 'BGMI']

export default function GameCategories() {
  return (
    <div className="my-6">
      <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
        Game Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="text-left px-4 py-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
