"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const env_1 = require("./config/env");
const server_1 = require("./presentation/server");
const routes_1 = require("./presentation/routes");
(() => main())();
function main() {
    const serverOptions = {
        server_port: env_1.envs.server_port,
        public_path: env_1.envs.public_path,
        routes: routes_1.AppRoutes.routes,
    };
    const server = new server_1.Server(Object.assign({}, serverOptions));
    server.start();
}
