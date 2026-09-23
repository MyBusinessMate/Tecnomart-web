import { useEffect } from 'react';

const BASE_URL = 'https://www.tecnomart.in';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'TecnoMart',
  legalName: 'Tecno Mart Technologies Private Limited',
  url: BASE_URL,
  logo: `${BASE_URL}/webp/logo.webp`,
  description: "Hyderabad's highest-rated authorized electronics retailer and certified hardware service specialist for flagship smartphones, creator laptops, custom gaming PCs, and genuine accessories.",
  telephone: '+919866388870',
  email: 'support@tecnomart.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7 Tombs Rd, Raghava Colony, Neeraj Colony, Toli Chowki',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500008',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/tecnomarthyd',
    'https://www.instagram.com/tecnomart.hyd',
    'https://twitter.com/tecnomart_hyd',
    'https://maps.app.goo.gl/8ZeEuSuASBZwx1Ci7?g_st=ac'
  ],
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'TecnoMart — Best Tech Store & Service Center in Hyderabad',
  image: `${BASE_URL}/webp/logo.webp`,
  '@id': `${BASE_URL}/#store`,
  url: BASE_URL,
  telephone: '+919866388870',
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
    streetAddress: '7 Tombs Rd, Raghava Colony, Neeraj Colony, Toli Chowki',
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
  sameAs: [
    'https://www.facebook.com/tecnomarthyd',
    'https://www.instagram.com/tecnomart.hyd',
    'https://twitter.com/tecnomart_hyd',
    'https://maps.app.goo.gl/8ZeEuSuASBZwx1Ci7?g_st=ac'
  ]
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
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
  const activeRating = Number(product.rating) || 4.8;
  const activeReviewCount = Number(product.reviewCount) || 120;

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
      priceValidUntil: '2027-12-31',
      seller: {
        '@type': 'Organization',
        name: 'TecnoMart',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnInStore',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
          addressRegion: ['TG', 'AP'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'd',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(activeRating),
      reviewCount: String(activeReviewCount),
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

export function createFAQSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createItemListSchema(items, categoryName, categoryUrl) {
  if (!items || !items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName} at TecnoMart Hyderabad`,
    url: categoryUrl ? (categoryUrl.startsWith('http') ? categoryUrl : `${BASE_URL}${categoryUrl}`) : BASE_URL,
    itemListElement: items.slice(0, 30).map((item, idx) => {
      let resolvedUrl = `${BASE_URL}/mobiles/${item.slug || ''}`;
      if (item.url) {
        resolvedUrl = item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`;
      } else if (item.category && typeof item.category === 'string') {
        const cat = item.category.toLowerCase();
        if (cat.includes('laptop')) resolvedUrl = `${BASE_URL}/laptops/${item.slug}`;
        else if (cat.includes('gaming')) resolvedUrl = `${BASE_URL}/gaming/${item.slug}`;
        else if (cat.includes('accessor')) resolvedUrl = `${BASE_URL}/accessories/${item.slug}`;
        else if (cat.includes('refurbish')) resolvedUrl = `${BASE_URL}/refurbished/${item.slug}`;
        else resolvedUrl = `${BASE_URL}/mobiles/${item.slug}`;
      } else if (item.type) {
        resolvedUrl = `${BASE_URL}/${item.type}/${item.slug}`;
      }
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: resolvedUrl,
      };
    }),
  };
}

export function createServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Electronics & Computer Hardware Repair Service',
    provider: {
      '@type': 'ElectronicsStore',
      name: 'TecnoMart',
      url: BASE_URL,
      telephone: '+919866388870',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7 Tombs Rd, Raghava Colony, Neeraj Colony, Toli Chowki',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500008',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Secunderabad' },
      { '@type': 'AdministrativeArea', name: 'Telangana' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Certified Hardware Repair Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Smartphone OLED Screen & Glass Replacement',
            description: 'Same-day genuine display replacement with official warranty in Tolichowki.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            price: '1499',
            minPrice: '1499',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Laptop & MacBook Motherboard Chip-Level Repair',
            description: 'BGA reballing, power IC replacement, and liquid damage recovery.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            price: '1999',
            minPrice: '1999',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'High-Capacity Battery Replacement',
            description: 'Certified battery installation with 6-month health warranty.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            price: '999',
            minPrice: '999',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gaming PC Assembly & Deep Cleaning',
            description: 'Cable management, stress testing, and thermal paste replacement.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            price: '1499',
            minPrice: '1499',
          },
        },
      ],
    },
  };
}

export function createArticleSchema(article) {
  if (!article) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || article.summary,
    image: article.coverImage?.startsWith('http') ? article.coverImage : `${BASE_URL}${article.coverImage || '/webp/logo.webp'}`,
    datePublished: article.publishedAt || '2026-09-14',
    dateModified: article.updatedAt || article.publishedAt || '2026-09-18',
    author: {
      '@type': 'Organization',
      name: 'TecnoMart Hardware Specialists',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TecnoMart',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/webp/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blogs/${article.slug}`,
    },
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
  robots = '',
  schema = null,
  breadcrumbs = null,
}) {
  useEffect(() => {
    // 1. Format Title
    const formattedTitle = title
      ? title.includes('TecnoMart')
        ? title
        : `${title} | TecnoMart Hyderabad`
      : 'TecnoMart | Tech Store in Hyderabad';

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
      "TecnoMart in Tolichowki, Hyderabad offers smartphones, MacBooks, gaming laptops, custom PC builds, and certified repair services with official warranty.";
    setMeta('name', 'description', description || defaultDesc);

    // 4. Meta Keywords
    const defaultKeywords =
      "best tech store in Hyderabad, best mobile shop in Hyderabad, best laptop store in Hyderabad, best gaming PC builders in Hyderabad, best computer repair Tolichowki, buy iPhone 16 Pro Max Hyderabad, buy MacBook Pro Hyderabad, certified refurbished laptops Hyderabad, same day mobile repair Hyderabad, custom liquid cooled PC";
    setMeta('name', 'keywords', keywords || defaultKeywords);

    // 5. Canonical URL
    let activeCanonical = canonical || canonicalUrl;
    if (activeCanonical && activeCanonical.startsWith('https://tecnomart.in')) {
      activeCanonical = activeCanonical.replace('https://tecnomart.in', BASE_URL);
    }
    const canonicalHref = activeCanonical
      ? activeCanonical.startsWith('http')
        ? activeCanonical
        : `${BASE_URL}${activeCanonical.startsWith('/') ? activeCanonical : `/${activeCanonical}`}`
      : BASE_URL;

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalHref);

    // 6. Robots & Indexing (Strict Fail-Safe)
    const isExcluded = Boolean(noindex) || (typeof robots === 'string' && robots.toLowerCase().includes('noindex'));
    setMeta(
      'name', 
      'robots', 
      isExcluded 
        ? 'noindex, nofollow' 
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 7. Local Hyderabad Geo-Targeting Tags
    setMeta('name', 'geo.region', 'IN-TG');
    setMeta('name', 'geo.placename', 'Tolichowki, Hyderabad, Telangana, India');
    setMeta('name', 'geo.position', '17.4045;78.4110');
    setMeta('name', 'ICBM', '17.4045, 78.4110');
    setMeta('name', 'author', 'TecnoMart Technologies Pvt Ltd');
    setMeta('name', 'publisher', 'https://www.tecnomart.in');

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
  }, [title, description, keywords, canonical, canonicalUrl, ogType, ogImage, ogImageAlt, noindex, robots, schema, breadcrumbs]);

  return null;
}
