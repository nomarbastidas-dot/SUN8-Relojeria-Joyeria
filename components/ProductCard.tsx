
import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Heart, ArrowLeftRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
  isInCompare: boolean;
  onToggleCompare: (product: Product) => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800&auto=format&fit=crop";

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails, isInWishlist, onToggleWishlist, isInCompare, onToggleCompare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  // Reset image source when product or index changes to try loading the correct image
  useEffect(() => {
    setImgSrc(product.images[currentImageIndex]);
  }, [product, currentImageIndex]);

  // Preload next image for smoother carousel navigation
  useEffect(() => {
    if (product.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % product.images.length;
      const img = new Image();
      img.src = product.images[nextIndex];
    }
  }, [currentImageIndex, product.images]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <div 
      className={`group bg-white p-4 transition-all duration-500 hover:shadow-2xl border ${isInCompare ? 'border-sun8-gold ring-1 ring-sun8-gold' : 'border-transparent hover:border-sun8-gold/10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-4 bg-gray-100 cursor-pointer rounded-sm">
        <img 
          src={imgSrc} 
          alt={`${product.title}`} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          onClick={() => onViewDetails(product)}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none"></div>
        
        {/* Compare Toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleCompare(product); }}
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${isInCompare ? 'bg-sun8-navy text-white shadow-md' : 'bg-white/80 text-sun8-navy/60 hover:bg-white hover:text-sun8-navy'}`}
          aria-label="Compare"
          title="Compare"
        >
          <ArrowLeftRight size={16} />
        </button>

        {/* Wishlist Toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-20 bg-white/40 backdrop-blur-sm hover:bg-white/80"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={`transition-all duration-300 ${isInWishlist ? 'fill-sun8-gold text-sun8-gold scale-110' : 'text-sun8-navy/60 hover:text-sun8-gold'}`} 
          />
        </button>

        {/* Image Navigation (Only if multiple images) */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-sun8-navy rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-sun8-navy rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                {product.images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-1 h-1 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                    />
                ))}
            </div>
          </>
        )}

        {/* Quick Add Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-4 right-4 w-11 h-11 bg-sun8-navy text-white flex items-center justify-center rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-sun8-gold z-10 shadow-xl"
          aria-label="Add to cart"
        >
          <Plus size={22} />
        </button>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-sun8-navy/50 uppercase tracking-[0.2em] mb-1.5">{product.category}</p>
        <h3 
          className="font-serif text-lg font-medium text-sun8-navy mb-2 cursor-pointer hover:text-sun8-gold transition-colors duration-300"
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </h3>
        <p className="font-bold text-sun8-gold tracking-wide">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};
