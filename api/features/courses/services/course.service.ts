import { Types } from 'mongoose';
import { createCourseRepository } from '../repositories';

export const CourseService = () => {
  const courseRepository = createCourseRepository();

  const addTopicWithLectures = async ({
    courseId,
    subjectId,
    title,
    description,
    order,
    hours,
  }: {
    courseId: string;
    subjectId: string;
    title: string;
    description: string;
    order: number;
    hours: number; // total hours = number of lectures
  }) => {
    if (hours <= 0) {
      throw new Error('Number of hours must be greater than 0');
    }

    const lectures = Array.from({ length: hours }, (_, idx) => ({
      _id: new Types.ObjectId(),
      title: `Lecture ${idx + 1}`,
      description: `Lecture ${idx + 1}`,
      order: idx + 1,
    }));

    return await courseRepository.addTopic({
      courseId,
      subjectId,
      title,
      description,
      order,
      hours,
      lectures,
    });
  };

  return {
    ...courseRepository,
    addTopicWithLectures,
  };
};
