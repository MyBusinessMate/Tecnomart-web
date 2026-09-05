import React from 'react';
import { Product, Category } from '../../../types';
import { BaseEcomLayout } from './BaseEcomLayout';

interface LayoutProps {
  product: Product;
  categories: Category[];
}

export function DeskMatsLayout({ product, categories }: LayoutProps) {
  // You can extend or pass custom props to BaseEcomLayout here if needed
  return <BaseEcomLayout product={product} categories={categories} />;
}
