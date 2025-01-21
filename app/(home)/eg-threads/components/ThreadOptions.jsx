"use client"
import { useRouter } from "next/navigation"
import { act } from "react"

const mainNavItems = [
    { icon: '✨', label: 'New Thread', action: '/eg-threads/create' },
    { icon: '📝', label: 'My Threads', action: '/eg-threads/create' },
    { icon: '⌛', label: 'History', action: '/eg-threads/create' }
]

export default function ThreadOptions() {
    const router = useRouter()
    const handleNavClick = (action) => {
        router.push(action)
    }

    return (
        <div className="flex gap-2">
            {mainNavItems.map((item) => (
                <button
                    key={item.label}
                    onClick={() => handleNavClick(item.action)}
                    className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors group"
                >
                    <div className="text-gray-400 group-hover:text-white transition-colors">
                        {item.icon}
                    </div>
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </div>
    )
}
