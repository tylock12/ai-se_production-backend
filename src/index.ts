import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import noteRoutes from './routes/notes.js';
import authRouter from './routes/auth.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import cors from 'cors';
import { requestLogger } from './middleware/logger.js';
import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(noteRoutes);
app.use(authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      logger.info('Server started', { port: PORT, env: process.env.NODE_ENV });
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
