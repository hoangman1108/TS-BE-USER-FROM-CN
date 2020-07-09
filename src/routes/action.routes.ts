import actionController from '../controllers/action.controller';

import express = require('express');
const router = express.Router();

router.get(
  '/',
  // validate
  actionController.list,
);
router.get(
  '/:code',
  actionController.find,
);


export default router;
