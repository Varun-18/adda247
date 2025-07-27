"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const repositories_1 = require("../repositories");
const UserService = () => {
    const userRepository = (0, repositories_1.createUserRepository)();
    return {
        ...userRepository,
    };
};
exports.UserService = UserService;
