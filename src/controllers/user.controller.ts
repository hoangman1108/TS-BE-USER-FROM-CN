
import { Request, Response } from 'express';
import userService from '../services/user.service';
import BaseController from '.'
import db from '../models';
import User from '../components/user';
import Account from '../components/account';
import UserModel from '../models/account.model';
import ProfileModal from '../models/profile.model';
import AccountModel from '../models/account.model';
import AppError from '../components/error';


export default new class UserController extends BaseController{
  async readUsers(req: Request, res: Response): Promise<UserModel[]> {
    return await userService.readUsers();
  }

  async readUser(req: Request, res: Response): Promise<UserModel | null>{
    const userData = req.params.username;
    const findUser = await userService.readUser(userData);
    return findUser;
  }

  async createUser(req: Request, res: Response): Promise<UserModel> {
    const profile: User = {
      ...req.body,
    };
    const account: Account = {
      ...req.body,
    };
    const t = await db.sequelize.transaction();
    try {
      const newUser = await userService.createUser(account, profile,t);
      if(newUser === null){
        throw new AppError("User can not create",422);
      }
      await t.commit();
      console.log(newUser);
      return newUser;
    }
    catch(error){
      t.rollback();
      throw (error);
    }
    
    
  }

  async updateUser(req: Request, res: Response): Promise<ProfileModal[]> {
    const username = req.params.account_id;
    const profile: User = {
      ...req.body,
    };
    const temp = await userService.readUser(username);

    const t = await db.sequelize.transaction();
    try{
      if (temp === null) {
        throw new AppError("User not found", 404);
      } else {
        // const updateUser =
        profile.accountId = temp.id;
        const user = await userService.updateProfile(temp.id, profile,t);
        await t.commit();
        return user;
      }
    }
    catch(error){
      await t.rollback();
      throw (error);
    }
    
  }

  async updateAccount(req:Request, res: Response){
    const t = await db.sequelize.transaction();
    try{ 
      const { username } = req.params;
      const account: Account = {
        ...req.body,
      };
      const change = await userService.updateAccount(username, account, t);
      await t.commit();
      return change;
    }
    catch(error){
      await t.rollback();
      throw (error);
    }
  }

  async deleteUser(req: Request,res: Response): Promise<number> {
    const t = await db.sequelize.transaction();
    try {
      const { username } = req.params;
      const account = await userService.readUser(username);
      if (account === null) {
        throw new AppError("User not found",404);
      } else {
         const userDelete = await userService.deleteUser(account.id, t);
         const accountDelete = await userService.deleteAccount(username,t);
      }
      await t.commit();
       
    } catch (error) {
      await t.rollback();
      throw(error);
    }
    return 1;

  }
}