import { Types } from 'mongoose';
import * as yup from 'yup';

export const removeTopicDto = yup.object({
  params: yup.object({
    id: yup
      .string()
      .required('Course ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),

    topicId: yup
      .string()
      .required('Topic ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),
  }),
});
