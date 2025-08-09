import * as yup from 'yup';
import { CourseStatus } from 'shared';
import { Types } from 'mongoose';

export const updateCourseDto = yup.object({
  params: yup.object({
    id: yup
      .string()
      .required('Course ID is required')
      .test('is-objectid', 'Invalid MongoDB ObjectId', (value) =>
        Types.ObjectId.isValid(value)
      ),
  }),
  body: yup.object({
    title: yup
      .string()
      .required('Course title is required')
      .trim()
      .max(200, 'Course title cannot exceed 200 characters'),

    description: yup
      .string()
      .trim()
      .max(1000, 'Description cannot exceed 1000 characters')
      .optional(),

    courseCode: yup
      .string()
      .required('Course code is required')
      .trim()
      .uppercase()
      .max(10, 'Course code cannot exceed 10 characters'),

    duration: yup
      .object({
        value: yup
          .number()
          .required('Duration value is required')
          .min(1, 'Duration must be at least 1'),

        unit: yup
          .string()
          .required('Duration unit is required')
          .oneOf(['days', 'weeks', 'months', 'years'], 'Invalid duration unit'),
      })
      .required('Duration is required'),

    defaultTotalLectures: yup
      .number()
      .required('Default total lectures is required')
      .min(1, 'Course must have at least 1 lecture'),

    status: yup
      .string()
      .oneOf(Object.values(CourseStatus), 'Invalid course status')
      .default(CourseStatus.DRAFT)
      .optional(),
  }),
});
