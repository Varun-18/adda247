import { AuthRequest } from 'declaration';
import { BatchService } from '../services';
import { RESPONSE_MESSAGES } from '../constant';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { Response } from 'express';

export const getLectureAssignmentsOverview = async (
  req: AuthRequest,
  res: Response
) => {
  const batchService = BatchService();
  try {
    const assignmentOverview =
      await batchService.getLectureAssignmentsOverview();

    return ResponseHandler.success(
      res,
      assignmentOverview,
      RESPONSE_MESSAGES.BUSINESS_ASSIGNMENT_OVERVIEW,
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
