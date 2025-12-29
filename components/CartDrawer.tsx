import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  language: Language;
  onCheckout: () => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800&auto=format&fit=crop";

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQty, onRemove, language, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const t = TRANSLATIONS[language].cart;

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
            <h2 className="font-serif text-xl text-sun8-navy">{t.title} ({items.length})</h2>
            <button onClick={onClose} className="text-sun8-navy/50 hover:text-sun8-navy transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-sun8-navy/40">
                <ShoppingBag size={48} className="mb-4" />
                <p className="text-lg">{t.empty}</p>
                <button onClick={onClose} className="mt-4 text-sun8-gold hover:underline text-sm font-bold tracking-wide">
                  {t.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => (
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
                        <h3 className="font-serif font-medium text-sun8-navy">{item.title}</h3>
                        <p className="text-xs text-sun8-navy/50 uppercase mt-1">{item.category}</p>
                      </div>
                      <p className="font-bold text-sun8-navy text-sm">${(item.price * item.qty).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center border border-sun8-navy/20 rounded-sm">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="p-1 hover:bg-gray-100 text-sun8-navy/60"
                          disabled={item.qty <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm font-medium text-sun8-navy min-w-[1.5rem] text-center">{item.qty}</span>
                        <button 
                           onClick={() => onUpdateQty(item.id, 1)}
                           className="p-1 hover:bg-gray-100 text-sun8-navy/60"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 underline"
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-sun8-navy/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sun8-navy/60 text-sm uppercase tracking-wide">{t.subtotal}</span>
                <span className="font-serif text-2xl font-bold text-sun8-navy">${total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-sun8-navy/40 mb-6 text-center">{t.shippingNote}</p>
              <button 
                onClick={onCheckout}
                className="w-full bg-sun8-navy text-white py-4 font-bold tracking-widest hover:bg-sun8-gold transition-colors duration-300"
              >
                {t.checkout}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};