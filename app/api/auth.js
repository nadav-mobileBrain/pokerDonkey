import client from "./client";

const login = (userInfo) => {
  client.headers["Content-Type"] = "application/json";
  return client.post("api/users/login", userInfo);
};

export default {
  login,
};
