"use client";

import { useEffect, useState } from "react";
import api from "@/services/api/axiosSetup";

export default function GameCategories() {
  const [games, setGames] = useState([]); // State to store the fetched games
  const [error, setError] = useState(null); // State to handle errors

  // Fetch games from the API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get("/games/list-games");
        const result = response.data

        if (response.status === 200) {
          setGames(result.data);
        } else {
          setError(result.msg || "Failed to fetch games.");
        }
      } catch (err) {
        setError("An error occurred while fetching games.");
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="my-6">
      <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">
        Game Categories
      </h3>

      <div className="flex flex-wrap gap-2">
        {/* Show loading or error state */}
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : games.length === 0 ? (
          <div className="text-gray-400">Loading games...</div>
        ) : (
          // Render games fetched from the API
          games.map((game) => (
            <button
              key={game.id}
              className="text-left px-4 py-2 rounded-lg hover:bg-gray-700 text-foreground transition-colors"
            >
              {game.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
