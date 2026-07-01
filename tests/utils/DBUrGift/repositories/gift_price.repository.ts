import { executeQuery } from '../mysql';
import { GiftPrice } from '../types/gift_price.type';

export class GiftPriceRepository {

  static async getByGiftDetailId(
    giftDetailId: number
  ): Promise<GiftPrice[]> {

    return await executeQuery<GiftPrice>(
      'UG',
      `
      SELECT *
      FROM urdev.gift_price
      WHERE gift_detail_id = ?
      `,
      [giftDetailId]
    );
  }

}