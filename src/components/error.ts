import { Request, Response, NextFunction} from 'express';

export default class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
      super(message);

      this.statusCode = statusCode;
      this.status = message;
      Error.captureStackTrace(this, this.constructor);
    }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

  if (!err) {
    err = new AppError('Undefined', 500);
  }
  res.status(err.statusCode).json(err);
}
