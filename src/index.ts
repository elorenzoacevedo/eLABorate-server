import 'dotenv/config';
import { DataSource } from 'typeorm';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { createServer } from 'http';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Lab } from './entity/Lab';
import { Deletion } from './entity/Deletion';

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [User, Post, Lab, Deletion],
  ssl: {
    ca: fs.readFileSync(process.env.RDS_CA_LOCATION as string),
  },
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

  const httpServer = createServer(app);
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
  });
};

main().catch((error) => console.log(error));
