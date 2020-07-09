import { Request } from 'express';
import BaseController from '.';
import RoleService from '../services/role.service';
import RoleModel from '../models/role.model';
import db from '../models';
import ActionService from '../services/action.service';
import AppError from '../components/error';

// create, read, update, delete + N(s)

class RoleController extends BaseController {

  async createRole(req: Request): Promise<RoleModel> {
    const role = {
      name: req.body.name as string,
      code: req.body.code as string
    }
    const actions = req.body.actions as string[];
    const t = await db.sequelize.transaction();
    try {
      const newRole = await RoleService.createRole(role, t);

      const actionDatas = await ActionService.readActionsByCode(actions);
      const result = await RoleService.createRolesActions(newRole, actionDatas, t);
      if (result === null) {
        throw new AppError('Can not create role actions', 422);
      }
      t.commit();
      return result;
    } catch (error) {
      t.rollback();
      throw error;
    }



  }
  readRole(req: Request): Promise<RoleModel | null> {
    console.log(req.params.code);
    const roleCode = typeof req.params.code === 'string' ? req.params.code : '';
    return RoleService.readRole(roleCode);
  }
  readRoles(): Promise<RoleModel[]> {
    return RoleService.readRoles();
  }

  readRolesAndActions(): Promise<RoleModel[]> {
    return RoleService.readRolesAndActions();
  }

  deleteRole(req: Request): Promise<number> {
    const value = typeof req.query.code === 'string' ? req.query.code : '';
    return RoleService.deleteRole(value);
  }
  updateRole(req: Request): Promise<RoleModel[]> {
    const value = req.query.code as string;
    const data = {
      ...req.body,
    };
    return RoleService.updateRole(value, data);
  }
}

export default new RoleController();
