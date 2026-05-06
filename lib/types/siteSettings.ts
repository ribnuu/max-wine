export interface SiteSettings {
  id?: string;
  email: string;
  phone: string;
  address: string;
  opening_hours_weekday: string;
  opening_hours_weekend: string;
  add_product_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}
