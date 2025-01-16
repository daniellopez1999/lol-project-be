// src/index.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './router/apiRouter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PATCH'],
    origin: ['http://localhost:5173'],
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
