// import BaseJoi from 'joi';
import userController from '../controllers/user.controller';
import validation from '../utils/validateRequest';
import check from '../components/auth';

import express = require('express');
// import joi = require('joi');

const router = express.Router();
// listUser
router.get(
  '/',
  userController.read(userController.readUsers),
);
router.put(
  '/profiles/:account_id',
  //validation.user,
  userController.update(userController.updateUser),
);
router.get(
  '/:username',
  userController.read(userController.readUser),
);
router.post(
  '/',
  validation.user,
  //check.User,
  userController.create(userController.createUser),
);

router.put(
  '/accounts/:account_id',
  validation.editPassword,
  check.account,
  userController.update(userController.updateAccount),
);
router.delete(
  '/:username',
  userController.delete(userController.deleteUser),
);
export default router;
