export interface Product {
  id: string;
  title: string;
  summary: string;
  description?: string;
  price: string;
  imageUrl: string;
  images?: string[];
  category: string;
  compatibilityTags?: string[];
  features?: string[];
  specs?: Record<string, string>;
  isNew?: boolean;
  isBestSeller?: boolean;
  amazonUrl: string;
  flipkartUrl: string;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  imageUrl?: string;
  count?: number;
  description?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  productIds: string[];
}

export interface Setup {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  productIds: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatarUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  tag?: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
