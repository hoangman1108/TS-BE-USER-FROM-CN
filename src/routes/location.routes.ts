import locationController from '../controllers/location.controller';

import express = require('express');
const router = express.Router();


router.get(
  '/cities',
  locationController.getCities,
);
router.get(
  '/cities/:city_code/districts',
  locationController.getDistricts,
);
router.get(
  '/cities/:city_code/districts/:district_code/wards',
  locationController.getWards,
);

export default router;
