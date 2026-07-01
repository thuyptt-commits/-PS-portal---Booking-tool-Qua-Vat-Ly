// tests/utils/DBUrGift/types/gift_price.type.ts

export interface GiftPrice {
  id: number; // int(11) unsigned, PRI, auto_increment
  app_id: number | null; // int(11), MUL
  gift_detail_id: number | null; // int(11), MUL
  stock_id: number | null; // int(11)
  name: string | null; // varchar(255)
  name_en: string | null; // varchar(255)
  image: string | null; // varchar(255)
  image_rectangle: string | null; // varchar(255)
  price: number | null; // int(11)
  price_promo: number | null; // int(11)
  point_promo: number | null; // int(11)
  rate_code: number | null; // float
  rate_code_name: string | null; // varchar(100)
  is_promo: number | null; // tinyint(1)
  start_promo: number | null; // int(11)
  end_promo: number | null; // int(11)
  point: number | null; // int(11)
  is_promotion_qua?: number | null; // int(11) - (Bị che một phần chữ: is_promotion_qua)
  promotion_quant?: number | null; // int(11) - (Bị che một phần chữ: promotion_quant)
  new_selling_price: number | null; // int(11)
  new_price_apply_?: number | null; // int(11) - (Bị che một phần chữ: new_price_apply_)
  rate_code_name_: string | null; // varchar(100) - (Trùng tên ở cột 13 nhưng kiểu varchar(100))
  rate_code_promo?: number | null; // decimal(11,1) - (Bị che một phần chữ: rate_code_promc)
  is_hot: number | null; // int(11)
  is_limit_quantity: number | null; // tinyint(1)
  quantity: number | null; // int(11)
  expired_type: number | null; // tinyint(1)
  expired_plus: number | null; // int(11)
  expired: number | null; // int(11)
  product_id: number | null; // int(11)
  status: number | null; // tinyint(1)
  created: number | null; // int(11)
  updated: number | null; // int(11)
  created_by: string; // varchar(255), Not Null
  updated_by: string | null; // varchar(255)
  deleted_at: number | null; // int(11)
  deleted_by: string | null; // varchar(255)
}