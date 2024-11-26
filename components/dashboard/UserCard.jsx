import React from 'react';
import Image from "next/image";
import { FaMessage, FaPlus, FaComments } from "react-icons/fa6"; // Added icons for other buttons
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';

const UserCard = ({
  userImage,
  userName,
  userDescription,
  reelsCount,
  showSendReq = true,
}) => {
  return (
    <div className="flex justify-between items-center border-b-[1px] py-2">
      <div className="flex justify-center items-center gap-2">
        <div>
          <TypographyH4>{userName}</TypographyH4>
          <TypographyP className="!mt-0">{userDescription}</TypographyP>
          <TypographyP className="!mt-0">{reelsCount} Reels</TypographyP>
        </div>
      </div>

      <div className="flex gap-2">
        {showSendReq ? (
          <button className="bg-highlight rounded-xl px-4 py-2 flex justify-center items-center gap-2">
            <a href="#" className="text-sm text-white">Send Request</a>
            <FaMessage className="bg-white/30 rounded-full p-1 text-white" />
          </button>
        ) : (
          <>
            <button className="bg-background rounded-xl px-4 py-4 flex justify-center items-center gap-2">
              <FaComments className="text-white" />
            </button>
            <button className="bg-highlight rounded-xl px-4 py-4 flex justify-center items-center gap-2">
              <FaPlus className="text-background"/>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
