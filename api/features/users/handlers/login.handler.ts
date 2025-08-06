import { Request, Response } from 'express';
import { Secret, sign, SignOptions } from 'jsonwebtoken';
import { compareHash, ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { UserService } from '../services';

export const login = async (req: Request, res: Response) => {
  const userService = UserService();
  try {
    const { email, password } = req.body;

    const user = await userService.findOne({ email }, true);

    if (user === null) {
      return ResponseHandler.error(
        res,
        RESPONSE_MESSAGES.USER_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
      );
    }

    const isMatch = await compareHash(password, user.password);

    if (!isMatch) {
      return ResponseHandler.error(
        res,
        RESPONSE_MESSAGES.UNAUTHORIZED_ACCESS,
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const token = sign(
      { email: user.email },
      (process.env.JWT_SECRET || 'jwtsecret') as Secret,
      { expiresIn: process.env.JWT_EXPIRY || '1h' } as SignOptions
    );

    return ResponseHandler.sendResWithCookie(
      res,
      RESPONSE_MESSAGES.OPERATION_SUCCESSFUL,
      STATUS_CODES.OK,
      'token',
      token,
      {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: 'none',
      }
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
