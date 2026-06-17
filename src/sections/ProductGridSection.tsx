import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingCart } from 'lucide-react';
import { products } from '../App';
import type { Product } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface ProductGridSectionProps {
  className?: string;
  onBuyClick: (product: Product) => void;
}

const ProductGridSection = ({ className = '', onBuyClick }: ProductGridSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Left line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: '18vh', rotateX: 18, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
            delay: i * 0.05,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className={`relative bg-[#0B0E10] py-24 lg:py-32 ${className}`}
    >
      {/* Left vertical line */}
      <div
        ref={lineRef}
        className="absolute left-[6vw] top-[12vh] w-[1px] h-[80%] bg-[rgba(57,255,20,0.35)]"
      />

      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <p className="font-mono-tech text-xs text-[#39FF14] tracking-[0.2em] mb-3">
            DAFTAR PRODUK
          </p>
          <h2 className="font-orbitron font-bold text-section-title text-[#F2F4F6] mb-4">
            PILIH TOOLS ANDA
          </h2>
          <p className="text-[#A7B0B7] text-sm lg:text-base max-w-md">
            Koleksi tools premium dengan harga bersahabat. Semua produk telah diuji dan siap pakai.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-[#11181C] green-border card-hover overflow-hidden"
              style={{ perspective: '800px' }}
            >
              {/* Card header */}
              <div className="px-4 pt-4 flex items-center justify-between">
                <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-wider">
                  PRODUK.{String(product.id).padStart(2, '0')}
                </p>
                <div className="flex gap-1">
                  <div className="green-dot" />
                  <div className="green-dot" />
                  <div className="green-dot" />
                </div>
              </div>

              {/* Product image */}
              <div className="relative px-4 pt-2 pb-3">
                <div className="aspect-square overflow-hidden bg-[#0B0E10]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Card content */}
              <div className="px-4 pb-4">
                <h3 className="font-orbitron font-bold text-sm text-[#F2F4F6] mb-2 truncate">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < product.rating ? 'text-[#39FF14] fill-[#39FF14]' : 'text-[#A7B0B7]'}
                    />
                  ))}
                  <span className="font-mono-tech text-xs text-[#A7B0B7] ml-1">
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-orbitron font-bold text-lg text-[#39FF14]">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="font-mono-tech text-xs text-[#A7B0B7] line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onBuyClick(product)}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 py-2 text-xs"
                  >
                    <ShoppingCart size={14} />
                    BELI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer microcopy */}
        <p className="font-mono-tech text-[10px] text-[#A7B0B7] mt-8 opacity-60">
          * Harga dapat berubah sewaktu-waktu.
        </p>
      </div>
    </section>
  );
};

export default ProductGridSection;
