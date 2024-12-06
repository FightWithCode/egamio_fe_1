// app/(home)/eg-clips/components/ClipsFeed.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useClips } from '../hooks/useClips';
import ClipCard from './ClipCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ClipsFeed() {
  const { clips, loading, loadMore, hasMore } = useClips();
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (bottomInView && hasMore) {
      loadMore();
    }
  }, [bottomInView, hasMore, loadMore]);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const clipHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / clipHeight);
    
    if (newIndex !== currentClipIndex) {
      setCurrentClipIndex(newIndex);
    }
  };

  if (clips.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]"> {/* Adjusted height */}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div 
      className="h-[calc(100vh-10rem)] overflow-y-scroll snap-y snap-mandatory hide-scrollbar rounded-lg" /* Adjusted height */
      onScroll={handleScroll}
    >
      {clips.map((clip, index) => (
        <div
          key={clip.id}
          className="h-[calc(100vh-6rem)] snap-start snap-always" /* Adjusted height */
          ref={index === clips.length - 1 ? bottomRef : null}
        >
          <ClipCard
            clip={clip}
            isVisible={index === currentClipIndex}
            onVisibilityChange={() => {}}
          />
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-center items-center h-20">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
