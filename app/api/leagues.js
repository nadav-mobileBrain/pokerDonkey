import client from "./client";

const endpoint = "/api/leagues/";

const getLeagues = () => client.get(`${endpoint}/myLeagues/8`);

const addLeagues = (name, image) => {
  const data = new FormData();
  data.append("league_name", name);
  //data.append("league_number", number);
  data.append("league_image", {
    name: name,
    type: "image/jpeg",
    uri: image,
  });

  return client.post(endpoint, data);
};
export default {
  getLeagues,
  addLeagues,
};
