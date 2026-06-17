import { X, Copy, Check, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../App';

interface BarcodeModalProps {
  product: Product | null;
  onClose: () => void;
  isPurchaseComplete: boolean;
}

const BarcodeModal = ({ product, onClose, isPurchaseComplete }: BarcodeModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppAdmin = () => {
    const message = encodeURIComponent(
      `Halo Admin FE4RSHOP,\n\nSaya telah melakukan pembelian:\n- Produk: ${product.name}\n- Kode: ${product.code}\n- Harga: Rp ${product.price.toLocaleString('id-ID')}\n\nMohon konfirmasinya.`
    );
    window.open(`https://wa.me/6285156359363?text=${message}`, '_blank');
  };

  return (
    <div
      className="barcode-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#11181C] green-border p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A7B0B7] hover:text-[#39FF14] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="font-mono-tech text-xs text-[#39FF14] tracking-wider mb-2">
            {isPurchaseComplete ? '[PEMBELIAN BERHASIL]' : '[DETAIL PRODUK]'}
          </p>
          <h3 className="font-orbitron font-bold text-xl text-[#F2F4F6]">
            {product.name}
          </h3>
          <p className="font-mono-tech text-sm text-[#A7B0B7] mt-1">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Barcode */}
        <div className="bg-white p-4 mb-6 flex flex-col items-center">
          <img
            src={product.barcode}
            alt={`Barcode ${product.name}`}
            className="w-48 h-48 object-contain"
          />
          <div className="mt-3 flex items-center gap-2">
            <p className="font-mono-tech text-sm text-[#0B0E10] tracking-wider">
              {product.code}
            </p>
            <button
              onClick={handleCopyCode}
              className="text-[#0B0E10] hover:text-[#39FF14] transition-colors"
              title="Salin kode"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {isPurchaseComplete && (
            <div className="bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.3)] p-3 mb-2">
              <p className="font-mono-tech text-xs text-[#39FF14] text-center">
                Email konfirmasi telah dikirim. Silakan hubungi admin untuk aktivasi.
              </p>
            </div>
          )}

          <button
            onClick={handleWhatsAppAdmin}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-mono-tech text-sm tracking-wider hover:bg-[#128C7E] transition-colors"
          >
            <MessageCircle size={18} />
            HUBUNGI ADMIN WA
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 border border-[rgba(242,244,246,0.2)] text-[#A7B0B7] font-mono-tech text-sm tracking-wider hover:border-[rgba(242,244,246,0.5)] hover:text-[#F2F4F6] transition-colors"
          >
            TUTUP
          </button>
        </div>

        {/* Footer note */}
        <p className="font-mono-tech text-[10px] text-[#A7B0B7] text-center mt-4 opacity-60">
          ADMIN: +62 851-5635-9363
        </p>
      </div>
    </div>
  );
};

export default BarcodeModal;
