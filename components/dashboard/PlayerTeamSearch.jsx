"use client"; 
// React import
import { useState } from "react";
import Image from "next/image";
// Components import
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import PlayerListCard from "./PlayerListCard";
import TeamListCard from "./TeamListCard";

// Dummy data for players and teams
const initialPlayers = [
    { id: 1, name: "John Doe", role: "Captain", game: "Football", skills: ["Leadership", "Passing"], experience: 5, location: "New York", image: "/images/player1.jpg" },
    { id: 2, name: "Jane Smith", role: "Midfielder", game: "Football", skills: ["Dribbling", "Passing"], experience: 3, location: "Los Angeles", image: "/images/player2.jpg" },
    { id: 3, name: "Alice Johnson", role: "Striker", game: "Basketball", skills: ["Shooting", "Speed"], experience: 4, location: "Chicago", image: "/images/player3.jpg" },
    { id: 4, name: "Bob Brown", role: "Defender", game: "Basketball", skills: ["Defense", "Passing"], experience: 6, location: "San Francisco", image: "/images/player4.jpg" },
    { id: 5, name: "Charlie White", role: "Goalkeeper", game: "Football", skills: ["Goalkeeping", "Tackling"], experience: 8, location: "Houston", image: "/images/player5.jpg" },
    { id: 6, name: "Diana Green", role: "Forward", game: "Basketball", skills: ["Shooting", "Speed"], experience: 2, location: "Miami", image: "/images/player6.jpg" },
];

const initialTeams = [
    { id: 1, name: "Team A", game: "Football", rolesLookingFor: ["Midfielder", "Defender"], location: "New York", description: "A competitive football team.", image: "/images/team1.jpg" },
    { id: 2, name: "Team B", game: "Basketball", rolesLookingFor: ["Guard", "Center"], location: "Los Angeles", description: "A fast-paced basketball team.", image: "/images/team2.jpg" },
    { id: 3, name: "Team C", game: "Football", rolesLookingFor: ["Goalkeeper", "Striker"], location: "Chicago", description: "A friendly football team.", image: "/images/team3.jpg" },
];

const PlayerTeamSearch = () => {
    const [searchType, setSearchType] = useState("player"); // Toggle for search type (player/team)
    const [filteredPlayers, setFilteredPlayers] = useState(initialPlayers); // Filtered player data
    const [filteredTeams, setFilteredTeams] = useState(initialTeams); // Filtered team data
    const [playerFilters, setPlayerFilters] = useState({
        game: "",
        skills: [],
        experience: "",
        location: "",
        role: "",
    });
    const [teamFilters, setTeamFilters] = useState({
        teamName: "",
        game: "",
        rolesLookingFor: [],
        location: "",
    });

    // List of possible values
    const games = ["Football", "Basketball"];
    const roles = ["Captain", "Midfielder", "Defender", "Striker", "Goalkeeper", "Forward"];
    const skills = ["Leadership", "Passing", "Dribbling", "Defense", "Shooting", "Speed", "Goalkeeping", "Tackling"];

    // Function to handle filter changes for players
    const handlePlayerFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setPlayerFilters((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((skill) => skill !== value),
            }));
        } else {
            setPlayerFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Function to handle filter changes for teams
    const handleTeamFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setTeamFilters((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((role) => role !== value),
            }));
        } else {
            setTeamFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Filter players based on the selected filters
    const filterPlayers = () => {
        let filtered = initialPlayers;

        if (playerFilters.game) {
            filtered = filtered.filter((player) => player.game === playerFilters.game);
        }

        if (playerFilters.skills.length > 0) {
            filtered = filtered.filter((player) =>
                playerFilters.skills.every((skill) => player.skills.includes(skill))
            );
        }

        if (playerFilters.experience) {
            filtered = filtered.filter((player) => player.experience >= parseInt(playerFilters.experience));
        }

        if (playerFilters.location) {
            filtered = filtered.filter((player) => player.location.includes(playerFilters.location));
        }

        if (playerFilters.role) {
            filtered = filtered.filter((player) => player.role === playerFilters.role);
        }

        setFilteredPlayers(filtered);
    };

    // Filter teams based on the selected filters
    const filterTeams = () => {
        let filtered = initialTeams;

        if (teamFilters.teamName) {
            filtered = filtered.filter((team) => team.name.toLowerCase().includes(teamFilters.teamName.toLowerCase()));
        }

        if (teamFilters.game) {
            filtered = filtered.filter((team) => team.game === teamFilters.game);
        }

        if (teamFilters.rolesLookingFor.length > 0) {
            filtered = filtered.filter((team) =>
                teamFilters.rolesLookingFor.every((role) => team.rolesLookingFor.includes(role))
            );
        }

        if (teamFilters.location) {
            filtered = filtered.filter((team) => team.location.includes(teamFilters.location));
        }

        setFilteredTeams(filtered);
    };

    return (
        <ResponsiveContainer className="py-6">
            {/* Search Type Selector */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setSearchType("player")}
                    className={`px-6 py-2 text-lg font-semibold ${searchType === "player" ? "bg-accent text-foreground" : "text-foreground"} rounded-l-lg`}
                >
                    Player Search
                </button>
                <button
                    onClick={() => setSearchType("team")}
                    className={`px-6 py-2 text-lg font-semibold ${searchType === "team" ? "bg-accent text-foreground" : "text-foreground"} rounded-r-lg`}
                >
                    Team Search
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section: Filters */}
                <div className="w-full md:w-1/4 rounded-lg shadow-lg">
                    <TypographyP className="font-semibold text-xl mb-4">Filters</TypographyP>

                    {/* Player Search Filters */}
                    {searchType === "player" && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="game" className="block mb-2 text-lg">Game</label>
                                <select
                                    id="game"
                                    name="game"
                                    value={playerFilters.game}
                                    onChange={handlePlayerFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-background focus:outline-none"
                                >
                                    <option value="">Select Game</option>
                                    {games.map((game) => (
                                        <option key={game} value={game}>
                                            {game}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-lg">Skills</label>
                                <div className="space-y-2">
                                    {skills.map((skill) => (
                                        <div key={skill} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={skill}
                                                name="skills"
                                                value={skill}
                                                checked={playerFilters.skills.includes(skill)}
                                                onChange={handlePlayerFilterChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={skill}>{skill}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="experience" className="block mb-2 text-lg">Experience (years)</label>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    value={playerFilters.experience}
                                    onChange={handlePlayerFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                                    placeholder="Enter experience"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block mb-2 text-lg">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={playerFilters.location}
                                    onChange={handlePlayerFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                                    placeholder="Enter location"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="role" className="block mb-2 text-lg">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={playerFilters.role}
                                    onChange={handlePlayerFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-background focus:outline-none"
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {/* Team Search Filters */}
                    {searchType === "team" && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="teamName" className="block mb-2 text-lg">Team Name</label>
                                <input
                                    type="text"
                                    id="teamName"
                                    name="teamName"
                                    value={teamFilters.teamName}
                                    onChange={handleTeamFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                                    placeholder="Enter team name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="game" className="block mb-2 text-lg">Game</label>
                                <select
                                    id="game"
                                    name="game"
                                    value={teamFilters.game}
                                    onChange={handleTeamFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-background focus:outline-none"
                                >
                                    <option value="">Select Game</option>
                                    {games.map((game) => (
                                        <option key={game} value={game}>
                                            {game}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-lg">Roles Looking For</label>
                                <div className="space-y-2">
                                    {roles.map((role) => (
                                        <div key={role} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={role}
                                                name="rolesLookingFor"
                                                value={role}
                                                checked={teamFilters.rolesLookingFor.includes(role)}
                                                onChange={handleTeamFilterChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={role}>{role}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block mb-2 text-lg">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={teamFilters.location}
                                    onChange={handleTeamFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                                    placeholder="Enter location"
                                />
                            </div>
                        </>
                    )}

                    <div className="mt-4">
                        <button
                            onClick={searchType === "player" ? filterPlayers : filterTeams}
                            className="w-full px-6 py-3 bg-highlight text-foreground rounded-lg hover:bg-darkhighlight"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Right Section: Filtered Results */}
                <div className="w-full md:w-3/4 p-6 rounded-lg shadow-lg">
                    <TypographyP className="font-semibold text-xl mb-4">
                        {searchType === "player" ? "Filtered Players" : "Filtered Teams"}
                    </TypographyP>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchType === "player" ? (
                            filteredPlayers.length > 0 ? (
                                filteredPlayers.map((player) => (
                                    <PlayerListCard key={player.id} player={player} />
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-lg font-semibold text-foreground">No players match your filters.</p>
                            )
                        ) : (
                            filteredTeams.length > 0 ? (
                                filteredTeams.map((team) => (
                                    <TeamListCard key={team.id} team={team} />
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-lg font-semibold text-foreground">No teams match your filters.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default PlayerTeamSearch;

