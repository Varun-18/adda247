import { AuthRequest } from 'declaration';
import { BatchService } from '../services';
import { RESPONSE_MESSAGES } from '../constant';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { Response } from 'express';

export const getFacultySubjects = async (req: AuthRequest, res: Response) => {
  const batchService = BatchService();
  try {
    const { id } = req.user;
    const subjects = await batchService.getFacultySubjects(id);

    return ResponseHandler.success(
      res,
      subjects,
      RESPONSE_MESSAGES.SUBJECTS_RETRIVED,
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
