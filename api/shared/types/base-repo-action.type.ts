import { PaginatedResponse } from 'shared/dto';
import { FilterQuery, PaginationQuery } from 'shared/query';

export interface RepositoryActions<T> {
  create: (data: Partial<T>) => Promise<T>;
  findById: (id: string) => Promise<T | null>;
  findOne: (
    filter: FilterQuery,
    includePassword?: boolean
  ) => Promise<T | null>;
  findAll: (
    filter?: FilterQuery,
    pagination?: PaginationQuery
  ) => Promise<PaginatedResponse<T>>;
  update: (id: string, data: Partial<T>) => Promise<T | null>;
  delete: (id: string, softDelete?: boolean) => Promise<T | null>;
  deleteMany: (filter: FilterQuery, softDelete?: boolean) => Promise<number>;
  exists: (filter: FilterQuery) => Promise<boolean>;
  count: (filter?: FilterQuery) => Promise<number>;
}
