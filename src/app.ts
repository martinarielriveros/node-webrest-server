import { envs } from "./config/env";
import { Server } from "./presentation/server";

(() => main())();

export function main() {
  const server = new Server(envs);
  server.start();
}
