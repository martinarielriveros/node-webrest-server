import { Router } from "express";
import { envs } from "./config/env";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(() => main())();

export function main() {
  const serverOptions = {
    server_port: envs.server_port,
    public_path: envs.public_path,
    routes: AppRoutes.routes,
  };
  const server = new Server({
    ...serverOptions,
  });
  server.start();
}
