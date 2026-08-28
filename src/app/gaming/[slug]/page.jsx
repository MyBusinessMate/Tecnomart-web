import { GAMING_DATA } from '@/data/products';
import GamingDetailClient from './GamingDetailClient';

export function generateStaticParams() {
  return GAMING_DATA.map((rig) => ({
    slug: rig.slug,
  }));
}

export default async function GamingDetailPage({ params }) {
  const { slug } = await params;
  return <GamingDetailClient slug={slug} />;
}
