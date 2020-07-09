import db from '../models/index';
import ActionModel from '../models/action.model';
import {Transaction} from 'sequelize';

export default class ActionService {
  static listAction(): Promise<ActionModel[]> {
    return db.ActionModel.findAll();
  }

  static findAction(code:string): Promise<ActionModel | null> {
    return db.ActionModel.findOne({
      where: {
        code,
      },
    });
  }
  static readActionsByCode(code: string[]): Promise<ActionModel[]> {
    return db.ActionModel.findAll({
      where: {
        code
      },
    })
  }
}
