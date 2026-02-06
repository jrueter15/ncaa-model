import fetch from "node-fetch";

const API_KEY = process.env.SPORTS_DATA_API_KEY;

const url = `https://api.sportsdata.io/v3/cbb/scores/json/Teams?key=${API_KEY}`;

const response = await fetch(url);
const data = await response.json();

console.log("API KEY:", process.env.SPORTS_DATA_API_KEY);

console.log("RAW RESPONSE:", data);
console.log("Type:", typeof data);
