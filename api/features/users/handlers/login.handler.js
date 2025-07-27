"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const shared_1 = require("../../../shared");
const constant_1 = require("../constant");
const services_1 = require("../services");
const login = async (req, res) => {
    const userService = (0, services_1.UserService)();
    try {
        const { email, password } = req.body;
        const user = await userService.findOne({ email }, true);
        if (user === null) {
            return shared_1.ResponseHandler.error(res, constant_1.RESPONSE_MESSAGES.USER_NOT_FOUND, shared_1.STATUS_CODES.NOT_FOUND);
        }
        const isMatch = await (0, shared_1.compareHash)(password, user.password);
        if (!isMatch) {
            return shared_1.ResponseHandler.error(res, constant_1.RESPONSE_MESSAGES.UNAUTHORIZED_ACCESS, shared_1.STATUS_CODES.UNAUTHORIZED);
        }
        const token = (0, jsonwebtoken_1.sign)({ email: user.email }, (process.env.JWT_SECRET || 'jwtsecret'), { expiresIn: process.env.JWT_EXPIRY || '1h' });
        return shared_1.ResponseHandler.sendResWithCookie(res, constant_1.RESPONSE_MESSAGES.OPERATION_SUCCESSFUL, shared_1.STATUS_CODES.OK, 'token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
            sameSite: 'none',
        });
    }
    catch (error) {
        console.error(error);
        return shared_1.ResponseHandler.error(res, constant_1.RESPONSE_MESSAGES.INTERNAL_ERROR, shared_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
exports.login = login;
