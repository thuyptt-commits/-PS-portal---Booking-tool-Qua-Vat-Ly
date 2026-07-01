// tests/utils/DBUrGift/types/gift_detail.type.ts

export interface GiftDetail {
  id: number; // int(11) unsigned, PRI, auto_increment
  product_id: number; // int(11), MUL
  cat_id: number; // int(11)
  supplier_id: number; // int(11)
  brand_id: number; // int(11)
  gift_id: number; // int(11), MUL
  brand_item_id: string | null; // varchar(255)
  physical_gift_inventory_id?: number; // int(11) - (Bị che một phần chữ: physical_gift_inve...)
  title: string; // varchar(255)
  title_detail: string | null; // varchar(255)
  price: number; // int(11)
  valuex: number; // int(11)
  price_purchase: number; // int(11)
  position: number; // tinyint(1)
  code_quantity: number; // int(11), MUL
  code_min: number; // int(11)
  code_stock: number; // int(11)
  code_willexpired: number; // int(11)
  quantity_expired: number; // tinyint(1)
  product_code: string | null; // varchar(255)
  promotion_code: string | null; // varchar(255)
  partner_sku: string | null; // varchar(255)
  inventory: number; // int(11)
  unitPrice: string; // varchar(300)
  avatar: string | null; // varchar(255)
  image: string; // varchar(300)
  image_rectangle: string | null; // varchar(255)
  is_hot: number; // tinyint(1)
  justGetOrder: number; // tinyint(1)
  isPhysical: number; // tinyint(1)
  isUnfixPrice: number; // tinyint(1)
  view: number; // int(11)
  type: number; // tinyint(1), MUL
  created: number; // int(11)
  status: number; // tinyint(1), MUL
  stock_id: number; // int(11)
  partner_stock_id: number | null; // int(11)
  updated: number; // int(11)
  created_by: string; // varchar(255), Not Null
  updated_by: string | null; // varchar(255)
  deleted_at: number; // int(11)
  deleted_by: string | null; // varchar(255)
}