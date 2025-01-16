import { CreateTodoDto } from "../dtos/todos/create-todo.dto";
import { TodoEntity } from "../dtos/todos/entities/todo.entity";

export abstract class TodoDatasource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  abstract findAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity | undefined>;

  abstract deleteById(id: number): Promise<TodoEntity | undefined>;
}
