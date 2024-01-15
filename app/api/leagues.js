import client from "./client";

const endpoint = "/api/leagues/";

const getLeagues = () => client.get(`${endpoint}/myLeagues/8`);

export default {
  getLeagues,
};
