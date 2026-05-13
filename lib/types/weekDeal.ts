export interface WeekDeal {
  id: string;
  title: string;
  description?: string;
  image: string;
  link: string;
  discount_percentage?: number;
  original_price?: number;
  sale_price?: number;
  start_date?: string;
  end_date?: string;
  product_id?: string;
  is_active: boolean;
  is_clickable: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WeekDealFormData {
  title: string;
  description?: string;
  image: string;
  link: string;
  discount_percentage?: number;
  original_price?: number;
  sale_price?: number;
  start_date?: string;
  end_date?: string;
  product_id?: string;
  is_active: boolean;
  is_clickable: boolean;
  sort_order: number;
}
