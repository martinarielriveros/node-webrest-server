export class CreateTodoDto {
  //* private constructor can only be instantiated from within the class
  private constructor(
    public readonly text: string,
    public readonly completedAt: Date
  ) {}

  //* the return type string is the error message
  //* the return type CreateTodoDto? means that it can be either null or an instance of CreateTodoDto
  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text, completedAt } = props;
    if (!text) {
      return ["Text property is required"];
    }

    if (typeof text !== "string") {
      return ["text property must be a string"];
    }

    //* There’s no "date" type returned by typeof, because typeof new Date() returns "object".

    if (new Date(completedAt).toString() == "Invalid Date") {
      return ["completedAt property must be a date"];
    }

    return [undefined, new CreateTodoDto(text.toLowerCase(), completedAt)];
  }
}
