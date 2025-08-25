import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { BatchService } from '../services';

export const createBatch = async (req: AuthRequest, res: Response) => {
  const batchService = BatchService();
  try {
    const { courseTemplateId, facultyAssignments, name, startDate } = req.body;

    const course = await batchService.createBatchFromCourse({
      courseTemplateId,
      facultyAssignments,
      name,
      startDate,
    });

    return ResponseHandler.success(
      res,
      course,
      RESPONSE_MESSAGES.BATCH_CREATED,
      STATUS_CODES.CREATED
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
