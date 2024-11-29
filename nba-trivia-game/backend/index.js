const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Stats and seasons data
const stats = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'FG3M'];
const seasons = Array.from({ length: 19 }, (_, i) => `${2005 + i}-${2006 + i}`); // Generate seasons from 2005-06 to 2023-24

// API endpoint to get a random season and stat
app.get('/api/random-season-stat', (req, res) => {
  const randomStat = stats[Math.floor(Math.random() * stats.length)];
  const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];

  console.log(`Generated random season: ${randomSeason}, random stat: ${randomStat}`);

  res.json({ season: randomSeason, stat: randomStat });
});

// API endpoint to fetch league leaders for a random season and stat
const statIndexMap = {
    'PLAYER_ID': 0,
    'RANK': 1,
    'PLAYER': 2,
    'TEAM_ID': 3,
    'TEAM': 4,
    'GP': 5,
    'MIN': 6,
    'FGM': 7,
    'FGA': 8,
    'FG_PCT': 9,
    'FG3M': 10,
    'FG3A': 11,
    'FG3_PCT': 12,
    'FTM': 13,
    'FTA': 14,
    'FT_PCT': 15,
    'OREB': 16,
    'DREB': 17,
    'REB': 18,
    'AST': 19,
    'STL': 20,
    'BLK': 21,
    'TOV': 22,
    'PTS': 23,
    'EFF': 24,
};

app.get('/api/league-leaders', async (req, res) => {
    const stat = stats[Math.floor(Math.random() * stats.length)];
    let season = seasons[Math.floor(Math.random() * seasons.length)];

    // Correct the season format to match API requirements
    season = season.replace(/-\d{4}$/, (match) => `-${match.slice(3)}`);

    console.log(`Fetching league leaders for season: ${season} and stat: ${stat}`);

    const url = `https://stats.nba.com/stats/leagueleaders?ActiveFlag=&LeagueID=00&PerMode=PerGame&Scope=S&Season=${season}&SeasonType=Regular+Season&StatCategory=${stat}`;
    console.log(`Request URL: ${url}`);

    try {
        const response = await axios.get(url, {
            headers: {
                Referer: 'https://www.nba.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            },
        });

        if (!response.data.resultSet || !response.data.resultSet.rowSet) {
            console.error('No data available in the API response.');
            return res.status(404).json({ error: 'No data available for this stat and season combination.' });
        }

        const statIndex = statIndexMap[stat];
        if (statIndex === undefined) {
            console.error(`Invalid stat: ${stat}`);
            return res.status(400).json({ error: `Invalid stat: ${stat}` });
        }

        const players = response.data.resultSet.rowSet.map((player) => ({
            rank: player[1], // Rank
            name: player[2], // Player name
            team: player[4], // Team name
            stat: player[statIndex], // Dynamically map to the correct stat index
        }));

        res.json(players);
    } catch (error) {
        console.error('Error fetching data from NBA Stats API:', error.message);
        if (error.response) {
            console.error('API Response Data:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch data from NBA Stats API' });
    }
});



  
  
  
  

// Start the server
app.listen(5001, () => console.log('Backend running on http://localhost:5001'));
