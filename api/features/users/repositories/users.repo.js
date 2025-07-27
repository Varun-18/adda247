"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRepository = void 0;
const shared_1 = require("../../../shared");
const models_1 = require("../models");
const createUserRepository = () => {
    const baseRepository = (0, shared_1.CreateBaseRepository)(models_1.UserModel);
    return {
        ...baseRepository,
    };
};
exports.createUserRepository = createUserRepository;
