import { createBatchRepository } from '../repositories';
import {
  CourseModel,
  SubjectEntity,
  TopicEntity,
  LectureEntity,
} from '../../courses';
import { Types } from 'mongoose';
import { BatchEntity } from '../entity';

export const BatchService = () => {
  const batchRepository = createBatchRepository();

  const createBatchFromCourse = async ({
    name,
    courseTemplateId,
    startDate,
    facultyAssignments,
  }: {
    name: string;
    courseTemplateId: string;
    startDate: Date;
    facultyAssignments: Record<string, string>;
  }): Promise<BatchEntity> => {
    const course = await CourseModel.findById(courseTemplateId).lean();
    if (!course) throw new Error('Course template not found');

    const endDate = (() => {
      const s = new Date(startDate);
      switch (course.duration.unit) {
        case 'days':
          s.setDate(s.getDate() + course.duration.value);
          break;
        case 'weeks':
          s.setDate(s.getDate() + course.duration.value * 7);
          break;
        case 'months':
          s.setMonth(s.getMonth() + course.duration.value);
          break;
        case 'years':
          s.setFullYear(s.getFullYear() + course.duration.value);
          break;
      }
      return s;
    })();

    const subjects = course.subjects.map((subject: SubjectEntity) => {
      const facultyId = facultyAssignments[subject._id.toString()];
      if (!facultyId) {
        throw new Error(`No faculty assigned for subject ${subject.title}`);
      }

      let lectureCount = 0;

      const topics = subject.topics.map((topic: TopicEntity) => {
        const lectures = topic.lectures.map((lecture: LectureEntity) => {
          lectureCount++;
          return {
            _id: new Types.ObjectId(),
            lectureId: lecture._id,
            title: lecture.title,
            facultyId: new Types.ObjectId(facultyId),
          };
        });

        return {
          _id: new Types.ObjectId(),
          topicId: topic._id,
          title: topic.title,
          facultyId: new Types.ObjectId(facultyId),
          lectures,
        };
      });

      return {
        _id: new Types.ObjectId(),
        subjectId: subject._id,
        title: subject.title,
        facultyId: new Types.ObjectId(facultyId),
        totalLectures: lectureCount,
        topics,
      };
    });

    return await batchRepository.create({
      name,
      courseTemplateId: new Types.ObjectId(courseTemplateId),
      startDate,
      endDate,
      subjects,
    } as unknown as BatchEntity);
  };

  const getBatchWithRelationsAsync = async (id: string) => {
    return await batchRepository.getBatchWithRelationsAsync(id);
  };

  const getFacultySubjects = async (facultyId: string) => {
    return await batchRepository.getFacultySubjects(facultyId);
  };

  const getNextLectureForFaculty = async (facultyId: string) => {
    return await batchRepository.getNextLectureForFaculty(facultyId);
  };

  const markLectureCompleted = async ({
    batchId,
    subjectId,
    topicId,
    lectureId,
    facultyId,
  }: {
    batchId: string;
    subjectId: string;
    topicId: string;
    lectureId: string;
    facultyId: string;
  }) => {
    return await batchRepository.markLectureCompleted({
      batchId,
      subjectId,
      topicId,
      lectureId,
      facultyId,
    });
  };

  return {
    ...batchRepository,
    createBatchFromCourse,
    getBatchWithRelationsAsync,
    getFacultySubjects,
    getNextLectureForFaculty,
    markLectureCompleted,
  };
};
