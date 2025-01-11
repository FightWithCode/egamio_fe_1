// app/(home)/eg-threads/[postId]/components/CommentSection.jsx
'use client';

import React from 'react';
import Comment from './Comment';

export default function CommentSection({ comments }) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg border-[1px] border-white/20">
        <textarea
          className="w-full bg-transparent text-white rounded-lg p-4 mb-4 backdrop-blur-md"
          placeholder="What are your thoughts?"
          rows="4"
        />
        <button className="bg-highlight text-white px-4 py-2 rounded-full hover:bg-darkhighlight">
          Comment
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
