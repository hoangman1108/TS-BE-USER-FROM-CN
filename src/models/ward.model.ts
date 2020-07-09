import { Model, DataTypes } from 'sequelize';
import DistrictModel from './district.model';
import ProfileModel from './profile.model';
import sequelize from './sequelize';

class WardModel extends Model {
  public districtCode!: string;

  public code!: string;

  public name!: string;

  public type!: string;

  public static associate(): void {
  }
}


WardModel.init({
  districtCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'district_code'
  },
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
}, {
  tableName: 'wards',
  sequelize,
  underscored: true,
  timestamps: false,
});

WardModel.associate = () => {
  WardModel.belongsTo(DistrictModel, {
    foreignKey: 'district_code',
    targetKey: 'code',
    as: 'district',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  WardModel.hasMany(ProfileModel, {
    foreignKey: 'ward_code',
    sourceKey: 'code',
    as: 'profiles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default WardModel;
