"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';
import PlayerTeamSearch from '@/components/common/PlayerTeamSearch';
import CompleteProfileForm from './components/CompleteProfileForm';

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const handleProfileComplete = () => {
    dispatch({ type: 'auth/updateProfileCompleteness', payload: true });
    router.push('/dashboard');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.is_profile_complete) {
    return (
      <CompleteProfileForm onComplete={handleProfileComplete} userName={user?.fullName} />
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
        <div className="mt-4 bg-background-light shadow-md">
          <PlayerTeamSearch />
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
