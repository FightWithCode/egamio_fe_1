'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FaArrowUp, FaArrowDown, FaReply } from 'react-icons/fa';
import defaultUser from "@/public/images/users/default.png";
import { toast } from 'react-toastify';
import api from '@/services/api/axiosSetup';
import { useAuth } from '@/context/AuthContext';

const Comment = ({ comment, threadId, refreshComments }) => {
  console.log(comment,' 44')
  const [isUpvoted, setIsUpvoted] = useState(comment.is_liked_by_user);
  const [isDownvoted, setIsDownvoted] = useState(comment.is_disliked_by_user);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { isAuthenticated } = useAuth();

  // Function to handle liking a comment
  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to like a thread');
      return;
    }
    try {
      const response = await api.post(`/eg-threads/comments/${comment.id}/like/`);
      if (response.status === 200) {
        // Toggle the upvote state based on the response
        setIsUpvoted(!isUpvoted);
        setIsDownvoted(false); // Remove downvote if like is applied
        toast.success(response.data.status === 'liked' ? "Liked" : "Unliked");
        refreshComments(); // Refresh comments after action
      } else {
        toast.error("Failed to like the comment");
      }
    } catch (error) {
      toast.error("Error liking the comment");
    }
  };

  // Function to handle disliking a comment
  const handleDislike = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to dislike a thread');
      return;
    }
    try {
      const response = await api.post(`/eg-threads/comments/${comment.id}/dislike/`);
      if (response.status === 200) {
        // Toggle the downvote state based on the response
        setIsDownvoted(!isDownvoted);
        setIsUpvoted(false); // Remove upvote if dislike is applied
        toast.success(response.data.status === 'disliked' ? "Disliked" : "Undisliked");
        refreshComments(); // Refresh comments after action
      } else {
        toast.error("Failed to dislike the comment");
      }
    } catch (error) {
      toast.error("Error disliking the comment");
    }
  };

  // Handle reply content change
  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  // Handle the reply submission
  const handleReplySubmit = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to comment');
      return;
    }
    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      const response = await api.post(`/eg-threads/threads/${threadId}/comment/${comment.id}/reply/`, {
        content: replyContent,
      });

      if (response.status === 201) {
        setReplyContent('');
        setShowReplyBox(false);
        toast.success("Reply added successfully!");
        refreshComments();
      } else {
        toast.error("Failed to add reply");
      }
    } catch (error) {
      toast.error("Error adding reply");
    }
  };

  // Check if created_at is a valid ISO string
  const createdAt = comment.created_at ? parseISO(comment.created_at) : null;
  const timeAgo = createdAt ? formatDistanceToNow(createdAt) : 'Unknown time';

  return (
    <div className="border-l-2 border-white/20 pl-4 mb-4">
      {/* Comment Header */}
      <div className="flex items-center space-x-2 mb-2">
        <div className="relative h-6 w-6 rounded-full overflow-hidden">
          <Image
            src={comment.author?.avatar || defaultUser}
            alt={comment.author?.name || 'Anonymous'}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-semibold text-white">{comment.author?.name || 'Anonymous'}</span>
        <span className="text-gray-400">
          {timeAgo} ago
        </span>
      </div>

      {/* Comment Content */}
      <div className="text-white mb-2">
        {comment.content}
      </div>

      {/* Comment Actions */}
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLike}
            className={`p-1 rounded ${isUpvoted ? 'text-green-500' : 'text-gray-400'}`}
          >
            <FaArrowUp />
          </button>
          <span className="text-white">{comment.likes?.length || 0}</span>
          <button
            onClick={handleDislike}
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
            value={replyContent}
            onChange={handleReplyChange}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowReplyBox(false)}
              className="px-4 py-2 rounded text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
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
            <Comment
              key={reply.id}
              comment={reply}
              threadId={threadId}
              refreshComments={refreshComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
