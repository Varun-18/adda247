import { AuthRequest } from 'declaration';
import { BatchService } from '../services';
import { RESPONSE_MESSAGES } from '../constant';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { Response } from 'express';

export const markLectureCompleted = async (req: AuthRequest, res: Response) => {
  const batchService = BatchService();
  try {
    const { id: facultyId } = req.user;

    const { batchId, lectureId, subjectId, topicId } = req.body;

    const lectures = await batchService.markLectureCompleted({
      batchId,
      facultyId,
      lectureId,
      subjectId,
      topicId,
    });

    return ResponseHandler.success(
      res,
      lectures,
      RESPONSE_MESSAGES.LECTURE_COMPLETED,
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
