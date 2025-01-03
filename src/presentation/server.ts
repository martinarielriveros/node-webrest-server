import express, { Router } from "express";

export interface Options {
  server_port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  #app = express();
  readonly #server_port: number;
  readonly #public_path: string;
  readonly #routes: Router;

  constructor(options: Options) {
    const { public_path, server_port, routes } = options;
    this.#public_path = public_path;
    this.#server_port = server_port;
    this.#routes = routes;
  }
  async start() {
    //* Middlewares
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));

    //* Public
    this.#app.use(express.static(this.#public_path));
    //* Routes
    this.#app.use(this.#routes);

    this.#app.listen(this.#server_port, () =>
      console.log(`listening on port ${this.#server_port}`)
    );
  }
}
