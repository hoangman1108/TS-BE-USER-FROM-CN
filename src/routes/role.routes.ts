import roleController from '../controllers/role.controller';

import express = require('express');
const router = express.Router();

router.route('/')
  .get(
    roleController.read(roleController.readRoles),
  )
  .post(
    roleController.create(roleController.createRole),
  );

router.route('/:code')
  .get(
    roleController.read(roleController.readRole)
  )
  .put(
    roleController.update(roleController.updateRole),
  )
  .delete(
    // validate
    roleController.delete(roleController.deleteRole),
  );

router.route('/actions')
  .get(
    roleController.read(roleController.readRolesAndActions)
  );


export default router;
