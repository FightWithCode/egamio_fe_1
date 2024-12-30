// app/(home)/eg-threads/components/ThreadCard.jsx
"use client"

import Link from "next/link"
import { FaRegCommentDots, FaThumbsUp } from "react-icons/fa6"

export default function ThreadCard({ post }) {
  return (
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
      <Link href={`/eg-threads/${post.id}`}>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-300">{post.content}</p>
      </Link>
    </div>
  )
}
