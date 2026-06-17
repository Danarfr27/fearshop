import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const bottomStripRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set([titleRef.current, taglineRef.current, ctaRef.current, cardRef.current, bottomStripRef.current, labelRef.current], {
        opacity: 0,
      });
      gsap.set(leftLineRef.current, { scaleY: 0, transformOrigin: 'top' });
      gsap.set(titleRef.current, { x: '-12vw' });
      gsap.set(taglineRef.current, { y: '3vh' });
      gsap.set(ctaRef.current, { y: '3vh' });
      gsap.set(cardRef.current, { x: '12vw', rotateY: 8 });
      gsap.set(bottomStripRef.current, { y: '2vh' });
      gsap.set(labelRef.current, { x: '-2vw' });

      // Animation sequence
      tl.to(leftLineRef.current, { scaleY: 1, opacity: 1, duration: 0.6 }, 0)
        .to(labelRef.current, { x: 0, opacity: 1, duration: 0.5 }, 0.1)
        .to(titleRef.current, { x: 0, opacity: 1, duration: 0.7 }, 0.15)
        .to(taglineRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.35)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.5)
        .to(cardRef.current, { x: 0, rotateY: 0, opacity: 1, duration: 0.85 }, 0.25)
        .to(bottomStripRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.to([titleRef.current, taglineRef.current, ctaRef.current, cardRef.current, bottomStripRef.current, labelRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              duration: 0.3,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        titleRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [taglineRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '18vw', rotateY: -10, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [leftLineRef.current, labelRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        bottomStripRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCheckout = () => {
    const element = document.getElementById('checkout');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`pinned-section bg-[#0B0E10] flex items-center justify-center ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, #11181C 0%, #0B0E10 70%)',
      }}
    >
      {/* Left vertical line */}
      <div
        ref={leftLineRef}
        className="absolute left-[14vw] top-[18vh] w-[1px] h-[64vh] bg-[rgba(57,255,20,0.55)]"
      />

      {/* Left label */}
      <div
        ref={labelRef}
        className="absolute left-[6vw] top-[20vh]"
      >
        <p className="font-mono-tech text-xs text-[#39FF14] tracking-[0.2em]">
          FE4RSHOP // TERMINAL
        </p>
      </div>

      {/* Main content */}
      <div className="absolute left-[18vw] top-[22vh] max-w-[32vw]">
        <h1
          ref={titleRef}
          className="font-orbitron font-black text-hero text-[#F2F4F6] tracking-tight mb-4"
        >
          FE4R<span className="text-[#39FF14] neon-glow">SHOP</span>
        </h1>

        <p
          ref={taglineRef}
          className="text-[#A7B0B7] text-base lg:text-lg mb-8 max-w-[28vw]"
        >
          Alat canggih. Harga terjangkau. Tanpa jejak.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <button
            onClick={scrollToProducts}
            className="btn-primary flex items-center gap-2"
          >
            LIHAT PRODUK
            <ArrowRight size={16} />
          </button>
          <button
            onClick={scrollToCheckout}
            className="btn-secondary flex items-center gap-2"
          >
            CARA BELI
            <Shield size={16} />
          </button>
        </div>
      </div>

      {/* Hero product card */}
      <div
        ref={cardRef}
        className="absolute right-[6vw] top-[16vh] w-[42vw] h-[56vh] bg-[#11181C] green-border neon-border overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Card header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-[0.15em]">
            SYS.ACTIVE // PRODUK
          </p>
          <div className="flex gap-1.5">
            <div className="green-dot" />
            <div className="green-dot" />
            <div className="green-dot" />
          </div>
        </div>

        {/* Product image */}
        <img
          src="/images/hero-bg.jpg"
          alt="FE4RSHOP Featured"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Card caption */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <p className="font-mono-tech text-[10px] text-[#A7B0B7] tracking-wider">
            PANEL TOOLS // VERSI 4.2
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="font-mono-tech text-[10px] text-[#39FF14]">ONLINE</span>
          </div>
        </div>

        {/* Scan line effect */}
        <div className="scan-line" />
      </div>

      {/* Bottom metadata strip */}
      <div
        ref={bottomStripRef}
        className="absolute left-[18vw] right-[6vw] bottom-[12vh]"
      >
        <div className="w-full h-[1px] bg-[rgba(57,255,20,0.3)] mb-4" />
        <div className="flex items-center justify-between">
          <p className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider">
            STATUS: <span className="text-[#39FF14]">ONLINE</span>
          </p>
          <p className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider">
            METODE: <span className="text-[#39FF14]">QRIS / DANA</span>
          </p>
          <p className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider hidden sm:block">
            ADMIN: <span className="text-[#39FF14]">@FE4RSHOP</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
