"use client";
// React and Next Imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProfileForm from '@/components/forms/ProfileForm';
import TeamDetail from '@/components/dashboard/TeamDetails';
import EGClips from '@/components/dashboard/EGClips';
import PlayerTeamSearch from '@/components/dashboard/PlayerTeamSearch';
import UserCard from '@/components/dashboard/UserCard';
import { isAuthenticated } from '@/utils/auth';
// icons import
import { IoIosArrowDown } from "react-icons/io";
// Assets import
import user2 from "@/public/images/users/user2.png";


const FindPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("error in authentication ", isAuthenticated)
      router.push('/login');
    }
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const tabs = ["Dashboard", "eGClips", "My Teams", "Settings"];
  const tabContents = [
    <PlayerTeamSearch></PlayerTeamSearch>,
    <EGClips></EGClips>,
    <TeamDetail></TeamDetail>,
    <ProfileForm></ProfileForm>,
  ];

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleTabSelect = (index) => {
    setActiveTab(index);
    setShowMenu(false);
  };

  return (
    <>
      <ResponsiveContainer className="my-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          {/* Tab buttons for larger screens */}
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}
            >
              Find
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
          <PlayerTeamSearch></PlayerTeamSearch>
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default FindPage;
