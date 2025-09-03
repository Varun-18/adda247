import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import { BatchHandler } from '../handlers';
import { createBatchDto, removeBatchDto } from '../dto';

const batchRouter = Router();

batchRouter.use(authenticateUser);

batchRouter.post(
  '/create',
  schemaValidator(createBatchDto),
  BatchHandler.createBatch
);

batchRouter.post(
  '/delete/batch',
  schemaValidator(removeBatchDto),
  BatchHandler.removeBatch
);

batchRouter.post('/complete/lecture', BatchHandler.markLectureCompleted);

batchRouter.get('/faculty/analytics', BatchHandler.getFacultyAnalytics);
batchRouter.get('/faculty/progress', BatchHandler.getFacultyBatchProgress);
batchRouter.get(
  '/faculty/recent-activity',
  BatchHandler.getFacultyRecentActivity
);

batchRouter.get('/business/activity', BatchHandler.getAllRecentActivity);
batchRouter.get(
  '/business/overview',
  BatchHandler.getLectureAssignmentsOverview
);
batchRouter.get('/business/analytics', BatchHandler.getBusinessAnalytics);

batchRouter.get('/get/subjects', BatchHandler.getFacultySubjects);

batchRouter.get('/get/lectures', BatchHandler.getFacultyLectures);

batchRouter.get('/list', BatchHandler.listAllBatches);

export { batchRouter };
