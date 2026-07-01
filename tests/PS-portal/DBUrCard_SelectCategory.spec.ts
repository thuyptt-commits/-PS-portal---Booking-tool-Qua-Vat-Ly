import { test, expect } from '@playwright/test';
import { Client } from 'pg';

test('Check DB Connection', async () => {

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

    const timeResult = await client.query(`
      SELECT NOW()
    `);

    console.log('DB Time:', timeResult.rows);

    const categoryResult = await client.query(`
      select * from uc_urcard.public.tbl_categories tc where id in (184, 172, 181)
    `);

    console.log(
      'Category:',
      JSON.stringify(categoryResult.rows, null, 2)
    );

    expect(categoryResult.rows.length)
      .toBeGreaterThan(0);

  } catch (error) {
    console.error('❌ DB ERROR');
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
});