import { Request, Response, Router } from 'express';
import { courseRouter } from './courses';
import { userRouter } from './users';

const rootRouter = Router();

rootRouter.get('/', (req: Request, res: Response) => {
  res.status(200).render('home');
});

rootRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'All Is Well' });
});

rootRouter.use('/user', userRouter);
rootRouter.use('/course', courseRouter);

export default rootRouter;
