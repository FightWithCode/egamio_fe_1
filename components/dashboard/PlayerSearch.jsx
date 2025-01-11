"use client";
import React, { useState } from 'react';
import { api } from '@/services/api/axiosSetup';

const PlayerSearch = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    game: '',
    role: '',
    ign: ''
  });

  const gameOptions = [
    { id: 1, name: 'BGMI' },
    { id: 2, name: 'CODM' },
    { id: 3, name: 'Apex Legend' }
  ];
  const roleOptions = [
    { id: 1, name: 'Role 1' },
    { id: 2, name: 'Role 2' },
    { id: 3, name: 'Role 3' }
  ];

  const fetchPlayers = async (page = 1) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        page_size: 10,
        ...(searchFilters.game && { game: searchFilters.game }),
        ...(searchFilters.role && { role: searchFilters.role }),
        ...(searchFilters.ign && { ign: searchFilters.ign })
      });

      const response = await api.get(`/finder/players/search/?${queryParams}`);
      setPlayers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlayers(1);
  };

  return (
    <div className="p-6 backdrop-blur-sm border rounded-lg max-w-[750px] mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Search Players</h2>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block mb-2">Select Game</label>
            <select
              className="w-full p-2 rounded bg-background"
              value={searchFilters.game}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, game: e.target.value }))}
            >
              <option value="">All Games</option>
              {gameOptions.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Select Role</label>
            <select
              className="w-full p-2 rounded bg-background"
              value={searchFilters.role}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="">All Roles</option>
              {roleOptions.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Search by IGN</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-background"
              placeholder="Enter IGN"
              value={searchFilters.ign}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, ign: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-highlight text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Results Section */}
        {players.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Search Results</h3>
            <div className="grid gap-4">
              {players.map((player) => (
                <div
                  key={player.uuid}
                  className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4">
                    {player.featured_image && (
                      <img
                        src={player.featured_image}
                        alt={player.user_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-bold">{player.user_name}</h4>
                      <p className="text-sm opacity-75">IGN: {player.ign}</p>
                      <p className="text-sm opacity-75">Game: {player.game_name}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {player.roles_list.map((role, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-highlight/10 rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchPlayers(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-highlight text-white'
                        : 'bg-background border border-highlight text-highlight'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSearch;