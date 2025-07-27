"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllUsers = void 0;
const shared_1 = require("../../../shared");
const constant_1 = require("../constant");
const services_1 = require("../services");
const listAllUsers = async (req, res) => {
    const userService = (0, services_1.UserService)();
    try {
        const users = await userService.findAll();
        return shared_1.ResponseHandler.success(res, users, constant_1.RESPONSE_MESSAGES.USERS_RETRIEVED, shared_1.STATUS_CODES.OK, true);
    }
    catch (error) {
        console.error(error);
        res.status(shared_1.STATUS_CODES.CREATED).json({
            success: false,
            message: error,
            error: [error],
        });
    }
};
exports.listAllUsers = listAllUsers;
