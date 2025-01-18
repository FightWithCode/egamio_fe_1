"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import PlayerTeamSearch from '@/components/dashboard/PlayerTeamSearch';
import { useAuth } from '@/context/AuthContext';
import CompleteProfileForm from '@/components/dashboard/CompleteProfileForm';


const DashboardPage = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading, updateProfileCompleteness } = useAuth();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading]);
  
  const isProfileComplete = user?.isProfileComplete || false;
  const handleProfileComplete = () => {
    updateProfileCompleteness(true);
    // window.location.reload(); // This will trigger a refresh to update the context
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isProfileComplete) {
    return (
      <ResponsiveContainer className="my-8">
        <CompleteProfileForm onComplete={handleProfileComplete} userName={user?.fullName}/>
      </ResponsiveContainer>
    );
  }

  return (
    <>
      <ResponsiveContainer className="my-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}>
              Dashboard
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
          <PlayerTeamSearch />
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
