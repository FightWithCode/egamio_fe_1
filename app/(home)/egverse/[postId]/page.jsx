"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function ForumPost() {
  const { postId } = useParams();

  // Simulated content
  const samplePost = {
    title: "What are the best settings for BGMI?",
    author: "PlayerOne",
    content: `I've been experimenting with different sensitivity settings and layouts for BGMI. 
              I want to hear your recommendations! What works best for you?`,
    game: "BGMI",
    comments: [
      { id: 1, author: "ProGamer", text: "Try a 3-finger claw setup; it's great for accuracy!" },
      { id: 2, author: "SniperWolf", text: "I prefer the gyroscope settings for better control." },
      { id: 3, author: "Newbie", text: "Can someone explain what sensitivity settings mean?" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-highlight mb-4">{samplePost.title}</h1>
      <p className="text-gray-400 mb-2">Posted by {samplePost.author} | Game: {samplePost.game}</p>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <p className="text-white">{samplePost.content}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {samplePost.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-3 rounded-lg shadow-md">
              <p className="text-highlight font-bold">{comment.author}</p>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
