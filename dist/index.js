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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = require("./routes");
const connection_1 = require("./database/connection");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeDatabaseConnection();
            this.listen();
            this.addRoutes();
        });
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App running on Port: ${process.env.PORT}`);
        });
    }
    addRoutes() {
        this.app.use(routes_1.router);
    }
    makeDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, connection_1.makeMongoConnection)();
        });
    }
}
new Server().start();
