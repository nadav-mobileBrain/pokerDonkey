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

const removeLastBuyIn = (gameId, playerId, buyInAmount, leagueId) => {
  return client.post(`${endpoint}/removeLastBuyInToPlayer`, {
    gameId,
    playerId,
    buyInAmount,
    leagueId,
  });
};

const cashOutPlayer = (gameId, userId, cashOutAmount) => {
  return client.put(`${endpoint}/cashOutPlayer`, {
    gameId,
    userId,
    cashOutAmount,
  });
};

const endGame = (gameId, userGamesData) => {
  return client.put(`${endpoint}/endGame`, { gameId, userGamesData });
};

export default {
  newGame,
  addBuyIn,
  cashOutPlayer,
  endGame,
  removeLastBuyIn,
};
