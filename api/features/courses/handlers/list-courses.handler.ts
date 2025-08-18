import { Request, Response } from 'express';
import { PaginatedResponse, ResponseHandler, STATUS_CODES } from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { CourseEntity } from '../entity';
import { CourseService } from '../services';

export const listAllCourses = async (req: Request, res: Response) => {
  const courseService = CourseService();
  try {
    const courses = await courseService.findWithRelations({}, {}, [
      'createdBy',
    ]);

    return ResponseHandler.success<PaginatedResponse<CourseEntity>>(
      res,
      courses,
      RESPONSE_MESSAGES.COURSES_RETRIEVED,
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
