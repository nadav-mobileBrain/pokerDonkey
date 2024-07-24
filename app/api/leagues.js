import client from "./client";
import { Platform } from "react-native";

const endpoint = "/api/leagues";

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf("."));
}

const getLeagues = (userId) =>{

return   client.get(`${endpoint}/myLeagues/${userId}`);
}

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


const updateLeagueDetails = (leagueInfo) => {

  if (leagueInfo.image) {
    const data = new FormData();
    
    function getFileExtension(filePath) {
      return filePath.substring(filePath.lastIndexOf("."));
    }
    
    data.append("leagueName", leagueInfo.leagueName);
    data.append("leagueId", leagueInfo.leagueId);
    
    data.append("image", {
      name: leagueInfo.leagueName + getFileExtension(leagueInfo.image), /// Add the extension to the file name
      type: "image/jpeg",
      uri:
      Platform.OS === "android"
      ? leagueInfo.image
      : leagueInfo.image.replace("file://", ""),
    });
    client.headers["Content-Type"] = "multipart/form-data";

    return client.put(`${endpoint}/updateLeagueDetails`, data);
  } else {
    return client.put(`${endpoint}/updateLeagueDetails`, leagueInfo);
  }
};

export default {
  getLeagues,
  createLeague,
  joinLeague,
  getLeaguePlayers,
  updateLeagueDetails,
};
