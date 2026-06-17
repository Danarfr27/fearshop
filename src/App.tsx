import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import NoiseOverlay from './components/NoiseOverlay';
import HeroSection from './sections/HeroSection';
import ProductGridSection from './sections/ProductGridSection';
import HighlightSection from './sections/HighlightSection';
import ProductListSection from './sections/ProductListSection';
import FeatureDeepDiveSection from './sections/FeatureDeepDiveSection';
import CheckoutSection from './sections/CheckoutSection';
import FooterSection from './sections/FooterSection';
import BarcodeModal from './components/BarcodeModal';

gsap.registerPlugin(ScrollTrigger);

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  barcode: string;
  code: string;
}

export const products: Product[] = [
  { id: 1, name: 'FIRDHAN GPT', price: 100000, originalPrice: 150000, rating: 5, image: '/images/product1.jpg', barcode: '/barcodes/barcode1.png', code: 'FE4R-CHA-EXC-99K' },
  { id: 2, name: 'GALIRUS TOOLS', price: 860000, originalPrice: 1000000, rating: 5, image: '/images/product2.jpg', barcode: '/barcodes/barcode2.png', code: 'FE4R-CHA-STD-55K' },
  { id: 3, name: '', price: 75000, originalPrice: 100000, rating: 5, image: '/images/product3.jpg', barcode: '/barcodes/barcode3.png', code: 'FE4R-DDoS-DYX-25K' },
  { id: 4, name: 'SINCE CNC', price: 50000, originalPrice: 100000, rating: 4, image: '/images/product4.jpg', barcode: '/barcodes/barcode4.png', code: 'FE4R-CNC-SNC-50K' },
  { id: 5, name: 'CRAXSRAT V7.8', price: 120000, originalPrice: 2550000, rating: 5, image: '/images/product5.jpg', barcode: '/barcodes/barcode5.png', code: 'FE4R-RAT-CRX-120K' },
  { id: 6, name: 'VIP RAT', price: 40000, originalPrice: 45000, rating: 3, image: '/images/product6.jpg', barcode: '/barcodes/barcode6.png', code: 'FE4R-RAT-VIP-40K' },
];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setIsBarcodeModalOpen(true);
  };

  const handlePurchaseComplete = (product: Product) => {
    setPurchasedProduct(product);
    setIsBarcodeModalOpen(true);
  };

  const closeBarcodeModal = () => {
    setIsBarcodeModalOpen(false);
    setSelectedProduct(null);
    setPurchasedProduct(null);
  };

  return (
    <div ref={mainRef} className="relative bg-[#0B0E10] min-h-screen">
      <NoiseOverlay />
      <Navigation />

      <main className="relative">
        <HeroSection className="z-10" />
        <ProductGridSection
          className="z-10"
          onBuyClick={handleBuyClick}
        />
        <HighlightSection className="z-20" />
        <ProductListSection
          className="z-10"
          onBuyClick={handleBuyClick}
        />
        <FeatureDeepDiveSection className="z-30" />
        <CheckoutSection
          className="z-40"
          onPurchaseComplete={handlePurchaseComplete}
        />
        <FooterSection className="z-10" />
      </main>

      {isBarcodeModalOpen && (
        <BarcodeModal
          product={purchasedProduct || selectedProduct}
          onClose={closeBarcodeModal}
          isPurchaseComplete={!!purchasedProduct}
        />
      )}
    </div>
  );
}

export default App;
