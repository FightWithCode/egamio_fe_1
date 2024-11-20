"use client";
// react imports
import React, { useState } from 'react';
import Image from "next/image";
import { use } from 'react'; // Import React.use
// icons imports
import { FaMessage } from "react-icons/fa6"; // Hamburger icon for menu
import { IoIosArrowDown } from "react-icons/io";
// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';
// Assets import
import user2 from "@/public/images/users/user2.png";

export default function TeamDetails({ params }) {
  const { teamId } = use(params);

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
            <TypographyH4>Old School</TypographyH4>
            <TypographyP className="!mt-0">BGMI | CoC</TypographyP>
            <TypographyP className="!mt-0">4 Members</TypographyP>
          </div>
        </div>
        <div>
          <button className="bg-highlight rounded-xl px-4 py-2 hidden sm:flex justify-center items-center gap-2">
            <a href="#" className="text-sm text-white">Send Request</a>
            <FaMessage className="bg-white/30 rounded-full p-1 text-white" />
          </button>
        </div>
      </div>


      <div className="mt-4 bg-background-light rounded-md shadow-md">
      </div>
    </ResponsiveContainer>
  );
}
