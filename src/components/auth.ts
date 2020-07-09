import { Request, Response, NextFunction } from 'express';
// import { isBuffer } from 'util';
import userService from '../services/user.service';
import AppError from '../components/error';

import bcrypt = require('bcrypt');
export default class Auth {
  public static async hashPassword(password: string): Promise<string> {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          throw new AppError("Can not hash password",422);
        }
        resolve(hash);
      });
    });
  }

  public static async edit(req: Request, res: Response, next: NextFunction) {
    const value = await userService.readUser(req.params.username);
    if (value !== null) {
      bcrypt.compare(req.body.oldPassword, value.password, (errors, result) => {
        if (errors) {
          throw errors;
        }
        if (result) {
          next();
        } else {
          throw new AppError("Invalid value",422);
        }
      });
    }
  }

  public static async account(req: Request, res: Response) {
    const value = await userService.readUser(req.body.username);
    if (value === null) {
      throw new AppError('Account not found',404);
    }
    if (value !== null) {
      bcrypt.compare(req.body.password, value.password, (errors, result) => {
        if (errors) {
          throw new AppError("Can not compare password",422);
        }
        if (result) {
          res.json('Ok');
        } else {
          res.status(422).json({
            status: 'error',
            message: 'Invalid password',
          });
        }
      });
    }
  }

  public static async User(req: Request, res: Response, next: NextFunction) {
    const value = await userService.readUser(req.body.username);
    if (value === null) {
      next();
    } else {
     throw new AppError('Exist value',422);
    }
  }
}
