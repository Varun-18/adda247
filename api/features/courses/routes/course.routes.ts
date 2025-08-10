import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import {
  addTopicDto,
  createCourseDto,
  getCourseDto,
  removeTopicDto,
  updateCourseDto,
  updateTopicDto,
} from '../dto';
import { CourseHandler } from '../handlers';

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

courseRouter.post(
  '/add-topic',
  schemaValidator(addTopicDto),
  CourseHandler.addCourseTopic
);
courseRouter.put(
  '/update-topic',
  schemaValidator(updateTopicDto),
  CourseHandler.updateCourseTopic
);
courseRouter.delete(
  '/:id/remove-topic/:topicId',
  schemaValidator(removeTopicDto),
  CourseHandler.removeCourseTopic
);

export { courseRouter };
