export const DATABASES = {
  UG: process.env.UG_DB_NAME!,
} as const;

export type DatabaseName =
  keyof typeof DATABASES;