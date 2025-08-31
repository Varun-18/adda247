import { AuthRequest } from 'declaration';
import { BatchService } from '../services';
import { RESPONSE_MESSAGES } from '../constant';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { Response } from 'express';

export const getAllRecentActivity = async (req: AuthRequest, res: Response) => {
  const batchService = BatchService();
  try {
    const activity = await batchService.getAllFacultyRecentActivity();

    return ResponseHandler.success(
      res,
      activity,
      RESPONSE_MESSAGES.BUSINESS_ACTIVITY,
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
