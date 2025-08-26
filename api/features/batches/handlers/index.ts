import { markLectureCompleted } from './complete-lecture.handler';
import { createBatch } from './create-batch.handler';
import { getFacultyLectures } from './get-faculty-lectures.handler';
import { getFacultySubjects } from './get-faculty-subjects.handler';
import { listAllBatches } from './list-batches.handler';

export const BatchHandler = {
  createBatch,
  listAllBatches,
  getFacultyLectures,
  getFacultySubjects,
  markLectureCompleted,
};
