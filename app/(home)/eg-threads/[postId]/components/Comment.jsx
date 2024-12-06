// app/(home)/eg-threads/[postId]/components/Comment.jsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { FaArrowUp, FaArrowDown, FaReply } from 'react-icons/fa';

const Comment = ({ comment }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

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
    <div className="border-l-2 border-white/20 pl-4 mb-4">
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
        <span className="font-semibold text-white">{comment.author}</span>
        <span className="text-gray-400">
          {formatDistanceToNow(new Date(comment.createdAt))} ago
        </span>
      </div>

      {/* Comment Content */}
      <div className="text-white mb-2">
        {comment.text}
      </div>

      {/* Comment Actions */}
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleVote('up')}
            className={`p-1 rounded ${isUpvoted ? 'text-green-500' : 'text-gray-400'}`}
          >
            <FaArrowUp />
          </button>
          <span className="text-white">{comment.votes}</span>
          <button
            onClick={() => handleVote('down')}
            className={`p-1 rounded ${isDownvoted ? 'text-red-500' : 'text-gray-400'}`}
          >
            <FaArrowDown />
          </button>
        </div>
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="flex items-center space-x-1 text-gray-400 hover:text-white"
        >
          <FaReply />
          <span>Reply</span>
        </button>
      </div>

      {/* Reply Box */}
      {showReplyBox && (
        <div className="mt-2 mb-4">
          <textarea
            className="w-full bg-transparent border border-white/20 rounded p-2 text-white"
            placeholder="Write a reply..."
            rows="3"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowReplyBox(false)}
              className="px-4 py-2 rounded text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-highlight rounded text-white hover:bg-opacity-80"
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
