"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRegCommentDots, FaThumbsUp, FaFilter } from "react-icons/fa6";

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

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Main Content Section */}
      <div className="flex">

        {/* Main Post Area */}
        <div className="flex-1 p-4">
          {/* Categories Navigation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Categories</h2>
            <div className="space-x-4">
              <button className="bg-gray-800 text-foreground py-2 px-4 rounded-md hover:bg-gray-700">
                All Games
              </button>
              <button className="bg-gray-800 text-foreground py-2 px-4 rounded-md hover:bg-gray-700">
                Discussions
              </button>
              <button className="bg-gray-800 text-foreground py-2 px-4 rounded-md hover:bg-gray-700">
                Polls
              </button>
            </div>
          </div>

          {/* Posts Display */}
          {samplePosts.map((post) => (
            <div
              key={post.id}
              className="bg-background text-foreground p-6 rounded-lg mb-6 border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-highlight">{post.author}</span>
                  <span className="text-gray-500">• {post.game}</span>
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
              <p className="text-gray-400">{post.content}</p>
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
    </div>
  );
}
