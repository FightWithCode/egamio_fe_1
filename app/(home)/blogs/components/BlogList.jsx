import BlogCard from './BlogCard'

export default function BlogList({ posts }) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <BlogCard key={post.thread_id} post={post} />
      ))}
    </div>
  )
}
