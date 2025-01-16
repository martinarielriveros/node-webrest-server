export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  public get isComleted(): boolean {
    return !!this.completedAt;
  }

  public static fromObject(id: number, text: string, completedAt: Date | null) {
    return new TodoEntity(id, text, completedAt);
  }
}
