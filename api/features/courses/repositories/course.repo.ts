import { CreateBaseRepository } from 'shared';
import { CourseEntity } from '../entity';
import { CourseModel } from '../models';
import { Types } from 'mongoose';

export const createCourseRepository = () => {
  const baseRepository = CreateBaseRepository<CourseEntity>(CourseModel);

  const getCourseWithRelationAsync = async (id: string) => {
    return await CourseModel.findOne({ _id: new Types.ObjectId(id) })
      .populate('createdBy')
      .exec();
  };

  const updateTopic = async (
    courseId: string,
    topicId: string,
    title: string,
    description: string,
    estimatedHours: number
  ) => {
    return await CourseModel.updateOne(
      { _id: courseId, 'topics._id': topicId },
      {
        $set: {
          'topics.$.title': title,
          'topics.$.description': description,
          'topics.$.estimatedHours': estimatedHours,
        },
      }
    );
  };

  const removeTopic = async (courseId: string, topicId: string) => {
    return await CourseModel.updateOne(
      { _id: courseId },
      { $pull: { topics: { _id: topicId } } }
    );
  };

  const addTopic = async (
    courseId: string,
    title: string,
    description: string,
    order: number,
    estimatedHours: number
  ) => {
    return await CourseModel.updateOne(
      { _id: courseId },
      {
        $push: {
          topics: {
            title,
            description,
            order,
            estimatedHours,
            batchCompletions: [],
          },
        },
      }
    );
  };

  return {
    ...baseRepository,
    getCourseWithRelationAsync,
    addTopic,
    updateTopic,
    removeTopic,
  };
};
