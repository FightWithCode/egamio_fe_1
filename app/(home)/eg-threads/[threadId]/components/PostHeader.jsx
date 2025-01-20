// app/(home)/eg-threads/[postId]/components/PostHeader.jsx
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import defaultUser from "@/public/images/users/default.png"

export default function PostHeader({ post }) {
  return (
    <>
      <div className="flex items-center space-x-2 mb-2">
        <div className="relative h-6 w-6 rounded-full overflow-hidden">
          <Image
            src={post.author?.avatar || defaultUser}
            alt={post.author.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-gray-400">Posted by</span>
        <span className="text-blue-400 hover:underline cursor-pointer">u/{post.author.name}</span>
        <span className="text-gray-400">
          {formatDistanceToNow(new Date(post.created_at))} ago
        </span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
    </>
  );
}
