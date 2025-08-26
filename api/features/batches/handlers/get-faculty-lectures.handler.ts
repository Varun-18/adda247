import { AuthRequest } from 'declaration';
import { BatchService } from '../services';
import { RESPONSE_MESSAGES } from '../constant';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { Response } from 'express';

export const getFacultyLectures = async (req: AuthRequest, res: Response) => {
  const batchService = BatchService();
  try {
    const { id } = req.user;
    const lectures = await batchService.getNextLectureForFaculty(id);

    return ResponseHandler.success(
      res,
      lectures,
      RESPONSE_MESSAGES.LECTURES_RETRIVED,
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
