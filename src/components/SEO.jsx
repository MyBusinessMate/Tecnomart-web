import { useEffect } from 'react';

const BASE_URL = 'https://tecnomart.in';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TecnoMart',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Authorized retailer and service specialist for smartphones, laptops, custom gaming PCs, and certified repairs in Jubilee Hills, Hyderabad.',
  telephone: '+919010667726',
  email: 'support@tecnomart.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'H.No. 8-2-293/82/A/1287, Road No. 36, Jubilee Hills',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500033',
    addressCountry: 'IN',
  },
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'TecnoMart — Tech Store & Service Center',
  image: `${BASE_URL}/logo.png`,
  '@id': `${BASE_URL}/#store`,
  url: BASE_URL,
  telephone: '+919010667726',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'H.No. 8-2-293/82/A/1287, Road No. 36, Jubilee Hills',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500033',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.4319,
    longitude: 78.4073,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:30',
    },
  ],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TecnoMart',
  url: BASE_URL,
  description: 'Authorized Mobiles, Laptops, Gaming PCs & Expert Repairs in Jubilee Hills, Hyderabad.',
};

export function createProductSchema(product, canonicalUrl) {
  if (!product) return null;
  const imageUrl = product.images?.[0]
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : `${BASE_URL}${product.images[0]}`
    : `${BASE_URL}/logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.tagline || `${product.name} available for consultation and enquiry at TecnoMart Jubilee Hills, Hyderabad.`,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'TecnoMart',
    },
    url: canonicalUrl,
  };
}

export function createBreadcrumbSchema(items) {
  if (!items || !items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = `${BASE_URL}/logo.png`,
  noindex = false,
  schema,
  breadcrumbs,
}) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title
      ? title.includes('TecnoMart')
        ? title
        : `${title} | TecnoMart Hyderabad`
      : 'TecnoMart — Premium Mobiles, Laptops, Gaming PCs & Repairs in Hyderabad';

    document.title = formattedTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (attrName, attrValue, content) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 3. Meta Description
    const defaultDesc =
      'Authorized Mobiles, Laptops, Gaming PCs & Expert Repairs in Jubilee Hills, Hyderabad. Same-day delivery, official brand warranty & WhatsApp consultation.';
    setMeta('name', 'description', description || defaultDesc);

    // 4. Canonical URL
    const canonicalHref = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${BASE_URL}${canonical}`
      : BASE_URL;

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalHref);

    // 5. Robots
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 6. Open Graph
    const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:description', description || defaultDesc);
    setMeta('property', 'og:url', canonicalHref);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', resolvedOgImage);
    setMeta('property', 'og:site_name', 'TecnoMart');
    setMeta('property', 'og:locale', 'en_IN');

    // 7. Twitter / X Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:description', description || defaultDesc);
    setMeta('name', 'twitter:image', resolvedOgImage);

    // 8. JSON-LD Schema
    let scriptTag = document.getElementById('tecnomart-dynamic-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'tecnomart-dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemasToInject = [];
    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema.filter(Boolean));
      } else {
        schemasToInject.push(schema);
      }
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const bcSchema = createBreadcrumbSchema(breadcrumbs);
      if (bcSchema) schemasToInject.push(bcSchema);
    }

    if (schemasToInject.length > 0) {
      scriptTag.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject
      );
    } else {
      scriptTag.textContent = '';
    }

    return () => {
      // Optional cleanup on route transition
    };
  }, [title, description, canonical, ogType, ogImage, noindex, schema, breadcrumbs]);

  return null;
}
