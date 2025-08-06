import dotenv from 'dotenv';
import { app } from './server';

dotenv.config();

const port = process.env.PORT || 5000;

if (process.env.MODE === 'dev') {
  app.listen(port, () => {
    console.log(
      `Server is running on ${process.env.MODE === 'prod' ? 'on vercel' : `http://localhost:${port}`}`
    );
  });
}

export default app;
