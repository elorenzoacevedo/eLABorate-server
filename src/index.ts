import 'dotenv/config';
import { DataSource } from 'typeorm';
import express from 'express';
import cors from 'cors';

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  ssl: { ca: process.env.RDS_CA },
});

const main = async () => {
  appDataSource.initialize();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
  });
};

main().catch((error) => console.log(error));
