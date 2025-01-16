import { Request, Response } from "express";
import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { TodoRepository } from "../../domain";

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos: (req: Request, res: Response) => void = async (req, res) => {
    try {
      const todos = await this.todoRepository.findAll();
      return res.json(todos);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  public getTodoById: (req: Request, res: Response) => void = async (
    req,
    res
  ) => {
    const id = +req.params.id; //* unary plus operator: turns string into number (returns NaN for no string-number value)

    if (isNaN(id))
      return res
        .status(400)
        .json({ error: `'/${req.params.id}' argument is not a number` });
    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: `TODO with id ${id} not found` });
    }
  };

  public createTodo: (req: Request, res: Response) => void = async (
    req,
    res
  ) => {
    const [error, dto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    //* dto is of type CreateTodoDto | undefined.
    try {
      const todo = await this.todoRepository.create(dto!);
      res.json(todo);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  public updateTodo: (req: Request, res: Response) => void = async (
    req,
    res
  ) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;

    if (isNaN(id))
      return res
        .status(400)
        .json({ error: `'/${req.params.id}' argument is not a number` });

    const todo = await this.todoRepository.deleteById(id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    res.json({ updated: todo });
  };

  public deleteTodo: (req: Request, res: Response) => void = async (
    req,
    res
  ) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res
        .status(400)
        .json({ error: `'/${req.params.id}' argument is not a number` });

    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.json({ "success deletion": todo });
  };
}
