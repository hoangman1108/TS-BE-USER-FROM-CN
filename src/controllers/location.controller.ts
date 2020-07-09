import { Request, Response } from 'express';
import locationService from '../services/location.service';

export default class AddressController {
  static async getCities(res: Response): Promise<void> {
    const cities = await locationService.listCities();
    res.status(200).json(cities);
  }

  static async getDistricts(req: Request): Promise<void> {
    // const districts =
    const cityCode = typeof(req.query.cityCode) === 'string' ? req.query.cityCode : '';
    await locationService.listDistricts(cityCode);
  }

  static async getWards(req: Request): Promise<void> {
    const wardCode = typeof(req.query.districtCode) === 'string' ? req.query.districtCode : '';
    await locationService.listWards(wardCode);
  }
}
