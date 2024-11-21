"use client";
// import { useRouter } from "next/router";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { use } from 'react';

import { TypographyH1, TypographyH2, TypographyP, TypographyH3, TypographyH4 } from "@/components/ui/Typographies";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import blogImage from "@/public/images/blogs/blog1.jpg"; // Fallback image
import Link from "next/link";

export default function BlogDetailPage({ params }) {
  const router = useRouter();
  const { slug } = use(params);
  const blog = {
    title: "The Ultimate Guide to Becoming a Pro Gamer",
    content: `
      <p>Gaming has evolved from a hobby to a career for many. With the rise of esports, streaming platforms, and the increasing popularity of multiplayer games, becoming a professional gamer has never been more achievable. In this guide, we’ll walk you through the steps to take your gaming skills to the next level.</p>
      
      <h3>1. Choose Your Game</h3>
      <p>The first step to becoming a pro gamer is to choose a game that you're passionate about. Whether it’s <strong>League of Legends</strong>, <strong>Valorant</strong>, or <strong>Fortnite</strong>, pick a game that excites you and suits your skills.</p>
      
      <h3>2. Master the Mechanics</h3>
      <p>Becoming a pro gamer isn’t just about playing a lot. It’s about playing smart. Learn the mechanics of the game inside and out, and practice regularly to improve your skills.</p>
  
      <h3>3. Join Competitive Teams</h3>
      <p>Once you've built your skills, find a team that you can compete with. Whether it’s local tournaments or online competitions, joining a competitive team is key to improving your game.</p>
  
      <h3>4. Stay Updated on the Meta</h3>
      <p>The gaming world evolves quickly, and the game meta (or the most effective strategies) change frequently. Keep up with the latest updates, patch notes, and community strategies to stay competitive.</p>
      
      <h3>5. Build a Personal Brand</h3>
      <p>Esports is as much about personal branding as it is about gaming. Whether it’s through social media, streaming platforms like Twitch, or creating YouTube videos, building a personal brand can open up sponsorships and career opportunities.</p>
  
      <h3>6. Compete and Never Give Up</h3>
      <p>The road to becoming a pro gamer is full of challenges, but persistence is key. Continue competing, learning, and improving, and you'll see results.</p>
      
      <p>Remember, every pro gamer started as a beginner. With determination and hard work, you can make it too!</p>
    `,
    author: "Jane Doe",
    date: "2024-11-21T10:00:00Z",
    slug: "the-ultimate-guide-to-becoming-a-pro-gamer"
  };
  if (router.isFallback) {
    return <div>Loading...</div>;
  }



  return (
    <>
        <ResponsiveContainer className="relative z-10">
        </ResponsiveContainer>
    </>
  );
}
