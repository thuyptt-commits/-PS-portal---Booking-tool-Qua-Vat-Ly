import { Client } from 'pg';
import {
  DATABASES,
  DatabaseName,
} from './database';

export async function executeQuery<T>(
  dbName: DatabaseName,
  query: string,
  params?: any[],
): Promise<T[]> {

  const client = new Client({
    host: process.env.ORM_HOST,
    port: Number(process.env.ORM_PORT),
    user: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    database: DATABASES[dbName],
  });

  try {
    await client.connect();

    const result = await client.query(
      query,
      params
    );

    return result.rows as T[];
  } finally {
    await client.end();
  }
}