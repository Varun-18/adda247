import { Types } from 'mongoose';
import * as yup from 'yup';

export const updateLectureDto = yup.object({
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

    topicId: yup
      .string()
      .required('Topic ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),

    lectureId: yup
      .string()
      .required('Lecture ID is required')
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

    durationMinutes: yup
      .number()
      .min(30, 'Lecture should at least of 30 mins')
      .optional(),
  }),
});
