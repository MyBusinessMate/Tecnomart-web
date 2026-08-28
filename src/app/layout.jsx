import './globals.css';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import { ShopProvider } from '@/context/ShopContext';
import CartDrawer from '@/components/redesign/CartDrawer';
import CheckoutModal from '@/components/redesign/CheckoutModal';
import RepairModal from '@/components/redesign/RepairModal';
import WishlistDrawer from '@/components/redesign/WishlistDrawer';
import PWASetup from '@/components/redesign/PWASetup';
import WhatsAppWidget from '@/components/redesign/WhatsAppWidget';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#f59e0b',
};

export const metadata = {
  title: 'TecnoMart — Premium Mobiles, Laptops, Gaming PCs & Repairs in Hyderabad',
  description: 'Authorized Mobiles, Laptops, Gaming PCs & Expert Repairs in Hyderabad. Genuine parts, certified warranty & best prices.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TecnoMart',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-neutral-900 bg-white selection:bg-amber-500 selection:text-neutral-950">
        <ShopProvider>
          {children}
          <CartDrawer />
          <CheckoutModal />
          <RepairModal />
          <WishlistDrawer />
          <PWASetup />
          <WhatsAppWidget />
        </ShopProvider>
      </body>
    </html>
  );
}
