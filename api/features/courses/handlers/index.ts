import { addCourseTopic } from './add-course-topic.handler';
import { getCourse } from './course-details.handler';
import { createCourse } from './create-course.handler';
import { listAllCourses } from './list-courses.handler';
import { removeCourseTopic } from './remove-course-topic.handler';
import { updateCourseTopic } from './update-course-topic.handler';
import { updateCourseMetadata } from './update-course.handler';

export const CourseHandler = {
  createCourse,
  getCourse,
  listAllCourses,
  updateCourseMetadata,
  addCourseTopic,
  updateCourseTopic,
  removeCourseTopic,
};
