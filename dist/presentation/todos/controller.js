"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../data/postgres");
const create_todo_dto_1 = require("../../domain/dtos/todos/create-todo.dto");
class TodosController {
    //* DI
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgres_1.prisma.todo.findMany();
            return res.json(todos);
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id; //* unary plus operator: turns string into number (returns NaN for no string-number value)
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: `'/${req.params.id}' argument is not a number` });
            const todo = yield postgres_1.prisma.todo.findUnique({
                where: {
                    id: id,
                },
            });
            todo
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found` });
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, dto] = create_todo_dto_1.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            //* dto is of type CreateTodoDto | undefined.
            const todo = yield postgres_1.prisma.todo.create({
                data: {
                    text: dto.text,
                    // completedAt: new Date(), //* this is optional in schema.prisma
                },
            });
            res.json(todo);
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const { text, completedAt } = req.body;
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: `'/${req.params.id}' argument is not a number` });
            const todo = yield postgres_1.prisma.todo.update({
                where: {
                    id,
                },
                data: {
                    text,
                    completedAt,
                },
            });
            if (!todo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            res.json({ updated: todo });
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: `'/${req.params.id}' argument is not a number` });
            const todo = yield postgres_1.prisma.todo.delete({
                where: {
                    id,
                },
            });
            res.json({ "success deletion": todo });
        });
    }
}
exports.TodosController = TodosController;
