import axios from "axios";

// Define the base URL for your API
const API_BASE_URL = "http://localhost:5001/api";

// Define the types for the responses (optional but recommended)
export type RandomSeasonStatResponse = {
  season: string;
  stat: string;
};

export type Player = {
  rank: number;
  name: string;
  teamId: number;
  stat: number;
};

// Fetch a random season and stat
export const fetchRandomSeasonStat = async (): Promise<RandomSeasonStatResponse> => {
  try {
    const response = await axios.get<RandomSeasonStatResponse>(`${API_BASE_URL}/random-season-stat`);
    return response.data;
  } catch (error) {
    console.error("Error fetching random season and stat:", error);
    throw new Error("Failed to fetch random season and stat");
  }
};

// Fetch league leaders for a given season and stat
export const fetchLeagueLeaders = async (season: string, stat: string): Promise<Player[]> => {
  try {
    const response = await axios.get<Player[]>(`${API_BASE_URL}/league-leaders`, {
      params: { season, stat },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching league leaders:", error);
    throw new Error("Failed to fetch league leaders");
  }
};