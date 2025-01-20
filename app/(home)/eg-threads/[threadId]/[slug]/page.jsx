import PostContent from "../components/PostContent";
import { cache } from 'react';

const getThreadData = cache(async (threadId, slug) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eg-threads/threads/${threadId}/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.status === 200) {
      throw new Error('Failed to fetch thread data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching thread:', error);
    throw error;
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const thread = await getThreadData(resolvedParams.threadId, resolvedParams.slug);
  
  return {
    title: `${thread.title} | eGamio Threads`,
    description: thread.meta_description || thread.content.substring(0, 160),
    keywords: thread.meta_keywords,
    openGraph: {
      title: thread.title,
      description: thread.meta_description || thread.content.substring(0, 160),
      type: 'article',
      authors: [thread.author.name]
    }
  };
}

export default async function ThreadPost({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const thread = await getThreadData(resolvedParams.threadId, resolvedParams.slug);
  
  return <PostContent post={thread} />;
}
