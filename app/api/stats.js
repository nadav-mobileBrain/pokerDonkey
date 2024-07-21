import client from "./client";

const endpoint = "/api/stats";

const getLeagueStats = (leagueId) =>
  client.get(`${endpoint}/getLeagueStats/${leagueId}`);

const getPlayerStats = (leagueId) =>
  client.get(`${endpoint}/getPlayersStats/${leagueId}`);

const getMainCardsStats = (leagueId) =>
  client.get(`${endpoint}/getMainCardsStats/${leagueId}`);

const getStatsForCard = (cardName, leagueId) =>
  client.get(`${endpoint}/${cardName}/${leagueId}`);

export default {
  getLeagueStats,
  getPlayerStats,
  getMainCardsStats,
  getStatsForCard,
};
