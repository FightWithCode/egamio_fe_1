This is a page for the reddit like section eg-thread, this is a single disucssion/topics page. Which will have the title, image if any, content(text) which can be question, suggestion option any discussion. and details about when it was posted who poested tags and games related to it. It will also have upvotes downvotes of it no of comments of it and at the bottom a reddit like discussion or comments will be shown. Have a sidebar also to show related topics and discussion and some rules maybe. Can you redesign this page so that it looks good has good UI/UI and is respnsive while showing all the features of reddit like.

"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function ForumPost() {
  const { postId } = useParams();

  // Simulated content
  const samplePost = {
    title: "What are the best settings for BGMI?",
    author: "PlayerOne",
    content: `I've been experimenting with different sensitivity settings and layouts for BGMI. 
              I want to hear your recommendations! What works best for you?`,
    game: "BGMI",
    comments: [
      { id: 1, author: "ProGamer", text: "Try a 3-finger claw setup; it's great for accuracy!" },
      { id: 2, author: "SniperWolf", text: "I prefer the gyroscope settings for better control." },
      { id: 3, author: "Newbie", text: "Can someone explain what sensitivity settings mean?" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-highlight mb-4">{samplePost.title}</h1>
      <p className="text-gray-400 mb-2">Posted by {samplePost.author} | Game: {samplePost.game}</p>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <p className="text-white">{samplePost.content}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {samplePost.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-3 rounded-lg shadow-md">
              <p className="text-highlight font-bold">{comment.author}</p>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark, FaComment, FaEllipsisH, FaFire, FaClock, FaTrophy } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-grow lg:w-3/4">
            {/* Main Post Container */}
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl mb-6">
              <div className="flex flex-col md:flex-row">
                {/* Vote Section */}
                <div className="flex md:flex-col items-center justify-start md:justify-center p-4 md:px-6 md:py-8 border-b md:border-b-0 md:border-r border-white/10">
                  <button
                    onClick={() => handleVote('up')}
                    className={`transition-all duration-200 p-2 rounded-full ${isUpvoted ? 'bg-orange-500 text-white' : 'text-white/70 hover:bg-white/10'
                      }`}
                  >
                    <FaArrowUp size={24} />
                  </button>
                  <span className="mx-4 md:my-4 font-bold text-2xl text-white">
                    {samplePost.votes}
                  </span>
                  <button
                    onClick={() => handleVote('down')}
                    className={`transition-all duration-200 p-2 rounded-full ${isDownvoted ? 'bg-blue-500 text-white' : 'text-white/70 hover:bg-white/10'
                      }`}
                  >
                    <FaArrowDown size={24} />
                  </button>
                </div>

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
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                      <FaComment />
                      <span>{samplePost.commentCount} Comments</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                      <FaShare />
                      <span>Share</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded ${isSaved ? 'text-yellow-500' : ''}`}
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <FaBookmark />
                      <span>Save</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                {/* Comment Input */}
                <textarea
                  className="w-full bg-gray-700 text-white rounded-lg p-4 mb-4"
                  placeholder="What are your thoughts?"
                  rows="4"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                  Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="mt-6 space-y-4">
                {samplePost.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-800 rounded-lg shadow-lg">
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
            {/* About Community */}
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">About BGMI Community</h2>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-white/80">
                  A community for BGMI players to discuss strategies, settings, and share experiences.
                </p>
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <div>
                    <div className="font-bold text-white">245k</div>
                    Members
                  </div>
                  <div>
                    <div className="font-bold text-white">1.2k</div>
                    Online
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Join Community
                </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}



"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark, FaComment, FaEllipsisH } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function ForumPost() {
  const { postId } = useParams();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Enhanced sample content
  const samplePost = {
    id: postId,
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Post Header */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Vote and Content Container */}
        <div className="flex">
          {/* Vote Section */}
          <div className="flex flex-col items-center px-2 py-4 bg-gray-900">
            <button 
              onClick={() => handleVote('up')}
              className={`p-1 rounded ${isUpvoted ? 'text-orange-500' : 'text-gray-400'} hover:text-orange-500`}
            >
              <FaArrowUp size={20} />
            </button>
            <span className="my-1 font-bold text-white">
              {samplePost.votes}
            </span>
            <button 
              onClick={() => handleVote('down')}
              className={`p-1 rounded ${isDownvoted ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
            >
              <FaArrowDown size={20} />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
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
              <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                <FaComment />
                <span>{samplePost.commentCount} Comments</span>
              </button>
              <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                <FaShare />
                <span>Share</span>
              </button>
              <button 
                className={`flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded ${isSaved ? 'text-yellow-500' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <FaBookmark />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded">
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {/* Comment Input */}
          <textarea
            className="w-full bg-gray-700 text-white rounded-lg p-4 mb-4"
            placeholder="What are your thoughts?"
            rows="4"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="mt-6 space-y-4">
          {samplePost.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 rounded-lg shadow-lg">
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
  );
}



"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark, FaComment } from "react-icons/fa";
import Image from "next/image";

export default function ForumPost() {
  const { postId } = useParams();
  const [votes, setVotes] = useState(142);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  // Enhanced sample data
  const samplePost = {
    id: postId,
    title: "What are the best settings for BGMI?",
    author: "PlayerOne",
    authorKarma: 1234,
    createdAt: "2024-01-15T10:30:00Z",
    content: `I've been experimenting with different sensitivity settings and layouts for BGMI. 
              I want to hear your recommendations! What works best for you?`,
    image: "/sample-bgmi-settings.jpg", // Optional image
    game: "BGMI",
    tags: ["Gaming", "Mobile", "Settings", "BGMI"],
    comments: [
      {
        id: 1,
        author: "ProGamer",
        text: "Try a 3-finger claw setup; it's great for accuracy!",
        votes: 25,
        createdAt: "2024-01-15T11:00:00Z",
        replies: []
      },
      // ... more comments
    ]
  };

  const handleVote = (type) => {
    if (type === 'up' && !isUpvoted) {
      setVotes(prev => prev + 1);
      setIsUpvoted(true);
      setIsDownvoted(false);
    } else if (type === 'down' && !isDownvoted) {
      setVotes(prev => prev - 1);
      setIsDownvoted(true);
      setIsUpvoted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Main Content */}
        <div className="flex-grow max-w-3xl">
          {/* Post Card */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Vote Section */}
            <div className="flex">
              <div className="flex flex-col items-center p-2 bg-gray-900">
                <button
                  onClick={() => handleVote('up')}
                  className={`p-2 rounded-full hover:bg-gray-700 ${
                    isUpvoted ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  <FaArrowUp size={20} />
                </button>
                <span className="text-white font-bold my-1">{votes}</span>
                <button
                  onClick={() => handleVote('down')}
                  className={`p-2 rounded-full hover:bg-gray-700 ${
                    isDownvoted ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  <FaArrowDown size={20} />
                </button>
              </div>

              {/* Post Content */}
              <div className="flex-grow p-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span className="text-gray-300">Posted by u/{samplePost.author}</span>
                  <span>•</span>
                  <span>{new Date(samplePost.createdAt).toLocaleDateString()}</span>
                </div>

                <h1 className="text-2xl font-bold text-white mb-4">{samplePost.title}</h1>
                
                {samplePost.image && (
                  <div className="mb-4 relative h-96 w-full">
                    <Image
                      src={samplePost.image}
                      alt="Post image"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <p className="text-gray-200 mb-4">{samplePost.content}</p>

                <div className="flex gap-2 flex-wrap mb-4">
                  {samplePost.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 text-gray-400">
                  <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-full">
                    <FaComment /> {samplePost.comments.length} Comments
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-full">
                    <FaShare /> Share
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-full">
                    <FaBookmark /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            {/* Comment Input */}
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <textarea
                className="w-full bg-gray-700 text-white rounded-lg p-3 min-h-[100px]"
                placeholder="What are your thoughts?"
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {samplePost.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-300 font-bold">{comment.author}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-200">{comment.text}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-400">
                    <button className="flex items-center gap-1 hover:text-gray-200">
                      <FaArrowUp /> {comment.votes}
                    </button>
                    <button className="hover:text-gray-200">Reply</button>
                    <button className="hover:text-gray-200">Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-80">
          {/* Community Info */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h3 className="text-white font-bold mb-3">About Gaming Community</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>A place to discuss all things gaming related!</p>
              <div className="border-t border-gray-700 pt-2">
                <div className="flex justify-between">
                  <span>Members</span>
                  <span>123.4k</span>
                </div>
                <div className="flex justify-between">
                  <span>Online</span>
                  <span>1.2k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Community Rules */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-bold mb-3">Community Rules</h3>
            <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
              <li>Be respectful to others</li>
              <li>No spam or self-promotion</li>
              <li>Use appropriate tags</li>
              <li>Follow content guidelines</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}


BEst
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaBookmark, FaClock, FaTag } from "react-icons/fa";
import Image from "next/image";

export default function ForumPost() {
  const { postId } = useParams();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  // Enhanced sample data
  const samplePost = {
    id: postId,
    title: "What are the best settings for BGMI?",
    author: "PlayerOne",
    content: `I've been experimenting with different sensitivity settings and layouts for BGMI. 
              I want to hear your recommendations! What works best for you?`,
    image: "/sample-bgmi-settings.jpg", // Optional image
    game: "BGMI",
    tags: ["Settings", "Mobile Gaming", "Controls"],
    createdAt: "2024-01-20T10:30:00Z",
    upvotes: 156,
    downvotes: 12,
    comments: [
      { id: 1, author: "ProGamer", text: "Try a 3-finger claw setup; it's great for accuracy!", upvotes: 25, timestamp: "2h ago" },
      { id: 2, author: "SniperWolf", text: "I prefer the gyroscope settings for better control.", upvotes: 18, timestamp: "1h ago" },
      { id: 3, author: "Newbie", text: "Can someone explain what sensitivity settings mean?", upvotes: 5, timestamp: "30m ago" },
    ],
  };

  // Related topics for sidebar
  const relatedTopics = [
    { id: 1, title: "BGMI Season 25 Discussion", comments: 45 },
    { id: 2, title: "Best Mobile for Gaming in 2024", comments: 89 },
    { id: 3, title: "Pro Players Settings Guide", comments: 67 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 flex gap-6">
        {/* Main Content */}
        <div className="flex-grow max-w-4xl">
          {/* Post Container */}
          <div className="backdrop-blur-md bg-gray-800/70 rounded-lg shadow-lg border border-gray-700">
            {/* Vote Section */}
            <div className="flex">
              <div className="p-4 flex flex-col items-center">
                <button 
                  onClick={() => setUpvoted(!upvoted)}
                  className={`p-2 rounded-full hover:bg-gray-700 ${upvoted ? 'text-green-500' : ''}`}
                >
                  <FaArrowUp size={20} />
                </button>
                <span className="my-2 font-bold">{samplePost.upvotes - samplePost.downvotes}</span>
                <button 
                  onClick={() => setDownvoted(!downvoted)}
                  className={`p-2 rounded-full hover:bg-gray-700 ${downvoted ? 'text-red-500' : ''}`}
                >
                  <FaArrowDown size={20} />
                </button>
              </div>

              {/* Post Content */}
              <div className="p-4 flex-grow">
                <h1 className="text-2xl font-bold text-highlight mb-2">{samplePost.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <span className="font-medium">Posted by u/{samplePost.author}</span>
                  <FaClock className="inline" />
                  <span>8 hours ago</span>
                  <span className="px-2 py-1 rounded-full bg-gray-700 text-xs">
                    {samplePost.game}
                  </span>
                </div>

                {samplePost.image && (
                  <div className="mb-4 relative h-96 w-full">
                    <Image
                      src={samplePost.image}
                      alt="Post image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                )}

                <p className="text-gray-200 mb-4">{samplePost.content}</p>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {samplePost.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-full bg-gray-700 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 text-gray-400">
                  <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-full">
                    <FaComment /> {samplePost.comments.length} Comments
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-full">
                    <FaShare /> Share
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-full">
                    <FaBookmark /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <div className="mb-4">
              <textarea 
                placeholder="What are your thoughts?"
                className="w-full p-4 rounded-lg bg-gray-800/70 border border-gray-700 focus:ring-2 focus:ring-highlight"
                rows="4"
              />
              <button className="mt-2 px-4 py-2 bg-highlight text-white rounded-full hover:bg-highlight/80">
                Comment
              </button>
            </div>

            <div className="space-y-4">
              {samplePost.comments.map((comment) => (
                <div key={comment.id} className="backdrop-blur-md bg-gray-800/70 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-highlight">{comment.author}</span>
                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-200 mb-2">{comment.text}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <button className="flex items-center gap-1 hover:text-highlight">
                      <FaArrowUp /> {comment.upvotes}
                    </button>
                    <button className="hover:text-highlight">Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-80">
          {/* Community Rules */}
          <div className="backdrop-blur-md bg-gray-800/70 p-4 rounded-lg border border-gray-700 mb-4">
            <h3 className="text-lg font-bold mb-3">Community Rules</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Be respectful to others</li>
              <li>No spam or self-promotion</li>
              <li>Use appropriate tags</li>
              <li>Follow game-specific guidelines</li>
            </ol>
          </div>

          {/* Related Topics */}
          <div className="backdrop-blur-md bg-gray-800/70 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold mb-3">Related Topics</h3>
            <div className="space-y-3">
              {relatedTopics.map((topic) => (
                <div key={topic.id} className="hover:bg-gray-700 p-2 rounded">
                  <h4 className="font-medium">{topic.title}</h4>
                  <p className="text-sm text-gray-400">{topic.comments} comments</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
