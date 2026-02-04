import fetch from 'node-fetch';

const API_KEY = '6f20c0609477475f909a36ca2d1fcc75';
const SEASON = 2026;

export default async function loadScheduleAPI() {
  const url = `https://api.sportsdata.io/v3/cbb/scores/json/SchedulesBasic/${SEASON}?key=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  
  const schedule = await res.json();
  console.log(`Loaded ${schedule.length} games from API`);
  return schedule;
}
