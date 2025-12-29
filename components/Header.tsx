import React, { useState } from 'react';
import { ShoppingBag, User, Menu, Globe, Heart, Film, Settings } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenVeo: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
    cartCount, 
    onOpenCart, 
    wishlistCount, 
    onOpenWishlist, 
    language, 
    setLanguage, 
    onOpenVeo,
    onOpenAdmin
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[language].nav;

  const toggleLang = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-sun8-navy text-sun8-ivory shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="md:hidden text-sun8-gold hover:text-white transition-colors">
            <Menu size={24} />
          </button>
          <div className="font-serif text-2xl font-bold tracking-widest text-white">
            SUN<span className="text-sun8-gold">8</span>
          </div>
          <nav className="hidden md:flex ml-8 gap-8 text-sm font-medium tracking-wide opacity-80">
            <a href="#hero" className="hover:text-sun8-gold hover:opacity-100 transition-all">{t.home}</a>
            <a href="#catalog" className="hover:text-sun8-gold hover:opacity-100 transition-all">{t.collection}</a>
            <a href="#heritage" className="hover:text-sun8-gold hover:opacity-100 transition-all">{t.heritage}</a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
            {/* Veo Studio Button */}
            <button 
                onClick={onOpenVeo}
                className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-sun8-gold border border-sun8-gold/30 px-3 py-1.5 rounded-full hover:bg-sun8-gold hover:text-sun8-navy transition-all"
                title="Open Veo Studio"
            >
                <Film size={14} />
                <span className="hidden md:inline">Studio</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
                <button 
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-1 hover:text-sun8-gold transition-colors text-sm font-medium uppercase"
                >
                    <Globe size={18} />
                    <span className="hidden md:inline">{language}</span>
                </button>

                {isLangMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white text-sun8-navy shadow-xl rounded-sm py-1 animate-fade-in z-50">
                        <button onClick={() => toggleLang('en')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'en' ? 'font-bold text-sun8-gold' : ''}`}>English</button>
                        <button onClick={() => toggleLang('es')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'es' ? 'font-bold text-sun8-gold' : ''}`}>Español</button>
                        <button onClick={() => toggleLang('fr')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'fr' ? 'font-bold text-sun8-gold' : ''}`}>Français</button>
                    </div>
                )}
            </div>

            {/* Admin / Settings */}
            <button
                onClick={onOpenAdmin}
                className="hover:text-sun8-gold transition-colors"
                title="Store Manager"
            >
                <Settings size={20} />
            </button>

          <button 
            onClick={onOpenWishlist}
            className="relative flex items-center gap-2 text-sm hover:text-sun8-gold transition-colors"
            aria-label="Open wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-sun8-navyLight text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-sun8-gold">
                {wishlistCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={onOpenCart} 
            className="relative group flex items-center gap-2 hover:text-sun8-gold transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-sun8-gold text-sun8-navy text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};