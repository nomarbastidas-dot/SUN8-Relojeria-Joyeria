import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface HeroProps {
  onShopNow: () => void;
  language: Language;
}

const HERO_FALLBACK = "https://images.unsplash.com/photo-1495856458515-0637185db551?q=80&w=2070&auto=format&fit=crop";

export const Hero: React.FC<HeroProps> = ({ onShopNow, language }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section id="hero" className="relative h-[85vh] w-full overflow-hidden bg-sun8-navy flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Watch Detail" 
          className="w-full h-full object-cover opacity-60"
          onError={(e) => { (e.target as HTMLImageElement).src = HERO_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sun8-navy via-sun8-navy/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <div className="inline-block px-3 py-1 mb-6 border border-sun8-gold/30 rounded-full text-sun8-gold text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
            {t.badge}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
            {t.title1} <br/> <span className="italic text-sun8-gold">{t.title2}</span>
          </h1>
          <p className="text-sun8-ivory/80 text-lg md:text-xl max-w-md mb-10 font-light leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onShopNow}
              className="bg-sun8-gold text-sun8-navy px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-white hover:text-sun8-navy transition-all duration-300 flex items-center gap-2"
            >
              {t.cta} <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 border border-sun8-ivory/30 text-sun8-ivory rounded-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-300">
              {t.story}
            </button>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="hidden md:block relative animate-fade-in delay-200">
            <div className="absolute top-10 -right-10 w-64 h-64 border border-sun8-gold/20 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 right-20 w-40 h-40 border border-sun8-gold/10 rounded-full opacity-50"></div>
        </div>
      </div>
    </section>
  );
};