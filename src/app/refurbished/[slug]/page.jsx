import { REFURBISHED_DATA } from '@/data/products';
import RefurbishedDetailClient from './RefurbishedDetailClient';

export function generateStaticParams() {
  return REFURBISHED_DATA.map((item) => ({
    slug: item.slug,
  }));
}

export default async function RefurbishedDetailPage({ params }) {
  const { slug } = await params;
  return <RefurbishedDetailClient slug={slug} />;
}
