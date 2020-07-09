import db from '../models';
import RoleModel from '../models/role.model';
import actionService from './action.service';
import sequelize from '../models/sequelize';

import {Transaction} from 'sequelize';
import ActionModel from '../models/action.model';
//import sequelize = require('sequelize');

// import ActionModel from '../models/action.model';

// create, read, update, delete + N(s)

export default class RoleService {
  static readRoles(): Promise<RoleModel[]> {
    return db.RoleModel.findAll();
  }
  static readRolesAndActions(): Promise<RoleModel[]> {
    return db.RoleModel.findAll({ include: ['actions'] });
  }

  static readRole(code: string): Promise<RoleModel | null> {
    return db.RoleModel.findOne({
      where: {
        code,
      },
      include: ['actions']
    });
  }

  static async updateRole(code: string, role: object): Promise<RoleModel[]> {
    const [_, roleDatas] = await db.RoleModel.update(role, {
      where: {
        code,
      },
    });
    return roleDatas;
  }

  static async createRole(role: { name: string, code: string }, t: Transaction): Promise<RoleModel> {
    return db.RoleModel.create({
      name: role.name,
      code: role.code,
    }, {
      transaction: t,
      include: ['actions']
    })
  }

  static async createRolesActions(role: RoleModel, actions: ActionModel[], t: Transaction): Promise<RoleModel | null> {

    await role.setActions(actions, {
      transaction: t,
    });
    return db.RoleModel.findOne({
      where: {
        id: role.id
      },
      include: [{
        model: ActionModel,
        as: 'actions',
        required: true
      }],
      transaction: t
    })
  }

  static deleteRole(code: string): Promise<number> {
    return db.RoleModel.destroy({
      where: {
        code,
      },
    });
  }
}

    // const actionDatas = await actionService.readActionsByCode(actions);
    // if (!actionDatas.length) {
    //   throw new AppError('Can not find the actions', 404);
    // } else {
    //   const t = await db.sequelize.transaction();
    //   try {

    //     await newRole.addActions([...actionDatas], {
    //       transaction: t
    //     })
    //     await db.RoleModel.findAll()
    //     await t.commit();
    //     return newRole;

    //   } catch (error) {
    //     t.rollback();
    //     throw error;
    //   }
    // }