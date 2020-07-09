import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  HasOneSetAssociationMixin,
} from 'sequelize';
import sequelize from './sequelize';
import ActionModel from './action.model';
import RoleModel from './role.model';
import ProfileModel from './profile.model';


class AccountModel extends Model {
  public id!: string;

  public username!: string;

  public password!: string;

  public createdAt!: Date;

  public updatedAt!: Date;
  public profile?: ProfileModel;

  public static associate(): void {
  }

  public getActions!: BelongsToManyGetAssociationsMixin<ActionModel>;

  public setActions!: BelongsToManySetAssociationsMixin<ActionModel, string>;

  public getRoles!: BelongsToManyGetAssociationsMixin<RoleModel>;

  public setRoles!: BelongsToManySetAssociationsMixin<RoleModel, string>;
  public setProfile!: HasOneSetAssociationMixin<ProfileModel, string>;
}


AccountModel.init({
  id: {
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
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
  tableName: 'accounts',
  sequelize,
});


AccountModel.associate = () => {
  AccountModel.belongsToMany(ActionModel, {
    through: 'accounts_actions',
    foreignKey: 'account_id',
    otherKey: 'action_id',
    as: 'actions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  AccountModel.belongsToMany(RoleModel, {
    through: 'accounts_roles',
    foreignKey: 'account_id',
    otherKey: 'role_id',
    as: 'roles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  AccountModel.hasOne(ProfileModel, {
    sourceKey: 'id',
    foreignKey: 'accountId',
    as: 'profile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default AccountModel;
