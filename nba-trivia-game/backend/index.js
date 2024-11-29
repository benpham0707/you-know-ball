const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

// Define the stats and seasons arrays
const stats = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'FG3M'];
const seasons = Array.from({ length: 19 }, (_, i) => `${2005 + i}-${2006 + i}`);

// Randomly pick a season and stat
let currentStat = stats[Math.floor(Math.random() * stats.length)];
let currentSeason = seasons[Math.floor(Math.random() * seasons.length)];

// Endpoint to fetch random season and stat
app.get('/api/random-season-stat', (req, res) => {
  res.json({ season: currentSeason, stat: currentStat });
});

// Endpoint to fetch league leaders for a random season and stat
app.get('/api/league-leaders', async (req, res) => {
  const currentStat = stats[Math.floor(Math.random() * stats.length)];
  const currentSeason = seasons[Math.floor(Math.random() * seasons.length)];

  console.log(`Fetching league leaders for season: ${currentSeason} and stat: ${currentStat}`);

  const seasonFormatted = currentSeason.replace(/-\d{4}$/, (match) => `-${match.slice(3)}`);
  const url = `https://stats.nba.com/stats/leagueleaders?ActiveFlag=&LeagueID=00&PerMode=PerGame&Scope=S&Season=${seasonFormatted}&SeasonType=Regular+Season&StatCategory=${currentStat}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Referer: 'https://www.nba.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });

    if (!response.data.resultSet || !response.data.resultSet.rowSet) {
      return res.status(404).json({ error: 'No data available for this stat and season combination.' });
    }

    const statIndexMap = {
      PLAYER_ID: 0,
      RANK: 1,
      PLAYER: 2,
      TEAM_ID: 3,
      TEAM: 4,
      GP: 5,
      MIN: 6,
      FGM: 7,
      FGA: 8,
      FG_PCT: 9,
      FG3M: 10,
      FG3A: 11,
      FG3_PCT: 12,
      FTM: 13,
      FTA: 14,
      FT_PCT: 15,
      OREB: 16,
      DREB: 17,
      REB: 18,
      AST: 19,
      STL: 20,
      BLK: 21,
      TOV: 22,
      PTS: 23,
      EFF: 24,
    };

    const statIndex = statIndexMap[currentStat];
    if (statIndex === undefined) {
      return res.status(400).json({ error: `Invalid stat: ${currentStat}` });
    }

    const players = response.data.resultSet.rowSet.slice(0, 10).map((player) => ({
      rank: player[1],
      name: player[2],
      team: player[4],
      stat: player[statIndex],
    }));

    res.json({
      season: currentSeason,
      stat: currentStat,
      leaderboard: players,
    });
  } catch (error) {
    console.error('Error fetching data from NBA Stats API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from NBA Stats API' });
  }
});

// Endpoint to reset the current season and stat (optional)
app.post('/api/reset', (req, res) => {
  currentStat = stats[Math.floor(Math.random() * stats.length)];
  currentSeason = seasons[Math.floor(Math.random() * seasons.length)];
  console.log(`Reset to new random season: ${currentSeason}, stat: ${currentStat}`);
  res.json({ message: 'Season and stat reset', season: currentSeason, stat: currentStat });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
