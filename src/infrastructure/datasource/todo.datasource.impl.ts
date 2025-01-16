import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { TodoEntity } from "../../domain/dtos/todos/entities/todo.entity";

export class TodoDatasourceImpl extends TodoDatasource {
  constructor() {
    super();
  }
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: {
        text: createTodoDto!.text,
        // completedAt: new Date(), //* this is optional in schema.prisma
      },
    });
    return TodoEntity.fromObject(todo.id, todo.text, todo.completedAt);
  }
  async findAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    //* todos is an array of similar objects, but TodoEntity has also a method called isCompleted()
    //* so i create a new TodoEntity objects from the todos array

    return todos.map((todo) =>
      TodoEntity.fromObject(todo.id, todo.text, todo.completedAt)
    );
  }
  async findById(id: number): Promise<TodoEntity | undefined> {
    if (isNaN(id)) return;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) throw new Error();
    return TodoEntity.fromObject(todo.id, todo.text, todo.completedAt);
  }
  async deleteById(id: number): Promise<TodoEntity | undefined> {
    if (isNaN(id)) throw new Error();
    try {
      const todo = await prisma.todo.delete({
        where: {
          id,
        },
      });

      return TodoEntity.fromObject(todo.id, todo.text, todo.completedAt);
    } catch (error) {
      console.error(error);
    }
  }
}
