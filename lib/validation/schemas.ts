import { z } from "zod";

const imageSourceSchema = z
  .string()
  .min(1)
  .refine((value) => value.startsWith("/") || z.string().url().safeParse(value).success, {
    message: "Image must be a valid URL or site asset path",
  });

export const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  compare_at_price: z.coerce.number().positive().nullable().optional(),
  offer_quantity: z.coerce.number().int().positive().nullable().optional(),
  offer_price: z.coerce.number().positive().nullable().optional(),
  description: z.string().trim().nullable().optional(),
  category: z.string().trim().min(1, "Category is required"),
  images: z.array(imageSourceSchema).default([]),
  stock: z.coerce.number().int().min(0),
  strength: z.string().trim().nullable().optional(),
  size: z.string().trim().nullable().optional(),
  flavor: z.string().trim().nullable().optional(),
  is_active: z.coerce.boolean().optional().default(true),
  show_price: z.coerce.boolean().optional().default(true),
  is_offer: z.coerce.boolean().optional().default(false),
  week_deal_id: z.string().trim().nullable().optional(),
});

export const productUpdateSchema = productSchema.partial();

export const heroSlideSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  subtitle: z.string().trim().min(1, "Subtitle is required"),
  description: z.string().trim().nullable().optional(),
  background_image: imageSourceSchema,
  is_discount: z.coerce.boolean().optional().default(false),
  discount_percentage: z.coerce.number().min(0).max(100).optional().default(0),
  is_active: z.coerce.boolean().optional().default(true),
  sort_order: z.coerce.number().int().min(0).optional().default(0),
});

export const heroSlideUpdateSchema = heroSlideSchema.partial();

export const weekDealSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  image: imageSourceSchema,
  link: z.string().trim().min(1, "Link is required"),
  is_active: z.coerce.boolean().optional().default(true),
  is_clickable: z.coerce.boolean().optional().default(true),
  sort_order: z.coerce.number().int().min(0).optional().default(0),
});

export const weekDealUpdateSchema = weekDealSchema.partial();
