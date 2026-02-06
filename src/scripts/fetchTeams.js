import fetch from 'node-fetch';
import fs from 'fs';
import 'dotenv/config';  // loads your API key from .env

// Read your API key from your .env file
const API_KEY = process.env.SPORTSDATA_API_KEY;

// Full Teams API URL
const url = `https://api.sportsdata.io/v3/cbb/scores/json/Teams?key=${API_KEY}`;

// Fetch the data
const res = await fetch(url);
const data = await res.json();

// Pick only the fields we care about
const minimalTeams = data.map(team => ({
  id: team.TeamID,
  key: team.Key,
  name: team.School
}));

// Save it to a file called "teamsMinimal.json" inside a "data" folder
fs.writeFileSync('data/teamsMinimal.json', JSON.stringify(minimalTeams, null, 2));

console.log('Saved minimal team data:', minimalTeams.length);
