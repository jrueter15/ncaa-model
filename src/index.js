import loadSeason from './loaders/loadSeason.js';
import loadScheduleAPI from './loaders/loadScheduleAPI.js';
import { predictGame } from './models/predict.js';
import { teamMap } from './teamMap.js';
import fs from 'fs';
import path from 'path';

async function main() {
  const teams = await loadSeason();
  const schedule = await loadScheduleAPI();

  const predictions = [];

  for (const game of schedule) {
    const teamA = teams.find(t => t.team === teamMap[game.HomeTeam]);
    const teamB = teams.find(t => t.team === teamMap[game.AwayTeam]);

    if (teamA && teamB) {
      const prediction = predictGame(teamA, teamB);
      prediction.date = game.DateTime;
      predictions.push(prediction);
    } else {
      console.log('Team not found in CSV:', game.HomeTeam, game.AwayTeam);
    }
  }

  console.log(`Predicted ${predictions.length} games`);

  // Optional: save to CSV
  const outputPath = path.resolve(process.cwd(), 'data/output/predictedSeason.csv');
  const header = 'date,teamA,teamB,pointsA,pointsB,spread,total\n';
  const rows = predictions.map(p =>
    `${p.date},${p.teamA},${p.teamB},${p.pointsA},${p.pointsB},${p.spread},${p.total}`
  ).join('\n');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, header + rows);

  console.log('Predictions saved to', outputPath);
}

main();
