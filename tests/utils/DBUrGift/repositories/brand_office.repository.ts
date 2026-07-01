import { executeQuery } from '../mysql';
import { BrandOffice } from '../types/brand_office.type';

export class BrandOfficeRepository {

  static async getByGiftId(
    giftId: number
  ): Promise<BrandOffice[]> {

    return await executeQuery<BrandOffice>(
      'UG',
      `
      SELECT
          bo.*
      FROM urdev.brand_office bo
      INNER JOIN urdev.gift_brand_office gbo
          ON bo.id = gbo.brand_office_id
      WHERE gbo.gift_id = ?
      `,
      [giftId]
    );
  }

}