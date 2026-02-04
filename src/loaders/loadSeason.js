import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default function loadSeason() {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.resolve(process.cwd(), 'data/raw/NCAA26-2-4 - Sheet1.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

