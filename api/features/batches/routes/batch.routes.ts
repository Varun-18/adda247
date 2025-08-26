import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import { BatchHandler } from '../handlers';
import { createBatchDto } from '../dto';

const batchRouter = Router();

batchRouter.use(authenticateUser);

batchRouter.post(
  '/create',
  schemaValidator(createBatchDto),
  BatchHandler.createBatch
);

batchRouter.post('/complete/lecture', BatchHandler.markLectureCompleted);

batchRouter.get('/get/subjects', BatchHandler.getFacultySubjects);

batchRouter.get('/get/lectures', BatchHandler.getFacultyLectures);

batchRouter.get('/list', BatchHandler.listAllBatches);

export { batchRouter };
