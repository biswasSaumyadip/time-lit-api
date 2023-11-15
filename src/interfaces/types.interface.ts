import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import { JwtPayload } from 'jsonwebtoken';

export interface IReq<T = void> extends Request {
  body: T;
}

export interface IReqUser<U = void> extends Request {
  user: string | JwtPayload | undefined;
  body: U;
}

export interface IReqQuery<T extends Query, U = void> extends Request {
  query: T;
  body: U;
}
