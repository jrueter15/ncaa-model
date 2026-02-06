// src/scripts/fetchSchedule.js

import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Read the API key from the .env file
const apiKey = process.env.SPORTSDATA_API_KEY;

if (!apiKey) {
  console.error('❌ API key not found. Make sure your .env has SPORTS_DATA_API_KEY=your_key');
  process.exit(1);
}

console.log('✅ Loaded API key:', apiKey);

// Set the season you want to pull
const season = 2025;

// Construct the API URL
const url = `https://api.sportsdata.io/v3/cbb/scores/json/Games/${season}?key=${apiKey}`;

const fetchSchedule = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('❌ API returned unexpected data:', data);
      return;
    }

    // Minimal schedule data
    const minimalSchedule = data.map(game => ({
      GameID: game.GameID,
      Date: game.Day,
      HomeTeam: game.HomeTeam,
      AwayTeam: game.AwayTeam
    }));

    // Make sure the 'data' folder exists
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }

    // Save minimal schedule to JSON
    fs.writeFileSync('data/scheduleMinimal.json', JSON.stringify(minimalSchedule, null, 2));

    console.log(`✅ Schedule saved: ${minimalSchedule.length} games`);

  } catch (err) {
    console.error('❌ Error fetching schedule:', err);
  }
};

// Run the fetch function
fetchSchedule();
