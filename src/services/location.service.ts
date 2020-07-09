
import CityModel from '../models/city.model';
import DistrictModel from '../models/district.model';
import WardModel from '../models/ward.model';

export default class LocationService {
  static listCities(): Promise<CityModel[]> {
    return CityModel.findAll();
  }

  static listDistricts(cityCode: string): Promise<DistrictModel[]> {
    return DistrictModel.findAll({
      where: {
        city_code: cityCode,
      },
    });
  }

  static listWards(district_code: string): Promise<WardModel[]> {
    return WardModel.findAll({
      where: {
        district_code,
      },
    });
  }
}
