"use client";
// React and Next Imports
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoutes';
import { useRouter } from 'next/navigation';
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import EGClips from '@/components/dashboard/EGClips';


const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      alert("error in authentication ", isAuthenticated)
      router.push('/login');
    }
  }, []);

  return (
    <ProtectedRoute>
      <ResponsiveContainer className="my-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          {/* Tab buttons for larger screens */}
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}
            >
              EGClips
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
        <EGClips></EGClips>,
        </div>
      </ResponsiveContainer>
    </ProtectedRoute>
  );
};

export default DashboardPage;
