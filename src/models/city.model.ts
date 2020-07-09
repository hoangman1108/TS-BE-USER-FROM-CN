import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import DistrictModel from './district.model';
import ProfileModel from './profile.model';


class CityModel extends Model {
  public code!: string;

  public name!: string;

  public type!: string;

  public static associate(): void {
  }
}


CityModel.init({
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
  tableName: 'cities',
  sequelize,
  timestamps: false,
});

CityModel.associate = () => {
  CityModel.hasMany(ProfileModel, {
    foreignKey: 'city_code',
    sourceKey: 'code',
    as: 'profiles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  CityModel.hasMany(DistrictModel, {
    foreignKey: 'city_code',
    sourceKey: 'code',
    as: 'districts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};


export default CityModel;
