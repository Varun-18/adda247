import { addLecture } from './add-lecture.handler';
import { addSubject } from './add-subject.handler';
import { addTopic } from './add-topic.handler';
import { getCourse } from './course-details.handler';
import { createCourse } from './create-course.handler';
import { getAllCourses } from './get-all-courses.handler';
import { listAllCourses } from './list-courses.handler';
import { removeCourseLecture } from './remove-course-lecture.handler';
import { removeCourseSubject } from './remove-course-subject.handler';
import { removeCourseTopic } from './remove-course-topic.handler';
import { removeCourse } from './remove-course.handler';
import { updateCourseMetadata } from './update-course.handler';
import { updateLecture } from './update-lecture.handler';
import { updateSubject } from './update-subject.handler';
import { updateTopic } from './update-topic.handler';

export const CourseHandler = {
  createCourse,
  getCourse,
  listAllCourses,
  updateCourseMetadata,
  addTopic,
  updateTopic,
  removeCourse,
  addSubject,
  addLecture,
  updateSubject,
  updateLecture,
  getAllCourses,
  removeCourseSubject,
  removeCourseTopic,
  removeCourseLecture,
};
