import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Headphones, RefreshCw, CreditCard, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureDeepDiveSectionProps {
  className?: string;
}

const features = [
  {
    icon: Headphones,
    title: 'DUKUNGAN 24/7',
    description: 'Admin merespons dalam hitungan menit. Tim support siap membantu kapan saja.',
  },
  {
    icon: RefreshCw,
    title: 'UPDATE BERKALA',
    description: 'Produk selalu diperbarui agar tetap optimal dan kompatibel dengan sistem terbaru.',
  },
  {
    icon: CreditCard,
    title: 'BERBAGAI METODE',
    description: 'QRIS, DANA, dan transfer bank tersedia untuk kemudahan pembayaran.',
  },
];

const FeatureDeepDiveSection = ({ className = '' }: FeatureDeepDiveSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightCardRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0% - 30%)
      // Left line draw
      scrollTl.fromTo(
        leftLineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        labelRef.current,
        { x: '-2vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Stacked cards entrance (reverse order for visual stacking effect)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(
          card,
          { x: '-35vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08 + (2 - i) * 0.04
        );
      });

      // Right card entrance
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '55vw', rotateY: -14, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Hold at 30%
      scrollTl.to({}, { duration: 0.4 });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        rightCardRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;
        scrollTl.fromTo(
          card,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.72
        );
      });

      scrollTl.fromTo(
        [leftLineRef.current, labelRef.current],
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
      id="features"
      className={`pinned-section bg-[#0B0E10] ${className}`}
    >
      {/* Left vertical divider */}
      <div
        ref={leftLineRef}
        className="absolute left-[6vw] top-[12vh] w-[1px] h-[76vh] bg-[rgba(57,255,20,0.35)]"
      />

      {/* Left label */}
      <div
        ref={labelRef}
        className="absolute left-[8vw] top-[14vh]"
      >
        <p className="font-mono-tech text-xs text-[#39FF14] tracking-[0.2em]">
          [FITUR]
        </p>
      </div>

      {/* Stacked info cards */}
      <div className="absolute left-[8vw] top-[22vh]">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute bg-[#11181C] green-border p-5 lg:p-6 w-[34vw] lg:w-[30vw]"
              style={{
                top: `${index * 3}vh`,
                left: `${index * 1.2}vw`,
                zIndex: 3 - index,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.3)]">
                  <Icon size={20} className="text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-sm text-[#F2F4F6] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#A7B0B7] text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Check indicator */}
              <div className="absolute top-4 right-4">
                <ShieldCheck size={14} className="text-[#39FF14]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Right product card */}
      <div
        ref={rightCardRef}
        className="absolute right-[6vw] top-[16vh] w-[46vw] h-[64vh] bg-[#11181C] green-border neon-border overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Card header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-[0.15em]">
            DEMONSTRASI
          </p>
          <div className="flex gap-1.5">
            <div className="green-dot" />
            <div className="green-dot" />
            <div className="green-dot" />
          </div>
        </div>

        {/* Product image */}
        <img
          src="/images/product1.jpg"
          alt="Feature Demo"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E10]/80 via-transparent to-transparent" />

        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            <p className="font-mono-tech text-xs text-[#39FF14]">SYSTEM ACTIVE</p>
          </div>
          <p className="font-mono-tech text-[10px] text-[#A7B0B7]">
            CARERAxHAT EXCLUSIVE // V4.2 BUILD 8921
          </p>
        </div>

        {/* Scan line */}
        <div className="scan-line" />
      </div>
    </section>
  );
};

export default FeatureDeepDiveSection;
