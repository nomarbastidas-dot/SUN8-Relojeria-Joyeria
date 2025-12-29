
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { GeminiStylist } from './components/GeminiStylist';
import { ProductModal } from './components/ProductModal';
import { CompareBar } from './components/CompareBar';
import { CompareModal } from './components/CompareModal';
import { VeoStudio } from './components/VeoStudio';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { Product, CartItem, Language, ShippingDetails } from './types';
import { TRANSLATIONS, getLocalizedProducts } from './utils/i18n';

// Safe LocalStorage wrapper
const safeSetItem = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        if (e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError')) {
            console.warn('Storage quota exceeded. Clearing older data...');
            // In a production app, we'd clear less important keys or prune items.
        }
    }
};

function App() {
  const [language, setLanguage] = useState<Language>('es'); 
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isVeoOpen, setIsVeoOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'watches' | 'jewelry'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Products State - Initialized from localStorage OR default localized data
  const [products, setProducts] = useState<Product[]>(() => {
      if (typeof window !== 'undefined') {
          try {
              const saved = localStorage.getItem('sun8_products');
              if (saved) {
                  return JSON.parse(saved);
              }
          } catch (e) { console.error("Error loading products:", e); }
      }
      return getLocalizedProducts('es'); 
  });

  useEffect(() => {
      const saved = localStorage.getItem('sun8_products');
      if (!saved) {
          setProducts(getLocalizedProducts(language));
      }
  }, [language]);

  useEffect(() => {
      safeSetItem('sun8_products', JSON.stringify(products));
  }, [products]);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
        try {
            const saved = localStorage.getItem('sun8_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) { console.error("Failed to load wishlist", e); }
    }
    return [];
  });
  
  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    safeSetItem('sun8_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const t = TRANSLATIONS[language];

  // --- Product Management Handlers ---
  const handleAddProduct = (newProduct: Product) => {
      setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
      setProducts(prev => prev.filter(p => p.id !== id));
      setCartItems(prev => prev.filter(i => i.id !== id));
      setWishlistIds(prev => prev.filter(wid => wid !== id));
      setCompareIds(prev => prev.filter(cid => cid !== id));
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
        if (prev.includes(productId)) {
            return prev.filter(id => id !== productId);
        } else {
            return [...prev, productId];
        }
    });
  };

  const moveToCart = (product: Product) => {
      addToCart(product);
      toggleWishlist(product.id); 
  };

  const toggleCompare = (product: Product) => {
    setCompareIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert(TRANSLATIONS[language].compare.limit);
          return prev;
        }
        return [...prev, product.id];
      }
    });
  };

  const clearCompare = () => setCompareIds([]);
  const removeFromCompare = (id: string) => setCompareIds(prev => prev.filter(pid => pid !== id));

  const compareProducts = useMemo(() => {
    return products.filter(p => compareIds.includes(p.id));
  }, [products, compareIds]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const wishlistProducts = useMemo(() => {
      return products.filter(p => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = (details: ShippingDetails) => {
    console.log("Order Placed:", details, cartItems);
    setCartItems([]); 
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-sun8-ivory text-sun8-navy">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        language={language}
        setLanguage={setLanguage}
        onOpenVeo={() => setIsVeoOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-grow mb-24"> 
        <Hero 
            onShopNow={() => {
                const catalog = document.getElementById('catalog');
                catalog?.scrollIntoView({ behavior: 'smooth' });
            }} 
            language={language}
        />

        <section id="catalog" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-sun8-navy/10 pb-6">
            <div>
              <h2 className="font-serif text-4xl text-sun8-navy mb-4">{t.filters.title}</h2>
              <p className="text-sun8-navy/60 max-w-lg">
                {t.filters.subtitle}
              </p>
            </div>
            
            <div className="flex gap-8 mt-8 md:mt-0">
              <button
                  onClick={() => setSelectedCategory('all')}
                  className={`uppercase text-sm tracking-widest pb-2 border-b-2 transition-all ${selectedCategory === 'all' ? 'border-sun8-gold text-sun8-navy' : 'border-transparent text-sun8-navy/40 hover:text-sun8-navy'}`}
              >
                  {t.filters.all}
              </button>
              <button
                  onClick={() => setSelectedCategory('watches')}
                  className={`uppercase text-sm tracking-widest pb-2 border-b-2 transition-all ${selectedCategory === 'watches' ? 'border-sun8-gold text-sun8-navy' : 'border-transparent text-sun8-navy/40 hover:text-sun8-navy'}`}
              >
                  {t.filters.watches}
              </button>
              <button
                  onClick={() => setSelectedCategory('jewelry')}
                  className={`uppercase text-sm tracking-widest pb-2 border-b-2 transition-all ${selectedCategory === 'jewelry' ? 'border-sun8-gold text-sun8-navy' : 'border-transparent text-sun8-navy/40 hover:text-sun8-navy'}`}
              >
                  {t.filters.jewelry}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
                isInWishlist={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                isInCompare={compareIds.includes(product.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        </section>

        <section id="heritage" className="bg-sun8-navyLight text-sun8-ivory py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <img 
                src="https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=2070&auto=format&fit=crop" 
                alt="Watchmaking craft" 
                className="w-full h-[500px] object-cover rounded-sm shadow-2xl opacity-80"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-serif text-4xl mb-6">
                  {language === 'es' ? 'El Arte de la Precisión' : language === 'fr' ? "L'Art de la Précision" : 'The Art of Precision'}
              </h2>
              <p className="text-sun8-ivory/70 text-lg leading-relaxed mb-8">
                {language === 'es' 
                    ? 'Durante más de ocho décadas, SUN8 se ha situado en la intersección de la innovación y la tradición. Cada pieza cuenta una historia de meticulosa artesanía, materiales de origen ético y una dedicación inquebrantable a la belleza.'
                    : language === 'fr'
                    ? "Depuis plus de huit décennies, SUN8 se situe à l'intersection de l'innovation et de la tradition. Chaque pièce raconte une histoire de savoir-faire méticuleux, de matériaux d'origine éthique et d'un dévouement sans compromis à la beauté."
                    : 'For over eight decades, SUN8 has stood at the intersection of innovation and tradition. Every piece tells a story of meticulous craftsmanship, ethically sourced materials, and an uncompromising dedication to beauty.'
                }
              </p>
              <button className="text-sun8-gold border-b border-sun8-gold pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm">
                {t.hero.story}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-sun8-navy text-sun8-ivory/60 py-16 border-t border-sun8-ivory/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="font-serif text-2xl font-bold text-white tracking-widest mb-6">
              SUN<span className="text-sun8-gold">8</span>
            </div>
            <p className="text-sm">
              {t.footer.tagline}
            </p>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">{t.footer.shop}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-sun8-gold">{t.hero.badge}</a></li>
              <li><a href="#" className="hover:text-sun8-gold">{t.filters.watches}</a></li>
              <li><a href="#" className="hover:text-sun8-gold">{t.filters.jewelry}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">{t.footer.support}</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li><a href="#" className="hover:text-sun8-gold">{t.ai.title}</a></li>
              <li><a href="#" className="hover:text-sun8-gold">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-sun8-gold">Warranty</a></li>
            </ul>

            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                    <a href="mailto:nomar.bastidas@hotmail.com" className="hover:text-sun8-gold transition-colors break-all">nomar.bastidas@hotmail.com</a>
                </li>
                <li className="flex flex-col gap-1">
                    <a href="tel:+573002500110" className="hover:text-sun8-gold transition-colors">+57 300 250 0110</a>
                    <a href="tel:+573233395754" className="hover:text-sun8-gold transition-colors">+57 323 339 5754</a>
                </li>
            </ul>
          </div>

           <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">{t.footer.newsletter}</h4>
            <p className="text-xs mb-4">{t.footer.subscribe}</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address" className="bg-sun8-navyLight border border-sun8-ivory/10 px-3 py-2 text-sm w-full focus:outline-none focus:border-sun8-gold" />
              <button className="bg-sun8-gold text-sun8-navy px-4 py-2 text-xs font-bold uppercase">{t.footer.join}</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-sun8-ivory/5 text-xs text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        language={language}
        onCheckout={handleCheckoutStart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        cartItems={cartItems}
        language={language}
        onPlaceOrder={handlePlaceOrder}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistProducts}
        onRemove={(id) => toggleWishlist(id)}
        onMoveToCart={moveToCart}
        language={language}
      />

      <CompareBar 
        products={compareProducts}
        onRemove={removeFromCompare}
        onClear={clearCompare}
        onCompare={() => setIsCompareModalOpen(true)}
        language={language}
      />

      <CompareModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={compareProducts}
        onAddToCart={addToCart}
        language={language}
      />

      <VeoStudio 
        isOpen={isVeoOpen}
        onClose={() => setIsVeoOpen(false)}
        language={language}
      />
      
      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        language={language}
      />

      <GeminiStylist 
        products={products} 
        language={language} 
        onViewProduct={setSelectedProduct}
      />
      
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
        language={language}
        isInWishlist={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        isInCompare={selectedProduct ? compareIds.includes(selectedProduct.id) : false}
        onToggleCompare={toggleCompare}
      />
    </div>
  );
}

export default App;
