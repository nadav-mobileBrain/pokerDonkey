import client from "./client";

const endpoint = "/api/games";

const newGame = ({ selectedPlayers, leagueId }) => {
  return client.post(`${endpoint}/newGame`, { selectedPlayers, leagueId });
};

export default {
  newGame,
};
