"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { FaMessage } from "react-icons/fa6"; // Hamburger icon for menu
import { IoIosArrowDown } from "react-icons/io";
import { use } from 'react'; // Import React.use
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';
import ProfileForm from '@/components/forms/ProfileForm';
import EGClips from '@/components/dashboard/EGClips';
// Assets import
import user2 from "@/public/images/users/user2.png";

export default function PlayerDetails({ params }) {
  const { playerId } = use(params); // Unwrap params using `use`
  const [activeTab, setActiveTab] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const tabs = ["Profile", "eGClips"];
  const tabContents = [
    <ProfileForm />,
    <EGClips showUploadButton={false} />,
  ];

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev); // Toggle the menu visibility
  };

  const handleTabSelect = (index) => {
    setActiveTab(index);
    setShowMenu(false); // Close the menu after selecting a tab
  };

  return (
    <ResponsiveContainer className="my-8 !text-background border-[1px] border-white rounded-lg backdrop-blur-sm !text-foreground">
      <div className="flex justify-between items-center border-b-[1px] py-2">
        <div className="flex justify-center items-center gap-2">
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

      <div className="border-b-[1px]">
        {/* Hamburger menu for small screens */}
        <div className="md:hidden relative flex justify-between items-center h-[50px]">
          <p className='px-4 font-bold'>{tabs[activeTab]}</p>
          <button
            onClick={handleMenuToggle} // Toggle menu visibility
            className="text-white text-2xl p-3"
          >
            <IoIosArrowDown />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute top-[50px] w-full bg-background text-white z-20">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => handleTabSelect(index)} // Set active tab and close menu
                  className={`px-4 py-3 cursor-pointer hover:bg-highlight hover:text-white transition-all ${activeTab === index ? 'text-white' : ''}`}
                >
                  {tab}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tab buttons for larger screens */}
        <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px] hidden md:flex">
          {tabs.map((tab, index) => (
            <p
              key={index}
              onClick={() => handleTabSelect(index)} // Handle tab selection
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer ${activeTab === index
                ? 'bg-highlight text-white'
                : 'hover:border-b-2 hover:border-highlight'
                }`}
            >
              {tab}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-background-light rounded-md shadow-md">
        {tabContents[activeTab]} {/* Show the content for the active tab */}
      </div>
    </ResponsiveContainer>
  );
}
