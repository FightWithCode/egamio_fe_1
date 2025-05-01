'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark } from 'react-icons/fa';
import api from '@/services/api/axiosSetup';
import ShareModal from '../../components/ShareModal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

const PostBody = ({ post, liked, disliked }) => {
  const [isLiked, setIsLiked] = useState(liked); // Initialize with the prop value
  const [isDisliked, setIsDisliked] = useState(disliked); // Initialize with the prop value
  const [isSaved, setIsSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const sanitizedContent = DOMPurify.sanitize(post.content);

  useEffect(() => {
    setIsLiked(liked);
    setIsDisliked(disliked);
  }, [liked, disliked]);

  const likeThread = async () => {
    try {
      if (!isAuthenticated) {
        toast.error('You must be logged in to like a thread');
        return;
      }

      const response = await api.post(`/eg-threads/threads/like/${post.thread_id}/`);
      if (response.status === 200) {
        if (response.data.status === 'liked') {
          setIsLiked(true);
          setIsDisliked(false);
        } else {
          setIsLiked(false);
        }
      } else {
        toast.error('Failed to update vote');
      }
    } catch (error) {
      toast.error('Error liking the thread');
    }
  };

  const dislikeThread = async () => {
    try {
      if (!isAuthenticated) {
        toast.error('You must be logged in to dislike a thread');
        return;
      }

      const response = await api.post(`/eg-threads/threads/dislike/${post.thread_id}/`);
      if (response.status === 200) {
        if (response.data.status === 'disliked') {
          setIsDisliked(true);
          setIsLiked(false);
        } else {
          setIsDisliked(false);
        }
      } else {
        toast.error('Failed to update vote');
      }
    } catch (error) {
      toast.error('Error disliking the thread');
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Content */}
        <div className="text-white mb-6">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>

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
        <div className="flex flex-wrap gap-2 mb-4">
          {post.meta_keywords.split(',').map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6 border-t border-white/10 pt-4">
          {/* Voting */}
          <div className="flex items-center space-x-2">
            <button
              onClick={likeThread}
              className={`p-2 rounded hover:bg-white/10 ${isLiked ? 'text-green-500' : 'text-gray-400'}`}
            >
              <FaArrowUp className="text-xl" />
            </button>
            <button
              onClick={dislikeThread}
              className={`p-2 rounded hover:bg-white/10 ${isDisliked ? 'text-red-500' : 'text-gray-400'}`}
            >
              <FaArrowDown className="text-xl" />
            </button>
          </div>

          {/* Share */}
          <button onClick={() => setIsShareModalOpen(true)} className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <FaShare />
            <span>Share</span>
          </button>

          {/* Save */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center space-x-2 ${isSaved ? 'text-highlight' : 'text-gray-400 hover:text-white'}`}
          >
            <FaBookmark />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postUrl={window.location}
        title={post.title}
      />
    </>
  );
};

export default PostBody;
