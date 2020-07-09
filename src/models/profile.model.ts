import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import AccountModel from './account.model';
import WardModel from './ward.model';
import DistrictModel from './district.model';
import CityModel from './city.model';

class ProfileModel extends Model {
  public id!: string;

  public accountId!: string;

  public firstName!: string;

  public lastName!: string;

  public gender!: string;

  public phone!: string;

  public email!: string;

  public avatar!: string;

  public address!: string;

  public cityCode!: string;

  public districtCode!: string;

  public wardCode!: Date;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static associate(): void {
  }
}


ProfileModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  accountId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'account_id'
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'last_name'
  },
  gender: {
    type: DataTypes.ENUM('Nam', 'Nữ'),
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,

  },
  avatar: {
    type: DataTypes.TEXT,

  },
  cityCode: {
    type: DataTypes.TEXT,
    field: 'city_code'

  },
  districtCode: {
    type: DataTypes.TEXT,
    field: 'district_code'
  },
  wardCode: {
    type: DataTypes.TEXT,
    field: 'ward_code'
  },
  address: {
    type: DataTypes.TEXT,
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
  tableName: 'profiles',
  sequelize,
});

ProfileModel.associate = () => {
  ProfileModel.belongsTo(AccountModel, {
    foreignKey: 'accountId',
    targetKey: 'id',
    as: 'account',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  ProfileModel.belongsTo(CityModel, {
    foreignKey: 'city_code',
    targetKey: 'code',
    as: 'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  ProfileModel.belongsTo(DistrictModel, {
    foreignKey: 'district_code',
    targetKey: 'code',
    as: 'district',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  ProfileModel.belongsTo(WardModel, {
    foreignKey: 'ward_code',
    targetKey: 'code',
    as: 'ward',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default ProfileModel;
