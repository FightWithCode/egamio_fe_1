"use client";
// react imports
import React, { useState } from 'react';
import Image from "next/image";
import { use } from 'react';
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProfileForm from '@/components/forms/ProfileForm';
import EGClips from '@/components/dashboard/EGClips';
import UserCard from '@/components/dashboard/UserCard';
// Assets import
import { IoIosArrowDown } from "react-icons/io";
import user2 from "@/public/images/users/user2.png";

export default function PlayerDetails({ params }) {
  const { playerId } = use(params);
  const [activeTab, setActiveTab] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const tabs = ["Profile", "eGClips"];
  const tabContents = [
    <ProfileForm />,
    <EGClips showUploadButton={false} />,
  ];

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleTabSelect = (index) => {
    setActiveTab(index);
    setShowMenu(false);
  };

  return (
    <ResponsiveContainer className="my-24 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
      <UserCard
        userImage={user2}
        userName="Jonathan James"
        userDescription="BGMI | Support, IGL"
        reelsCount={4}
        showSendReq={false}
      />

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
