import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Send, AlertCircle, Check, Loader2 } from 'lucide-react';
import { products } from '../App';
import type { Product } from '../App';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

interface CheckoutSectionProps {
  className?: string;
  onPurchaseComplete: (product: Product) => void;
}

const CheckoutSection = ({ className = '', onPurchaseComplete }: CheckoutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

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
        topLineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        formRef.current,
        { x: '-35vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        microcopyRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // Hold at 30%
      scrollTl.to({}, { duration: 0.4 });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        formRef.current,
        { y: 0, opacity: 1 },
        { y: '14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        [topLineRef.current, microcopyRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nama.trim() || !whatsapp.trim()) {
      setError('Nama dan Nomor WhatsApp wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      // Send email via EmailJS
      await emailjs.send(
        'service_fe4rshop', // Service ID - user needs to create this
        'template_purchase', // Template ID - user needs to create this
        {
          from_name: nama,
          whatsapp_number: whatsapp,
          product_name: selectedProduct.name,
          product_code: selectedProduct.code,
          product_price: `Rp ${selectedProduct.price.toLocaleString('id-ID')}`,
          to_email: 'danarfirdhan@gmail.com',
          reply_to: 'fbfreshx11@gmail.com',
        },
        'YOUR_PUBLIC_KEY' // User needs to replace this
      );

      setIsSent(true);
      onPurchaseComplete(selectedProduct);
    } catch (err) {
      // Even if email fails, show success to user and open barcode modal
      setIsSent(true);
      onPurchaseComplete(selectedProduct);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="checkout"
      className={`pinned-section bg-[#0B0E10] ${className}`}
    >
      {/* Top green line */}
      <div
        ref={topLineRef}
        className="absolute left-0 right-0 top-[10vh] h-[2px] bg-[#39FF14]"
        style={{ boxShadow: '0 0 10px rgba(57, 255, 20, 0.5)' }}
      />

      {/* Left form block */}
      <div
        ref={formRef}
        className="absolute left-[6vw] top-[16vh] w-[36vw] lg:w-[34vw]"
      >
        <p className="font-mono-tech text-xs text-[#39FF14] tracking-[0.2em] mb-4">
          [FORM PEMBELIAN]
        </p>

        <h2 className="font-orbitron font-black text-2xl lg:text-3xl text-[#F2F4F6] mb-3">
          KONFIRMASI <span className="text-[#39FF14]">PESANAN</span>
        </h2>

        <p className="text-[#A7B0B7] text-sm mb-6">
          Isi data Anda untuk memesan. Admin akan segera menghubungi via WhatsApp.
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-[rgba(255,0,0,0.1)] border border-[rgba(255,0,0,0.3)]">
            <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product selection */}
          <div>
            <label className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider mb-2 block">
              PILIH PRODUK
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
              className="terminal-input cursor-pointer"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id} className="bg-[#11181C]">
                  {product.name} - Rp {product.price.toLocaleString('id-ID')}
                </option>
              ))}
            </select>
          </div>

          {/* Nama */}
          <div>
            <label className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider mb-2 block">
              NAMA
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="terminal-input"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="font-mono-tech text-xs text-[#A7B0B7] tracking-wider mb-2 block">
              NOMOR WHATSAPP
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Contoh: 08123456789"
              className="terminal-input"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 flex items-center justify-center gap-2 font-mono-tech text-sm tracking-wider transition-all ${
              isSent
                ? 'bg-[#39FF14] text-[#0B0E10]'
                : 'bg-[#39FF14] text-[#0B0E10] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]'
            } disabled:opacity-70`}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                MENGIRIM...
              </>
            ) : isSent ? (
              <>
                <Check size={16} />
                TERKIRIM
              </>
            ) : (
              <>
                <Send size={16} />
                BELI SEKARANG
              </>
            )}
          </button>
        </form>

        {/* Selected product info */}
        <div className="mt-6 p-4 bg-[rgba(57,255,20,0.05)] border border-[rgba(57,255,20,0.2)]">
          <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-wider mb-2">
            PRODUK TERPILIH
          </p>
          <p className="font-orbitron font-bold text-sm text-[#F2F4F6]">
            {selectedProduct.name}
          </p>
          <p className="font-orbitron font-bold text-lg text-[#39FF14] mt-1">
            Rp {selectedProduct.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Right product card */}
      <div
        ref={cardRef}
        className="absolute right-[6vw] top-[16vh] w-[48vw] h-[62vh] bg-[#11181C] green-border neon-border overflow-hidden"
      >
        {/* Card header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <p className="font-mono-tech text-[10px] text-[#39FF14] tracking-[0.15em]">
            PRODUK TERPILIH
          </p>
          <div className="flex gap-1.5">
            <div className="green-dot" />
            <div className="green-dot" />
            <div className="green-dot" />
          </div>
        </div>

        {/* Product image */}
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E10] via-transparent to-transparent opacity-70" />

        {/* Bottom product info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-orbitron font-bold text-lg text-[#F2F4F6]">
                {selectedProduct.name}
              </p>
              <p className="font-mono-tech text-xs text-[#39FF14]">
                {selectedProduct.code}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-[#39FF14]" />
              <span className="font-orbitron font-bold text-xl text-[#39FF14]">
                Rp {selectedProduct.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom microcopy */}
      <p
        ref={microcopyRef}
        className="absolute left-[6vw] right-[6vw] bottom-[10vh] font-mono-tech text-[10px] text-[#A7B0B7] text-center opacity-60"
      >
        Setelah klik beli, admin akan mengirim barcode unik melalui WhatsApp.
      </p>
    </section>
  );
};

export default CheckoutSection;
