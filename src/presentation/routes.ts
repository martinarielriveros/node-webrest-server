import { Router } from "express";
import path from "path";
import { envs } from "../config/env";

import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodoRoutes.routes);

    router.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, `../../${envs.public_path}/index.html`)
      );
    });

    // router has all the routes defined that should be used by the application
    return router;
  }
}
