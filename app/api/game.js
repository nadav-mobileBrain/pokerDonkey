import client from "./client";

const endpoint = "/api/games";

const newGame = ({ selectedPlayers, leagueId }) => {
  console.log("🚀 ~ leagueId:", leagueId);
  console.log("🚀 ~ selectedPlayers:", selectedPlayers);
  return client.post(`${endpoint}/newGame`, { selectedPlayers, leagueId });
};

export default {
  newGame,
};
