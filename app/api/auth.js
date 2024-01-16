import client from "./client";

const login = (nickName, password) =>
  client.post("/api/users/login", { nickName, password });

export default {
  login,
};
