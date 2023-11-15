import { NextFunction, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { IReqUser } from '../interfaces/types.interface';

export default function authenticateToken(req: IReqUser, resp: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  const JWT_SECRET_KEY: Secret | undefined = process.env.JWT_SECRET_KEY as Secret;

  if (!token) {
    resp.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_SECRET_KEY, function (err, user) {
    if (err) {
      resp.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
}
