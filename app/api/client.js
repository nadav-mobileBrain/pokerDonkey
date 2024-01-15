import { create } from "apisauce";

const homeIp = "10.0.0.8";
const workIp = "192.168.1.66";

const apiClient = create({
  baseURL: `http://${workIp}:3030`,
});

export default apiClient;
