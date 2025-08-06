import { Request, Response, Router } from 'express';
import { userRouter } from './users';

const rootRouter = Router();

rootRouter.get('/', (req: Request, res: Response) => {
  res.status(200).render('home');
});

rootRouter.use('/user', userRouter);

export default rootRouter;
