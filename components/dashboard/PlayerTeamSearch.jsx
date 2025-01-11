"use client"; 
// React import
import { useState, useEffect } from "react";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import PlayerListCard from "./PlayerListCard";
import TeamListCard from "./TeamListCard";
import api from "@/services/api/axiosSetup";


const initialPlayers = [
    { uuid: 1, ign: "John Doe", roles_list: ["Captain"], game_name: "Football", skills: ["Leadership", "Passing"], experience: 5, location: "New York", featured_image: "/images/player1.jpg" },
    { uuid: 2, ign: "Jane Smith", roles_list: ["Midfielder"], game_name: "Football", skills: ["Dribbling", "Passing"], experience: 3, location: "Los Angeles", featured_image: "/images/player2.jpg" },
    { uuid: 3, ign: "Alice Johnson", roles_list: ["Striker"], game_name: "Basketball", skills: ["Shooting", "Speed"], experience: 4, location: "Chicago", featured_image: "/images/player3.jpg" },
    { uuid: 4, ign: "Bob Brown", roles_list: ["Defender"], game_name: "Basketball", skills: ["Defense", "Passing"], experience: 6, location: "San Francisco", featured_image: "/images/player4.jpg" },
    { uuid: 5, ign: "Charlie White", roles_list: ["Goalkeeper"], game_name: "Football", skills: ["Goalkeeping", "Tackling"], experience: 8, location: "Houston", featured_image: "/images/player5.jpg" },
    { uuid: 6, ign: "Diana Green", roles_list: ["Forward"], game_name: "Basketball", skills: ["Shooting", "Speed"], experience: 2, location: "Miami", featured_image: "/images/player6.jpg" },
];

const initialTeams = [
    { uuid: 1, title: "Looking for player", team_name: "Team A", game_name: "Football", roles: ["Midfielder", "Defender"], location: "New York", description: "A competitive football team.", image: "/images/team1.jpg" },
    { uuid: 2, title: "Looking for player", team_name: "Team B", game_name: "Basketball", roles: ["Guard", "Center"], location: "Los Angeles", description: "A fast-paced basketball team.", image: "/images/team2.jpg" },
    { uuid: 3, title: "Looking for player", team_name: "Team C", game_name: "Football", roles: ["Goalkeeper", "Striker"], location: "Chicago", description: "A friendly football team.", image: "/images/team3.jpg" },
];

const PlayerTeamSearch = () => {
    const [searchType, setSearchType] = useState("player"); // Toggle for search type (player/team)
    const [filteredPlayers, setFilteredPlayers] = useState(initialPlayers); // Filtered player data
    const [filteredTeams, setFilteredTeams] = useState(initialTeams); // Filtered team data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [playerFilters, setPlayerFilters] = useState({
        ign: "",
        game: "",
        skills: [],
        experience: "",
        location: "",
        role: "",
    });
    const [teamFilters, setTeamFilters] = useState({
        teamName: "",
        game: "",
        roles: [],
        location: "",
    });

    // List of possible values
    const ign = ""
    const games = ["BGMI", "CODM"];
    const roles = ["IGL", "Assaulter", "Support", "Filter"];
    
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
    const filterPlayers = async () => {
        try {
            setIsLoading(true);
            setError(null);
    
            // Construct query parameters
            const queryParams = new URLSearchParams();
            
            if (playerFilters.ign) queryParams.append('ign', playerFilters.ign);
            if (playerFilters.game) queryParams.append('game', playerFilters.game);
            if (playerFilters.skills.length > 0) queryParams.append('skills', playerFilters.skills.join(','));
            if (playerFilters.experience) queryParams.append('experience', playerFilters.experience);
            if (playerFilters.location) queryParams.append('location', playerFilters.location);
            if (playerFilters.role) queryParams.append('role', playerFilters.role);
    
            const response = await api.get(`/finder/players/search?${queryParams}`);
            
            // Axios already returns the parsed data in response.data
            // No need to check response.ok or call response.json()
            setFilteredPlayers(response.data.results);
            
        } catch (err) {
            // Get the error message from the axios error object
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch players';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    

    const filterTeams = async () => {
        try {
            setIsLoading(true);
            setError(null);
    
            // Construct query parameters
            const queryParams = new URLSearchParams();
            
            if (teamFilters.teamName) {
                queryParams.append('team_name', teamFilters.teamName);
            }
    
            if (teamFilters.game) {
                queryParams.append('game_name', teamFilters.game);
            }
    
            if (teamFilters.roles.length > 0) {
                queryParams.append('roles', teamFilters.roles.join(','));
            }
    
            if (teamFilters.location) {
                queryParams.append('location', teamFilters.location);
            }
            const response = await api.get(`/finder/teams/search?${queryParams}`);
            setFilteredTeams(response.data.results);
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch teams';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        filterPlayers();
    }, []);

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
                                <label htmlFor="ign" className="block mb-2 text-lg">Name</label>
                                <input
                                    type="text"
                                    id="ign"
                                    name="ign"
                                    value={playerFilters.ign}
                                    onChange={handlePlayerFilterChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                                    placeholder="Enter name"
                                />
                            </div>
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
                                                name="roles"
                                                value={role}
                                                checked={teamFilters.roles.includes(role)}
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

                    <div className={`
                        ${searchType === "player" 
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                            : "flex flex-col"
                        } 
                        gap-6
                    `}>
                        {searchType === "player" ? (
                            filteredPlayers.length > 0 ? (
                                filteredPlayers.map((player) => (
                                    <PlayerListCard key={player.uuid} player={player} />
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-lg font-semibold text-foreground">No players match your filters.</p>
                            )
                        ) : (
                            filteredTeams.length > 0 ? (
                                filteredTeams.map((team) => (
                                    <TeamListCard key={team.uuid} team={team} />
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

