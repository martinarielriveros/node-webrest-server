import { TodoEntity } from "../../dtos/todos/entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class GetTodoByIdTodoUseCase {
  abstract execute(id: number): Promise<TodoEntity | undefined>;
}

export class GetTodoById extends GetTodoByIdTodoUseCase {
  constructor(private readonly repository: TodoRepository) {
    super();
  }
  execute(id: number): Promise<TodoEntity | undefined> {
    return this.repository.findById(id);
  }
}
