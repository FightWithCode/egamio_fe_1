"use client";
// import { useRouter } from "next/router";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { use } from 'react';

import { TypographyH1, TypographyH2, TypographyP, TypographyH3, TypographyH4 } from "@/components/ui/Typographies";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import blogImage from "@/public/images/blogs/blog1.jpg"; // Fallback image
import Link from "next/link";
import blogImage1 from "@/public/images/blogs/blog1.jpg";
import blogImage2 from "@/public/images/blogs/blog2.jpg";
import blogImage3 from "@/public/images/blogs/blog3.jpg";
import { FaArrowUp, FaArrowDown, FaShare, FaBookmark, FaComment, FaEllipsisH, FaFire, FaClock, FaTrophy } from "react-icons/fa";


const SingleBlogPost = ({ params }) => {
  // This would typically come from an API or database
  const post = {
    id: 1,
    image: blogImage1,
    rating: "8.7",
    title: "We Reviewed the New Magimons Game",
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    author: "Vellatrix",
    date: "November 21, 2024",
    comments: "258 Comments",
    comments_arr: [
      {
        id: 1,
        author: "ProGamer",
        authorAvatar: "/avatars/pro-gamer.jpg",
        text: "Try a 3-finger claw setup; it's great for accuracy!",
        votes: 45,
        createdAt: "2024-01-15T11:00:00Z",
        replies: [
          {
            id: 4,
            author: "Newbie",
            authorAvatar: "/avatars/newbie.jpg",
            text: "Could you share your layout screenshot?",
            votes: 12,
            createdAt: "2024-01-15T11:30:00Z"
          }
        ]
      },
      // ... other comments
    ],
    category: "Game Reviews"
  };

  // Related posts would also typically come from an API
  const relatedPosts = [/* ... similar to your blogPosts array ... */];

  return (
    <ResponsiveContainer className="!text-background pt-24 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        {/* Main Content */}
        <article className="space-y-8">
          <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
            <Image
              src={post.image}
              alt={post.title}
              className="rounded-lg w-full h-[400px] object-cover mb-6"
            />

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-highlight text-white text-sm font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="bg-highlight text-white text-sm font-semibold px-3 py-1 rounded-full">
                {post.rating}
              </span>
            </div>

            <h1 className="text-white text-4xl font-extrabold leading-tight mb-4">
              {post.title}
            </h1>

            <div className="text-foreground text-sm mb-6">
              By <span className="font-semibold">{post.author}</span> |{" "}
              <span className="font-semibold">{post.date}</span> | {post.comments}
            </div>

            <div className="text-foreground text-lg leading-relaxed space-y-4">
              {post.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Comments Section */}
            {/* Comments Section */}
            <div className="mt-8 pt-8 border-t border-highlight">
              <h2 className="text-white text-2xl font-bold mb-6">
                Comments ({post.comments_arr?.length || 0})
              </h2>

              <div className="space-y-6">
                {post.comments_arr && post.comments_arr.length > 0 ? (
                  post.comments_arr.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-[1px] border-white/20 rounded-lg backdrop-blur-md"
                    >
                      <div className="p-4">
                        {/* Comment Header */}
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="relative h-6 w-6 rounded-full overflow-hidden">
                            <Image
                              src={blogImage1}
                              alt={comment.author || 'Anonymous'}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-blue-400 hover:underline">{comment.author}</span>
                          <span className="text-gray-400">
                            {comment.timestamp || 'Just now'}
                          </span>
                        </div>

                        {/* Comment Content */}
                        <p className="text-white ml-8">{typeof comment === 'string' ? comment : comment.text}</p>

                        {/* Comment Actions */}
                        <div className="flex items-center space-x-4 text-gray-400 mt-2 ml-8">
                          <button className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded">
                            <FaArrowUp size={12} />
                            <span>12</span>
                            <FaArrowDown size={12} />
                          </button>
                          <button className="hover:bg-gray-700 px-2 py-1 rounded">Reply</button>
                          <button className="hover:bg-gray-700 px-2 py-1 rounded">Share</button>
                        </div>

                        {/* Nested Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-8 mt-4 border-l-2 border-gray-700 pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="mt-4">
                                {/* Reply content similar to comment structure */}
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="relative h-6 w-6 rounded-full overflow-hidden">
                                    <Image
                                      src={blogImage2}
                                      alt={reply.author}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-blue-400 hover:underline">{reply.author}</span>
                                  <span className="text-gray-400">
                                    Just now
                                  </span>
                                </div>
                                <p className="text-white">{reply.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  // Empty State
                  <div className="bg-background-light/50 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-foreground/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <h3 className="text-white font-semibold text-lg">No Comments Yet</h3>
                      <p className="text-foreground/60">Be the first to share your thoughts!</p>
                      <button className="mt-4 px-6 py-2 bg-highlight text-white rounded-full hover:bg-highlight/80 transition-colors">
                        Write a Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Optional: Add Comment Form */}
              {post.comments_arr?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-white font-semibold mb-4">Add a Comment</h3>
                  <textarea
                    className="w-full bg-transparent border border-white/20 rounded-lg p-4 text-foreground resize-none focus:outline-none focus:border-highlight"
                    rows="4"
                    placeholder="Share your thoughts..."
                  />
                  <button className="mt-4 px-6 py-2 bg-highlight text-white rounded-full hover:bg-highlight/80 transition-colors">
                    Post Comment
                  </button>
                </div>
              )}
            </div>

          </div>
        </article>

        {/* Sidebar */}
        <aside className="p-3 rounded-lg sticky top-24 backdrop-blur-md border-[1px] border-white/20">
          <h3 className="text-white text-xl font-bold border-b border-highlight pb-2">
            Related Posts
          </h3>
          {relatedPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center gap-4 hover:bg-background-light transition-colors py-4 border-b-[1px] mt-0"
            >
              <Image
                src={post.image}
                alt={post.title}
                className="rounded-md w-[80px] h-[80px] object-cover"
              />
              <div className="flex flex-col">
                <h4 className="text-white text-base font-semibold leading-tight hover:text-highlight transition-colors">
                  {post.title}
                </h4>
                <p className="text-foreground text-xs">
                  By {post.author} | {post.date}
                </p>
              </div>
            </div>
          ))}

          {/* Ad Space */}
          <div className="bg-background-light p-4 rounded-lg text-center mt-6">
            <h4 className="text-highlight font-bold">Ad Space</h4>
            <p className="text-foreground text-sm mt-2">
              Place your ad content here to monetize your site.
            </p>
          </div>
        </aside>
      </div>
    </ResponsiveContainer>
  );
};

export default SingleBlogPost;
