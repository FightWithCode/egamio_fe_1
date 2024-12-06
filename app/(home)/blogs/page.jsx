// app/(home)/blogs/page.jsx
import BlogList from './components/BlogList'
import Sidebar from './components/Sidebar'
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import { getBlogPosts } from './data' // We'll create this

export const metadata = {
  title: 'Blog Posts | eGamio',
  description: 'Latest gaming reviews and news'
}

export default function BlogPage() {
  const blogPosts = getBlogPosts()

  return (
    <ResponsiveContainer className="!text-background pt-32 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <BlogList posts={blogPosts} />
        <Sidebar posts={blogPosts} />
      </div>
    </ResponsiveContainer>
  )
}
