const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Battle Royale Tournament App is live!");
});

// Tournament routes
let tournaments = [];

app.post("/create-tournament", (req, res) => {
  const { name, entryFee, prizePool } = req.body;
  const id = tournaments.length + 1;
  tournaments.push({ id, name, entryFee, prizePool, players: [] });
  res.json({ message: "Tournament created", id });
});

app.post("/join-tournament", (req, res) => {
  const { playerName, tournamentId } = req.body;
  const tournament = tournaments.find(t => t.id === tournamentId);
  if (!tournament) return res.status(404).json({ error: "Tournament not found" });
  tournament.players.push(playerName);
  res.json({ message: `${playerName} joined tournament ${tournament.name}` });
});
app.get("/tournaments", (req, res) => {
  res.json(tournaments);
});
app.get("/tournaments/:id", (req, res) => {
  const id = Number(req.params.id);
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) return res.status(404).json({ error: "Tournament not found" });
  res.json(tournament);
});
app.delete("/tournaments/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = tournaments.some(t => t.id === id);
  if (!exists) return res.status(404).json({ error: "Tournament not found" });
  tournaments = tournaments.filter(t => t.id !== id);
  res.json({ message: `Tournament ${id} deleted` });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
