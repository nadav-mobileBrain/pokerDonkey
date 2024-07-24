import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
const key = "authToken";
import logger from "../utility/logger";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    logger.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    logger.log("🚀 ~ getToken ~ error:", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    logger.log("🚀 ~ removeToken ~ error:", error);
  }
};

export default { getUser, getToken, removeToken, storeToken };
