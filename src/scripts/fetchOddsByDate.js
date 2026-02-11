import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

/* ============================
   DATE LOGIC GOES HERE
   ============================ */

// Date format required: YYYY-MMM-DD (e.g. 2025-JAN-15)
function formatDateForApi(date = new Date()) {
  const year = date.getFullYear();
  const month = date
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// CLI override: node fetchOddsByDate.js 2025-JAN-15
const cliDate = process.argv[2];
const date = cliDate ?? formatDateForApi();

/* ============================
   CONFIG / URL
   ============================ */

const apiKey = process.env.SPORTSDATA_API_KEY;

if (!apiKey) {
  console.error('❌ Missing SPORTSDATA_API_KEY in .env');
  process.exit(1);
}

const url = `https://api.sportsdata.io/v3/cbb/odds/json/GameOddsByDate/${date}?key=${apiKey}`;

const fetchOdds = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('❌ Unexpected API response:', data);
      return;
    }

    // Minimal odds data
    const minimalOdds = data.map(game => {
      const mainBook = game.PregameOdds?.[0]; // first sportsbook

      return {
        GameID: game.GameID,
        Date: game.Day,
        HomeTeam: game.HomeTeam,
        AwayTeam: game.AwayTeam,
        Spread: mainBook?.PointSpread ?? null,
        Total: mainBook?.OverUnder ?? null,
        Sportsbook: mainBook?.Sportsbook ?? null
      };
    });

    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }

    fs.writeFileSync(
      'data/oddsMinimal.json',
      JSON.stringify(minimalOdds, null, 2)
    );

    console.log(`✅ Saved odds for ${minimalOdds.length} games`);

  } catch (err) {
    console.error('❌ Error fetching odds:', err);
  }
};

fetchOdds();
