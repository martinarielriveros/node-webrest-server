import { TodoEntity } from "../../dtos/todos/entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class GetAllTodoUseCase {
  abstract execute(): Promise<TodoEntity[] | undefined>;
}

export class GetAllTodos extends GetAllTodoUseCase {
  constructor(private readonly repository: TodoRepository) {
    super();
  }
  execute(): Promise<TodoEntity[] | undefined> {
    return this.repository.findAll();
  }
}
