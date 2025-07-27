import { Schema, Document } from 'mongoose';
import { BaseEntity } from 'shared/types';

export interface BaseDocument extends Document, BaseEntity {}

export const CreateBaseSchema = () => {
  const schema = new Schema({
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
