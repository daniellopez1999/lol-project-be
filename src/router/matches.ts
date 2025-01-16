import express from 'express';
import { MatchController } from '../controller/matches/match.controller';

const matchesRouter = express.Router();

matchesRouter.get('/match/:id/:region', MatchController.getMatchByID);
export default matchesRouter;
