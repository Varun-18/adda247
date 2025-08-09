import { Types } from 'mongoose';
import * as yup from 'yup';

export const getCourseDto = yup.object({
  params: yup.object({
    id: yup
      .string()
      .required('Course ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),
  }),
});
