const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "tournaments.json");

function readTournaments() {
  try {
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, "utf-8");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeTournaments(tournaments) {
  fs.writeFileSync(file, JSON.stringify(tournaments, null, 2));
}

module.exports = { readTournaments, writeTournaments };
