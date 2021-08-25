import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const PORT = 3333;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🏆`);
});
