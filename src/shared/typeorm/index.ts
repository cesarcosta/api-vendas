import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Database connected successfully!'))
  .catch(() => console.error('Error connecting to database!'));
