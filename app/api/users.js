import client from "./client";

const register = (userInfo) => client.post("api/users/signup", userInfo);

export default {
  register,
};
