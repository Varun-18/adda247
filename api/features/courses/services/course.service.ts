import { createCourseRepository } from '../repositories';

export const CourseService = () => {
  const courseRepository = createCourseRepository();

  return {
    ...courseRepository,
  };
};
