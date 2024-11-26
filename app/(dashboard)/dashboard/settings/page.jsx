"use client";
// React and Next Imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProfileForm from '@/components/forms/ProfileForm';
import { isAuthenticated } from '@/utils/auth';


const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("error in authentication ", isAuthenticated)
      router.push('/login');
    }
  }, []);

  return (
    <>
      <ResponsiveContainer className="my-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          {/* Tab buttons for larger screens */}
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}
            >
              Settings
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
        <ProfileForm></ProfileForm>,
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
