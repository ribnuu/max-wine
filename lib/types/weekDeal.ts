export interface WeekDeal {
  id: string;
  title: string;
  image: string;
  link: string;
  is_active: boolean;
  is_clickable: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WeekDealFormData {
  title: string;
  image: string;
  link: string;
  is_active: boolean;
  is_clickable: boolean;
  sort_order: number;
}
