export interface Category {
  id: number;
  title: string;
  parent_id: number | null;
  detail: string | null;
  uuid: string;
  status: string;
  params: any;
  created_at: Date;
  created_by: string;
  updated_at: Date | null;
  updated_by: string | null;
  deleted_at: Date | null;
  deleted_by: string | null;
  tags: string[] | null;
  vat: number | null;
  vat_start_date: Date | null;
  vat_end_date: Date | null;
}