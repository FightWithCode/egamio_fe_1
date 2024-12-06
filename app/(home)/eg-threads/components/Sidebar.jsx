// app/(home)/eg-threads/components/Sidebar.jsx
"use client"

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa6"
import MainNavigation from "./MainNavigation"
import GameCategories from "./GameCategories"
import ContentTypes from "./ContentTypes"
import TagsList from "./TagsList"

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full md:w-1/4 bg-transparent p-4 backdrop-blur-md rounded-lg border-[1px] border-white/20">
      <div className="bg-transparent">
        <div className="flex items-center justify-between">
          <MainNavigation />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden ml-4 p-3 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <FaChevronDown
              className={`w-5 h-5 transform transition-transform duration-200 
                ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <div className={`
          md:block
          ${isExpanded ? 'block' : 'hidden'}
          transition-all duration-200 ease-in-out
          ${isExpanded ? 'opacity-100' : 'opacity-0 md:opacity-100'}
        `}>
          <GameCategories />
          <ContentTypes />
          <TagsList />
        </div>
      </div>
    </div>
  )
}
