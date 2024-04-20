import client from "./client";

const endpoint = "/api/leagues";
function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf("."));
}

const getLeagues = () => client.get(`${endpoint}/myLeagues/`);

const createLeague = (leagueData) => {
  const data = new FormData();
  data.append("leagueName", leagueData.leagueName);
  data.append("userId", leagueData.userId);
  if (!leagueData.image) {
    client.headers["Content-Type"] = "multipart/form-data";

    return client.post(`${endpoint}/createLeague`, data);
  }
  data.append("image", {
    name: leagueData.leagueName + getFileExtension(leagueData.image), /// Add the extension to the file name
    type: "image/jpeg",
    uri:
      Platform.OS === "android"
        ? leagueData.image
        : leagueData.image.replace("file://", ""),
  });
  client.headers["Content-Type"] = "multipart/form-data";

  return client.post(`${endpoint}/createLeague`, data);
};

const joinLeague = (leagueData) => {
  const leagueNUmber = leagueData.leagueNumber;
  const userId = leagueData.userId;
  return client.put(`${endpoint}/joinLeague/${leagueNUmber}/${userId}`);
};

const getLeaguePlayers = (leagueId) =>
  client.get(`${endpoint}/getLeaguePlayersByLeagueId/${leagueId}`);

export default {
  getLeagues,
  createLeague,
  joinLeague,
  getLeaguePlayers,
};
