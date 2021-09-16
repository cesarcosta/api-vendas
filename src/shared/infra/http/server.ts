import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

const PORT = 3333;

const app = express();

app.use(cors());

app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT} 🏆`);
});
