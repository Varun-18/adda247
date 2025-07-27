"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = void 0;
const bcrypt_1 = require("bcrypt");
const compareHash = async (plainTextPass, hashedPass) => {
    const isMatch = await (0, bcrypt_1.compare)(plainTextPass, hashedPass);
    return isMatch;
};
exports.compareHash = compareHash;
