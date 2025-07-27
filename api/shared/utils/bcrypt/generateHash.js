"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = void 0;
const bcrypt_1 = require("bcrypt");
const generateHash = async (password) => {
    const hashedPass = await (0, bcrypt_1.hash)(password, parseInt(process.env.SALT_ROUNDS || '10'));
    return hashedPass;
};
exports.generateHash = generateHash;
