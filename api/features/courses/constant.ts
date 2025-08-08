export const RESPONSE_MESSAGES = {
  // Success messages
  COURSE_CREATED: 'Course created successfully',
  COURSE_UPDATED: 'Course updated successfully',
  COURSE_DELETED: 'Course deleted successfully',
  COURSE_RETRIEVED: 'Course retrieved successfully',
  COURSES_RETRIEVED: 'Courses retrieved successfully',

  // Error messages
  COURSE_NOT_FOUND: 'Course not found',
  // COURSE_ALREADY_EXISTS: 'Course already exists with this email',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error',

  // Generic messages
  OPERATION_SUCCESSFUL: 'Operation completed successfully',
  OPERATION_FAILED: 'Operation failed',
} as const;
