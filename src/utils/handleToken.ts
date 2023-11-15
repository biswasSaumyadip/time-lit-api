import { NextFunction, Request, Response } from 'express';

const revokedTokens = new Set();

export function addToRevokedTokens(token: string) {
  revokedTokens.add(token);
}

export function isTokenRevoked(token: string) {
  return revokedTokens.has(token);
}

export function checkTokenValidity(req: Request, resp: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token && !isTokenRevoked(token)) {
    next();
  } else {
    resp.status(401).json({ error: 'Unauthorized' });
  }
}
