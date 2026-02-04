import loadSeason from '../loaders/loadSeason.js';
import loadScheduleAPI from '../loaders/loadScheduleAPI.js';

async function main() {
  const teams = await loadSeason();
  console.log('Teams in CSV:');
  console.log(teams.map(t => t.team).join(', '));

  const schedule = await loadScheduleAPI();
  const abbreviations = new Set();
  schedule.forEach(game => {
    abbreviations.add(game.HomeTeam);
    abbreviations.add(game.AwayTeam);
  });

  console.log('Team abbreviations from API:');
  console.log([...abbreviations].join(', '));
}

main();
