'use client';
import { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import CommentSection from './CommentSection';
import Sidebar from './Sidebar';
import api from "@/services/api/axiosSetup";

export default function PostContent({ post }) {
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Fetch additional details when the component mounts
  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      try {
        const response = await api.get(`/eg-threads/threads/${post.thread_id}/get-other-details`);
        if (response.status === 200) {
          setLiked(response.data.liked);
          setDisliked(response.data.disliked);
          setComments(response.data.comments);
        } else {
          console.error('Failed to fetch additional details');
        }
      } catch (error) {
        console.error('Error fetching additional details:', error);
      }
    };

    if (post?.thread_id) {
      fetchAdditionalDetails();
    }
  }, [post?.thread_id]); // Runs only once when `post.thread_id` is available

  return (
    <ResponsiveContainer className="mt-32 min-h-screen">
      <div className="max-w-7xl mx-auto my-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-grow lg:w-3/4">
            <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <PostHeader post={post} />
                  <PostBody 
                    post={post}
                    liked={liked}
                    disliked={disliked}
                  />
                </div>
              </div>
            </div>
            <CommentSection comments={comments} threadId={post.thread_id}/>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar relatedTopics={post.related_posts} />
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
