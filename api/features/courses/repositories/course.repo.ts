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

  return {
    ...baseRepository,
    getCourseWithRelationAsync,
  };
};
