import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Shield, QrCode, CreditCard, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  className?: string;
}

const FooterSection = ({ className = '' }: FooterSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const footerLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Card reveal
      gsap.fromTo(
        cardRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Watermark parallax
      gsap.fromTo(
        watermarkRef.current,
        { y: -20 },
        {
          y: 20,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Footer line draw
      gsap.fromTo(
        footerLineRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: footerLineRef.current,
            start: 'top 95%',
            end: 'top 80%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6285156359363', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="footer"
      className={`relative bg-[#0B0E10] py-24 lg:py-32 min-h-screen flex flex-col items-center justify-center ${className}`}
    >
      {/* Watermark title */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <h2 className="font-orbitron font-black text-[20vw] text-[#F2F4F6] opacity-[0.04] whitespace-nowrap select-none">
          FE4RSHOP
        </h2>
      </div>

      {/* Center card */}
      <div
        ref={cardRef}
        className="relative w-[min(920px,88vw)] bg-[#11181C] green-border neon-border p-8 lg:p-12"
      >
        {/* Card header */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono-tech text-xs text-[#39FF14] tracking-[0.15em]">
            KONTAK ADMIN
          </p>
          <div className="flex gap-1.5">
            <div className="green-dot" />
            <div className="green-dot" />
            <div className="green-dot" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Contact info */}
          <div>
            <h3 className="font-orbitron font-bold text-2xl lg:text-3xl text-[#F2F4F6] mb-4">
              Butuh <span className="text-[#39FF14]">Bantuan?</span>
            </h3>

            <p className="text-[#A7B0B7] text-sm mb-6 leading-relaxed">
              Hubungi admin via WhatsApp untuk verifikasi dan konfirmasi pesanan. 
              Admin siap membantu 24/7.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.3)]">
                  <Phone size={18} className="text-[#39FF14]" />
                </div>
                <div>
                  <p className="font-mono-tech text-[10px] text-[#A7B0B7]">WHATSAPP</p>
                  <p className="font-mono-tech text-sm text-[#F2F4F6]">+62 851-5635-9363</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.3)]">
                  <Mail size={18} className="text-[#39FF14]" />
                </div>
                <div>
                  <p className="font-mono-tech text-[10px] text-[#A7B0B7]">EMAIL</p>
                  <p className="font-mono-tech text-sm text-[#F2F4F6]">fbfreshx11@gmail.com</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full lg:w-auto px-8 py-3 bg-[#25D366] text-white font-mono-tech text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={18} />
              CHAT ADMIN
            </button>
          </div>

          {/* Right - Trust signals */}
          <div className="space-y-4">
            <div className="p-4 bg-[rgba(57,255,20,0.05)] border border-[rgba(57,255,20,0.2)]">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={18} className="text-[#39FF14]" />
                <h4 className="font-orbitron font-bold text-sm text-[#F2F4F6]">GARANSI</h4>
              </div>
              <p className="text-[#A7B0B7] text-xs leading-relaxed">
                Garansi uang kembali 100% jika produk tidak berfungsi sesuai deskripsi.
              </p>
            </div>

            <div className="p-4 bg-[rgba(57,255,20,0.05)] border border-[rgba(57,255,20,0.2)]">
              <div className="flex items-center gap-3 mb-2">
                <QrCode size={18} className="text-[#39FF14]" />
                <h4 className="font-orbitron font-bold text-sm text-[#F2F4F6]">PEMBAYARAN</h4>
              </div>
              <p className="text-[#A7B0B7] text-xs leading-relaxed">
                Support QRIS, DANA, dan transfer bank. Proses cepat dan aman.
              </p>
            </div>

            <div className="p-4 bg-[rgba(57,255,20,0.05)] border border-[rgba(57,255,20,0.2)]">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard size={18} className="text-[#39FF14]" />
                <h4 className="font-orbitron font-bold text-sm text-[#F2F4F6]">HARGA</h4>
              </div>
              <p className="text-[#A7B0B7] text-xs leading-relaxed">
                Harga terjangkau dengan kualitas premium. Diskon khusus untuk pembelian bulk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-[6vw] pb-6">
        <div
          ref={footerLineRef}
          className="w-full h-[1px] bg-[rgba(57,255,20,0.35)] mb-4"
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono-tech text-[10px] text-[#A7B0B7] tracking-wider">
            © FE4RSHOP — HANYA MENERIMA QRIS / DANA
          </p>
          <p className="font-mono-tech text-[10px] text-[#A7B0B7] tracking-wider opacity-60">
            SECURE // ENCRYPTED // TRUSTED
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
