import { executeQuery } from '../mysql';
import { Gift } from '../types/gift.type';

export class GiftRepository {

  static async getById(
    id: number
  ): Promise<Gift | undefined> {

    const result = await executeQuery<Gift>(
      'UG',
      `
      SELECT *
      FROM urdev.gift
      WHERE id = ?
      `,
      [id]
    );

    return result[0];
  }

}