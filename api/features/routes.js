"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const rootRouter = (0, express_1.Router)();
rootRouter.get('/', (req, res) => {
    res.status(200).render('home');
});
rootRouter.use('/user', users_1.userRouter);
exports.default = rootRouter;
