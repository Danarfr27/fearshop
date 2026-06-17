import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { products } from '../App';
import type { Product } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface ProductListSectionProps {
  className?: string;
  onBuyClick: (product: Product) => void;
}

const ProductListSection = ({ className = '', onBuyClick }: ProductListSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: '6vh', opacity: 0 },
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

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: '22vh', rotateX: 18, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 45%',
              scrub: true,
            },
          }
        );

        // Parallax inside cards
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: -10 },
            {
              y: 10,
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="list"
      className={`relative bg-[#0B0E10] py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <p className="font-mono-tech text-xs text-[#39FF14] tracking-[0.2em] mb-3">
            KATALOG LENGKAP
          </p>
          <h2 className="font-orbitron font-bold text-section-title text-[#F2F4F6] mb-4">
            SEMUA PRODUK
          </h2>
          <p className="text-[#A7B0B7] text-sm lg:text-base max-w-lg">
            Temukan berbagai tools, panel, dan lisensi sesuai kebutuhan operasional Anda.
          </p>
        </div>

        {/* Product List */}
        <div className="flex flex-col gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-[#11181C] green-border card-hover overflow-hidden"
              style={{ perspective: '800px' }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="relative lg:w-[40%] h-[200px] lg:h-[280px] overflow-hidden bg-[#0B0E10]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11181C]/50 hidden lg:block" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-wider">
                        ITEM.{String(product.id).padStart(2, '0')}
                      </p>
                      <div className="flex gap-1">
                        <div className="green-dot" />
                        <div className="green-dot" />
                        <div className="green-dot" />
                      </div>
                    </div>

                    <h3 className="font-orbitron font-bold text-xl lg:text-2xl text-[#F2F4F6] mb-3">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < product.rating ? 'text-[#39FF14] fill-[#39FF14]' : 'text-[#A7B0B7]'}
                        />
                      ))}
                      <span className="font-mono-tech text-xs text-[#A7B0B7] ml-2">
                        {product.rating}/5
                      </span>
                    </div>

                    <p className="text-[#A7B0B7] text-sm mb-4 line-clamp-2">
                      Produk premium dengan fitur lengkap dan dukungan teknis 24/7.
                      Garansi uang kembali jika tidak berfungsi.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="font-orbitron font-bold text-2xl text-[#39FF14]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <span className="font-mono-tech text-sm text-[#A7B0B7] line-through">
                        Rp {product.originalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => onBuyClick(product)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      BELI SEKARANG
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListSection;
