import db from '../models/index';
//
// import auth from '../components/auth';
import userInterface from '../components/user';
import ProfileModel from '../models/profile.model';
import AccountModel from '../models/account.model';
import auth from '../components/auth';
import Account from '../components/account';
import Profile from '../components/user';

import sequelize = require('sequelize');
export default class UserService {
  static readUsers(): Promise<AccountModel[]> {
    return db.AccountModel.findAll({
      attributes: [
        'firstName',
        'lastName',
        'gender',
        'phone',
        'email',
        'avatar',
        'address',
        'cityCode',
        'districtCode',
        'wardCode',
      ],
      include: ['profile'],
    });
  }

  static readUser(username: string): Promise<AccountModel | null> {
    return db.AccountModel.findOne({
      where: {
        username,
      },
      include: ['profile'],
    });
  }

  static async createUser(account: Account, profile: Profile, transaction: sequelize.Transaction): Promise<AccountModel> {
    account.password = await auth.hashPassword(account.password);
    
    const temp1 = await db.AccountModel.create(
      {
        ...account,
        profile: profile
      },
      {
        include: ['profile'],
        transaction
      }
      );
    // profile.accountId =temp1.id;
    // const temp2 = await db.ProfileModel.create({
    //   ...profile
    // },
    // {
    //   transaction
    // }
    // );
    return temp1;
  }

  static async updateProfile(id: string, updateUser: userInterface, transaction: sequelize.Transaction): Promise<ProfileModel[]> {
    const [_, data] = await db.ProfileModel.update(updateUser, {
      where: {
        accountId: id
      },
      transaction: transaction,
      returning: true
    });
    
    return data;
  }

  static async updateAccount(username: string, updateAccount: Account, transaction: sequelize.Transaction): Promise<AccountModel[]> {
    const password = await auth.hashPassword(updateAccount.password);
    const [_,userData] = await db.AccountModel.update({password}, {
      where: {
        username,
      },
      transaction: transaction
    });
    return userData;
  }

  static deleteUser(id: string | null, transaction: sequelize.Transaction): Promise<number> {
    return db.ProfileModel.destroy({
      where: {
        account_id: id,
      },
      transaction,
    });
  }

  static deleteAccount(username: string, transaction: sequelize.Transaction): Promise<number> {
    return db.AccountModel.destroy({
      where: {
        username,
      },
      transaction,
    });
  }
}
