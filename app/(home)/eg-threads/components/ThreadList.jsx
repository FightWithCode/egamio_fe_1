// app/(home)/eg-threads/components/ThreadList.jsx
import ThreadCard from "./ThreadCard"

export default function ThreadList({ posts }) {
  return (
    <div className="flex-1">
      {posts.map((post) => (
        <ThreadCard key={post.id} post={post} />
      ))}
    </div>
  )
}
