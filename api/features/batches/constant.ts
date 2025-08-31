export const RESPONSE_MESSAGES = {
  BATCH_CREATED: 'Batch created successfully',
  BATCH_UPDATED: 'Batch updated successfully',
  BATCH_DELETED: 'Batch deleted successfully',
  BATCH_RETRIEVED: 'Batch retrieved successfully',
  BATCHES_RETRIEVED: 'Batches retrieved successfully',

  LECTURES_RETRIVED: 'Lectures retrieved successfully',
  SUBJECTS_RETRIVED: 'Subjects retrieved successfully',
  LECTURE_COMPLETED: 'Lecture completed successfully',

  ANALYTICS_RETRIVED: 'Faculty analytics retrieved successfully',
  RECENT_ACTIVITY: 'Recent activity retrieved successfully',
  BATCH_PROGRESS: 'Batch Progress retrieved successfully',

  BUSINESS_ANALYTICS_RETRIVED: 'Business analytics retrieved successfully',
  BUSINESS_ACTIVITY: 'Recent activity retrieved successfully',
  BUSINESS_ASSIGNMENT_OVERVIEW: 'Assignment overview retrieved successfully',

  // Error messages
  BATCH_NOT_FOUND: 'Batch not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error',

  // Generic messages
  OPERATION_SUCCESSFUL: 'Operation completed successfully',
  OPERATION_FAILED: 'Operation failed',
} as const;
