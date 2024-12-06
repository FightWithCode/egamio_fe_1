// app/(home)/eg-threads/[postId]/components/PostContent.jsx
'use client';

import React from 'react';
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import CommentSection from './CommentSection';
import Sidebar from './Sidebar';
import { useVoting } from '../hooks/useVoting';

export default function PostContent({ post }) {
  const { isUpvoted, isDownvoted, handleVote } = useVoting();

  return (
    <ResponsiveContainer className="mt-32 min-h-screen">
      <div className="max-w-7xl mx-auto my-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-grow lg:w-3/4">
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <PostHeader post={post} />
                  <PostBody 
                    post={post} 
                    isUpvoted={isUpvoted}
                    isDownvoted={isDownvoted}
                    onVote={handleVote}
                  />
                </div>
              </div>
            </div>
            <CommentSection comments={post.comments} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar relatedTopics={post.relatedTopics} />
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
