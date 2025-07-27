import { createUserRepository } from '../repositories';

export const UserService = () => {
  const userRepository = createUserRepository();

  return {
    ...userRepository,
  };
};
