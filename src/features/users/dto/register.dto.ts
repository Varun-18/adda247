import * as yup from 'yup';
import { UserRole } from 'shared';

export const registerUserSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required')
      .lowercase()
      .trim(),

    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),

    firstName: yup
      .string()
      .required('First name is required')
      .trim()
      .max(50, 'First name cannot exceed 50 characters')
      .matches(
        /^[a-zA-Z\s]+$/,
        'First name can only contain letters and spaces'
      ),

    lastName: yup
      .string()
      .required('Last name is required')
      .trim()
      .max(50, 'Last name cannot exceed 50 characters')
      .matches(
        /^[a-zA-Z\s]+$/,
        'Last name can only contain letters and spaces'
      ),

    role: yup
      .string()
      .oneOf(Object.values(UserRole), 'Invalid role')
      .required('Role is required'),

    phoneNumber: yup
      .string()
      .trim()
      .matches(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
      .optional(),

    facultyProfile: yup
      .object({
        employeeId: yup
          .string()
          .trim()
          .max(20, 'Employee ID cannot exceed 20 characters')
          .when('$isFaculty', {
            is: true,
            then: (schema) =>
              schema.required('Employee ID is required for faculty'),
            otherwise: (schema) => schema.optional(),
          }),

        department: yup
          .string()
          .trim()
          .max(100, 'Department name cannot exceed 100 characters')
          .when('$isFaculty', {
            is: true,
            then: (schema) =>
              schema.required('Department is required for faculty'),
            otherwise: (schema) => schema.optional(),
          }),

        specialization: yup
          .array()
          .of(
            yup
              .string()
              .trim()
              .max(50, 'Each specialization cannot exceed 50 characters')
          )
          .min(1, 'At least one specialization is required for faculty')
          .max(10, 'Cannot have more than 10 specializations')
          .when('$isFaculty', {
            is: true,
            then: (schema) =>
              schema.required('Specialization is required for faculty'),
            otherwise: (schema) => schema.optional(),
          }),

        experience: yup
          .number()
          .min(0, 'Experience cannot be negative')
          .max(50, 'Experience cannot exceed 50 years')
          .integer('Experience must be a whole number')
          .when('$isFaculty', {
            is: true,
            then: (schema) =>
              schema.required('Experience is required for faculty'),
            otherwise: (schema) => schema.optional(),
          }),

        qualification: yup
          .string()
          .trim()
          .max(100, 'Qualification cannot exceed 100 characters')
          .when('$isFaculty', {
            is: true,
            then: (schema) =>
              schema.required('Qualification is required for faculty'),
            otherwise: (schema) => schema.optional(),
          }),

        joiningDate: yup
          .date()
          .max(new Date(), 'Joining date cannot be in the future')
          .when('$isFaculty', {
            is: true,
            then: (schema) =>
              schema.required('Joining date is required for faculty'),
            otherwise: (schema) => schema.optional(),
          }),

        isActive: yup.boolean().default(true),
      })
      .when(['role'], {
        is: (role: string) => role === UserRole.FACULTY,
        then: (schema) =>
          schema.required('Faculty profile is required for faculty members'),
        otherwise: (schema) => schema.optional(),
      }),
  }),
});
