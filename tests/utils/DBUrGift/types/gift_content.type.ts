// tests/utils/DBUrGift/types/gift_content.type.ts

export interface GiftContent {
  id: number; // int(11) unsigned, PRI, auto_increment
  lang: string | null; // longtext
  gift_id: number | null; // bigint(20), MUL
  gift_detail_id: number | null; // bigint(20)
  title: string | null; // longtext
  note: string | null; // longtext
  content: string | null; // longtext
  status: number | null; // int(11), MUL
  created_at: number | null; // bigint(20)
  updated_at: number | null; // bigint(20)
  created_by: string; // varchar(255), Not Null
  updated_by: string | null; // varchar(255)
  deleted_at: number | null; // int(11)
  deleted_by: string | null; // varchar(255)
}