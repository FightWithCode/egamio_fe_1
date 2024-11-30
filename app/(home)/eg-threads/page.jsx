"use client";
import React, { useState } from "react";
import Link from "next/link";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import { FaRegCommentDots, FaThumbsUp, FaChevronDown, FaHome, FaFire, FaClock } from "react-icons/fa6";

export default function ForumHome() {
  const samplePosts = [
    {
      id: 1,
      title: "What are the best settings for BGMI?",
      author: "PlayerOne",
      game: "BGMI",
      comments: 12,
      likes: 34,
      content:
        "I've been experimenting with different sensitivity settings and layouts for BGMI. I want to hear your recommendations! What works best for you?",
    },
    {
      id: 2,
      title: "Looking for teammates for Valorant Ranked.",
      author: "ValorViper",
      game: "Valorant",
      comments: 5,
      likes: 20,
      content:
        "I'm looking for skilled teammates to climb ranked in Valorant. Prefer players with good communication and at least Plat rank.",
    },
    {
      id: 3,
      title: "Poll: Favorite map in Call of Duty: Mobile?",
      author: "CODFanatic",
      game: "Call of Duty",
      comments: 18,
      likes: 50,
      content:
        "What's your favorite map in COD: Mobile? Vote now! Personally, I love Rust for its fast-paced action.",
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);

  const mainNavItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '🔥', label: 'Popular' },
    { icon: '⏰', label: 'Latest' }
  ]

  return (
    <ResponsiveContainer className="py-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-transparent p-4 backdrop-blur-md rounded-lg border-[1px] border-white/20">
          <div className="bg-transparent">
            {/* Main navigation row with expand button */}
            <div className="flex items-center justify-between">
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

            {/* Expandable content */}
            <div className={`
              md:block
              ${isExpanded ? 'block' : 'hidden'}
              transition-all duration-200 ease-in-out
              ${isExpanded ? 'opacity-100' : 'opacity-0 md:opacity-100'}
            `}>
              {/* Game Categories Section */}
              <div className="my-6">
                <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
                  Game Categories
                </h3>
                <div className="flex flex-wrap">
                  {['Action', 'RPG', 'Strategy', 'Sports', 'BGMI'].map((category) => (
                    <button
                      key={category}
                      className="text-left px-4 py-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Types Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
                  Content Types
                </h3>
                <div className="space-y-2">
                  {[
                    { type: 'Discussions', count: 124 },
                    { type: 'Questions', count: 45 },
                    { type: 'Polls', count: 18 },
                    { type: 'News', count: 67 }
                  ].map(({ type, count }) => (
                    <button
                      key={type}
                      className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors group"
                    >
                      <span>{type}</span>
                      <span className="bg-gray-600 text-xs px-2 py-1 rounded-full group-hover:bg-gray-500">
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
                  Content Types
                </h3>
                <div className="flex flex-wrap">
                  {['#esports', '#bgmi', '#skills', '#health'].map((tag) => (
                    <button
                      key={tag}
                      className="px-2 py-1 rounded-lg hover:bg-gray-700 text-foreground transition-colors group"
                    >
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {samplePosts.map((post) => (
            <div
              key={post.id}
              className="bg-transparent text-foreground p-4 rounded-lg mb-6 border-[1px] border-white/20 backdrop-blur-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-highlight">{post.author}</span>
                  <span className="text-gray-300">• {post.game}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-highlight">
                    <FaThumbsUp />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-highlight">
                    <FaRegCommentDots />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-300">{post.content}</p>
              {post.game === "Call of Duty" && (
                <div className="mt-4">
                  <button className="bg-darkhighlight text-foreground py-2 px-4 rounded-md">
                    Vote in Poll
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
}
