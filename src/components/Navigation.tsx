import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0E10]/90 backdrop-blur-md border-b border-[rgba(57,255,20,0.2)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-orbitron font-black text-xl lg:text-2xl text-[#F2F4F6] tracking-wider hover:text-[#39FF14] transition-colors"
        >
          FE4R<span className="text-[#39FF14]">SHOP</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('products')}
            className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider"
          >
            PRODUK
          </button>
          <button
            onClick={() => scrollToSection('highlight')}
            className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider"
          >
            CARA BELI
          </button>
          <button
            onClick={() => scrollToSection('checkout')}
            className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider"
          >
            BELI
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider"
          >
            KONTAK
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#F2F4F6] hover:text-[#39FF14] transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B0E10]/95 backdrop-blur-md border-t border-[rgba(57,255,20,0.2)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('products')}
              className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider text-left py-2"
            >
              PRODUK
            </button>
            <button
              onClick={() => scrollToSection('highlight')}
              className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider text-left py-2"
            >
              CARA BELI
            </button>
            <button
              onClick={() => scrollToSection('checkout')}
              className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider text-left py-2"
            >
              BELI
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="font-mono-tech text-sm text-[#A7B0B7] hover:text-[#39FF14] transition-colors tracking-wider text-left py-2"
            >
              KONTAK
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
