import {
  Model,
  FilterQuery as MongooseFilterQuery,
  SortOrder,
  UpdateQuery,
} from 'mongoose';

import { PaginatedResponse } from 'shared/dto';
import { FilterQuery, PaginationQuery } from 'shared/query';
import { RepositoryActions } from 'shared/types';
import { BaseDocument } from '../schema';

export const CreateBaseRepository = <T extends BaseDocument>(
  model: Model<T>
): RepositoryActions<T> => {
  const create = async (data: Partial<T>): Promise<T> => {
    const entity = new model(data);
    return await entity.save();
  };

  const findById = async (id: string): Promise<T | null> => {
    return await model.findOne({
      _id: id,
      deletedAt: null,
    } as MongooseFilterQuery<T>);
  };

  const findOne = async (
    filter: FilterQuery,
    includePassword: boolean = false
  ): Promise<T | null> => {
    const query = model.findOne({
      ...filter,
      deletedAt: null,
    } as MongooseFilterQuery<T>);

    // Include password if requested
    if (includePassword) {
      query.select('+password');
    }

    return await query.exec();
  };

  const findAll = async (
    filter: FilterQuery = {},
    pagination: PaginationQuery = {}
  ): Promise<PaginatedResponse<T>> => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = pagination;

    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const mongoFilter = {
      ...filter,
      deletedAt: null,
    } as MongooseFilterQuery<T>;

    const [data, totalItems] = await Promise.all([
      model.find(mongoFilter).sort(sort).skip(skip).limit(limit).exec(),
      model.countDocuments(mongoFilter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  };

  const findWithRelations = async (
    filter: FilterQuery = {},
    pagination: PaginationQuery = {},
    relations: string[] = []
  ): Promise<PaginatedResponse<T>> => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = pagination;

    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const mongoFilter = {
      ...filter,
      deletedAt: null,
    } as MongooseFilterQuery<T>;

    // Build the query with relations
    let query = model.find(mongoFilter).sort(sort).skip(skip).limit(limit);

    // Add populate for relations
    if (relations.length > 0) {
      relations.forEach((relation) => {
        query = query.populate(relation);
      });
    }

    const [data, totalItems] = await Promise.all([
      query.exec(),
      model.countDocuments(mongoFilter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  };

  const update = async (
    id: string,
    data: UpdateQuery<T>
  ): Promise<T | null> => {
    return await model.findOneAndUpdate(
      { _id: id, deletedAt: null } as MongooseFilterQuery<T>,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
  };

  const deleteEntity = async (
    id: string,
    softDelete: boolean = true
  ): Promise<T | null> => {
    if (softDelete) {
      return await model.findOneAndUpdate(
        { _id: id, deletedAt: null } as MongooseFilterQuery<T>,
        { deletedAt: new Date() },
        { new: true }
      );
    } else {
      return await model.findOneAndDelete({
        _id: id,
      } as MongooseFilterQuery<T>);
    }
  };

  const deleteMany = async (
    filter: FilterQuery,
    softDelete: boolean = true
  ): Promise<number> => {
    const mongoFilter = {
      ...filter,
      deletedAt: null,
    } as MongooseFilterQuery<T>;

    if (softDelete) {
      const result = await model.updateMany(mongoFilter, {
        deletedAt: new Date(),
      });
      return result.modifiedCount;
    } else {
      const result = await model.deleteMany(mongoFilter);
      return result.deletedCount;
    }
  };

  const exists = async (filter: FilterQuery): Promise<boolean> => {
    const doc = await model.findOne({
      ...filter,
      deletedAt: null,
    } as MongooseFilterQuery<T>);
    return !!doc;
  };

  const count = async (filter: FilterQuery = {}): Promise<number> => {
    return await model.countDocuments({
      ...filter,
      deletedAt: null,
    } as MongooseFilterQuery<T>);
  };

  return {
    create,
    findById,
    findOne,
    findAll,
    findWithRelations,
    update,
    delete: deleteEntity,
    deleteMany,
    exists,
    count,
  };
};
