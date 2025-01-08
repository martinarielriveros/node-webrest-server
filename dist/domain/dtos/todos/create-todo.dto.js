"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
class CreateTodoDto {
    //* private constructor can only be instantiated from within the class
    constructor(text, completedAt) {
        this.text = text;
        this.completedAt = completedAt;
    }
    //* the return type string is the error message
    //* the return type CreateTodoDto? means that it can be either null or an instance of CreateTodoDto
    static create(props) {
        const { text, completedAt } = props;
        if (!text) {
            return ["Text property is required"];
        }
        if (typeof text !== "string") {
            return ["text property must be a string"];
        }
        //* There’s no "date" type returned by typeof, because typeof new Date() returns "object".
        console.log(new Date(completedAt));
        if (new Date(completedAt).toString() == "Invalid Date") {
            return ["completedAt property must be a date"];
        }
        return [undefined, new CreateTodoDto(text.toLowerCase(), completedAt)];
    }
}
exports.CreateTodoDto = CreateTodoDto;
