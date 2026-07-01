import { executeQuery } from '../mysql';
import { GiftDetail } from '../types/gift_detail.type';

export class GiftDetailRepository {

  static async getById(
    id: number
  ): Promise<GiftDetail | undefined> {

    const result =
      await executeQuery<GiftDetail>(
        'UG',
        `
        SELECT *
        FROM urdev.gift_detail
        WHERE id = ?
        `,
        [id]
      );

    return result[0];
  }

  static async getByGiftId(
    giftId: number
  ): Promise<GiftDetail[]> {

    return await executeQuery<GiftDetail>(
      'UG',
      `
      SELECT *
      FROM urdev.gift_detail
      WHERE gift_id = ?
      `,
      [giftId]
    );
  }

}