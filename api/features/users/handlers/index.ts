import { getUser } from './get-user.handler';
import { listAllFaculty } from './list-faculty.handler';
import { listAllUsers } from './list-users.handler';
import { login } from './login.handler';
import { register } from './register.handler';

export const UserHandler = {
  login,
  register,
  getUser,
  listAllUsers,
  listAllFaculty,
};
