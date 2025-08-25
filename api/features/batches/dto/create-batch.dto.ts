import * as yup from 'yup';

export const createBatchDto = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required('Batch name is required')
      .trim()
      .max(200, 'Batch name cannot exceed 200 characters'),

    courseTemplateId: yup
      .string()
      .required('Course template ID is required')
      .matches(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId'),

    startDate: yup
      .date()
      .required('Start date is required')
      .typeError('Invalid date format'),

    facultyAssignments: yup
      .object()
      .required('Faculty assignments are required')
      .test(
        'valid-faculty-assignments',
        'Faculty assignments must be a key-value object with valid MongoDB ObjectIds',
        (value) => {
          if (!value || typeof value !== 'object') return false;
          return Object.entries(value).every(
            ([facultyId, subjectId]) =>
              /^[a-f\d]{24}$/i.test(facultyId) &&
              /^[a-f\d]{24}$/i.test(subjectId as string)
          );
        }
      ),
  }),
});
