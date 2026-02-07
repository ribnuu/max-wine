export interface Product {
  id: string;
  name: string;
  price: number;
  compare_at_price: number | null;
  offer_quantity: number | null;
  offer_price: number | null;
  description: string | null;
  category: ProductCategory;
  images: string[];
  stock: number;
  strength: string | null;
  size: string | null;
  flavor: string | null;
  is_active: boolean;
  show_price: boolean;
  is_offer: boolean;
  week_deal_id: string | null;
  created_at: string;
  updated_at: string;
}

export type ProductCategory =
  | "Spirits"
  | "Wines"
  | "Beers & Ciders"
  | "Ready Mixed Drinks"
  | "Sweets"
  | "Vapes & E-Liquids";

export interface ProductFormData {
  name: string;
  price: number;
  compare_at_price: number | null;
  offer_quantity: number | null;
  offer_price: number | null;
  description: string;
  category: ProductCategory;
  images: string[];
  stock: number;
  strength: string;
  size: string;
  flavor: string;
  is_active: boolean;
  show_price: boolean;
  is_offer: boolean;
  week_deal_id: string | null;
}

export const CATEGORIES: ProductCategory[] = [
  "Spirits",
  "Wines",
  "Beers & Ciders",
  "Ready Mixed Drinks",
  "Sweets",
  "Vapes & E-Liquids",
];
