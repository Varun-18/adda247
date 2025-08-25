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

batchRouter.get('/list', BatchHandler.listAllBatches);

export { batchRouter };
