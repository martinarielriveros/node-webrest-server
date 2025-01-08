"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    // Port number for the environment variable that is used to connect to the server  (default is 3000)
    server_port: (0, env_var_1.get)("SERVER_PORT").default(3000).asPortNumber(),
    public_path: (0, env_var_1.get)("PUBLIC_PATH").default("public").asString(),
};
