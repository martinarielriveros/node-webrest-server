import "dotenv/config";
import { get } from "env-var";

export const envs = {
  // Port number for the environment variable that is used to connect to the server  (default is 3000)
  server_port: get("SERVER_PORT").default(3000).asPortNumber(),
  public_path: get("PUBLIC_PATH").default("public").asString(),
};
