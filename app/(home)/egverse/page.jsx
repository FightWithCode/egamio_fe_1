"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRegCommentDots, FaThumbsUp, FaBars, FaTimes } from "react-icons/fa6";

export default function ForumHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const samplePosts = [
    {
      id: 1,
      title: "What are the best settings for BGMI?",
      author: "PlayerOne",
      game: "BGMI",
      comments: 12,
      likes: 34,
      content:
        "I've been experimenting with different sensitivity settings and layouts for BGMI. I want to hear your recommendations! What works best for you?",
    },
    {
      id: 2,
      title: "Looking for teammates for Valorant Ranked.",
      author: "ValorViper",
      game: "Valorant",
      comments: 5,
      likes: 20,
      content:
        "I'm looking for skilled teammates to climb ranked in Valorant. Prefer players with good communication and at least Plat rank.",
    },
    {
      id: 3,
      title: "Poll: Favorite map in Call of Duty: Mobile?",
      author: "CODFanatic",
      game: "Call of Duty",
      comments: 18,
      likes: 50,
      content:
        "What's your favorite map in COD: Mobile? Vote now! Personally, I love Rust for its fast-paced action.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-highlight">eGVerse</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`md:flex ${menuOpen ? "block" : "hidden md:block"}`}>
        {/* Left Sidebar */}
        <div className="md:col-span-1 w-full md:w-1/4 bg-gray-900 p-4 rounded-lg space-y-6 shadow-md">
          <h2 className="font-semibold text-lg text-highlight">Menu</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="group">
              <span className="font-semibold">🎮 Games</span>
              <ul className="ml-4 mt-2 space-y-2 hidden group-hover:block">
                <li>BGMI</li>
                <li>Valorant</li>
                <li>Call of Duty</li>
                <li>Fortnite</li>
              </ul>
            </li>
            <li>Polls</li>
            <li>Discussions</li>
            <li>Questions</li>
          </ul>
          <div className="border-t border-gray-700 pt-4">
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/4 space-y-4 mx-auto">
          {samplePosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href={`/forum/${post.id}`}
                className="text-2xl font-semibold hover:underline text-highlight"
              >
                {post.title}
              </Link>
              <p className="text-gray-400 text-sm mb-2">
                Posted by <span className="text-white">{post.author}</span> |{" "}
                <span className="text-highlight">{post.game}</span>
              </p>
              <p className="text-gray-300 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <FaRegCommentDots /> {post.comments} Comments
                </span>
                <span className="flex items-center gap-1">
                  <FaThumbsUp /> {post.likes} Likes
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-900 p-4 rounded-lg space-y-6 shadow-md">
          {/* Ad Section */}
          <div className="bg-highlight/20 p-4 rounded-lg text-white text-center">
            <h2 className="font-semibold text-lg">Sponsored Ad</h2>
            <p className="text-sm">Join the ultimate gaming experience now!</p>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg text-highlight">
              Popular Categories
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>🎮 BGMI Tips & Tricks</li>
              <li>⚔️ Valorant Team Building</li>
              <li>🏆 COD: Mobile Tournaments</li>
              <li>🕹️ eSports Career Guidance</li>
            </ul>
          </div>

          {/* User Info */}
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h2 className="font-semibold text-lg text-highlight">User Info</h2>
            <div className="mt-3 text-sm">
              <p>
                <strong>Player:</strong> PlayerOne
              </p>
              <p>
                <strong>Posts:</strong> 25
              </p>
              <p>
                <strong>Likes Received:</strong> 200
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
