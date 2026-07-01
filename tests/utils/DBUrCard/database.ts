export const DATABASES = {
  UC: process.env.ORM_URCARD_DB_NAME!,
  UG: process.env.ORM_URLOYALTY_DB_NAME!,
  US: process.env.ORM_URSTAFF_DB_NAME!,
  ORDER: process.env.ORM_ORDER_DB_NAME!,
  TRANSACTION: process.env.ORM_TRANSACTION_DB_NAME!,
  BALANCE: process.env.ORM_BALANCE_DB_NAME!,
  PAYMENT: process.env.ORM_PAYMENT_DB_NAME!,
} as const;

export type DatabaseName =
  keyof typeof DATABASES;