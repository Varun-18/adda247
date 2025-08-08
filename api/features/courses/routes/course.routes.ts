import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import { CourseHandler } from '../handlers';
import { createCourseDto, getCourseDto } from '../dto';

const courseRouter = Router();

courseRouter.get('/list', CourseHandler.listAllCourses);

courseRouter.get(
  '/:id',
  schemaValidator(getCourseDto),
  CourseHandler.getCourse
);

courseRouter.use(authenticateUser);

courseRouter.post(
  '/create',
  schemaValidator(createCourseDto),
  CourseHandler.createCourse
);

export { courseRouter };
