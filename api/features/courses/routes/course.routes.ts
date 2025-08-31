import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import {
  addLectureDto,
  addSubjectDto,
  addTopicDto,
  createCourseDto,
  getCourseDto,
  updateCourseDto,
  updateLectureDto,
  updateSubjectDto,
  updateTopicDto,
} from '../dto';
import { CourseHandler } from '../handlers';

const courseRouter = Router();

courseRouter.get('/list', CourseHandler.listAllCourses);
courseRouter.get('/all', CourseHandler.getAllCourses);

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

courseRouter.post(
  '/add-subject',
  schemaValidator(addSubjectDto),
  CourseHandler.addSubject
);

courseRouter.post(
  '/add-topic',
  schemaValidator(addTopicDto),
  CourseHandler.addTopic
);

courseRouter.post(
  '/add-lecture',
  schemaValidator(addLectureDto),
  CourseHandler.addLecture
);

courseRouter.put(
  '/update',
  schemaValidator(updateCourseDto),
  CourseHandler.updateCourseMetadata
);

courseRouter.put(
  '/update/subject',
  schemaValidator(updateSubjectDto),
  CourseHandler.updateSubject
);

courseRouter.put(
  '/update/topic',
  schemaValidator(updateTopicDto),
  CourseHandler.updateTopic
);

courseRouter.put(
  '/update/lecture',
  schemaValidator(updateLectureDto),
  CourseHandler.updateLecture
);

// courseRouter.delete(
//   '/:id/remove-topic/:topicId',
//   schemaValidator(removeTopicDto),
//   CourseHandler.removeCourseTopic
// );

export { courseRouter };
