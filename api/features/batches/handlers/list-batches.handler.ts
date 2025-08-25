import { Request, Response } from 'express';
import { PaginatedResponse, ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { BatchService } from '../services';
import { BatchEntity } from '../entity';

export const listAllBatches = async (req: Request, res: Response) => {
  const batchService = BatchService();
  try {
    const courses = await batchService.findWithRelations({}, {}, []);

    return ResponseHandler.success<PaginatedResponse<BatchEntity>>(
      res,
      courses,
      RESPONSE_MESSAGES.BATCHS_RETRIEVED,
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
