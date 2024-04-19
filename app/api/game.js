import client from "./client";

const endpoint = "/api/games";

const newGame = ({ selectedPlayers, leagueId, gameAdminId }) => {
  return client.post(`${endpoint}/newGame`, {
    selectedPlayers,
    leagueId,
    gameAdminId,
  });
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

const getAllGamesForLeague = (leagueId, continuationToken = 0) => {
  // Include the continuationToken in the API request
  // Default the continuationToken to 0 to get the first page if not provided
  return client.get(
    `${endpoint}/getAllGamesForLeague?leagueId=${leagueId}&continuationToken=${continuationToken}`
  );
};

const checkIfOpenGameExist = (leagueId) => {
  return client.get(`${endpoint}/checkIfOpenGameExist?leagueId=${leagueId}`);
};

export default {
  newGame,
  addBuyIn,
  cashOutPlayer,
  endGame,
  removeLastBuyIn,
  getAllGamesForLeague,
  checkIfOpenGameExist,
};
