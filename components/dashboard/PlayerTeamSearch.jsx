"use client";
import { useState, useEffect } from "react";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import PlayerListCard from "./PlayerListCard";
import TeamListCard from "./TeamListCard";
import api from "@/services/api/axiosSetup";


const PlayerTeamSearch = () => {
    const [games, setGames] = useState([])
    const [roles, setRoles] = useState([])
    const [searchType, setSearchType] = useState("player");
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
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

    const fetchGames = async () => {
        try {
            const response = await api.get("/games/list-games");
            setGames(response.data.data || []);
        } catch (err) {
            console.error("Failed to fetch games:", err.message);
        }
    };

    const fetchRoles = async (game) => {
        try {
            if (!game) {
                setRoles([])
                return;
            }
            const response = await api.get(`/games/${game}/roles`);
            setRoles(response.data.data || []);
        } catch (err) {
            console.error("Failed to fetch games:", err.message);
            setRoles([]);
        }
    };

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
        if (name === "game") {
            fetchRoles(value);
        }
    };

    // Function to handle filter changes for teams
    const handleTeamFilterChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setTeamFilters((prev) => {
                const roleExists = prev[name].includes(value);
                return {
                    ...prev,
                    [name]: roleExists
                        ? prev[name].filter((role) => role !== value) // Remove if exists
                        : [...prev[name], value] // Add if doesn't exist
                };
            });
        } else {
            setTeamFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        if (name === "game") {
            fetchRoles(value);
        }
    };


    // Filter players based on the selected filters
    const filterPlayers = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const queryParams = new URLSearchParams();

            if (playerFilters.ign) queryParams.append('ign', playerFilters.ign);
            if (playerFilters.game) queryParams.append('game', playerFilters.game);
            if (playerFilters.skills.length > 0) queryParams.append('skills', playerFilters.skills.join(','));
            if (playerFilters.experience) queryParams.append('experience', playerFilters.experience);
            if (playerFilters.location) queryParams.append('location', playerFilters.location);
            if (playerFilters.role) queryParams.append('role', playerFilters.role);

            const response = await api.get(`/finder/players/search/?${queryParams}`);
            setFilteredPlayers(response.data.results);

        } catch (err) {
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
            console.log(response.data.results);
            setFilteredTeams(response.data.results);

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch teams';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (searchType === "player") {
            filterPlayers();
        } else if (searchType === "team") {
            filterTeams();
        }
    }, [searchType]);

    useEffect(() => {
        fetchGames();
    }, [])

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
                                        <option key={game.id} value={game.name}>
                                            {game.name}
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
                                        <option key={role.id} value={role.name}>
                                            {role.name}
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
                                        <option key={game.id} value={game.name}>
                                            {game.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-3">Roles Looking For</label>
                                <div className="flex flex-wrap gap-2">
                                    {roles.map((role) => (
                                        <label key={role.id} className="group relative inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                id={role.id}
                                                name="roles"
                                                value={role.name}
                                                checked={teamFilters.roles.includes(role.name)}
                                                onChange={handleTeamFilterChange}
                                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                            />
                                            <span className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer
                    ${teamFilters.roles.includes(role.name)
                                                    ? 'bg-highlight text-foreground'
                                                    : 'bg-gray-700 text-foreground hover:bg-gray-600'
                                                }`}
                                            >
                                                {role.name}
                                            </span>
                                        </label>
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

