import express from 'express';
import matchesRouter from './matches';
const apiRouter = express.Router();

apiRouter.use('/matches', matchesRouter);

export default apiRouter;
