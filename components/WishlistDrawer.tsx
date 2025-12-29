import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
  language: Language;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800&auto=format&fit=crop";

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, wishlistItems, onRemove, onMoveToCart, language }) => {
  const t = TRANSLATIONS[language].wishlist;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-sun8-ivory shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-sun8-navy/10 flex items-center justify-between bg-white">
            <h2 className="font-serif text-xl text-sun8-navy flex items-center gap-2">
                <Heart className="fill-sun8-gold text-sun8-gold" size={20} />
                {t.title} ({wishlistItems.length})
            </h2>
            <button onClick={onClose} className="text-sun8-navy/50 hover:text-sun8-navy transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-sun8-navy/40">
                <Heart size={48} className="mb-4 opacity-50" />
                <p className="text-lg">{t.empty}</p>
                <button onClick={onClose} className="mt-4 text-sun8-gold hover:underline text-sm font-bold tracking-wide">
                  {TRANSLATIONS[language].cart.startShopping}
                </button>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-sm shadow-sm">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 overflow-hidden">
                    <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif font-medium text-sun8-navy line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-sun8-navy/50 uppercase mt-1">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-sun8-navy/40 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                       <p className="font-bold text-sun8-gold text-sm">${item.price.toLocaleString()}</p>
                       <button 
                         onClick={() => onMoveToCart(item)}
                         className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-sun8-navy text-white px-3 py-1.5 hover:bg-sun8-gold transition-colors"
                       >
                         <ShoppingBag size={12} /> {t.moveToCart}
                       </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};