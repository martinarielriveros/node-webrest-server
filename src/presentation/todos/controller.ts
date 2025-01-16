import { Request, Response } from "express";
import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import {
  CreateTodo,
  DeleteTodo,
  GetAllTodos,
  GetTodoById,
  TodoRepository,
} from "../../domain";

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos: (req: Request, res: Response) => void = (req, res) => {
    new GetAllTodos(this.todoRepository)
      .execute()
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById: (req: Request, res: Response) => void = (req, res) => {
    const id = +req.params.id; //* unary plus operator: turns string into number (returns NaN for no string-number value)

    new GetTodoById(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo: (req: Request, res: Response) => void = (req, res) => {
    const [error, dto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(dto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo: (req: Request, res: Response) => void = (req, res) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;
    //* TODO
  };

  public deleteTodo: (req: Request, res: Response) => void = (req, res) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
