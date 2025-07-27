"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    /**
     * Send success response
     */
    static success(res, data, message = 'Operation successful', statusCode = 200, pagination = false) {
        const response = {
            success: true,
            message,
            ...(pagination ? { ...data } : { data }),
            statusCode,
        };
        res.status(statusCode).json(response);
    }
    static sendResWithCookie(res, message = 'Operation successful', statusCode = 200, cookieName, cookieValue, cookieOptions) {
        const response = {
            success: true,
            message,
            statusCode,
        };
        res
            .status(statusCode)
            .cookie(cookieName, cookieValue, cookieOptions)
            .json(response);
    }
    /**
     * Send error response
     */
    static error(res, message, statusCode = 500, errors = [], errorCode) {
        const response = {
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
    static alreadyExists(res, message, statusCode = 409) {
        const response = {
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
exports.ResponseHandler = ResponseHandler;
