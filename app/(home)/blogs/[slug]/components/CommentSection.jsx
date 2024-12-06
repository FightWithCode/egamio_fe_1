// app/(home)/blogs/[slug]/components/CommentSection.jsx
"use client"

import { useState } from 'react'
import Image from "next/image"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import CommentForm from './CommentForm'
import { format } from 'date-fns'

export default function CommentSection({ comments }) {
  return (
    <div className="mt-8 pt-8 border-t border-highlight">
      <h2 className="text-white text-2xl font-bold mb-6">
        Comments ({comments?.length || 0})
      </h2>

      <CommentForm />
      
      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <EmptyCommentState />
        )}
      </div>
    </div>
  )
}

function EmptyCommentState() {
  return (
    <div className="text-center py-8 text-foreground">
      <p>No comments yet. Be the first to share your thoughts!</p>
    </div>
  )
}

function CommentHeader({ comment }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 relative">
        <Image
          src={comment.authorAvatar || '/default-avatar.png'}
          alt={comment.author}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div>
        <h4 className="font-semibold text-white">{comment.author}</h4>
        <p className="text-sm text-foreground">
          {format(new Date(comment.createdAt), 'dd/MM/yyyy')}
        </p>
      </div>
    </div>
  )
}


function CommentContent({ comment }) {
  return (
    <div className="py-2 text-foreground">
      <p>{comment.text}</p>
    </div>
  )
}

function CommentActions({ votes, onVote }) {
  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onVote(votes + 1)}
          className="p-1 hover:text-highlight transition-colors"
        >
          <FaArrowUp />
        </button>
        <span className="text-white font-semibold">{votes}</span>
        <button
          onClick={() => onVote(votes - 1)}
          className="p-1 hover:text-highlight transition-colors"
        >
          <FaArrowDown />
        </button>
      </div>
      <button className="text-foreground hover:text-highlight transition-colors">
        Reply
      </button>
    </div>
  )
}

function CommentReplies({ replies }) {
  return (
    <div className="ml-8 mt-4 space-y-4 border-l-2 border-highlight pl-4">
      {replies.map((reply) => (
        <CommentCard key={reply.id} comment={reply} />
      ))}
    </div>
  )
}

function CommentCard({ comment }) {
  const [votes, setVotes] = useState(comment.votes)

  return (
    <div className="border-[1px] border-white/20 rounded-lg backdrop-blur-md">
      <div className="p-4">
        <CommentHeader comment={comment} />
        <CommentContent comment={comment} />
        <CommentActions votes={votes} onVote={setVotes} />
        
        {comment.replies && comment.replies.length > 0 && (
          <CommentReplies replies={comment.replies} />
        )}
      </div>
    </div>
  )
}
