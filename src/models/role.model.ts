import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyAddAssociationMixin
} from 'sequelize';
import sequelize from './sequelize';
import ActionModel from './action.model';
import ProfileModal from './profile.model';


class RoleModel extends Model {
  public id!: string;

  public name!: string;

  public code!: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static associate(): void {
  }

  public getActions!: BelongsToManyGetAssociationsMixin<ActionModel>;

  public setActions!: BelongsToManySetAssociationsMixin<ActionModel, string>;
  public addActions!: BelongsToManyAddAssociationsMixin<ActionModel, string>;

  public getProfile!: BelongsToManyGetAssociationsMixin<ProfileModal>;

  public setProfile!: BelongsToManySetAssociationsMixin<ProfileModal, string>;
}


RoleModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
  tableName: 'roles',
  sequelize,
  underscored: true,
});


RoleModel.associate = () => {
  RoleModel.belongsToMany(ActionModel, {
    through: 'roles_actions',
    foreignKey: 'role_id',
    otherKey: 'action_id',
    as: 'actions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  RoleModel.belongsToMany(ProfileModal, {
    through: 'accounts_roles',
    foreignKey: 'role_id',
    otherKey: 'account_id',
    as: 'users',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};


export default RoleModel;