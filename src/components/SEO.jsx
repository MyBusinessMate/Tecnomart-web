import { useEffect } from 'react';

const BASE_URL = 'https://tecnomart.in';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TecnoMart',
  legalName: 'Tecno Mart Technologies Private Limited',
  url: BASE_URL,
  logo: `${BASE_URL}/webp/logo.webp`,
  description: "Hyderabad's highest-rated authorized electronics retailer and certified hardware service specialist for flagship smartphones, creator laptops, custom gaming PCs, and genuine accessories.",
  telephone: '+919010667726',
  email: 'support@tecnomart.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7 Tombs Road, Opposite Fortune Toyota Service, Tolichowki',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500008',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/tecnomarthyd',
    'https://www.instagram.com/tecnomart.hyd',
    'https://twitter.com/tecnomart_hyd',
    'https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Opposite+Fortune+Toyota+Service+Center+7+Tombs+Road+Tolichowki+Hyderabad'
  ],
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'TecnoMart — Best Tech Store & Service Center in Hyderabad',
  image: `${BASE_URL}/webp/logo.webp`,
  '@id': `${BASE_URL}/#store`,
  url: BASE_URL,
  telephone: '+919010667726',
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking, No-Cost EMI',
  areaServed: [
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Secunderabad' },
    { '@type': 'AdministrativeArea', name: 'Telangana' }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7 Tombs Road, Opposite Fortune Toyota Service, Tolichowki',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500008',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.4045,
    longitude: 78.4110,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:30',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1480',
    bestRating: '5',
    worstRating: '1',
  },
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TecnoMart Hyderabad',
  url: BASE_URL,
  description: 'Best Tech Store in Hyderabad for Flagship Smartphones, MacBooks, Creator Laptops, Custom Liquid-Cooled Gaming PCs & Same-Day Certified Repairs.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/mobiles?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export function createProductSchema(product, canonicalUrl) {
  if (!product) return null;
  const imageUrl = product.images?.[0]
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : `${BASE_URL}${product.images[0]}`
    : `${BASE_URL}/webp/logo.webp`;

  const numericPrice = product.rawPrice || Number(String(product.price || '0').replace(/[^0-9]/g, '')) || 9999;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.tagline || `${product.name} — genuine Indian retail unit available at TecnoMart Tolichowki, Hyderabad with official warranty and same-day express delivery.`,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'TecnoMart',
    },
    sku: product.id || product.slug,
    mpn: product.slug,
    url: canonicalUrl,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: numericPrice,
      itemCondition: product.slug?.includes('refurbished') ? 'https://schema.org/RefurbishedCondition' : 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
      priceValidUntil: '2026-12-31',
      seller: {
        '@type': 'Organization',
        name: 'TecnoMart',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(product.rating || 4.8),
      reviewCount: String(product.reviewCount || 140),
      bestRating: '5',
      worstRating: '1',
    },
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
  title = '',
  description = '',
  keywords = '',
  canonical = '',
  canonicalUrl = '',
  ogType = 'website',
  ogImage = `${BASE_URL}/webp/logo.webp`,
  ogImageAlt = '',
  noindex = false,
  schema = null,
  breadcrumbs = null,
}) {
  useEffect(() => {
    // 1. Format Title
    const formattedTitle = title
      ? title.includes('TecnoMart')
        ? title
        : `${title} | TecnoMart Hyderabad`
      : 'TecnoMart — Best Tech Store in Hyderabad | Mobiles, Laptops, Gaming PCs & Repairs';

    document.title = formattedTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
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
      "Best tech store in Hyderabad for Apple iPhones, MacBooks, gaming laptops, custom PCs, and same-day certified hardware repairs in Tolichowki. 100% genuine units with official tax invoice & warranty.";
    setMeta('name', 'description', description || defaultDesc);

    // 4. Meta Keywords
    const defaultKeywords =
      "best tech store in Hyderabad, best mobile shop in Hyderabad, best laptop store in Hyderabad, best gaming PC builders in Hyderabad, best computer repair Tolichowki, buy iPhone 16 Pro Max Hyderabad, buy MacBook Pro Hyderabad, certified refurbished laptops Hyderabad, same day mobile repair Hyderabad, custom liquid cooled PC";
    setMeta('name', 'keywords', keywords || defaultKeywords);

    // 5. Canonical URL
    const activeCanonical = canonical || canonicalUrl;
    const canonicalHref = activeCanonical
      ? activeCanonical.startsWith('http')
        ? activeCanonical
        : `${BASE_URL}${activeCanonical}`
      : BASE_URL;

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalHref);

    // 6. Robots & Indexing
    setMeta(
      'name', 
      'robots', 
      noindex 
        ? 'noindex, nofollow' 
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 7. Local Hyderabad Geo-Targeting Tags
    setMeta('name', 'geo.region', 'IN-TG');
    setMeta('name', 'geo.placename', 'Tolichowki, Hyderabad, Telangana, India');
    setMeta('name', 'geo.position', '17.4045;78.4110');
    setMeta('name', 'ICBM', '17.4045, 78.4110');
    setMeta('name', 'author', 'TecnoMart Technologies Pvt Ltd');
    setMeta('name', 'publisher', 'https://tecnomart.in');

    // 8. Open Graph / Social
    const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:description', description || defaultDesc);
    setMeta('property', 'og:url', canonicalHref);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', resolvedOgImage);
    setMeta('property', 'og:image:alt', ogImageAlt || `${formattedTitle} — TecnoMart Tolichowki`);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:site_name', 'TecnoMart Hyderabad');
    setMeta('property', 'og:locale', 'en_IN');

    // 9. Twitter / X Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@tecnomart_hyd');
    setMeta('name', 'twitter:creator', '@tecnomart_hyd');
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:description', description || defaultDesc);
    setMeta('name', 'twitter:image', resolvedOgImage);
    setMeta('name', 'twitter:image:alt', ogImageAlt || `${formattedTitle} — TecnoMart Tolichowki`);

    // 10. JSON-LD Structured Data Schema
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
      // Clean-up hook for route changes
    };
  }, [title, description, keywords, canonical, canonicalUrl, ogType, ogImage, ogImageAlt, noindex, schema, breadcrumbs]);

  return null;
}
