import { RES_MESSAGES, STATUS_CODES } from 'shared/constants';
import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationError } from 'yup';

export const schemaValidator =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.message });
        return;
      }

      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: RES_MESSAGES.BAD_REQUEST });
    }
  };
