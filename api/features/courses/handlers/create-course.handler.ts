import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { CourseService } from '../services';

export const createCourse = async (req: AuthRequest, res: Response) => {
  const courseService = CourseService();
  try {
    const course = await courseService.create({
      ...req.body,
      createdBy: req.user.id,
    });

    return ResponseHandler.success(
      res,
      course,
      RESPONSE_MESSAGES.COURSE_CREATED,
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
