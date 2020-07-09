import { Request, Response, NextFunction } from 'express';

import Joi = require('joi');


const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
  cityCode: Joi.string().required(),
  districtCode: Joi.string().required(),
  wardCode: Joi.string().required(),
  avatar: Joi.string().required(),
  gender: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
});
const accountSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
});
const editPassword = Joi.object().keys({
  oldPassword: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
});
export default class Validation {
  static user(req: Request, res: Response, next: NextFunction) {
    Joi.validate(req.body, userSchema, (errors) => {
      if (errors) {
        res.status(422).json({
          status: ".."
        })
      } else {
        next();
      }
    });
  }

  static account(req: Request, res: Response, next: NextFunction) {
    Joi.validate(req.body, accountSchema, (errors) => {
      if (errors) {
        res.status(422).json({
          status: 'error',
          message: 'invalid request data',
        });
      } else {
        next();
      }
    });
  }

  static editPassword(req: Request, res: Response, next: NextFunction) {
    Joi.validate(req.body, editPassword, (errors) => {
      if (errors) {
        res.status(422).json({
          status: 'error',
          message: 'invalid request data',
        });
      } else {
        next();
      }
    });
  }
}
