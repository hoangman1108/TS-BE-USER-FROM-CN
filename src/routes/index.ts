// import departmentRoute from './department.route';
import userRoute from './user.routes';
import actionRoute from './action.routes';
import roleRoute from './role.routes';
import locationRoute from './location.routes';
import authRoute from './auth.routes';


import express = require('express');
const router = express.Router();

router.use('/users', userRoute);
router.use('/actions', actionRoute);
router.use('/roles', roleRoute);
router.use('/locations', locationRoute);
router.use('/auth', authRoute);

export default router;
