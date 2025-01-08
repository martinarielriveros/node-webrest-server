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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Server_app, _Server_server_port, _Server_public_path, _Server_routes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(options) {
        _Server_app.set(this, (0, express_1.default)());
        _Server_server_port.set(this, void 0);
        _Server_public_path.set(this, void 0);
        _Server_routes.set(this, void 0);
        const { public_path, server_port, routes } = options;
        __classPrivateFieldSet(this, _Server_public_path, public_path, "f");
        __classPrivateFieldSet(this, _Server_server_port, server_port, "f");
        __classPrivateFieldSet(this, _Server_routes, routes, "f");
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //* Built-in Middlewares
            __classPrivateFieldGet(this, _Server_app, "f").use(express_1.default.json());
            __classPrivateFieldGet(this, _Server_app, "f").use(express_1.default.urlencoded({ extended: true }));
            //* Public
            __classPrivateFieldGet(this, _Server_app, "f").use(express_1.default.static(__classPrivateFieldGet(this, _Server_public_path, "f")));
            //* Routes
            __classPrivateFieldGet(this, _Server_app, "f").use(__classPrivateFieldGet(this, _Server_routes, "f"));
            __classPrivateFieldGet(this, _Server_app, "f").get("*", (req, res) => {
                const indexPath = path_1.default.join(__dirname + `../../../${__classPrivateFieldGet(this, _Server_public_path, "f")}/index.html`);
                res.sendFile(indexPath);
            });
            __classPrivateFieldGet(this, _Server_app, "f").listen(__classPrivateFieldGet(this, _Server_server_port, "f"), () => console.log(`listening on port ${__classPrivateFieldGet(this, _Server_server_port, "f")}`));
        });
    }
}
exports.Server = Server;
_Server_app = new WeakMap(), _Server_server_port = new WeakMap(), _Server_public_path = new WeakMap(), _Server_routes = new WeakMap();
