import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

export const helmetMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    'Content-Security-Policy',
    "\"default-src·'self';·script-src·'self'·'unsafe-inline';·style-src·'self'·'unsafe-inline';\"",
  );

  return helmet()(req, res, next);
};
