import { Request, Response } from 'express';
import {
  PaginatedResponse,
  ResponseHandler,
  STATUS_CODES,
  UserRole,
} from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { UserEntity } from '../entity';
import { UserService } from '../services';

export const listAllFaculty = async (req: Request, res: Response) => {
  const userService = UserService();
  try {
    const users = await userService.findAll(
      { role: UserRole.FACULTY },
      { limit: 100 }
    );

    return ResponseHandler.success<PaginatedResponse<UserEntity>>(
      res,
      users,
      RESPONSE_MESSAGES.USERS_RETRIEVED,
      STATUS_CODES.OK,
      true
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
