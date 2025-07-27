import http from 'http';
import dotenv from 'dotenv';
import { app } from './server';

dotenv.config();

const httpServer = http.createServer(app);

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(
    `Server is running on ${process.env.MODE === 'prod' ? '' : `http://localhost:${port}`}`
  );
});

export default httpServer;
