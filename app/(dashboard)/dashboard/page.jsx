"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import PlayerTeamSearch from '@/components/dashboard/PlayerTeamSearch';
import { useSelector } from 'react-redux';
import CompleteProfileForm from '@/components/dashboard/CompleteProfileForm';
import { useAuth } from '@/redux/hooks/useAuth';

const DashboardPage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const { loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!isClient || loading) {
    // Return a skeleton loader that matches your layout
    return (
      <ResponsiveContainer className="my-8">
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </ResponsiveContainer>
    );
  }

  if (!user) {
    // Already being redirected, but return null to avoid flash
    return null;
  }

  if (!user.isProfileComplete) {
    return (
      <ResponsiveContainer className="my-8">
        <CompleteProfileForm 
          onComplete={() => updateProfileCompleteness(true)}
          userName={user.fullName}
        />
      </ResponsiveContainer>
    );
  }

  return (
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
  );
};

export default DashboardPage;