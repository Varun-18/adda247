"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server");
dotenv_1.default.config();
const httpServer = http_1.default.createServer(server_1.app);
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
    console.log(`Server is running on ${process.env.MODE === 'prod' ? '' : `http://localhost:${port}`}`);
});
exports.default = httpServer;
