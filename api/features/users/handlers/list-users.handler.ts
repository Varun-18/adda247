import { Request, Response } from 'express';
import { PaginatedResponse, ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { UserEntity } from '../entity';
import { UserService } from '../services';

export const listAllUsers = async (req: Request, res: Response) => {
  const userService = UserService();
  try {
    const users = await userService.findAll();

    return ResponseHandler.success<PaginatedResponse<UserEntity>>(
      res,
      users,
      RESPONSE_MESSAGES.USERS_RETRIEVED,
      STATUS_CODES.OK,
      true
    );
  } catch (error) {
    console.error(error);

    res.status(STATUS_CODES.CREATED).json({
      success: false,
      message: error,
      error: [error],
    });
  }
};
