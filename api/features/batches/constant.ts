export const RESPONSE_MESSAGES = {
  BATCH_CREATED: 'Batch created successfully',
  BATCH_UPDATED: 'Batch updated successfully',
  BATCH_DELETED: 'Batch deleted successfully',
  BATCH_RETRIEVED: 'Batch retrieved successfully',
  BATCHS_RETRIEVED: 'Batches retrieved successfully',

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
