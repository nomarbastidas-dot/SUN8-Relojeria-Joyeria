
import { Share2 } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, ArrowLeftRight, Share2 as ShareIcon, Check } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  language: Language;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
  isInCompare: boolean;
  onToggleCompare: (product: Product) => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800&auto=format&fit=crop";

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose, 
  onAddToCart, 
  language, 
  isInWishlist, 
  onToggleWishlist,
  isInCompare,
  onToggleCompare
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImgSrc, setMainImgSrc] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const t = TRANSLATIONS[language].product;
  const tCompare = TRANSLATIONS[language].compare;

  useEffect(() => {
    if (product) {
        setCurrentImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
        setMainImgSrc(product.images[currentImageIndex]);
    }
  }, [product, currentImageIndex]);

  // Preload next/prev images for instant gallery navigation
  useEffect(() => {
    if (product && product.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % product.images.length;
      const prevIndex = currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1;
      
      const imgNext = new Image();
      imgNext.src = product.images[nextIndex];
      
      const imgPrev = new Image();
      imgPrev.src = product.images[prevIndex];
    }
  }, [currentImageIndex, product]);

  if (!product) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `${product.title} - ${product.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto md:overflow-hidden rounded-sm flex flex-col md:flex-row shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Image Gallery Section */}
        <div className="md:w-3/5 bg-gray-50 p-6 flex flex-col justify-center relative">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-white shadow-sm overflow-hidden rounded-sm">
            <img 
                src={mainImgSrc || FALLBACK_IMAGE} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-500" 
                onError={() => setMainImgSrc(FALLBACK_IMAGE)}
                decoding="async"
                loading="eager"
            />
            
            {/* Main Carousel Controls */}
            {product.images.length > 1 && (
                <>
                    <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 text-sun8-navy rounded-full flex items-center justify-center hover:bg-sun8-gold hover:text-white transition-colors shadow-md"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 text-sun8-navy rounded-full flex items-center justify-center hover:bg-sun8-gold hover:text-white transition-colors shadow-md"
                        aria-label="Next image"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="mt-6 flex gap-3 justify-center overflow-x-auto py-2 px-2">
                {product.images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-16 h-16 md:w-20 md:h-20 border-2 rounded-sm overflow-hidden flex-shrink-0 transition-all ${
                            currentImageIndex === idx 
                                ? 'border-sun8-gold ring-1 ring-sun8-gold opacity-100' 
                                : 'border-transparent hover:border-sun8-navy/20 opacity-60 hover:opacity-100'
                        }`}
                    >
                        <img 
                            src={img} 
                            alt={`Thumbnail ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                            loading="lazy"
                            decoding="async"
                        />
                    </button>
                ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-2/5 p-8 md:p-12 flex flex-col bg-white relative overflow-y-auto custom-scrollbar">
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 text-sun8-navy/40 hover:text-sun8-navy transition-colors"
                aria-label="Close modal"
            >
                <X size={24} />
            </button>

          <div className="mb-2 flex justify-between items-start">
            <div>
                <p className="text-xs uppercase tracking-widest text-sun8-navy/50 mb-1">{product.category}</p>
                {product.stock < 5 && (
                    <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-1 rounded-full">{t.onlyLeft.replace('{n}', product.stock.toString())}</span>
                )}
            </div>
            <div className="flex gap-4">
                <button
                    onClick={handleShare}
                    className="relative text-sun8-navy/50 hover:text-sun8-gold transition-colors"
                    title={t.share}
                >
                    {showCopied ? <Check size={24} className="text-green-500" /> : <ShareIcon size={24} />}
                    {showCopied && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] py-1 px-2 rounded-sm">
                            {t.linkCopied}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => onToggleCompare(product)}
                    className={`transition-colors duration-300 ${isInCompare ? 'text-sun8-navy' : 'text-sun8-navy/40 hover:text-sun8-navy'}`}
                    aria-label="Toggle compare"
                    title={isInCompare ? tCompare.remove : tCompare.add}
                >
                    <ArrowLeftRight size={24} />
                </button>
                <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="text-sun8-navy/50 hover:text-sun8-gold transition-colors"
                    aria-label="Toggle wishlist"
                >
                    <Heart 
                        size={24} 
                        className={`transition-colors duration-300 ${isInWishlist ? 'fill-sun8-gold text-sun8-gold' : ''}`} 
                    />
                </button>
            </div>
          </div>
          
          <h2 className="font-serif text-3xl text-sun8-navy mb-4 leading-tight">{product.title}</h2>
          <p className="text-2xl text-sun8-gold mb-6 font-medium">${product.price.toLocaleString()}</p>
          
          <div className="prose prose-sm text-sun8-navy/70 leading-relaxed mb-8">
            <p>{product.description}</p>
          </div>
          
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase mb-3 tracking-wider text-sun8-navy">{t.features}</h4>
            <ul className="grid grid-cols-1 gap-2">
              {product.features.map(feat => (
                <li key={feat} className="text-sm text-sun8-navy/80 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-sun8-gold rounded-full"></span> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full bg-sun8-navy text-white py-4 font-bold tracking-widest hover:bg-sun8-gold hover:shadow-lg transition-all duration-300"
            >
              {t.addToCart}
            </button>
            <p className="text-center text-[10px] text-sun8-navy/40 mt-3 uppercase tracking-wide">
                {t.shipping}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
