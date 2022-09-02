import axios from "axios";
import { env } from "env";

export const consoleAxios = axios.create({
  baseURL: env.REACT_APP_ENDPOINT,
});
