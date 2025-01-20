import PostContent from "../components/PostContent";
import { cache } from 'react';
import { notFound } from 'next/navigation';

const getThreadData = cache(async (threadId, slug) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eg-threads/threads/${threadId}/${slug}/details `, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      return null
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const thread = await getThreadData(resolvedParams.threadId, resolvedParams.slug);

  return thread
    ? {
      title: `${thread.title} | eGamio Threads`,
      description: thread.meta_description || thread.content.substring(0, 160),
      keywords: thread.meta_keywords,
      openGraph: {
        title: thread.title,
        description: thread.meta_description || thread.content.substring(0, 160),
        type: 'article',
        authors: [thread.author.name]
      }
    } : {
      title: 'Thread Not Found',
      description: 'The requested thread could not be found.',
      openGraph: {
        title: 'Thread Not Found',
        description: 'The requested thread could not be found.'
      }
    };
}

export default async function ThreadPost({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const thread = await getThreadData(resolvedParams.threadId, resolvedParams.slug);
  if (!thread) {
    notFound();
  }

  return <PostContent post={thread} />;
}
