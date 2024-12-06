// app/(home)/blogs/components/SidebarPost.jsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { createSlug } from '../data'

export default function SidebarPost({ post }) {
  return (
    <Link
      href={`/blogs/${createSlug(post.title)}`}
      className="block"
    >
      <div className="flex items-center gap-4 hover:bg-background-light transition-colors py-4 border-b-[1px] mt-0">
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
    </Link>
  )
}
