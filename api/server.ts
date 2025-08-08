import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import rootRouter from 'features/routes';

// import router from 'routes';

const app = express();

dotenv.config();

/**
 * view engine
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares

/**
 * Security middleware to set various HTTP headers
 */
app.use(helmet());

/**
 * Cookie parser middleware
 */
app.use(cookieParser());

/**
 * The middleware for handling cross origin resource sharing
 */
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://152.59.36.203:3000'],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin',
  })
);

/**
 * compression middleware for compressing the response body
 */
app.use(
  compression({
    threshold: 1024,
    level: 6,
  })
);

/**
 * Logger for production
 * TODO : configure for production using env
 */
app.use(morgan('dev'));

/**
 * Middleware for parsing the json payload
 * Maximum payload upto 5mb can pass
 */
app.use(
  express.json({
    limit: '5mb',
    strict: true,
  })
);

/**
 * Parse URL encoded bodies
 * To get the URL Encoded form data
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Rate limitter for limiting the number of request every 15 mins.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  headers: true,
});
app.use(limiter);

/**
 * Router for custom configurations
 */
app.use('/', rootRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Success From Vercel');
});
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Mongo conncetion successful');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectToDatabase();

export { app };
