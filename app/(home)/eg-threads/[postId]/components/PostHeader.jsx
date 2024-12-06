// app/(home)/eg-threads/[postId]/components/PostHeader.jsx
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

export default function PostHeader({ post }) {
  return (
    <>
      <div className="flex items-center space-x-2 mb-2">
        <div className="relative h-6 w-6 rounded-full overflow-hidden">
          <Image
            src={post.authorAvatar}
            alt={post.author}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-gray-400">Posted by</span>
        <span className="text-blue-400 hover:underline">u/{post.author}</span>
        <span className="text-gray-400">
          {formatDistanceToNow(new Date(post.createdAt))} ago
        </span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
