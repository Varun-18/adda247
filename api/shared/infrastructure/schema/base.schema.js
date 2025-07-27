"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBaseSchema = void 0;
const mongoose_1 = require("mongoose");
const CreateBaseSchema = () => {
    const schema = new mongoose_1.Schema({
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    });
    // Pre-save middleware
    schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
    });
    // Pre-update middleware
    schema.pre(['findOneAndUpdate', 'updateMany', 'updateOne'], function (next) {
        this.set({ updatedAt: new Date() });
        next();
    });
    return schema;
};
exports.CreateBaseSchema = CreateBaseSchema;
