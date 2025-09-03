import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { CourseService } from '../services';

export const removeCourseLecture = async (req: AuthRequest, res: Response) => {
  const courseService = CourseService();
  try {
    const { courseId, subjectId, topicId, lectureId } = req.body;
    const course = await courseService.findOne({
      _id: new Types.ObjectId(courseId),
    });

    if (course === null) {
      return ResponseHandler.error(
        res,
        RESPONSE_MESSAGES.COURSE_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
      );
    }

    const deleted = await courseService.removeLecture(
      courseId,
      subjectId,
      topicId,
      lectureId
    );

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
