// app/(home)/blogs/[slug]/components/CommentForm.jsx
"use client"

import { useState } from 'react'

export default function CommentForm() {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle comment submission
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-4 bg-background-light rounded-lg"
        placeholder="Write a comment..."
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 px-6 py-2 bg-highlight text-white rounded-full"
      >
        Post Comment
      </button>
    </form>
  )
}
