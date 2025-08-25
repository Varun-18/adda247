import { Types } from 'mongoose';
import { CreateBaseRepository } from 'shared';
import { BatchEntity } from '../entity';
import { BatchModel } from '../models';

export const createBatchRepository = () => {
  const baseRepository = CreateBaseRepository<BatchEntity>(BatchModel);

  const getBatchWithRelationsAsync = async (id: string) => {
    return await BatchModel.findOne({ _id: new Types.ObjectId(id) })
      .populate('courseTemplateId')
      .populate('subjects.facultyId')
      .exec();
  };

  const getFacultySubjects = async (facultyId: string) => {
    return await BatchModel.find(
      { 'subjects.facultyId': new Types.ObjectId(facultyId) },
      {
        name: 1,
        startDate: 1,
        endDate: 1,
        'subjects.$': 1,
      }
    ).exec();
  };

  const getNextLectureForFaculty = async (facultyId: string) => {
    const result = await BatchModel.aggregate([
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects' },
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },
      {
        $match: {
          'subjects.topics.lectures.completedAt': { $exists: false },
        },
      },
      {
        $sort: {
          'subjects.topics.lectures._id': 1, // order by creation if no date
        },
      },
      {
        $project: {
          batchId: '$_id',
          batchName: '$name',
          subjectTitle: '$subjects.title',
          topicTitle: '$subjects.topics.title',
          lecture: '$subjects.topics.lectures',
        },
      },
      { $limit: 1 },
    ]);
    return result[0] || null;
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
    return await BatchModel.updateOne(
      {
        _id: batchId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
        'subjects.topics.lectures._id': lectureId,
      },
      {
        $set: {
          'subjects.$[s].topics.$[t].lectures.$[l].completedBy': facultyId,
          'subjects.$[s].topics.$[t].lectures.$[l].completedAt': new Date(),
        },
      },
      {
        arrayFilters: [
          { 's._id': new Types.ObjectId(subjectId) },
          { 't._id': new Types.ObjectId(topicId) },
          { 'l._id': new Types.ObjectId(lectureId) },
        ],
      }
    );
  };

  return {
    ...baseRepository,
    getBatchWithRelationsAsync,
    getFacultySubjects,
    getNextLectureForFaculty,
    markLectureCompleted,
  };
};
