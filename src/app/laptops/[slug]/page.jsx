import { LAPTOPS_DATA } from '@/data/products';
import LaptopDetailClient from './LaptopDetailClient';

export function generateStaticParams() {
  return LAPTOPS_DATA.map((laptop) => ({
    slug: laptop.slug,
  }));
}

export default async function LaptopDetailPage({ params }) {
  const { slug } = await params;
  return <LaptopDetailClient slug={slug} />;
}
