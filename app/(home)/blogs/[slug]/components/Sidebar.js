// app/(home)/blogs/[slug]/components/Sidebar.jsx
import Image from 'next/image'
import Link from 'next/link'
import { FaFire, FaClock, FaTrophy } from 'react-icons/fa'
import { createSlug } from '../../data'

export default function Sidebar({ relatedPosts }) {
  return (
    <aside className="space-y-8">
      {/* Popular Posts Section */}
      <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
        <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
          <FaFire className="text-highlight" />
          Popular Posts
        </h3>
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <PopularPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
        <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
          <FaClock className="text-highlight" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <RecentPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Top Rated Section */}
      <div className="bg-transparent p-6 rounded-lg border-[1px] border-white/20 backdrop-blur-md">
        <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
          <FaTrophy className="text-highlight" />
          Top Rated
        </h3>
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <TopRatedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </aside>
  )
}

function PopularPostCard({ post }) {
  return (
    <Link href={`/blogs/${createSlug(post.title)}`}>
      <div className="flex gap-4 group">
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h4 className="text-white font-semibold group-hover:text-highlight transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-foreground mt-1">{post.date}</p>
        </div>
      </div>
    </Link>
  )
}

function RecentPostCard({ post }) {
  return (
    <Link href={`/blogs/${createSlug(post.title)}`}>
      <div className="flex gap-4 group">
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h4 className="text-white font-semibold group-hover:text-highlight transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-foreground mt-1">{post.date}</p>
        </div>
      </div>
    </Link>
  )
}

function TopRatedCard({ post }) {
  return (
    <Link href={`/blogs/${createSlug(post.title)}`}>
      <div className="flex gap-4 group">
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-highlight text-white text-xs font-bold px-2 py-1 rounded-full">
            {post.rating}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold group-hover:text-highlight transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-foreground mt-1">{post.date}</p>
        </div>
      </div>
    </Link>
  )
}
