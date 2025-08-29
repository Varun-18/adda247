import { Request, Response } from 'express';
import {
  FilterQuery,
  PaginatedResponse,
  PaginationQuery,
  ResponseHandler,
  STATUS_CODES,
} from 'shared';
import { RESPONSE_MESSAGES } from '../constant';
import { BatchService } from '../services';
import { BatchEntity } from '../entity';

export const listAllBatches = async (req: Request, res: Response) => {
  const batchService = BatchService();
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      status,
    } = req.query;

    // Build filter object for MongoDB
    const filter: FilterQuery = {};

    // Add search filter for title, description, and courseCode
    if (search && typeof search === 'string' && search.trim() !== '') {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { courseCode: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // Add status filter
    if (status && typeof status === 'string' && status.trim() !== '') {
      filter.status = status.trim();
    }

    // Build pagination object
    const pagination: PaginationQuery = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
    };

    // Define relations to populate
    // const relations = ['createdBy', 'subjects.topics.lectures']; // Adjust based on your needs

    // Call your findWithRelations function
    const batches = await batchService.findWithRelations(
      filter,
      pagination,
      []
    );

    return ResponseHandler.success<PaginatedResponse<BatchEntity>>(
      res,
      batches,
      RESPONSE_MESSAGES.BATCHES_RETRIEVED,
      STATUS_CODES.OK,
      true
    );
  } catch (error) {
    console.error(error);

    return ResponseHandler.error(
      res,
      RESPONSE_MESSAGES.INTERNAL_ERROR,
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
