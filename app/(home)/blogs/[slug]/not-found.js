// app/(home)/blogs/[slug]/not-found.js
import Link from 'next/link'
import ResponsiveContainer from "@/components/common/ResponsiveContainer"

export default function NotFound() {
  return (
    <ResponsiveContainer className="!text-background pt-24 pb-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <p className="mb-4">Could not find the requested blog post.</p>
        <Link 
          href="/blogs" 
          className="text-highlight hover:underline"
        >
          Return to Blog List
        </Link>
      </div>
    </ResponsiveContainer>
  )
}
