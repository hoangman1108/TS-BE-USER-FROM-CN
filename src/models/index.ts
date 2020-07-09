import AccountModel from './account.model';
import ActionModel from './action.model';
import CityModel from './city.model';
import DistrictModel from './district.model';
import ProfileModel from './profile.model';
import WardModel from './ward.model';
import RoleModel from './role.model';
import sequelize from './sequelize';

AccountModel.associate();
ActionModel.associate();
CityModel.associate();
DistrictModel.associate();
ProfileModel.associate();
WardModel.associate();
RoleModel.associate();

export default {
  AccountModel,
  ActionModel,
  CityModel,
  DistrictModel,
  WardModel,
  ProfileModel,
  RoleModel,
  sequelize,
};
