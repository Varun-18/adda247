"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const shared_1 = require("../../../shared");
const constant_1 = require("../constant");
const services_1 = require("../services");
const getUser = async (req, res) => {
    const userService = (0, services_1.UserService)();
    try {
        const user = await userService.findOne({ email: req.user.email });
        if (user === null) {
            return shared_1.ResponseHandler.error(res, constant_1.RESPONSE_MESSAGES.USER_NOT_FOUND, shared_1.STATUS_CODES.NOT_FOUND);
        }
        return shared_1.ResponseHandler.success(res, user, constant_1.RESPONSE_MESSAGES.OPERATION_SUCCESSFUL, shared_1.STATUS_CODES.OK);
    }
    catch (error) {
        console.error(error);
        return shared_1.ResponseHandler.error(res, constant_1.RESPONSE_MESSAGES.INTERNAL_ERROR, shared_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
exports.getUser = getUser;
