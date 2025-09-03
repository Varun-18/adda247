import { Types } from 'mongoose';
import * as yup from 'yup';

export const removeBatchDto = yup.object({
  body: yup.object({
    batchId: yup
      .string()
      .required('Batch ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),
  }),
});
