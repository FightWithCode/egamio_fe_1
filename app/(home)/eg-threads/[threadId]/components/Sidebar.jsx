// app/(home)/eg-threads/[postId]/components/Sidebar.jsx
'use client';

import React from 'react';
import { FaFire, FaClock, FaTrophy, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Sidebar = ({ relatedTopics }) => {
  console.log(relatedTopics)
  return (
    <div className="space-y-6">
      {/* Related Topics Section */}
      <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">Related Topics</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {relatedTopics.map((topic) => (
            <Link 
              href={`/eg-threads/${topic.thread_id}/${topic.slug}`} 
              key={topic.id}
              className="block p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-grow">
                  <h3 className="text-white font-medium mb-1 line-clamp-2">
                    {topic.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <p>{topic.content}</p>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                    <span>by {topic.author}</span>
                    <div className="flex items-center space-x-1">
                      <span className='flex items-center'><FaEye />&nbsp;{topic.views}</span>
                    </div>
                      <span className="text-gray-400 text-sm">{formatDistanceToNow(parseISO(topic.created_at))} ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    {topic.is_hot && (
                      <span className="flex items-center space-x-1 text-orange-500 text-sm">
                        <FaFire />
                        <span>Hot</span>
                      </span>
                    )}
                    {topic.is_trending && (
                      <span className="flex items-center space-x-1 text-blue-400 text-sm">
                        <FaTrophy />
                        <span>Trending</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">Community Guidelines</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-gray-300">
            <h3 className="font-medium text-white mb-1">1. Be Respectful</h3>
            <p className="text-sm">Treat others with respect and kindness.</p>
          </div>
          <div className="text-gray-300">
            <h3 className="font-medium text-white mb-1">2. Stay On Topic</h3>
            <p className="text-sm">Keep discussions relevant to gaming.</p>
          </div>
          <div className="text-gray-300">
            <h3 className="font-medium text-white mb-1">3. No Spam</h3>
            <p className="text-sm">Avoid repetitive or irrelevant content.</p>
          </div>
        </div>
      </div>

      {/* Join Community Button */}
      <div className="text-center">
        <button className="w-full bg-highlight text-white py-3 px-6 rounded-full hover:bg-opacity-90 transition-colors">
          Join Community
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
