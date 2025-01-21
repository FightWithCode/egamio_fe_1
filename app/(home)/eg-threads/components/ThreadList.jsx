import ThreadCard from "./ThreadCard"
import ThreadOptions from "./ThreadOptions"

export default function ThreadList({ posts }) {
  return (
    <div className="flex-1">
      {/* Create a thread button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Threads</h1>
        <ThreadOptions />
      </div>
      {posts.map((post) => (
        <ThreadCard key={post.thread_id} post={post} />
      ))}
    </div>
  )
}
