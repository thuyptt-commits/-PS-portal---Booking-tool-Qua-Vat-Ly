import { executeQuery } from '../mysql';
import { GiftContent } from '../types/gift_content.type';

export class GiftContentRepository {

  static async getByGiftId(
    giftId: number
  ): Promise<GiftContent[]> {

    return await executeQuery<GiftContent>(
      'UG',
      `
      SELECT
          id,
          lang,
          gift_id,
          gift_detail_id,
          title,
          note,
          content,
          status,
          created_at,
          updated_at,
          created_by,
          updated_by,
          deleted_at,
          deleted_by
      FROM urdev.gift_content
      WHERE gift_id = ?
      `,
      [giftId]
    );
  }

}