import PostContent from "../components/PostContent";
import { cache } from 'react';
import api from "@/services/api/axiosSetup";

const getThreadData = cache(async (threadId, slug) => {
  try {
    const response = await api.get(`/eg-threads/threads/${threadId}/${slug}`);
    console.log(response.status, '----------------------');
    if (!response.status === 200) {
      throw new Error('Failed to fetch thread data');
    }
    return response.data;
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
