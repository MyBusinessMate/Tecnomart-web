import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  MOBILES_DATA,
  LAPTOPS_DATA,
  ACCESSORIES_DATA,
  GAMING_DATA,
  REFURBISHED_DATA,
} from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.tecnomart.in';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/mobiles', priority: '0.9', changefreq: 'daily' },
  { path: '/laptops', priority: '0.9', changefreq: 'daily' },
  { path: '/accessories', priority: '0.8', changefreq: 'weekly' },
  { path: '/gaming', priority: '0.8', changefreq: 'weekly' },
  { path: '/refurbished', priority: '0.9', changefreq: 'daily' },
  { path: '/repairs', priority: '0.9', changefreq: 'weekly' },
  { path: '/pc-builds', priority: '0.8', changefreq: 'weekly' },
  { path: '/deals', priority: '0.9', changefreq: 'daily' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/compare', priority: '0.7', changefreq: 'weekly' },
  { path: '/emi-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/exchange', priority: '0.8', changefreq: 'weekly' },
  { path: '/corporate', priority: '0.7', changefreq: 'monthly' },
  { path: '/students', priority: '0.7', changefreq: 'monthly' },
  { path: '/sitemap', priority: '0.6', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
];

const BLOG_SLUGS = [
  'iphone-16-pro-vs-galaxy-s24-ultra-hyderabad',
  'how-to-spot-fake-apple-accessories',
];

function generateSitemap() {
  const urls = [];

  // 1. Static Pages
  STATIC_ROUTES.forEach((route) => {
    urls.push({
      loc: `${DOMAIN}${route.path}`,
      lastmod: TODAY,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  });

  // 2. Product Catalogs
  const addCategoryProducts = (items, categoryPath) => {
    const seen = new Set();
    items.forEach((item) => {
      if (item.slug && !seen.has(item.slug)) {
        seen.add(item.slug);
        const img = item.images?.[0] || item.image;
        const imgUrl = img
          ? img.startsWith('http')
            ? img
            : `${DOMAIN}${img.startsWith('/') ? '' : '/'}${img}`
          : null;

        urls.push({
          loc: `${DOMAIN}/${categoryPath}/${item.slug}`,
          lastmod: TODAY,
          changefreq: 'weekly',
          priority: '0.8',
          image: imgUrl ? { loc: imgUrl, title: item.name } : null,
        });
      }
    });
  };

  addCategoryProducts(MOBILES_DATA, 'mobiles');
  addCategoryProducts(LAPTOPS_DATA, 'laptops');
  addCategoryProducts(ACCESSORIES_DATA, 'accessories');
  addCategoryProducts(GAMING_DATA, 'gaming');
  addCategoryProducts(REFURBISHED_DATA, 'refurbished');

  // 3. Blog Articles
  BLOG_SLUGS.forEach((slug) => {
    urls.push({
      loc: `${DOMAIN}/blogs/${slug}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.7',
    });
  });

  // Build XML string with Google Image sitemap namespace
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((u) => {
    const imgBlock = u.image
      ? `\n    <image:image>\n      <image:loc>${u.image.loc}</image:loc>\n      <image:title>${u.image.title.replace(/&/g, '&amp;')}</image:title>\n    </image:image>`
      : '';
    return `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${imgBlock}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

  const destPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(destPath, xml.trim() + '\n', 'utf-8');
  console.log(`Successfully generated sitemap.xml with ${urls.length} URLs (including Google Image extensions) at ${destPath}`);
}

generateSitemap();
