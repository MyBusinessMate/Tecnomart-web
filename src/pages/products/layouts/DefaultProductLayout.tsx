import React from 'react';
import { Product, Category } from '../../../types';
import { BaseEcomLayout } from './BaseEcomLayout';

interface LayoutProps {
  product: Product;
  categories: Category[];
}

export function DefaultProductLayout({ product, categories }: LayoutProps) {
  return <BaseEcomLayout product={product} categories={categories} />;
}
