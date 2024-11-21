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
  const popularPosts = [
    {
      id: 1,
      title: "The Clash of Dragons is Breaking Record Sales in USA and Japan",
      author: "Dexter",
      date: "Dec 15th, 2018",
      image: blogImage,
    },
    {
      id: 2,
      title: `"Legend of Kenshi II" is a Bit Green for Now`,
      author: "Vellatrix",
      date: "Dec 15th, 2018",
      image: blogImage,
    },
  ];

  const latestReviews = [
    {
      id: 1,
      title: "We Reviewed the New Magimons Game",
      author: "Vellatrix",
      date: "Dec 15th, 2018",
      rating: "8.7",
      image: blogImage,
    },
    {
      id: 2,
      title: "We Reviewed the New and Exciting Fantasy Game Olympus",
      author: "Morgana",
      date: "Dec 15th, 2018",
      rating: "9.2",
      image: blogImage,
    },
  ];
  if (router.isFallback) {
    return <div>Loading...</div>;
  }



  return (
    <>
      <ResponsiveContainer className="my-16 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-background-light py-6 rounded-lg shadow-md">
            {/* Featured Image */}
            <Image
              src={blogImage}
              alt="Featured Blog"
              className="rounded-lg mb-6 w-full h-auto object-cover"
            />

            {/* Blog Metadata */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-500 text-white p-2 rounded-full text-center w-10 h-10">
                <p className="text-sm">120</p>
                <p className="text-xs">FB</p>
              </div>
              <div className="bg-cyan-500 text-white p-2 rounded-full text-center w-10 h-10">
                <p className="text-sm">63</p>
                <p className="text-xs">TW</p>
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded-full text-center w-10 h-10">
                <p className="text-sm">46</p>
                <p className="text-xs">G+</p>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-white text-3xl font-bold mb-4">
              The "Clash of Eternity" New Game Was Just Released
            </h1>

            {/* Blog Info */}
            <div className="flex items-center text-foreground text-sm mb-6">
              <p>By Dexter</p>
              <span className="mx-2">|</span>
              <p>December 15th, 2018</p>
              <span className="mx-2">|</span>
              <p>174 Comments</p>
            </div>

            {/* Blog Description */}
            <p className="text-foreground">
              The new game from the world-famous "Eternity Studios" is back with
              a new adventure, filled with intense battles, challenging puzzles,
              and an immersive storyline that takes players to uncharted realms of
              fantasy and excitement.
            </p>
            <p className="text-foreground">
              The new game from the world-famous "Eternity Studios" is back with
              a new adventure, filled with intense battles, challenging puzzles,
              and an immersive storyline that takes players to uncharted realms of
              fantasy and excitement.
            </p>
            <blockquote className="border-l-4 border-highlight bg-background-light p-4 my-6 text-foreground">
              <p className="italic text-lg">
                "The greatest glory in living lies not in never falling, but in rising every time we fall."
              </p>
              <footer className="mt-2 text-sm text-foreground-light">
                — Nelson Mandela
              </footer>
            </blockquote>
            <p className="text-foreground">
              The new game from the world-famous "Eternity Studios" is back with
              a new adventure, filled with intense battles, challenging puzzles,
              and an immersive storyline that takes players to uncharted realms of
              fantasy and excitement.
            </p>
            <p className="text-foreground">
              The new game from the world-famous "Eternity Studios" is back with
              a new adventure, filled with intense battles, challenging puzzles,
              and an immersive storyline that takes players to uncharted realms of
              fantasy and excitement.
            </p>
            <p className="text-foreground">
              The new game from the world-famous "Eternity Studios" is back with
              a new adventure, filled with intense battles, challenging puzzles,
              and an immersive storyline that takes players to uncharted realms of
              fantasy and excitement.
            </p>
            <p className="text-foreground">
              The new game from the world-famous "Eternity Studios" is back with
              a new adventure, filled with intense battles, challenging puzzles,
              and an immersive storyline that takes players to uncharted realms of
              fantasy and excitement.
            </p>

          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          {/* Popular Posts */}
          <div className="mb-6 py-6">
            <h2 className="text-white text-lg font-bold mb-4">Popular Posts</h2>
            {popularPosts.map((post) => (
              <div key={post.id} className="flex items-center mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-foreground font-bold text-sm">
                    {post.title}
                  </h3>
                  <p className="text-foreground text-xs">
                    By {post.author} | {post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Latest Reviews */}
          <div>
            <h2 className="text-white text-lg font-bold mb-4">Latest Reviews</h2>
            {latestReviews.map((review) => (
              <div key={review.id} className="flex items-center mb-4">
                <Image
                  src={review.image}
                  alt={review.title}
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-foreground font-bold text-sm">
                    {review.title}
                  </h3>
                  <p className="text-foreground text-xs">
                    By {review.author} | {review.date}
                  </p>
                  <p className="text-highlight font-bold">{review.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </>
  );
}
