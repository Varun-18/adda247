import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import { CourseHandler } from '../handlers';
import { createCourseDto, getCourseDto, updateCourseDto } from '../dto';

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

courseRouter.put(
  '/edit/:id',
  schemaValidator(updateCourseDto),
  CourseHandler.updateCourseMetadata
);

// TODO : Add Schema Validators
courseRouter.post('/course/:id', CourseHandler.addCourseTopic);
courseRouter.put('/course/:id/topic/:topicId', CourseHandler.updateCourseTopic);
courseRouter.delete(
  '/course/:id/topic/:topicId',
  CourseHandler.removeCourseTopic
);

export { courseRouter };
