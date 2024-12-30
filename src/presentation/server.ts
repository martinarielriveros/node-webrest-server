import express from "express";
import path from "path";

export interface envTypes {
  server_port: number;
  public_path: string;
}

export class Server {
  #app = express();
  readonly #server_port: number;
  readonly #public_path: string;

  constructor(envOptions: envTypes) {
    const { public_path, server_port } = envOptions;
    this.#public_path = public_path;
    this.#server_port = server_port;
  }
  async start() {
    this.#app.use(express.static(this.#public_path));

    this.#app.listen(this.#server_port, () =>
      console.log(`listening on port ${this.#server_port}`)
    );

    this.#app.get("*", (req, res) => {
      console.log(
        path.join(__dirname, `../../${this.#public_path}/index.html`)
      );
      res.sendFile(this.#public_path);
    });

    //Middlewares

    // Public
  }
}
