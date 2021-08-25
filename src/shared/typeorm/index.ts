import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Database connected successfully!'))
  .catch(error => console.error('Error connecting to database!', error));
