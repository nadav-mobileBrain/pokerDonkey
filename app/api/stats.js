import client from "./client";

const endpoint = "/api/stats";

const getLeagueStats = (leagueId) =>
  client.get(`${endpoint}/getLeagueStats/${leagueId}`);

export default {
  getLeagueStats,
};
