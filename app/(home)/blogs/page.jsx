"use client";
// React and Next Imports
import React from "react";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import Image from "next/image";
import blogImage1 from "@/public/images/blogs/blog1.jpg";
import blogImage2 from "@/public/images/blogs/blog2.jpg";
import blogImage3 from "@/public/images/blogs/blog3.jpg";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      image: blogImage1,
      rating: "8.7",
      title: "We Reviewed the New Magimons Game",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Vellatrix",
      date: "November 21, 2024",
      comments: "258 Comments",
    },
    {
      id: 2,
      image: blogImage2,
      rating: "6.5",
      title: `"Legend of Kenshi II" is a Bit Green for Now`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Vellatrix",
      date: "November 20, 2024",
      comments: "125 Comments",
    },
    {
      id: 3,
      image: blogImage3,
      rating: "9.2",
      title: `We Reviewed the New and Exciting Fantasy Game "Olympus"`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Morgana",
      date: "November 19, 2024",
      comments: "320 Comments",
    },
  ];

  return (
    <ResponsiveContainer className="!text-background">
      <div className="my-8 flex flex-col lg:flex-row gap-8">
        {/* Blog List */}
        <div className="mt-16 flex-1 space-y-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-background p-6 rounded-lg transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="rounded-lg w-full md:w-[180px] h-[180px] object-cover"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-highlight text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Game Reviews
                    </span>
                    <span className="bg-highlight text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {post.rating}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-extrabold leading-snug hover:text-highlight transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground text-base mt-3 line-clamp-3">{post.description}</p>
                  <div className="text-foreground text-xs mt-4">
                    By <span className="font-semibold">{post.author}</span> |{" "}
                    <span className="font-semibold">{post.date}</span> | {post.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="mt-16 w-full lg:w-[300px] flex-shrink-0 bg-background p-6 rounded-lg sticky top-24">
          <h3 className="text-white text-xl font-bold border-b border-highlight pb-2 mb-6">
            Popular Posts
          </h3>
          {blogPosts.map((post, index) => (
            <div key={index} className="mb-6 flex items-center gap-4 hover:bg-background-light p-4 rounded-md transition-colors">
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
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default BlogPage;
