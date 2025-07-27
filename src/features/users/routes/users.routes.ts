import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'shared';
import { loginUserSchema, registerUserSchema } from '../dto';
import { UserHandler } from '../handlers';

const userRouter = Router();

userRouter.post('/login', schemaValidator(loginUserSchema), UserHandler.login);

userRouter.post(
  '/register',
  schemaValidator(registerUserSchema),
  UserHandler.register
);

userRouter.use(authenticateUser);

userRouter.get('/', UserHandler.getUser);
userRouter.get('/list', UserHandler.listAllUsers);

export { userRouter };
