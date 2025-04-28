'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '@/services/api/axiosSetup';
import Comment from './Comment';
import { useSelector } from 'react-redux';

export default function CommentSection({ comments, threadId }) {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (comments) {
      setCommentList(comments);
    }
  }, [comments]);

  const refreshComments = async () => {
    try {
      const response = await api.get(`/eg-threads/threads/${threadId}/get-other-details/`);
      if (response.status === 200) {
        setCommentList(response.data.comments);
      } else {
        toast.error("Failed to load comments");
      }
    } catch (error) {
      toast.error("Error fetching comments");
    }
  };

  // Handle the change in textarea input
  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  // Submit the comment
  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      // Send the new comment to the server
      const response = await api.post(`/eg-threads/threads/${threadId}/comment/`, { content: newComment });

      if (response.status === 201) {
        // Optimistic update - Add the new comment to the list immediately
        setCommentList(prevComments => [
          ...prevComments,
          { id: response.data.id, content: newComment, ...response.data }
        ]);

        // Clear the input field after submitting the comment
        setNewComment('');
        toast.success("Comment added successfully!");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg border-[1px] border-white/20">
        <textarea
          className="w-full bg-transparent text-white rounded-lg p-4 mb-4 backdrop-blur-md"
          placeholder="What are your thoughts?"
          rows="4"
          value={newComment}
          onChange={handleInputChange}
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-highlight text-white px-4 py-2 rounded-full hover:bg-darkhighlight"
        >
          Comment
        </button>
      </div>

      {/* Display comments */}
      <div className="mt-6 space-y-4">
        {commentList.map((comment, i) => (
          <Comment key={i} comment={comment} threadId={threadId} refreshComments={refreshComments} />
        ))}
      </div>
    </div>
  );
}
