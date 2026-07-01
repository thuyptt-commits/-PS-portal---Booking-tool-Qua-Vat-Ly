import { executeQuery } from '../postgres';
import { Category } from '../types/category.type';

export class CategoryRepository {

  static async getById(
    id: number
  ): Promise<Category | undefined> {

    const result =
      await executeQuery<Category>(
        'UC',
        `
        SELECT *
        FROM public.tbl_categories
        WHERE id = $1
        `,
        [id]
      );

    return result[0];
  }
}