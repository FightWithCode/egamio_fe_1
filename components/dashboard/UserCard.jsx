// components/dashboard/UserProfile.js

import React from 'react';
import Image from "next/image";
import { FaMessage } from "react-icons/fa6";
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';

const UserCard = ({ userImage, userName, userDescription, reelsCount }) => {
  return (
    <div className="flex justify-between items-center border-b-[1px] py-2">
      <div className="flex justify-center items-center gap-2">
        <Image
          className="border-[1px] rounded-full p-1"
          src={userImage} // Dynamic user image prop
          width={102}
          height={102}
          alt="user profile image"
        />
        <div>
          <TypographyH4>{userName}</TypographyH4>
          <TypographyP className="!mt-0">{userDescription}</TypographyP>
          <TypographyP className="!mt-0">{reelsCount} Reels</TypographyP>
        </div>
      </div>

      <div>
        <button className="bg-highlight rounded-xl px-4 py-2 hidden sm:flex justify-center items-center gap-2">
          <a href="#" className="text-sm text-white">Send Request</a>
          <FaMessage className="bg-white/30 rounded-full p-1 text-white" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
