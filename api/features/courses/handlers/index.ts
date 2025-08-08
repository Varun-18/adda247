import { getCourse } from './course-details.handler';
import { createCourse } from './create-course.handler';
import { listAllCourses } from './list-courses.handler';

export const CourseHandler = {
  createCourse,
  getCourse,
  listAllCourses,
};
