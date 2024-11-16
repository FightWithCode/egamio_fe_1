"use client";
// React and Next Imports
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from "next/image";
// Components imports
import PlayerBreadcum from '@/components/dashboard/Breadcum';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProfileForm from '@/components/forms/ProfileForm';
import TeamDetail from '@/components/dashboard/TeamDetails';
import UserGames from '@/components/dashboard/UserGames';
import EGClips from '@/components/dashboard/EGClips';
import PlayerTeamSearch from '@/components/dashboard/PlayerTeamSearch';
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';
import { isAuthenticated } from '@/utils/auth';
// icons import
import { FaMessage } from "react-icons/fa6";
// Assets import
import user2 from "@/public/images/users/user2.png";


const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("error in authentication ", isAuthenticated)
      router.push('/login');
    }
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Search", "eGClips", "Games", "My Teams", "Settings"];
  const tabContents = [
    <PlayerTeamSearch></PlayerTeamSearch>,
    <EGClips></EGClips>,
    <UserGames></UserGames>,
    <TeamDetail></TeamDetail>,
    <ProfileForm></ProfileForm>,
  ];

  return (
    <>
      <PlayerBreadcum page="Profile" />
      <ResponsiveContainer className="py-8 !text-background">
        <div className='flex justify-between items-center border-b-[1px] py-2'>
          <div className='flex justify-center items-center gap-2'>
            <Image className="border-[1px] rounded-full p-1" src={user2} width={102} height={102} alt="logo"></Image>
            <div className=''>
              <TypographyH4>Jonathan James</TypographyH4>
              <TypographyP className="!mt-0">BGMI | IGL, Support</TypographyP>
              <TypographyP className="!mt-0">4 Reels</TypographyP>
            </div>
          </div>
          <div>
            <button className="bg-highlight rounded-xl px-4 py-2 hidden sm:flex justify-center items-center gap-2"><a href="#" className="text-sm text-white">Send Request</a> <FaMessage className="bg-white/30 rounded-full p-1 text-white"></FaMessage></button>
          </div>
        </div>

        <div className='overflow-x-auto border-b-[1px]'>
          <div className='flex min-w-[600px] md:min-w-0 justify-between items-center border-b-[1px] px-2'>
            {tabs.map((tab, index) => (
              <p
                key={index}
                onClick={() => setActiveTab(index)}
                className={`!mt-0 px-auto h-[54px] w-1/5 flex justify-center items-center cursor-pointer ${activeTab === index ? 'bg-highlight text-white' : 'hover:border-b-2 hover:border-highlight'
                  }`}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
          {tabContents[activeTab]}
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
