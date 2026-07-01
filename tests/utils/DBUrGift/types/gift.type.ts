// tests/utils/DBUrGift/types/gift.type.ts

export interface Gift {
  id: number;

  cat_id: number | null;
  cart_template_id: number | null;
  article_id: number | null;
  supplier_id: number | null;
  brand_id: number | null;
  city_id: number | null;
  pointu_id: number | null;
  bill_order_rule_id: number | null;

  is_auto_provider: number;

  name: string;
  image: string | null;
  images: string | null;

  sex: number;
  age_from: number;
  age_to: number;

  price_from: number;
  price_to: number;
  price: number;

  view: number;
  buyed: number;
  redeem: number;
  redeem_rate: number;

  display: number;

  code_type: number;

  isPhysical: number;

  dieukienlanding: string | null;
  huongdanlanding: string | null;

  showbarcode: number;

  type_buy_site: number;

  banner: string | null;

  expired_type: number;
  expired_plus: number;
  expired_combo_t: number;

  weight: number;

  type: number;

  needPin: number;
  needActive: number;
  needIdentity: number;
  needPhone: number;

  version: string | null;

  gift_id: number;

  cardType: number;
  sendGiftType: number;

  expired: number;

  created: number;

  status: number;

  approved_store: number;

  updated: number;

  created_by: string;
  updated_by: string | null;

  deleted_at: number;

  deleted_by: string | null;

  switch_to: number;
}