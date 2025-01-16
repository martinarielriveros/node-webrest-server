import { CreateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../dtos/todos/entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

abstract class CreateTodoUseCase {
  abstract execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo extends CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {
    super();
  }
  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
