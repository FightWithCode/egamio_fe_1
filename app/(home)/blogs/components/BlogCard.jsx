// app/(home)/blogs/components/BlogCard.jsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { createSlug } from '../data'

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blogs/${createSlug(post.title)}`}
      className="block"
    >
      <div
        className="bg-transparent p-4 rounded-lg transition-transform transform hover:scale-105 border-[1px] backdrop-blur-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-6">
          <Image
            src={post.image}
            alt={post.title}
            className="rounded-lg w-full h-[200px] object-cover"
          />
          <BlogCardContent post={post} />
        </div>
      </div>
    </Link>
  )
}

function BlogCardContent({ post }) {
  return (
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
      <p className="text-foreground text-base mt-3 line-clamp-3">
        {post.description}
      </p>
      <div className="text-foreground text-xs mt-4">
        By <span className="font-semibold">{post.author}</span> |{" "}
        <span className="font-semibold">{post.date}</span> | {post.comments}
      </div>
    </div>
  )
}
