import 'dotenv/config';
import { DataSource } from 'typeorm';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { createServer } from 'http';

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  ssl: {
    ca: fs.readFileSync('/home/ec2-user/elaborate-server/rds-ca-ssl.pem'),
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
  httpServer.listen(80, () => {
    console.log(`Server running on port 80...`);
  });
};

main().catch((error) => console.log(error));
