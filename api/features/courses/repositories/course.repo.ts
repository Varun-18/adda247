import { Types } from 'mongoose';
import { CreateBaseRepository } from 'shared';
import { CourseEntity } from '../entity';
import { CourseModel } from '../models';

export const createCourseRepository = () => {
  const baseRepository = CreateBaseRepository<CourseEntity>(CourseModel);

  const getCourseWithRelationAsync = async (id: string) => {
    return await CourseModel.findOne({ _id: new Types.ObjectId(id) })
      .populate('createdBy')
      .exec();
  };

  /* ------------------------ SUBJECT CRUD ------------------------ */
  const addSubject = async ({
    courseId,
    title,
    description,
    order,
  }: {
    courseId: string;
    title: string;
    description: string;
    order: number;
  }) => {
    return await CourseModel.updateOne(
      { _id: courseId },
      {
        $push: {
          subjects: {
            _id: new Types.ObjectId(),
            title,
            description,
            order,
            topics: [],
          },
        },
      }
    );
  };

  const updateSubject = async ({
    courseId,
    subjectId,
    title,
    description,
    order,
  }: {
    courseId: string;
    subjectId: string;
    title: string;
    description: string;
    order: number;
  }) => {
    return await CourseModel.updateOne(
      { _id: courseId, 'subjects._id': subjectId },
      {
        $set: {
          'subjects.$.title': title,
          'subjects.$.description': description,
          'subjects.$.order': order,
        },
      }
    );
  };

  const removeSubject = async (courseId: string, subjectId: string) => {
    return await CourseModel.updateOne(
      { _id: courseId },
      { $pull: { subjects: { _id: subjectId } } }
    );
  };

  /* ------------------------ TOPIC CRUD ------------------------ */
  const addTopic = async ({
    courseId,
    subjectId,
    title,
    description,
    order,
    hours,
    lectures,
  }: {
    courseId: string;
    subjectId: string;
    title: string;
    description: string;
    order: number;
    hours: number;
    lectures: unknown[];
  }) => {
    return await CourseModel.updateOne(
      { _id: courseId, 'subjects._id': subjectId },
      {
        $push: {
          'subjects.$.topics': {
            _id: new Types.ObjectId(),
            title,
            description,
            order,
            hours,
            lectures,
          },
        },
      }
    );
  };

  const updateTopic = async ({
    courseId,
    subjectId,
    topicId,
    title,
    description,
    estimatedHours = 1,
  }: {
    courseId: string;
    subjectId: string;
    topicId: string;
    title: string;
    description: string;
    estimatedHours: number;
  }) => {
    return await CourseModel.updateOne(
      {
        _id: courseId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
      },
      {
        $set: {
          'subjects.$[s].topics.$[t].title': title,
          'subjects.$[s].topics.$[t].description': description,
          'subjects.$[s].topics.$[t].estimatedHours': estimatedHours,
        },
      },
      {
        arrayFilters: [{ 's._id': subjectId }, { 't._id': topicId }],
      }
    );
  };

  const removeTopic = async (
    courseId: string,
    subjectId: string,
    topicId: string
  ) => {
    return await CourseModel.updateOne(
      { _id: courseId, 'subjects._id': subjectId },
      { $pull: { 'subjects.$.topics': { _id: topicId } } }
    );
  };

  /* ------------------------ LECTURE CRUD ------------------------ */
  const addLecture = async ({
    courseId,
    subjectId,
    topicId,
    title,
    description,
    order,
  }: {
    courseId: string;
    subjectId: string;
    topicId: string;
    title: string;
    description: string;
    order: number;
  }) => {
    return await CourseModel.updateOne(
      {
        _id: courseId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
      },
      {
        $push: {
          'subjects.$[s].topics.$[t].lectures': {
            _id: new Types.ObjectId(),
            title,
            description,
            order,
          },
        },
      },
      {
        arrayFilters: [{ 's._id': subjectId }, { 't._id': topicId }],
      }
    );
  };

  const updateLecture = async ({
    courseId,
    subjectId,
    topicId,
    lectureId,
    title,
    description,
    durationMinutes,
  }: {
    courseId: string;
    subjectId: string;
    topicId: string;
    lectureId: string;
    title: string;
    description: string;
    durationMinutes: number;
  }) => {
    return await CourseModel.updateOne(
      {
        _id: courseId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
        'subjects.topics.lectures._id': lectureId,
      },
      {
        $set: {
          'subjects.$[s].topics.$[t].lectures.$[l].title': title,
          'subjects.$[s].topics.$[t].lectures.$[l].description': description,
          'subjects.$[s].topics.$[t].lectures.$[l].durationMinutes':
            durationMinutes,
        },
      },
      {
        arrayFilters: [
          { 's._id': subjectId },
          { 't._id': topicId },
          { 'l._id': lectureId },
        ],
      }
    );
  };

  const removeLecture = async (
    courseId: string,
    subjectId: string,
    topicId: string,
    lectureId: string
  ) => {
    return await CourseModel.updateOne(
      {
        _id: courseId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
      },
      {
        $pull: { 'subjects.$[s].topics.$[t].lectures': { _id: lectureId } },
      },
      {
        arrayFilters: [{ 's._id': subjectId }, { 't._id': topicId }],
      }
    );
  };

  return {
    ...baseRepository,
    getCourseWithRelationAsync,
    addSubject,
    updateSubject,
    removeSubject,
    addTopic,
    updateTopic,
    removeTopic,
    addLecture,
    updateLecture,
    removeLecture,
  };
};
