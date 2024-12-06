// app/(home)/eg-clips/hooks/useClips.js
import { useState, useCallback, useEffect } from 'react';

// Sample data for development
const sampleClips = [
  {
    id: 1,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "/thumbnails/clip1.jpg",
    title: "Amazing 1v5 Clutcha!",
    description: "Check out this insane play I made yesterdaya!",
    likes: 1234,
    comments: 89,
    game: "Valorant",
    creator: {
      username: "ProGamer123",
      avatarUrl: "/avatars/default.png",
    }
  },
  {
    id: 2,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "/thumbnails/clip2.jpg",
    title: "Perfect Speedrun",
    description: "New world record attempt!",
    likes: 856,
    comments: 45,
    game: "Minecraft",
    creator: {
      username: "SpeedRunner",
      avatarUrl: "/avatars/default.png",
    }
  },
  {
    id: 3,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "/thumbnails/clip1.jpg",
    title: "Amazing 1v5 Clutchs!",
    description: "Check out this insane play I made yesterdayv!",
    likes: 1234,
    comments: 89,
    game: "Valorant",
    creator: {
      username: "ProGamer123",
      avatarUrl: "/avatars/default.png",
    }
  },
];


export function useClips() {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const startIndex = (page - 1) * 3;
      const endIndex = startIndex + 3;
      const newClips = sampleClips.slice(startIndex, endIndex);
      
      if (newClips.length === 0) {
        setHasMore(false);
        return;
      }

      setClips(prev => [...prev, ...newClips]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading clips:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (clips.length === 0) {
      loadMore();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { clips, loading, loadMore, hasMore };
}
