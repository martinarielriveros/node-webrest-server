import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepository } from "../../domain";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repositories.impl";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    //* if we were to change Postgre to something different (mongo) we could do this here
    const dataSource = new TodoDatasourceImpl();

    const todoRepository = new TodoRepositoryImpl(dataSource);

    const todoController = new TodosController(todoRepository);

    router.get("/", todoController.getTodos);

    router.get("/:id", todoController.getTodoById);

    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
