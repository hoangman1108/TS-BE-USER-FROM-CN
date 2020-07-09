// import { QueryInterface, Transaction } from 'sequelize';
import sequelize from '../models/sequelize';
import ActionModel from '../models/action.model';
import AccountModel from '../models/account.model';

import RoleModel from '../models/role.model';

const migration = {
  up: async (): Promise<void> => {
    const t = await sequelize.transaction();
    try {
      await Promise.all([
        ActionModel.bulkCreate([{
          name: 'Add role',
          code: 'add-role',
        }, {
          name: 'Edit role',
          code: 'edit-role',
        }, {
          name: 'Delete role',
          code: 'del-role',
        }, {
          name: 'Add account',
          code: 'add-account',
        }, {
          name: 'Edit account',
          code: 'edit-account',
        }, {
          name: 'Delete account',
          code: 'del-account',
        }, {
          name: 'Edit profile',
          code: 'edit-profile',
        }, {
          name: 'View list accounts',
          code: 'view-list-accounts',
        }, {
          name: 'View list roles',
          code: 'view-list-roles',
        }, {
          name: 'View profile',
          code: 'view-profile',
        }], {
          transaction: t,
        }),
        AccountModel.create({
          username: 'admin@123',
          password: 'admin@123',
        }, {
          transaction: t,
        }).then(async (account: AccountModel) => {
          const role = await RoleModel.create({
            name: 'Super admin',
            code: 'superadmin',
          }, {
            transaction: t,
          });
          await account.setRoles([role], {
            transaction: t,
          });
        }),
      ]);
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  },
};

export default migration;
