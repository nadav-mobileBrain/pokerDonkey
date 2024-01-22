import client from "./client";

const endpoint = "/api/games";

const newGame = ({ selectedPlayers, leagueId }) => {
  return client.post(`${endpoint}/newGame`, { selectedPlayers, leagueId });
};

const addBuyIn = (gameId, playerId, buyInAmount, leagueId) => {
  return client.post(`${endpoint}/addBuyInToPlayer`, {
    gameId,
    playerId,
    buyInAmount,
    leagueId,
  });
};

export default {
  newGame,
  addBuyIn,
};
