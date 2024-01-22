import { create } from "apisauce";
import authStorage from "../auth/storage";

const homeIp = "10.0.0.8";
const workIp = "192.168.1.66";
const meirIp = "192.168.1.152";

const apiClient = create({
  baseURL: `http://${workIp}:3030/`,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
