"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark, FaComment, FaEllipsisH, FaFire, FaClock, FaTrophy } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";

const samplePost = {
  id: 1,
  title: "What are the best settings for BGMI?",
  author: "PlayerOne",
  authorAvatar: "/avatars/player-one.jpg",
  content: `I've been experimenting with different sensitivity settings and layouts for BGMI. 
            I want to hear your recommendations! What works best for you?`,
  image: "/images/bgmi-settings.jpg",
  game: "BGMI",
  tags: ["Gaming", "BGMI", "Settings", "Mobile"],
  createdAt: "2024-01-15T10:30:00Z",
  votes: 156,
  commentCount: 23,
  comments: [
    {
      id: 1,
      author: "ProGamer",
      authorAvatar: "/avatars/pro-gamer.jpg",
      text: "Try a 3-finger claw setup; it's great for accuracy!",
      votes: 45,
      createdAt: "2024-01-15T11:00:00Z",
      replies: [
        {
          id: 4,
          author: "Newbie",
          authorAvatar: "/avatars/newbie.jpg",
          text: "Could you share your layout screenshot?",
          votes: 12,
          createdAt: "2024-01-15T11:30:00Z"
        }
      ]
    },
    // ... other comments
  ],
};
const relatedTopics = [
  {
    id: 1,
    title: "Best BGMI Sensitivity Settings for iPhone 13",
    author: "iPhoneGamer",
    votes: 234,
    commentCount: 45,
    timeAgo: "2h",
    isHot: true,
  },
  {
    id: 2,
    title: "BGMI vs PUBG Mobile: Control Layout Comparison",
    author: "GameAnalyst",
    votes: 189,
    commentCount: 32,
    timeAgo: "4h",
    isTrending: true,
  },
  // Add more related topics...
];

export default function ForumPost() {
  const { postId } = useParams();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleVote = (type) => {
    if (type === 'up') {
      setIsUpvoted(!isUpvoted);
      setIsDownvoted(false);
    } else {
      setIsDownvoted(!isDownvoted);
      setIsUpvoted(false);
    }
  };

  return (
    <ResponsiveContainer className="min-h-screen">
      <div className="max-w-7xl mx-auto my-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-grow lg:w-3/4">
            {/* Main Post Container */}
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl mb-6">
              <div className="flex flex-col md:flex-row">
                {/* Main Content */}
                <div className="flex-1 p-6">
                  {/* Post Metadata */}
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={samplePost.authorAvatar}
                        alt={samplePost.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-gray-400">Posted by</span>
                    <span className="text-blue-400 hover:underline">u/{samplePost.author}</span>
                    <span className="text-gray-400">
                      {formatDistanceToNow(new Date(samplePost.createdAt))} ago
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-bold text-white mb-4">{samplePost.title}</h1>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {samplePost.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="text-white mb-4">{samplePost.content}</div>

                  {/* Post Image (if exists) */}
                  {samplePost.image && (
                    <div className="relative w-full h-96 mb-4">
                      <Image
                        src={samplePost.image}
                        alt="Post image"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 text-gray-400">
                    {/* Vote buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote('up')}
                        className={`flex items-center space-x-1 hover:bg-gray-700 rounded ${isUpvoted ? 'text-highlight' : ''
                          }`}
                      >
                        <FaArrowUp />
                      </button>
                      <span className="font-medium text-white">{samplePost.votes}</span>
                      <button
                        onClick={() => handleVote('down')}
                        className={`flex items-center space-x-1 hover:bg-gray-700 rounded ${isDownvoted ? 'text-danger' : ''
                          }`}
                      >
                        <FaArrowDown />
                      </button>
                    </div>

                    {/* Existing buttons */}
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                      <FaComment />
                      <span>{samplePost.commentCount}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                      <FaShare />
                      <span>Share</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <div className="p-4 rounded-lg border-[1px] border-white/20">
                {/* Comment Input */}
                <textarea
                  className="w-full bg-transparent text-white rounded-lg p-4 mb-4 backdrop-blur-md"
                  placeholder="What are your thoughts?"
                  rows="4"
                />
                <button className="bg-highlight text-white px-4 py-2 rounded-full hover:bg-darkhighlight">
                  Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="mt-6 space-y-4">
                {samplePost.comments.map((comment) => (
                  <div key={comment.id} className="border-[1px] border-white/20 rounded-lg backdrop-blur-md">
                    <div className="p-4">
                      {/* Comment Header */}
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="relative h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src={comment.authorAvatar}
                            alt={comment.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-blue-400 hover:underline">{comment.author}</span>
                        <span className="text-gray-400">
                          {formatDistanceToNow(new Date(comment.createdAt))} ago
                        </span>
                      </div>

                      {/* Comment Content */}
                      <p className="text-white ml-8">{comment.text}</p>

                      {/* Comment Actions */}
                      <div className="flex items-center space-x-4 text-gray-400 mt-2 ml-8">
                        <button className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded">
                          <FaArrowUp size={12} />
                          <span>{comment.votes}</span>
                          <FaArrowDown size={12} />
                        </button>
                        <button className="hover:bg-gray-700 px-2 py-1 rounded">Reply</button>
                        <button className="hover:bg-gray-700 px-2 py-1 rounded">Share</button>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-8 mt-4 border-l-2 border-gray-700 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="mt-4">
                              {/* Reply content similar to comment structure */}
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                                  <Image
                                    src={reply.authorAvatar}
                                    alt={reply.author}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-blue-400 hover:underline">{reply.author}</span>
                                <span className="text-gray-400">
                                  {formatDistanceToNow(new Date(reply.createdAt))} ago
                                </span>
                              </div>
                              <p className="text-white">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Community Rules */}
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Community Rules</h2>
              </div>
              <div className="p-4 space-y-3 text-white/80">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">1.</span>
                  <span>Be respectful and helpful</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">2.</span>
                  <span>No promotion of hacks or cheats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">3.</span>
                  <span>Use appropriate tags</span>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Related Topics</h2>
              </div>
              <div className="divide-y divide-white/10">
                {relatedTopics.map((topic) => (
                  <div key={topic.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col items-center text-white/70">
                        <FaArrowUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{topic.votes}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium leading-snug mb-1">
                          {topic.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-white/60">
                          <span>by u/{topic.author}</span>
                          <span>•</span>
                          <span>{topic.timeAgo}</span>
                          {topic.isHot && (
                            <FaFire className="text-orange-500" />
                          )}
                          {topic.isTrending && (
                            <FaTrophy className="text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
