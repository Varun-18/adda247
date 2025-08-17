import { CookieOptions, Response } from 'express';
import { ApiResponse } from './base.response';

export class ResponseHandler {
  /**
   * Send success response
   */
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Operation successful',
    statusCode: number = 200,
    pagination: boolean = false
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      ...(pagination ? { ...data } : { data }),
      statusCode,
    };

    res.status(statusCode).json(response);
  }

  static sendResWithCookie(
    res: Response,
    message: string = 'Operation successful',
    statusCode: number = 200,
    cookieName: string,
    cookieValue: string,
    cookieOptions: CookieOptions
  ) {
    const response: ApiResponse = {
      success: true,
      message,
      statusCode,
    };

    res
      .status(statusCode)
      .cookie(cookieName, cookieValue, cookieOptions)
      .json({ ...response, token: cookieValue });
  }

  /**
   * Send error response
   */
  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    errors: string[] = [],
    errorCode?: string
  ): void {
    const response: ApiResponse = {
      success: false,
      message,
      errors: errors.length > 0 ? errors : [message],
      statusCode,
      ...(errorCode && { errorCode }),
      ...(process.env.NODE_ENV === 'development' && {
        stack: new Error().stack,
      }),
    };

    res.status(statusCode).json(response);
  }

  static alreadyExists(
    res: Response,
    message: string,
    statusCode: number = 409
  ): void {
    const response: ApiResponse = {
      success: false,
      message,
      statusCode,
      ...(process.env.NODE_ENV === 'development' && {
        stack: new Error().stack,
      }),
    };

    res.status(statusCode).json(response);
  }
}
