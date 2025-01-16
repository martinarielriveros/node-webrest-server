import { CreateTodoDto, TodoDatasource, TodoRepository } from "../../domain";
import { TodoEntity } from "../../domain/dtos/todos/entities/todo.entity";

export class TodoRepositoryImpl extends TodoRepository {
  constructor(private readonly dataSource: TodoDatasource) {
    super();
  }
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDto);
  }
  findAll(): Promise<TodoEntity[]> {
    return this.dataSource.findAll();
  }
  findById(id: number): Promise<TodoEntity | undefined> {
    return this.dataSource.findById(id);
  }
  deleteById(id: number): Promise<TodoEntity | undefined> {
    return this.dataSource.findById(id);
  }
}
