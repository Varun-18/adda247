import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { UserService } from '../services';

export const getUser = async (req: AuthRequest, res: Response) => {
  const userService = UserService();
  try {
    const user = await userService.findOne({ email: req.user.email });

    if (user === null) {
      return ResponseHandler.error(
        res,
        RESPONSE_MESSAGES.USER_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
      );
    }

    return ResponseHandler.success(
      res,
      user,
      RESPONSE_MESSAGES.OPERATION_SUCCESSFUL,
      STATUS_CODES.OK
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
