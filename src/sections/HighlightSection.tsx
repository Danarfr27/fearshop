import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Smartphone, Monitor, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HighlightSectionProps {
  className?: string;
}

const HighlightSection = ({ className = '' }: HighlightSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        cardRef.current,
        { x: '-60vw', rotateY: 18, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        infoRef.current,
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        captionRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // Hold at 30%
      scrollTl.to({}, { duration: 0.4 });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        infoRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        [lineRef.current, captionRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="highlight"
      className={`pinned-section bg-[#0B0E10] ${className}`}
    >
      {/* Left product card (dominant) */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[16vh] w-[56vw] h-[64vh] bg-[#11181C] green-border neon-border overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Card header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-[0.15em]">
            FEATURED // HIGHLIGHT
          </p>
          <div className="flex gap-1.5">
            <div className="green-dot" />
            <div className="green-dot" />
            <div className="green-dot" />
          </div>
        </div>

        {/* Product image */}
        <img
          src="/images/product5.jpg"
          alt="CRAXS RAT V7.8"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E10] via-transparent to-transparent opacity-60" />

        {/* Card caption */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <p className="font-mono-tech text-xs text-[#F2F4F6] tracking-wider">
            CRAXSRAT V7.8 // PREMIUM
          </p>
          <div className="flex items-center gap-1">
            <Zap size={14} className="text-[#39FF14]" />
            <span className="font-mono-tech text-xs text-[#39FF14]">FEATURED</span>
          </div>
        </div>
      </div>

      {/* Right info block */}
      <div
        ref={infoRef}
        className="absolute right-[6vw] top-[20vh] w-[28vw]"
      >
        <p className="font-mono-tech text-xs text-[#39FF14] tracking-wider mb-4">
          [INFO]
        </p>

        <h2
          ref={titleRef}
          className="font-orbitron font-black text-2xl lg:text-4xl text-[#F2F4F6] mb-4"
        >
          CRAXS RAT <span className="text-[#39FF14]">V7.8</span>
        </h2>

        <p className="text-[#A7B0B7] text-sm mb-6 leading-relaxed">
          Akses jarak jauh dengan fitur lengkap dan antarmuka yang mudah digunakan. 
          Support multi-platform dengan stealth mode aktif.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.2)]">
            <Smartphone size={14} className="text-[#39FF14]" />
            <span className="font-mono-tech text-[10px] text-[#39FF14]">ANDROID</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.2)]">
            <Monitor size={14} className="text-[#39FF14]" />
            <span className="font-mono-tech text-[10px] text-[#39FF14]">WINDOWS</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.2)]">
            <Cloud size={14} className="text-[#39FF14]" />
            <span className="font-mono-tech text-[10px] text-[#39FF14]">CLOUD</span>
          </div>
        </div>

        <button
          onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary flex items-center gap-2"
        >
          DETAIL PRODUK
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Bottom divider line */}
      <div
        ref={lineRef}
        className="absolute left-[6vw] right-[6vw] bottom-[14vh] h-[1px] bg-[rgba(57,255,20,0.35)]"
      />

      {/* Bottom caption */}
      <div
        ref={captionRef}
        className="absolute left-[6vw] right-[6vw] bottom-[8vh] flex items-center justify-center"
      >
        <p className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider text-center">
          KOMPATIBEL: <span className="text-[#39FF14]">ANDROID / WIN / CLOUD</span>
        </p>
      </div>
    </section>
  );
};

export default HighlightSection;
