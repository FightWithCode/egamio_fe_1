"use client"; // React import
import Image from "next/image"; // Components import
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import { useState } from "react";

// Assets import
import user3 from "@/public/images/users/user3.jpeg";

const UserGames = () => {
    const [activeTab, setActiveTab] = useState("Game1"); // Default active tab

    // Game stats data (you can replace this with dynamic data if needed)
    const gameStats = {
        Game1: {
            wins: 25,
            losses: 5,
            averageScore: 85,
        },
        Game2: {
            wins: 18,
            losses: 12,
            averageScore: 70,
        },
        Game3: {
            wins: 30,
            losses: 3,
            averageScore: 90,
        },
    };

    return (
        <ResponsiveContainer className="">
            <div className="flex flex-wrap gap-4">
                {/* Image Section with fixed width of 150px */}
                <div className="relative overflow-hidden rounded-lg w-[150px] h-[180px] flex-shrink-0 mx-auto">
                    <Image
                        src={user3}
                        alt="step1"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 rounded-lg"
                    />
                </div>

                {/* Bio Section (takes remaining width) */}
                <div className="flex-1">
                    <TypographyP className="font-bold">Bio</TypographyP>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim rem accusamus animi excepturi, deserunt repellendus nemo at non voluptas beatae molestiae, nesciunt similique dicta! Obcaecati, rem? Qui, sapiente iure?
                    </p>

                    {/* Tabs for Games */}
                    <div className="mt-6">
                        {/* Tab buttons */}
                        <div className="flex space-x-4 mb-4">
                            {Object.keys(gameStats).map((game) => (
                                <button
                                    key={game}
                                    onClick={() => setActiveTab(game)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                                        activeTab === game
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700"
                                    } hover:bg-blue-300`}
                                >
                                    {game}
                                </button>
                            ))}
                        </div>

                        {/* Game Stats */}
                        <div className="border-t pt-4">
                            <h3 className="font-bold text-lg mb-2">
                                Stats for {activeTab}
                            </h3>
                            <p>Wins: {gameStats[activeTab].wins}</p>
                            <p>Losses: {gameStats[activeTab].losses}</p>
                            <p>Average Score: {gameStats[activeTab].averageScore}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default UserGames;
