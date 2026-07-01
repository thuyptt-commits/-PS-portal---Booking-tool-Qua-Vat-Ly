import { test, expect } from '@playwright/test';
import { Client } from 'pg';

test('Update Service Type for category 184', async () => {
  const client = new Client({
    host: 'postgres-urcard.urbox.dev',
    port: 15432,
    user: 'urcard',
    password: 'urbox@123!',
    database: 'uc_urcard',
  });

  try {
    await client.connect();

    console.log('✅ Connected DB');

    const updateResult = await client.query(
      `
      UPDATE public.tbl_categories
      SET
          tags = (
              SELECT array_agg(
                  CASE
                      WHEN tag LIKE 'serviceType:%'
                      THEN 'serviceType:ps_physical_gifts'
                      ELSE tag
                  END
              )
              FROM unnest(
                  CASE
                      WHEN tags IS NULL
                      THEN ARRAY['serviceType:ps_physical_gifts']::text[]

                      WHEN EXISTS (
                          SELECT 1
                          FROM unnest(tags) t
                          WHERE t LIKE 'serviceType:%'
                      )
                      THEN tags

                      ELSE array_append(
                          tags,
                          'serviceType:ps_physical_gifts'
                      )
                  END
              ) tag
          ),
          updated_at = NOW(),
          updated_by = $1
      WHERE id = $2
      RETURNING *
      `,
      [
        'playwright',
        172,
      ]
    );

    expect(updateResult.rowCount).toBe(1);

    const category = updateResult.rows[0];

    console.log(
      'UPDATED:',
      JSON.stringify(category, null, 2)
    );

    expect(category.tags).toContain(
      'serviceType:ps_physical_gifts'
    );

    // Đảm bảo chỉ có 1 serviceType
    const serviceTypes = category.tags.filter(
      (tag: string) =>
        tag.startsWith('serviceType:')
    );

    expect(serviceTypes).toEqual([
      'serviceType:ps_physical_gifts',
    ]);

  } finally {
    await client.end();
  }
});