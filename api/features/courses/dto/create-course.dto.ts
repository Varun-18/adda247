import * as yup from 'yup';
import { CourseStatus } from 'shared';

export const createCourseDto = yup.object({
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

    topics: yup
      .array()
      .of(
        yup.object({
          _id: yup.string().optional(), // Will be auto-generated if not provided

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

          order: yup
            .number()
            .required('Order is required')
            .min(1, 'Order must be at least 1'),

          estimatedHours: yup
            .number()
            .min(0, 'Estimated hours cannot be negative')
            .default(1)
            .optional(),

          batchCompletions: yup
            .array()
            .of(
              yup.object({
                batch: yup.string().required('Batch is required'),

                completedBy: yup.string().required('Completed by is required'),

                completedAt: yup
                  .date()
                  .default(() => new Date())
                  .optional(),

                notes: yup
                  .string()
                  .trim()
                  .max(300, 'Notes cannot exceed 300 characters')
                  .optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),

    status: yup
      .string()
      .oneOf(Object.values(CourseStatus), 'Invalid course status')
      .default(CourseStatus.DRAFT)
      .optional(),
  }),
});
