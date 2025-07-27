"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared_1 = require("../../../shared");
const constant_1 = require("../constant");
const services_1 = require("../services");
const register = async (req, res) => {
    const userService = (0, services_1.UserService)();
    try {
        const { email } = req.body;
        const existingUser = await userService.findOne({ email });
        if (existingUser) {
            return shared_1.ResponseHandler.alreadyExists(res, constant_1.RESPONSE_MESSAGES.USER_ALREADY_EXISTS, shared_1.STATUS_CODES.CONFLICT);
        }
        const hash = await (0, shared_1.generateHash)(req.body.password);
        const user = await userService.create({ ...req.body, password: hash });
        return shared_1.ResponseHandler.success(res, user, constant_1.RESPONSE_MESSAGES.USER_CREATED, shared_1.STATUS_CODES.CREATED);
    }
    catch (error) {
        console.error(error);
        return shared_1.ResponseHandler.error(res, constant_1.RESPONSE_MESSAGES.INTERNAL_ERROR, shared_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
exports.register = register;
