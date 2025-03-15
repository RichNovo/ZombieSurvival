import { DefaultApi, Configuration } from "../api";
const isDev = import.meta.env.DEV; // true in dev mode, false in production

const api = new DefaultApi(
  new Configuration({ basePath: isDev ? "http://127.0.0.1:8000" : "" }),
);

export default api;
