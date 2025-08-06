import http from 'http';
import dotenv from 'dotenv';
import { app } from './server';

dotenv.config();

// Only create HTTP server in development/local environment
if (process.env.NODE_ENV !== 'prod' && !process.env.VERCEL) {
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 5000;

  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Export the Express app for Vercel (serverless functions)
export default app;
