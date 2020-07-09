import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import CityModel from './city.model';
import WardModel from './ward.model';
import ProfileModel from './profile.model';

class DistrictModel extends Model {
  public code!: string;

  public cityCode!: string;

  public type!: string;

  public name!: string;

  public static associate(): void {
  }
}


DistrictModel.init({
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cityCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'city_code'
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
  tableName: 'districts',
  sequelize,
  timestamps: false,
});

DistrictModel.associate = () => {
  DistrictModel.belongsTo(CityModel, {
    foreignKey: 'city_code',
    targetKey: 'code',
    as: 'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  DistrictModel.hasMany(WardModel, {
    foreignKey: 'district_code',
    sourceKey: 'code',
    as: 'wards',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  DistrictModel.hasMany(ProfileModel, {
    foreignKey: 'district_code',
    sourceKey: 'code',
    as: 'districts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};


export default DistrictModel;
