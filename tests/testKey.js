// testKey.js
import 'dotenv/config';  // <-- load .env automatically
import fetch from 'node-fetch'; // If using Node 18+, fetch is built-in, otherwise install node-fetch

const API_KEY = process.env.SPORTSDATA_API_KEY;

const url = `https://api.sportsdata.io/v3/cbb/scores/json/Teams?key=${API_KEY}`;

const res = await fetch(url);
const data = await res.json();

console.log('STATUS:', res.status);
console.log('DATA TYPE:', Array.isArray(data) ? 'array' : typeof data);
console.log(data);
