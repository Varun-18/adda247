"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../../shared/constants");
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res
                .status(403)
                .json({ message: 'A token is required for authentication' });
            return;
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log('🚀 ~ authenticateUser ~ error:', error);
        res.status(constants_1.STATUS_CODES.BAD_REQUEST).json(error);
    }
};
exports.authenticateUser = authenticateUser;
