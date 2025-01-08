import { Request, Response } from "express";
import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";

export class TodosController {
  //* DI
  constructor() {}

  public getTodos: (req: Request, res: Response) => void = async (req, res) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
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

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo: (req: Request, res: Response) => void = async (
    req,
    res
  ) => {
    const [error, dto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    //* dto is of type CreateTodoDto | undefined.

    const todo = await prisma.todo.create({
      data: {
        text: dto!.text,
        // completedAt: new Date(), //* this is optional in schema.prisma
      },
    });
    res.json(todo);
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

    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text,
        completedAt,
      },
    });
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
