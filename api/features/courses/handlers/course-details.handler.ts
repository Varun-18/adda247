import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { CourseService } from '../services';

export const getCourse = async (req: AuthRequest, res: Response) => {
  const courseService = CourseService();
  try {
    const course = await courseService.getCourseWithRelationAsync(
      req.params.id
    );

    if (course === null) {
      return ResponseHandler.error(
        res,
        RESPONSE_MESSAGES.COURSE_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
      );
    }

    return ResponseHandler.success(
      res,
      course,
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
