import { useState } from 'react';
import api from '@/services/api/axiosSetup';

export function useVoting() {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleVote = async (type) => {
    if (type === 'up') {
      setIsUpvoted(!isUpvoted);
      setIsDownvoted(false);
      
      // Make the API request to like the post
      await toggleVote('up');
    } else {
      setIsDownvoted(!isDownvoted);
      setIsUpvoted(false);
      
      // Make the API request to dislike the post
      await toggleVote('down');
    }
  };

  const toggleVote = async (voteType, thread_id) => {
    try {
      const response = await api.post(`/eg-threads/threads/like/${thread_id}/`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to update vote');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { isUpvoted, isDownvoted, handleVote };
}
