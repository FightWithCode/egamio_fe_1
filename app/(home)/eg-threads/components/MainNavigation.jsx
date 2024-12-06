// app/(home)/eg-threads/components/MainNavigation.jsx
"use client"

const mainNavItems = [
  { icon: '🏠', label: 'Home' },
  { icon: '🔥', label: 'Popular' },
  { icon: '⏰', label: 'Latest' }
]

export default function MainNavigation() {
  return (
    <div className="flex gap-2">
      {mainNavItems.map((item) => (
        <button
          key={item.label}
          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors group"
        >
          <div className="text-gray-400 group-hover:text-white transition-colors">
            {item.icon}
          </div>
          <span className="text-sm mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
