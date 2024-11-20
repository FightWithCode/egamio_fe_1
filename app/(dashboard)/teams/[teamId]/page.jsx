"use client";

import React from 'react';
import Image from "next/image";
import { use } from 'react';
import { FaMessage } from "react-icons/fa6";
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { TypographyH4, TypographyP } from '@/components/ui/Typographies';
import PlayerListCard from '@/components/dashboard/PlayerListCard';
// Assets import
import user2 from "@/public/images/users/user2.png";
import teammate1 from "@/public/images/users/user1.png";
import teammate2 from "@/public/images/users/user2.png";

export default function TeamDetails({ params }) {
  const { teamId } = use(params);
  const team = {
    id: 1,
    name: "Team A",
    game: "Football",
    logo: "/images/team_logo_1.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore doloremque tenetur, molestias ad, assumenda, sapiente facere dicta optio fugit quisquam sunt modi cumque? Ex necessitatibus ea soluta suscipit iste.",
    achievements: ["Champions 2023", "Best Midfielder", "Most Improved Player"],
    teammates: [
      { id: 1, name: "John Doe", role: "Captain", image: teammate1 },
      { id: 2, name: "Jane Smith", role: "Midfielder", image: teammate2 },
    ],
    playerRequirements: [
      { id: 1, role: "Defender", description: "Looking for a strong defender to complete the team." },
      { id: 2, role: "Goalkeeper", description: "We need an experienced goalkeeper for our matches." },
    ],
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
            <TypographyH4>{team.name}</TypographyH4>
            <TypographyP className="!mt-0">{team.game}</TypographyP>
            <TypographyP className="!mt-0">
              {team.teammates.length} / {team.maxPlayers} Members
            </TypographyP>
          </div>
        </div>
        <div>
          <button className="bg-highlight rounded-xl px-4 py-2 hidden sm:flex justify-center items-center gap-2">
            <a href="#" className="text-sm text-white">Send Request</a>
            <FaMessage className="bg-white/30 rounded-full p-1 text-white" />
          </button>
        </div>
      </div>

      <div className="w-full py-4">
        {/* Team Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <Image
              src={teammate1}
              alt={`${team.name} Logo`}
              width={120}
              height={120}
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <TypographyP className="font-bold text-xl">{team.name}</TypographyP>
            <p>{team.description}</p>
          </div>
        </div>

        {/* Players Roster */}
        <div className="mt-8">
          <TypographyP className="font-semibold text-lg mb-4">Players Roster</TypographyP>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.teammates.map((teammate) => (
              <PlayerListCard key={teammate.id} player={teammate} />
            ))}
          </div>
        </div>

        {/* Player Requirements */}
        {team.playerRequirements.length > 0 && (
          <div className="mt-8">
            <TypographyP className="font-semibold text-lg mb-4">Player Requirements</TypographyP>
            <div className="flex flex-col gap-4">
              {team.playerRequirements.map((requirement) => (
                <div
                  key={requirement.id}
                  className="p-4 bg-gray-800 rounded-lg border-[1px] border-gray-700 shadow-md"
                >
                  <TypographyP className="text-highlight font-semibold">{requirement.role}</TypographyP>
                  <p className="text-gray-400 text-sm mt-2">{requirement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className="mt-8">
          <TypographyP className="font-semibold text-lg mb-4">Achievements</TypographyP>
          <div className="flex flex-wrap gap-2">
            {team.achievements.map((achievement, index) => (
              <span
                key={index}
                className="text-gray-300 text-sm px-3 py-2 border-[1px] border-gray-300 rounded-full"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
