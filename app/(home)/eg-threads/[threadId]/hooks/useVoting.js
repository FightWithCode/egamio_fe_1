// app/(home)/eg-threads/[postId]/hooks/useVoting.js
import { useState } from 'react';

export function useVoting() {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleVote = (type) => {
    if (type === 'up') {
      setIsUpvoted(!isUpvoted);
      setIsDownvoted(false);
    } else {
      setIsDownvoted(!isDownvoted);
      setIsUpvoted(false);
    }
  };

  return { isUpvoted, isDownvoted, handleVote };
}
