import mysql from 'mysql2/promise';
import {
  DATABASES,
  DatabaseName,
} from './database';

export async function executeQuery<T>(
  dbName: DatabaseName,
  query: string,
  params?: any[],
): Promise<T[]> {

  const connection =
    await mysql.createConnection({
      host: 'mysql-urgift.urbox.dev',
      port: 3306,
      user: 'urtest',
      password: '52jM=i&34QyD',
      database: DATABASES[dbName],
    });

  try {
    const [rows] =
      await connection.execute(
        query,
        params
      );

    return rows as T[];
  } finally {
    await connection.end();
  }
}