import { markLectureCompleted } from './complete-lecture.handler';
import { createBatch } from './create-batch.handler';
import { getFacultyAnalytics } from './get-faculty-analytics.handler';
import { getFacultyBatchProgress } from './get-faculty-batch-progress.handler';
import { getFacultyLectures } from './get-faculty-lectures.handler';
import { getFacultyRecentActivity } from './get-faculty-recent-activity.handler';
import { getFacultySubjects } from './get-faculty-subjects.handler';
import { listAllBatches } from './list-batches.handler';

export const BatchHandler = {
  createBatch,
  listAllBatches,
  getFacultyLectures,
  getFacultySubjects,
  markLectureCompleted,
  getFacultyAnalytics,
  getFacultyBatchProgress,
  getFacultyRecentActivity,
};
