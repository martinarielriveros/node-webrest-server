import { TodoEntity } from "../../dtos/todos/entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class DeleteTodoByIdTodoUseCase {
  abstract execute(id: number): Promise<TodoEntity | undefined>;
}

export class DeleteTodo extends DeleteTodoByIdTodoUseCase {
  constructor(private readonly repository: TodoRepository) {
    super();
  }
  execute(id: number): Promise<TodoEntity | undefined> {
    return this.repository.deleteById(id);
  }
}
