import { addTopic } from './add-topic.handler';
import { addSubject } from './add-subject.handler';
import { getCourse } from './course-details.handler';
import { createCourse } from './create-course.handler';
import { listAllCourses } from './list-courses.handler';
import { removeCourseTopic } from './remove-course-topic.handler';
import { updateCourseTopic } from './update-course-topic.handler';
import { updateCourseMetadata } from './update-course.handler';
import { addLecture } from './add-lecture.handler';

export const CourseHandler = {
  createCourse,
  getCourse,
  listAllCourses,
  updateCourseMetadata,
  addTopic,
  updateCourseTopic,
  removeCourseTopic,
  addSubject,
  addLecture,
};
