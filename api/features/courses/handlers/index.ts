import { addLecture } from './add-lecture.handler';
import { addSubject } from './add-subject.handler';
import { addTopic } from './add-topic.handler';
import { getCourse } from './course-details.handler';
import { createCourse } from './create-course.handler';
import { getAllCourses } from './get-all-courses.handler';
import { listAllCourses } from './list-courses.handler';
import { removeCourseTopic } from './remove-course-topic.handler';
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
  removeCourseTopic,
  addSubject,
  addLecture,
  updateSubject,
  updateLecture,
  getAllCourses,
};
