import { CreateBaseRepository } from 'shared';
import { UserEntity } from '../entity';
import { UserModel } from '../models';

export const createUserRepository = () => {
  const baseRepository = CreateBaseRepository<UserEntity>(UserModel);

  return {
    ...baseRepository,
  };
};
