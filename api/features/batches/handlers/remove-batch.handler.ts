import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { BatchService } from '../services';

export const removeBatch = async (req: AuthRequest, res: Response) => {
  const batchService = BatchService();
  try {
    const { batchId } = req.body;
    const batch = await batchService.findOne({
      _id: new Types.ObjectId(batchId),
    });

    if (batch === null) {
      return ResponseHandler.error(
        res,
        RESPONSE_MESSAGES.BATCH_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
      );
    }

    const deleted = await batchService.delete(batchId);

    return ResponseHandler.success(
      res,
      deleted,
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
