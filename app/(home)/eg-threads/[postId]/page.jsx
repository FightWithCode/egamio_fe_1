// app/(home)/eg-threads/[postId]/page.jsx
import PostContent from './components/PostContent';
import { getSamplePost } from './data'; // Move sample data to separate file


export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params)
  const post = await getSamplePost(resolvedParams.postId)
  return {
    title: `${post.title} | eGamio Threads`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      authors: [post.author]
    }
  };
}

export default async function ForumPost({ params }) {
  const resolvedParams = await Promise.resolve(params)
  const post = await getSamplePost(resolvedParams.postId)
  
  return <PostContent post={post} />;
}
