import client from "./client";

const endpoint = "/api/pushNotifications";

const test = (expoPushToken) => {
 
  return client.post(`${endpoint}/test`, { expoPushToken });
}

const leaguePush = (leagueId, message) => {
  return client.post(`${endpoint}/leaguePush/${leagueId}`, {  message });
}

export default {
  test,
    leaguePush
};