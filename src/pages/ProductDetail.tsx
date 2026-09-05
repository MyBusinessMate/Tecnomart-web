import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/db';

// Import Category-Specific Layouts
import { DefaultProductLayout } from './products/layouts/DefaultProductLayout';
import { MobileCoversLayout } from './products/layouts/MobileCoversLayout';
import { DeskMatsLayout } from './products/layouts/DeskMatsLayout';
import { LaptopStandsLayout } from './products/layouts/LaptopStandsLayout';
import { CableOrganizersLayout } from './products/layouts/CableOrganizersLayout';
import { MousePadsLayout } from './products/layouts/MousePadsLayout';
import { WorkspaceEssentialsLayout } from './products/layouts/WorkspaceEssentialsLayout';

export function ProductDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState(() => db.getProducts());
  
  useEffect(() => {
    const handleCmsUpdate = () => {
      setProducts(db.getProducts());
    };
    window.addEventListener('cms_update', handleCmsUpdate);
    return () => window.removeEventListener('cms_update', handleCmsUpdate);
  }, []);

  const product = products.find(p => p.id === id) || products[0] || null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
        <h1 className="text-2xl font-black uppercase tracking-widest">Product Not Found</h1>
      </div>
    );
  }

  const categories = db.getCategories();

  // Dynamic Layout Router Logic based on product.category
  switch (product.category) {
    case 'mobile-covers':
      return <MobileCoversLayout product={product} categories={categories} />;
    case 'desk-mats':
      return <DeskMatsLayout product={product} categories={categories} />;
    case 'laptop-stands':
      return <LaptopStandsLayout product={product} categories={categories} />;
    case 'cable-organizers':
      return <CableOrganizersLayout product={product} categories={categories} />;
    case 'mouse-pads':
      return <MousePadsLayout product={product} categories={categories} />;
    case 'workspace-essentials':
      return <WorkspaceEssentialsLayout product={product} categories={categories} />;
    
    default:
      // Fallback for any unknown categories
      return <DefaultProductLayout product={product} categories={categories} />;
  }
}

export default ProductDetail;
