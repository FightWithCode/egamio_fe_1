"use client";
// react imports
import { useState } from "react";
import Image from "next/image";
// Components imports
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import PlayerListCard from "./PlayerListCard";
// Assets import
import teammate1 from "@/public/images/users/user1.png";
import teammate2 from "@/public/images/users/user2.png";
import teammate3 from "@/public/images/users/user3.jpeg";

// Dummy data for teams and teammates
const initialTeams = [
    {
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
    },
    {
        id: 2,
        name: "Team B",
        game: "Basketball",
        logo: "/images/team_logo_2.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore doloremque tenetur, molestias ad, assumenda, sapiente facere dicta optio fugit quisquam sunt modi cumque? Ex necessitatibus ea soluta suscipit iste.",
        achievements: ["1st Place in Regional Championship", "MVP 2023"],
        teammates: [
            { id: 3, name: "Alice Johnson", role: "Striker", image: teammate3 },
            { id: 4, name: "Bob Brown", role: "Defender", image: teammate1 },
        ],
    },
];

const TeamDetail = () => {
    const [teams, setTeams] = useState(initialTeams);
    const [activeTab, setActiveTab] = useState(0);

    const handleAddTeam = () => {
        const newTeam = {
            id: teams.length + 1,
            name: `New Team ${teams.length + 1}`,
            game: "Game",
            logo: "/images/team_logo_placeholder.png",
            description: "A new exciting team.",
            achievements: ["New Team Achievement"],
            teammates: [],
        };
        setTeams([...teams, newTeam]);
    };

    return (
        <ResponsiveContainer className="py-6 px-4 backdrop-blur-sm !text-foreground">
            <div className="flex flex-col md:flex-row gap-0">
                
                {/* Sidebar Section */}
                <div className="w-full md:w-1/4">
                    <div className="space-y-1 p-2 flex md:block">
                        {teams.map((team, index) => (
                            <button
                                key={team.id}
                                onClick={() => setActiveTab(index)}
                                className={`w-full text-left font-semibold px-2 md:px-6 md:py-3 transition-all ${
                                    activeTab === index
                                        ? "border-l-4 border-highlight text-highlight"
                                        : "text-gray-300 hover:text-highlight"
                                }`}
                            >
                                {team.name}
                            </button>
                        ))}
                        {teams.length < 3 && (
                            <button
                                onClick={handleAddTeam}
                                className="w-full text-left font-semibold bg-transparent text-gray-300 px-6 py-3 hover:text-highlight"
                            >
                                <span className="mr-2">+</span> Add Team
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="w-full md:w-3/4 p-4">
                    
                    {/* Team Info */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="flex-shrink-0">
                            <Image
                                src={teammate1}
                                alt={teams[activeTab].name}
                                width={120}
                                height={120}
                                objectFit="contain"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <TypographyP className="font-bold text-xl">{teams[activeTab].name}</TypographyP>
                            <p>{teams[activeTab].description}</p>
                        </div>
                    </div>

                    {/* Players Roster */}
                    <div className="mt-8">
                        <TypographyP className="font-semibold text-lg mb-4">Players Roster</TypographyP>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {teams[activeTab].teammates.map((teammate) => (
                                <PlayerListCard key={teammate.id} player={teammate} />
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-8">
                        <TypographyP className="font-semibold text-lg mb-4">Achievements</TypographyP>
                        <div className="flex flex-wrap gap-2">
                            {teams[activeTab].achievements.map((achievement, index) => (
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
            </div>
        </ResponsiveContainer>
    );
};

export default TeamDetail;
