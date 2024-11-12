"use client"; // React import
import { useState } from "react"; // React hooks import
import Image from "next/image"; // Components import
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";

// Assets import
import user3 from "@/public/images/users/user3.jpeg";
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
        description: "A competitive football team with high goals.",
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
        description: "A fast-paced basketball team with great chemistry.",
        achievements: ["1st Place in Regional Championship", "MVP 2023"],
        teammates: [
            { id: 3, name: "Alice Johnson", role: "Striker", image: teammate3 },
            { id: 4, name: "Bob Brown", role: "Defender", image: teammate1 },
        ],
    },
    // More teams can be added here
];

const TeamDetail = () => {
    const [teams, setTeams] = useState(initialTeams); // State for managing teams
    const [activeTab, setActiveTab] = useState(0); // State to track active tab

    // Function to handle adding a new team
    const handleAddTeam = () => {
        // Here, you could open a modal or form to add a new team.
        // For now, we will just add a dummy team for demonstration purposes.
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
        <ResponsiveContainer className="py-6">
            <div className="flex gap-6">
                <div className="w-1/5 bg-gray-100 p-4 rounded-lg shadow-lg">
                    <div className="flex flex-col space-y-4">
                        {teams.map((team, index) => (
                            <button
                                key={team.id}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                                    activeTab === index
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                {team.name}
                            </button>
                        ))}
                        <button
                            onClick={handleAddTeam}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
                        >
                            <span className="mr-2">+</span> Add Team
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
                    <TypographyP className="font-bold text-xl mb-2">{teams[activeTab].name}</TypographyP>
                    <p className="text-lg text-gray-600 mb-4">{teams[activeTab].game}</p>
                    
                    <div className="mb-6">
                        <TypographyP className="font-semibold text-lg mb-2">Description</TypographyP>
                        <p>{teams[activeTab].description}</p>
                    </div>
                    <div className="mt-6">
                        <TypographyP className="font-semibold text-lg mb-2">Players Roster</TypographyP>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {teams[activeTab].teammates.map((teammate) => (
                                <div key={teammate.id} className="flex flex-col items-center">
                                    <div className="relative w-full pb-[116%] overflow-hidden bg-gray-200 rounded-lg">
                                        <Image
                                            src={teammate.image}
                                            alt={teammate.name}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className="mt-2 text-lg font-semibold">{teammate.name}</p>
                                    <p className="text-sm text-gray-500">{teammate.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <TypographyP className="font-semibold text-lg mb-2">Achievements</TypographyP>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            {teams[activeTab].achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default TeamDetail;
