import { Request, Response, NextFunction } from 'express';
import Error from '../components/error';


export default class BaseController {
  // constructor () {
  //   this.create = this.create.bind(this);
  //   this.update = this.update.bind(this);
  //   this.read = this.read.bind(this);
  //   this.delete = this.delete.bind(this);
  // }

    create(func: Function) {
        return (req: Request, res: Response, next: NextFunction) => {
           func(req, res)
           .then((item: any) => {
                if (!item) {
                  const error = new Error('Bad Request.', 400);
                  next(error);
                }
                else {
                  res.status(201).json(item);
                }
            })
            .catch(next);
        };
    }

    read(func: Function) {
        return (req: Request, res: Response, next: NextFunction) => {
            func(req, res)
           .then((item: any) => {
               if (!item) {
                const error = new Error('Not Found.', 404);
                next(error);
               } else {
                 res.status(200).json(item);
               }
            })
            .catch(next);
        };
    }

    update(func: Function) {
        return (req: Request, res: Response, next: NextFunction) => {
            func(req, res)
           .then((item: any) => {
               if (!item) {
                 const error = new Error('Not Found', 404);
                 next(error);
                } else {
                  res.status(204).json(item);
                }
            })
            .catch(next);
        };
    }

    delete(func: Function) {
        return (req: Request, res: Response, next: NextFunction) => {
            func(req, res)
           .then((item: any) => {
               if (!item || item === null) {
                const error = new Error('Not Found', 404);
                next(error)
               }  else {
                 res.sendStatus(204);
               }
            })
            .catch(next);
        };
    }
}
