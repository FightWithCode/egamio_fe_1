// app/(home)/eg-threads/[postId]/components/PostBody.jsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark, FaComment } from 'react-icons/fa';

const PostBody = ({ post, isUpvoted, isDownvoted, onVote }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Content */}
      <div className="text-white mb-6">
        <p className="whitespace-pre-wrap">{post.content}</p>
        
        {post.image && (
          <div className="mt-4 relative w-full h-[400px]">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Game Tag */}
      <div className="mb-4">
        <span className="inline-block bg-highlight/20 text-highlight px-3 py-1 rounded-full text-sm">
          {post.game}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6 border-t border-white/10 pt-4">
        {/* Voting */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onVote('up')}
            className={`p-2 rounded hover:bg-white/10 ${
              isUpvoted ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            <FaArrowUp className="text-xl" />
          </button>
          <span className="text-white font-medium">{post.votes}</span>
          <button
            onClick={() => onVote('down')}
            className={`p-2 rounded hover:bg-white/10 ${
              isDownvoted ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <FaArrowDown className="text-xl" />
          </button>
        </div>

        {/* Comments */}
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <FaComment />
          <span>{post.commentCount} Comments</span>
        </button>

        {/* Share */}
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <FaShare />
          <span>Share</span>
        </button>

        {/* Save */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`flex items-center space-x-2 ${
            isSaved ? 'text-highlight' : 'text-gray-400 hover:text-white'
          }`}
        >
          <FaBookmark />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostBody;
