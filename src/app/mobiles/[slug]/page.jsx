import { MOBILES_DATA } from '@/data/products';
import MobileDetailClient from './MobileDetailClient';

export function generateStaticParams() {
  return MOBILES_DATA.map((product) => ({
    slug: product.slug,
  }));
}

export default async function MobileDetailPage({ params }) {
  const { slug } = await params;
  return <MobileDetailClient slug={slug} />;
}
