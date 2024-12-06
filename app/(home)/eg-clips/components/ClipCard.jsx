// app/(home)/eg-clips/components/ClipCard.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaHeart, FaComment, FaShare, FaUserPlus, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function ClipCard({ clip, isVisible }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.currentTime = 0; // Reset video when becoming visible
        videoRef.current.play().catch(() => { });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
        toast.error('Error playing video');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-full flex items-center justify-center bg-transparent backdrop-blur-md">
      {/* Video Container with 9:16 aspect ratio */}
      <div className="relative w-full max-h-full" style={{ aspectRatio: '9/16' }}>
        <video
          ref={videoRef}
          src={clip.videoUrl}
          className="w-full h-full object-contain"
          loop
          playsInline
          muted={isMuted}
          poster={clip.thumbnailUrl}
          onClick={handleVideoClick}
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90" />

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
              toast.success(isLiked ? 'Removed from liked clips' : 'Added to liked clips');
            }}
            className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-white'}`}
          >
            <FaHeart size={24} />
            <span className="text-sm block">{clip.likes}</span>
          </button>

          <button className="p-2 rounded-full text-white">
            <FaComment size={24} />
            <span className="text-sm block">{clip.comments}</span>
          </button>

          <button className="p-2 rounded-full text-white">
            <FaShare size={24} />
            <span className="text-sm block">Share</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="p-2 rounded-full text-white"
          >
            {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={clip.creator.avatarUrl}
                alt={clip.creator.username}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{clip.creator.username}</h3>
              <p className="text-sm text-gray-300">{clip.game}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFollowing(!isFollowing);
                toast.success(isFollowing ? 'Unfollowed creator' : 'Following creator');
              }}
              className={`px-4 py-1.5 rounded-full text-sm ${isFollowing
                  ? 'bg-highlight text-white'
                  : 'border border-highlight text-highlight'
                }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
          <p className="text-white mb-2">{clip.title}</p>
          <p className="text-sm text-gray-300 line-clamp-2">{clip.description}</p>
        </div>
      </div>
    </div>
  );
}
