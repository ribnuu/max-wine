export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  is_discount: boolean;
  discount_percentage: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface HeroSlideFormData {
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  is_discount: boolean;
  discount_percentage: number;
  is_active: boolean;
  sort_order: number;
}
