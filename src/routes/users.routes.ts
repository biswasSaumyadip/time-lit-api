import { Request, Response } from 'express';
import express from 'express';
import logger from '../configs/logger.config';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response): void {
  logger.info('Default path initialized');
  res.status(200).json({ message: 'fetched all users' });
});

export default router;
