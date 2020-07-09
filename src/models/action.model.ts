import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import sequelize from './sequelize';

import RoleModel from './role.model';
import AccountModel from './account.model';


class ActionModel extends Model {
  public id!: string;

  public name!: string;

  public code!: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static associate(): void {
  }

  public getRoles!: BelongsToManyGetAssociationsMixin<RoleModel>;

  public setRoles!: BelongsToManySetAssociationsMixin<RoleModel, string>;

  public getAccounts!: BelongsToManyGetAssociationsMixin<AccountModel>;

  public setAccounts!: BelongsToManySetAssociationsMixin<AccountModel, string>;
}


ActionModel.init({
  id: {
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'actions',
  sequelize,
});


ActionModel.associate = () => {
  ActionModel.belongsToMany(RoleModel, {
    through: 'roles_actions',
    foreignKey: 'action_id',
    otherKey: 'role_id',
    as: 'roles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  ActionModel.belongsToMany(AccountModel, {
    through: 'accounts_actions',
    foreignKey: 'action_id',
    otherKey: 'account_id',
    as: 'accounts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default ActionModel;
