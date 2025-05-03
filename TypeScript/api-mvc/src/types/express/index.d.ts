import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload | string;
    }
  }
}
