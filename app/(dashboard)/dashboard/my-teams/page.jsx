"use client";
// React and Next Imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import TeamDetail from '@/components/dashboard/TeamDetails';

const DashboardPage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      console.log("error in authentication ", user)
      router.push('/login');
    }
  }, [user]);

  return (
    <>
      <ResponsiveContainer className="my-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          {/* Tab buttons for larger screens */}
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}
            >
              My Teams
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
        <TeamDetail></TeamDetail>
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
