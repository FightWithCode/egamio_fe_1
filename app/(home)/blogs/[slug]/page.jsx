// app/(home)/blogs/[slug]/page.jsx
import { getBlogPost, getRelatedPosts } from '../data'
import BlogContent from './components/BlogContent'
import CommentSection from './components/CommentSection'
import Sidebar from './components/Sidebar'
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params)
  const post = await getBlogPost(resolvedParams.slug)
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  }
}

export default async function SingleBlogPost({ params }) {
  try {
    // Resolve params first
    const resolvedParams = await Promise.resolve(params)
    const post = await getBlogPost(resolvedParams.slug)
    const relatedPosts = await getRelatedPosts(resolvedParams.slug)

    if (!post) {
      notFound()
    }

    return (
      <ResponsiveContainer className="!text-background pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          <article className="space-y-8">
            <BlogContent post={post} />
            <CommentSection comments={post.comments_arr} />
          </article>
          <Sidebar relatedPosts={relatedPosts} />
        </div>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
}
