"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { use } from 'react'; // Import React.use
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';
import { isAuthenticated } from '@/utils/auth';
import ProfileForm from '@/components/forms/ProfileForm';
import EGClips from '@/components/dashboard/EGClips';
// icons import
import { FaMessage } from "react-icons/fa6";
// Assets import
import user2 from "@/public/images/users/user2.png";

export default function PlayerDetails({ params }) {
  const { playerId } = use(params); // Unwrap params using `use`
  const router = useRouter();
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Profile", "eGClips"];
  const tabContents = [
    <ProfileForm></ProfileForm>,
    <EGClips></EGClips>,
  ];

  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("Error in authentication", isAuthenticated());
      router.push('/login');
    } else {
      setAuthChecked(true); // Allow rendering after auth check
    }
  }, [router]);

  if (!isAuthChecked) {
    return null; // Prevent rendering until auth is checked
  }

  return (
    <ResponsiveContainer className="my-8 !text-background border-[1px] border-white rounded-lg backdrop-blur-sm !text-foreground">
      <div className='flex justify-between items-center border-b-[1px] py-2'>
        <div className='flex justify-center items-center gap-2'>
          <Image
            className="border-[1px] rounded-full p-1"
            src={user2}
            width={102}
            height={102}
            alt="logo"
          />
          <div>
            <TypographyH4>Jonathan James</TypographyH4>
            <TypographyP className="!mt-0">BGMI | IGL, Support</TypographyP>
            <TypographyP className="!mt-0">4 Reels</TypographyP>
          </div>
        </div>
        <div>
          <button className="bg-highlight rounded-xl px-4 py-2 hidden sm:flex justify-center items-center gap-2">
            <a href="#" className="text-sm text-white">Send Request</a>
            <FaMessage className="bg-white/30 rounded-full p-1 text-white" />
          </button>
        </div>
      </div>

      <div className='overflow-x-auto border-b-[1px]'>
        <div className='flex min-w-[300px] md:min-w-0 justify-between items-center border-b-[1px]'>
          {tabs.map((tab, index) => (
            <p
              key={index}
              onClick={() => setActiveTab(index)}
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer ${activeTab === index ? 'bg-highlight text-white' : 'hover:border-b-2 hover:border-highlight'
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
  );
}
