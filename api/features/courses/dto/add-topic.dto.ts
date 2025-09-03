import { Types } from 'mongoose';
import * as yup from 'yup';

export const addTopicDto = yup.object({
  body: yup.object({
    courseId: yup
      .string()
      .required('Course ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),

    subjectId: yup
      .string()
      .required('Subject ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),

    title: yup
      .string()
      .required('Topic title is required')
      .trim()
      .max(200, 'Topic title cannot exceed 200 characters'),

    description: yup
      .string()
      .trim()
      .max(500, 'Topic description cannot exceed 500 characters')
      .optional(),

    estimatedHours: yup
      .number()
      .required('hours is required')
      .min(1, 'hours must be at least 1'),

    order: yup
      .number()
      .required('Order is required')
      .min(1, 'Order must be at least 1'),
  }),
});
