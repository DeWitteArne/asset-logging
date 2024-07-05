import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { DataSource } from 'typeorm';

export const MySQLDataSource = new DataSource({
  type: 'mysql', // Using MySQL
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT) || 3306, // Ensure port is a number
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity.ts'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'], // Migration files
  synchronize: false, // Reminder: Set to false in production!
  logging: false,
  ssl: {
    rejectUnauthorized: false, //ca: serverCa,
  },
});

// Initialize the services source
MySQLDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
