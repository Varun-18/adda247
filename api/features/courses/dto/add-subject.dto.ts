import { Types } from 'mongoose';
import * as yup from 'yup';

export const addSubjectDto = yup.object({
  body: yup.object({
    courseId: yup
      .string()
      .required('Course ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),
    title: yup
      .string()
      .required('Subject title is required')
      .trim()
      .max(200, 'Subject title cannot exceed 200 characters'),

    description: yup
      .string()
      .trim()
      .max(500, 'Subject description cannot exceed 500 characters')
      .optional(),

    order: yup
      .number()
      .required('Order is required')
      .min(1, 'Order must be at least 1'),
  }),
});
