import { Request, Response } from 'express';
import { generateHash, ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { UserEntity } from '../entity';
import { UserService } from '../services';

export const register = async (req: Request, res: Response) => {
  const userService = UserService();

  try {
    const { email }: UserEntity = req.body;

    const existingUser = await userService.findOne({ email });

    if (existingUser) {
      return ResponseHandler.alreadyExists(
        res,
        RESPONSE_MESSAGES.USER_ALREADY_EXISTS,
        STATUS_CODES.CONFLICT
      );
    }

    const hash = await generateHash(req.body.password);
    const user = await userService.create({ ...req.body, password: hash });

    return ResponseHandler.success(
      res,
      user,
      RESPONSE_MESSAGES.USER_CREATED,
      STATUS_CODES.CREATED
    );
  } catch (error) {
    console.error(error);
    return ResponseHandler.error(
      res,
      RESPONSE_MESSAGES.INTERNAL_ERROR,
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
