
import check from '../components/auth';
// import authController from '../controllers/auth.controller';
import validate from '../utils/validateRequest';

import express = require('express');
const router = express.Router();
// const controller = new authController();
router.post(
  '/login',
  validate.account,
  check.account,
  //
);
router.post(
  '/logout',
);


export default router;
