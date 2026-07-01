// tests/utils/DBUrGift/types/brand_office.type.ts

export interface BrandOffice {
  id: number; // int(11) unsigned, PRI, auto_increment
  store_id: string | null; // varchar(70)
  brand_id: number; // int(11), MUL
  city_id: number; // int(11), MUL
  district_id: number; // int(11)
  ward_id: number; // int(11)
  street_id: number; // int(11)
  code: string | null; // varchar(4)
  title: string | null; // varchar(255)
  address: string | null; // varchar(1024)
  address_en: string | null; // varchar(1024)
  address2: string | null; // varchar(1024)
  title_city: string | null; // varchar(70)
  title_district: string | null; // varchar(70)
  title_ward: string | null; // varchar(70)
  title_street: string | null; // varchar(70)
  number: string | null; // varchar(255)
  image: string | null; // varchar(255)
  phone: string | null; // varchar(300)
  sort: number; // int(11)
  synuser: number; // tinyint(1)
  latitude: number; // decimal(10,5), MUL
  longitude: number; // decimal(10,5), MUL
  geo: string | null; // text
  metadata: string | null; // text
  isApply: number; // tinyint(1)
  created: number; // int(11)
  status: number; // tinyint(1), Not Null
  tax_id: number; // int(11)
  updated: number; // int(11)
  created_by: string; // varchar(255), Not Null
  updated_by: string | null; // varchar(255)
  deleted_at: number; // int(11)
  deleted_by: string | null; // varchar(255)
  address_new: string | null; // varchar(1024)
  address_en_new: string | null; // varchar(1024)
  title_city_new: string | null; // varchar(70)
  title_ward_new: string | null; // varchar(70)
  city_new_id: number | null; // int(11)
  ward_new_id: number | null; // int(11)
}