import { ACCESSORIES_DATA } from '@/data/products';
import AccessoryDetailClient from './AccessoryDetailClient';

export function generateStaticParams() {
  return ACCESSORIES_DATA.map((item) => ({
    slug: item.slug,
  }));
}

export default async function AccessoryDetailPage({ params }) {
  const { slug } = await params;
  return <AccessoryDetailClient slug={slug} />;
}
