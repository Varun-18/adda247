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

  // const getFacultySubjects = async (facultyId: string) => {
  //   return await BatchModel.find(
  //     { 'subjects.facultyId': new Types.ObjectId(facultyId) },
  //     {
  //       name: 1,
  //       startDate: 1,
  //       endDate: 1,
  //       'subjects.$': 1,
  //     }
  //   ).exec();
  // };
  const getFacultySubjects = async (facultyId: string) => {
    const result = await BatchModel.aggregate([
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },

      // Unwind to filter subjects belonging to faculty
      { $unwind: '$subjects' },
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },

      // Rebuild documents with only the faculty's subjects
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          startDate: { $first: '$startDate' },
          endDate: { $first: '$endDate' },
          subjects: { $push: '$subjects' },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          startDate: 1,
          endDate: 1,
          subjects: 1,
        },
      },
    ]).exec();

    return result;
  };

  // const getNextLectureForFaculty = async (facultyId: string) => {
  //   const result = await BatchModel.aggregate([
  //     { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
  //     { $unwind: '$subjects' },
  //     { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
  //     { $unwind: '$subjects.topics' },
  //     { $unwind: '$subjects.topics.lectures' },
  //     {
  //       $match: {
  //         'subjects.topics.lectures.completedAt': { $exists: false },
  //       },
  //     },
  //     {
  //       $sort: {
  //         'subjects.topics.lectures._id': 1, // order by creation if no date
  //       },
  //     },
  //     {
  //       $project: {
  //         batchId: '$_id',
  //         batchName: '$name',
  //         subjectTitle: '$subjects.title',
  //         topicTitle: '$subjects.topics.title',
  //         lecture: '$subjects.topics.lectures',
  //       },
  //     },
  //     { $limit: 1 },
  //   ]);
  //   return result[0] || null;
  // };

  const getNextLectureForFaculty = async (facultyId: string) => {
    const result = await BatchModel.aggregate([
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },

      // Break down nested arrays
      { $unwind: '$subjects' },
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },

      // Only incomplete lectures
      {
        $match: {
          'subjects.topics.lectures.completedAt': { $exists: false },
        },
      },

      // Sort lectures in each subject by order
      {
        $sort: {
          'subjects.topics.lectures.order': 1,
        },
      },

      // Group by batch + subject, pick first uncompleted lecture
      {
        $group: {
          _id: {
            batchId: '$_id',
            subjectId: '$subjects._id',
          },
          batchName: { $first: '$name' },
          subjectName: { $first: '$subjects.title' },
          topicId: { $first: '$subjects.topics._id' },
          topicName: { $first: '$subjects.topics.title' },
          lectureId: { $first: '$subjects.topics.lectures._id' },
          lectureTitle: { $first: '$subjects.topics.lectures.title' },
        },
      },

      // Format final payload
      {
        $project: {
          _id: 0,
          batchId: '$_id.batchId',
          subjectId: '$_id.subjectId',
          topicId: '$topicId',
          lectureId: '$lectureId',
          batchName: 1,
          subjectName: 1,
          topicName: '$topicName',
          lectureTitle: 1,
        },
      },
    ]);

    return result;
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
