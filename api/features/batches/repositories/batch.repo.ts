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

  const getFacultyAnalytics = async (facultyId: string) => {
    const result = await BatchModel.aggregate([
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects' },
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },

      {
        $group: {
          _id: null,
          assignedBatches: { $addToSet: '$_id' },
          totalLectures: { $sum: 1 },
          completedLectures: {
            $sum: {
              $cond: [
                { $ifNull: ['$subjects.topics.lectures.completedAt', false] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          assignedBatches: { $size: '$assignedBatches' },
          totalLectures: 1,
          completedLectures: 1,
          completionRate: {
            $cond: [
              { $eq: ['$totalLectures', 0] },
              0,
              {
                $multiply: [
                  { $divide: ['$completedLectures', '$totalLectures'] },
                  100,
                ],
              },
            ],
          },
        },
      },
    ]);

    return (
      result[0] || {
        assignedBatches: 0,
        totalLectures: 0,
        completedLectures: 0,
        completionRate: 0,
      }
    );
  };

  const getFacultyBatchProgress = async (facultyId: string) => {
    const result = await BatchModel.aggregate([
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects' },
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },

      {
        $group: {
          _id: {
            batchId: '$_id',
            subjectId: '$subjects._id',
          },
          batchName: { $first: '$name' },
          subjectTitle: { $first: '$subjects.title' },
          totalLectures: { $sum: 1 },
          completedLectures: {
            $sum: {
              $cond: [
                { $ifNull: ['$subjects.topics.lectures.completedAt', false] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: '$_id.batchId',
          batchName: { $first: '$batchName' },
          subjects: {
            $push: {
              subjectId: '$_id.subjectId',
              subjectTitle: '$subjectTitle',
              totalLectures: '$totalLectures',
              completedLectures: '$completedLectures',
              completionRate: {
                $cond: [
                  { $eq: ['$totalLectures', 0] },
                  0,
                  {
                    $multiply: [
                      { $divide: ['$completedLectures', '$totalLectures'] },
                      100,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          batchId: '$_id',
          batchName: 1,
          subjects: 1,
        },
      },
    ]);

    return result;
  };

  const getFacultyRecentActivity = async (
    facultyId: string,
    days: number = 3
  ) => {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    const result = await BatchModel.aggregate([
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects' },
      { $match: { 'subjects.facultyId': new Types.ObjectId(facultyId) } },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },

      // only lectures completed recently
      {
        $match: {
          'subjects.topics.lectures.completedAt': { $gte: sinceDate },
          'subjects.topics.lectures.facultyId': new Types.ObjectId(facultyId),
        },
      },

      {
        $project: {
          _id: 0,
          batchId: '$_id',
          batchName: '$name',
          subjectId: '$subjects._id',
          subjectTitle: '$subjects.title',
          topicId: '$subjects.topics._id',
          topicTitle: '$subjects.topics.title',
          lectureId: '$subjects.topics.lectures._id',
          lectureTitle: '$subjects.topics.lectures.title',
          completedAt: '$subjects.topics.lectures.completedAt',
        },
      },

      { $sort: { completedAt: -1 } }, // latest first
    ]);

    return result;
  };

  const getLectureAssignmentsOverview = async () => {
    return await BatchModel.aggregate([
      { $unwind: '$subjects' },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },

      {
        $group: {
          _id: {
            batchId: '$_id',
            subjectId: '$subjects._id',
            facultyId: '$subjects.facultyId',
          },
          batchName: { $first: '$name' },
          subjectTitle: { $first: '$subjects.title' },
          totalLectures: { $sum: 1 },
          completedLectures: {
            $sum: {
              $cond: [
                { $ifNull: ['$subjects.topics.lectures.completedAt', false] },
                1,
                0,
              ],
            },
          },
          lastLecture: { $max: '$subjects.topics.lectures.completedAt' },
        },
      },

      // 🔗 Join with User collection to fetch faculty details
      {
        $lookup: {
          from: 'users', // collection name in Mongo
          localField: '_id.facultyId',
          foreignField: '_id',
          as: 'faculty',
        },
      },
      { $unwind: '$faculty' }, // flatten faculty object

      {
        $project: {
          _id: 0,
          batchId: '$_id.batchId',
          batchName: 1,
          subjectId: '$_id.subjectId',
          subjectTitle: 1,
          facultyId: '$_id.facultyId',
          faculty: {
            _id: '$faculty._id',
            firstName: '$faculty.firstName',
            lastName: '$faculty.lastName',
            email: '$faculty.email',
          },
          totalLectures: 1,
          completedLectures: 1,
          remainingLectures: {
            $subtract: ['$totalLectures', '$completedLectures'],
          },
          completionRate: {
            $cond: [
              { $eq: ['$totalLectures', 0] },
              0,
              {
                $multiply: [
                  { $divide: ['$completedLectures', '$totalLectures'] },
                  100,
                ],
              },
            ],
          },
          lastLecture: 1,
        },
      },
    ]);
  };

  const getAllFacultyRecentActivity = async (days: number = 7) => {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    return await BatchModel.aggregate([
      { $unwind: '$subjects' },
      { $unwind: '$subjects.topics' },
      { $unwind: '$subjects.topics.lectures' },
      {
        $match: {
          'subjects.topics.lectures.completedAt': { $gte: sinceDate },
        },
      },
      {
        $project: {
          _id: 0,
          batchId: '$_id',
          batchName: '$name',
          subjectId: '$subjects._id',
          subjectTitle: '$subjects.title',
          facultyId: '$subjects.facultyId',
          topicId: '$subjects.topics._id',
          topicTitle: '$subjects.topics.title',
          lectureId: '$subjects.topics.lectures._id',
          lectureTitle: '$subjects.topics.lectures.title',
          completedAt: '$subjects.topics.lectures.completedAt',
        },
      },
      { $sort: { completedAt: -1 } },
    ]);
  };

  const getBusinessAnalytics = async () => {
    const today = new Date();

    const result = await BatchModel.aggregate([
      {
        $facet: {
          totalTeachers: [
            { $unwind: '$subjects' },
            { $group: { _id: '$subjects.facultyId' } },
            { $count: 'count' },
          ],
          activeBatches: [
            {
              $match: {
                startDate: { $lte: today },
                endDate: { $gte: today },
              },
            },
            { $count: 'count' },
          ],
          activeCourses: [
            {
              $match: {
                startDate: { $lte: today },
                endDate: { $gte: today },
              },
            },
            { $group: { _id: '$courseTemplateId' } },
            { $count: 'count' },
          ],
          batchCompletion: [
            { $unwind: '$subjects' },
            { $unwind: '$subjects.topics' },
            { $unwind: '$subjects.topics.lectures' },
            {
              $group: {
                _id: '$_id',
                batchName: { $first: '$name' },
                totalLectures: { $sum: 1 },
                completedLectures: {
                  $sum: {
                    $cond: [
                      {
                        $ifNull: [
                          '$subjects.topics.lectures.completedAt',
                          false,
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
            {
              $project: {
                batchId: '$_id',
                batchName: 1,
                totalLectures: 1,
                completedLectures: 1,
                completionRate: {
                  $cond: [
                    { $eq: ['$totalLectures', 0] },
                    0,
                    {
                      $multiply: [
                        { $divide: ['$completedLectures', '$totalLectures'] },
                        100,
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalTeachers: { $arrayElemAt: ['$totalTeachers.count', 0] },
          activeBatches: { $arrayElemAt: ['$activeBatches.count', 0] },
          activeCourses: { $arrayElemAt: ['$activeCourses.count', 0] },
          batchCompletion: '$batchCompletion',
        },
      },
    ]);

    return result[0];
  };

  /* ------------------------ BATCH CRUD ------------------------ */
  const updateBatch = async (batchId: string, data: Partial<BatchEntity>) => {
    return await BatchModel.updateOne(
      { _id: new Types.ObjectId(batchId) },
      { $set: data }
    );
  };

  const deleteBatch = async (batchId: string) => {
    return await BatchModel.deleteOne({ _id: new Types.ObjectId(batchId) });
  };

  /* ------------------------ SUBJECT CRUD ------------------------ */
  const updateSubjectInBatch = async (
    batchId: string,
    subjectId: string,
    data: Partial<any>
  ) => {
    return await BatchModel.updateOne(
      { _id: batchId, 'subjects._id': subjectId },
      {
        $set: {
          'subjects.$.title': data.title,
          'subjects.$.facultyId': data.facultyId,
          'subjects.$.totalLectures': data.totalLectures,
        },
      }
    );
  };

  const removeSubjectFromBatch = async (batchId: string, subjectId: string) => {
    return await BatchModel.updateOne(
      { _id: batchId },
      { $pull: { subjects: { _id: subjectId } } }
    );
  };

  /* ------------------------ TOPIC CRUD ------------------------ */
  const updateTopicInBatch = async (
    batchId: string,
    subjectId: string,
    topicId: string,
    data: Partial<any>
  ) => {
    return await BatchModel.updateOne(
      {
        _id: batchId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
      },
      {
        $set: {
          'subjects.$[s].topics.$[t].title': data.title,
          'subjects.$[s].topics.$[t].facultyId': data.facultyId,
        },
      },
      {
        arrayFilters: [{ 's._id': subjectId }, { 't._id': topicId }],
      }
    );
  };

  const removeTopicFromBatch = async (
    batchId: string,
    subjectId: string,
    topicId: string
  ) => {
    return await BatchModel.updateOne(
      { _id: batchId, 'subjects._id': subjectId },
      { $pull: { 'subjects.$.topics': { _id: topicId } } }
    );
  };

  /* ------------------------ LECTURE CRUD ------------------------ */
  const updateLectureInBatch = async (
    batchId: string,
    subjectId: string,
    topicId: string,
    lectureId: string,
    data: Partial<any>
  ) => {
    return await BatchModel.updateOne(
      {
        _id: batchId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
        'subjects.topics.lectures._id': lectureId,
      },
      {
        $set: {
          'subjects.$[s].topics.$[t].lectures.$[l].title': data.title,
          'subjects.$[s].topics.$[t].lectures.$[l].description':
            data.description,
          'subjects.$[s].topics.$[t].lectures.$[l].facultyId': data.facultyId,
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

  const removeLectureFromBatch = async (
    batchId: string,
    subjectId: string,
    topicId: string,
    lectureId: string
  ) => {
    return await BatchModel.updateOne(
      {
        _id: batchId,
        'subjects._id': subjectId,
        'subjects.topics._id': topicId,
      },
      { $pull: { 'subjects.$[s].topics.$[t].lectures': { _id: lectureId } } },
      { arrayFilters: [{ 's._id': subjectId }, { 't._id': topicId }] }
    );
  };

  return {
    ...baseRepository,
    updateBatch,
    deleteBatch,
    updateSubjectInBatch,
    removeSubjectFromBatch,
    updateTopicInBatch,
    removeTopicFromBatch,
    updateLectureInBatch,
    removeLectureFromBatch,
    getBatchWithRelationsAsync,
    getFacultySubjects,
    getNextLectureForFaculty,
    markLectureCompleted,
    getFacultyAnalytics,
    getFacultyBatchProgress,
    getFacultyRecentActivity,
    getBusinessAnalytics,
    getAllFacultyRecentActivity,
    getLectureAssignmentsOverview,
  };
};
