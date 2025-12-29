import React from 'react';
import { X, ArrowLeftRight, Trash2 } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface CompareBarProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
  language: Language;
}

export const CompareBar: React.FC<CompareBarProps> = ({ products, onRemove, onClear, onCompare, language }) => {
  if (products.length === 0) return null;

  const t = TRANSLATIONS[language].compare;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-sun8-gold/20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-6">
          <h3 className="font-serif text-sun8-navy font-medium hidden sm:block">
            {t.title} ({products.length})
          </h3>
          
          <div className="flex items-center gap-3">
            {products.map(product => (
              <div key={product.id} className="relative group w-12 h-12 rounded-sm overflow-hidden border border-sun8-navy/10">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => onRemove(product.id)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  title={t.remove}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {products.length < 3 && (
              <div className="w-12 h-12 rounded-sm border border-dashed border-sun8-navy/20 flex items-center justify-center text-sun8-navy/30 text-xs text-center px-1">
                {3 - products.length} +
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={onClear}
            className="text-xs text-sun8-navy/50 hover:text-red-500 flex items-center gap-1"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">{t.clear}</span>
          </button>
          
          <button 
            onClick={onCompare}
            disabled={products.length < 2}
            className="flex-1 sm:flex-none bg-sun8-navy text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-sun8-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeftRight size={16} />
            {t.view}
          </button>
        </div>

      </div>
    </div>
  );
};