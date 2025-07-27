"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
const get_user_handler_1 = require("./get-user.handler");
const list_users_handler_1 = require("./list-users.handler");
const login_handler_1 = require("./login.handler");
const register_handler_1 = require("./register.handler");
exports.UserHandler = {
    login: login_handler_1.login,
    register: register_handler_1.register,
    getUser: get_user_handler_1.getUser,
    listAllUsers: list_users_handler_1.listAllUsers,
};
