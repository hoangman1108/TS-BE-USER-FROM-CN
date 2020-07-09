import { Request } from 'express';
import actionService from '../services/action.service';
import ActionModel from '../models/action.model';

export default class RoleController {
  static async list(): Promise<ActionModel[]> {
    return actionService.listAction();
  }

  static async find(req: Request): Promise<ActionModel | null> {
    return actionService.findAction(req.params.code);
  }
}
