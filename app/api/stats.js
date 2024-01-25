import client from "./client";

const endpoint = "/api/stats";

const getLeagueStats = (leagueId) =>
  client.get(`${endpoint}/getLeagueStats/${leagueId}`);

const getPlayerStats = (leagueId) =>
  client.get(`${endpoint}/getPlayersStats/${leagueId}`);

export default {
  getLeagueStats,
  getPlayerStats,
};
