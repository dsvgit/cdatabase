import axios from "axios";

export const dockerAxios = axios.create({
  baseURL: "http://localhost/v1.41",
  socketPath: "/var/run/docker.sock",
  timeout: 10000,
});
