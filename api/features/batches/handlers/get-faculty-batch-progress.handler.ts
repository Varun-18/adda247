import { AuthRequest } from 'declaration';
import { BatchService } from '../services';
import { RESPONSE_MESSAGES } from '../constant';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { Response } from 'express';

export const getFacultyBatchProgress = async (
  req: AuthRequest,
  res: Response
) => {
  const batchService = BatchService();
  try {
    const { id } = req.user;
    const progress = await batchService.getFacultyBatchProgress(id);

    return ResponseHandler.success(
      res,
      progress,
      RESPONSE_MESSAGES.BATCH_PROGRESS,
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
