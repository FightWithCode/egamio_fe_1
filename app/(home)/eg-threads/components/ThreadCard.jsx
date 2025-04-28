"use client"

import { useState } from 'react'
import Link from "next/link"
import { FaRegCommentDots, FaThumbsUp } from "react-icons/fa6"
import { FaShareSquare } from "react-icons/fa"
import ShareModal from './ShareModal'
import DOMPurify from 'dompurify'; // Use DOMPurify directly without jsdom

export default function ThreadCard({ post }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const sanitizedContent = DOMPurify.sanitize(post.short_content);

  const postUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/eg-threads/${post.thread_id}/${post.slug}`
    : ''

  return (
    <>
      <div className="bg-transparent text-foreground p-4 rounded-lg mb-6 border-[1px] border-white/20 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Link
              href={`/author/${post.author.id}`}
              className="font-semibold text-highlight hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author.name}
            </Link>
            <span className="text-gray-300">• {post.game}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center space-x-1 hover:text-highlight"
            >
              <FaShareSquare />
              <span>{post.like_count}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-highlight">
              <FaRegCommentDots />
              <span>{post.comment_count}</span>
            </button>
          </div>
        </div>
        <Link href={`/eg-threads/${post.thread_id}/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </Link>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postUrl={postUrl}
        title={post.title}
      />
    </>
  )
}
