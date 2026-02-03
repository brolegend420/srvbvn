
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import VoiceAgent from './components/VoiceAgent';
import { MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './constants';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(MENU_ITEMS[0].category);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  }, []);

  const updateCartViaVoice = useCallback((updates: { name: string; quantity: number }[]) => {
    setCart(prev => {
      let newCart = [...prev];
      
      updates.forEach(update => {
        // More resilient matching: trim and case-insensitive
        const cleanUpdateName = update.name.trim().toLowerCase();
        const menuItem = MENU_ITEMS.find(m => m.name.toLowerCase() === cleanUpdateName);
        
        if (!menuItem) {
          console.warn(`Voice agent tried to add unknown item: ${update.name}`);
          return;
        }

        const existingIndex = newCart.findIndex(i => i.id === menuItem.id);
        if (update.quantity <= 0) {
          if (existingIndex > -1) newCart.splice(existingIndex, 1);
        } else {
          if (existingIndex > -1) {
            newCart[existingIndex] = { ...newCart[existingIndex], quantity: Math.round(update.quantity) };
          } else {
            newCart.push({ ...menuItem, quantity: Math.round(update.quantity) });
          }
        }
      });

      return newCart;
    });
  }, []);

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const categories = useMemo(() => Array.from(new Set(MENU_ITEMS.map(i => i.category))), []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        <div className="lg:col-span-8 space-y-6">
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-3xl font-display text-amber-900">Authentic Menu</h2>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                <i className="fas fa-leaf text-xs"></i> 100% Vegetarian Legacy
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat 
                      ? 'bg-amber-800 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-800 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Menu items={MENU_ITEMS} activeCategory={activeCategory} />
          </section>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-24 h-fit">
          <Cart 
            items={cart} 
            onRemove={removeFromCart} 
            onAdd={(id) => {
              const item = MENU_ITEMS.find(i => i.id === id);
              if (item) addToCart(item);
            }}
            subtotal={subtotal}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-amber-800 font-bold mb-2">Ready to order?</p>
            <p className="text-slate-500 text-sm mb-4">Click the phone icon in the corner to speak with our legacy voice agent in your preferred language.</p>
            <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400">
              <span>TAMIL</span> • <span>TELUGU</span> • <span>HINDI</span> • <span>KANNADA</span> • <span>ENGLISH</span>
            </div>
          </div>
        </aside>

        <div className="fixed bottom-6 right-6 z-[60] w-[350px] max-w-[calc(100vw-3rem)]">
          <VoiceAgent 
            onUpdateCart={updateCartViaVoice} 
            isActive={isVoiceActive} 
            setIsActive={setIsVoiceActive} 
          />
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm mt-12">
        <div className="max-w-xl mx-auto px-4">
          <p className="font-display text-white text-lg mb-2">Saravanaa Bhavan</p>
          <p className="mb-4">8604 N MacArthur Blvd, Irving, TX 75063</p>
          <div className="h-px bg-slate-800 w-full mb-4"></div>
          <p>&copy; 2024 Saravanaa Bhavan Global. Powered by Gemini 2.5 Flash Native Audio.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
