import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  language: Language;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, products, onAddToCart, language }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language].compare;
  const tCommon = TRANSLATIONS[language].product;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-sm shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-sun8-navy/10 flex justify-between items-center bg-sun8-ivory">
          <h2 className="font-serif text-2xl text-sun8-navy">{t.title}</h2>
          <button onClick={onClose} className="text-sun8-navy/50 hover:text-sun8-navy transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-auto custom-scrollbar flex-1 p-6">
          <div className="min-w-[600px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-32 md:w-48 p-4 text-left text-sm font-bold uppercase tracking-wider text-sun8-navy/40 border-b border-sun8-navy/5">
                    
                  </th>
                  {products.map(product => (
                    <th key={product.id} className="p-4 w-1/3 border-b border-sun8-navy/5 pb-8 align-top">
                      <div className="aspect-[4/5] mb-4 bg-gray-50 rounded-sm overflow-hidden relative group">
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h3 className="font-serif text-xl text-sun8-navy mb-2">{product.title}</h3>
                      <p className="font-bold text-sun8-gold text-lg mb-4">${product.price.toLocaleString()}</p>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="w-full bg-sun8-navy text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-sun8-gold transition-colors flex items-center justify-center gap-2"
                      >
                         <ShoppingBag size={14} /> {tCommon.addToCart}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Category */}
                <tr className="hover:bg-sun8-ivory/30 transition-colors">
                  <td className="p-4 text-sm font-bold text-sun8-navy/60 border-b border-sun8-navy/5 uppercase tracking-wide">{t.category}</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 text-sun8-navy border-b border-sun8-navy/5 capitalize">
                      {product.category}
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr className="hover:bg-sun8-ivory/30 transition-colors">
                    <td className="p-4 text-sm font-bold text-sun8-navy/60 border-b border-sun8-navy/5 uppercase tracking-wide">{t.description}</td>
                    {products.map(product => (
                        <td key={product.id} className="p-4 text-sm text-sun8-navy/80 leading-relaxed border-b border-sun8-navy/5">
                            {product.description}
                        </td>
                    ))}
                </tr>

                {/* Availability */}
                <tr className="hover:bg-sun8-ivory/30 transition-colors">
                  <td className="p-4 text-sm font-bold text-sun8-navy/60 border-b border-sun8-navy/5 uppercase tracking-wide">{t.stock}</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 text-sun8-navy border-b border-sun8-navy/5">
                      {product.stock > 0 ? (
                        <span className="text-green-700 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            In Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="text-red-700 font-medium">Out of Stock</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Features List - rendering as separate rows per index is tricky, so we output list */}
                <tr className="hover:bg-sun8-ivory/30 transition-colors">
                  <td className="p-4 text-sm font-bold text-sun8-navy/60 border-b border-sun8-navy/5 uppercase tracking-wide align-top">{t.features}</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 border-b border-sun8-navy/5 align-top">
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-sun8-navy/80 flex items-start gap-2">
                            <span className="w-1 h-1 bg-sun8-gold rounded-full mt-1.5 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};