/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import { Product, CartItem, User } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, ShoppingBag } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("inicio");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Highlighting category triggers
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<string>("");

  // Toast notification for cart additions
  const [addedToast, setAddedToast] = useState<{ show: boolean; text: string } | null>(null);

  // Load cart and session if preserved
  useEffect(() => {
    const savedCart = localStorage.getItem("coconuco_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        // ignore
      }
    }

    const savedUser = localStorage.getItem("coconuco_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save cart modifications
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("coconuco_cart", JSON.stringify(items));
  };

  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    let updated: CartItem[];

    if (existing) {
      if (existing.quantity >= product.stock) {
        alert(`Lo sentimos, el stock disponible para este producto es de ${product.stock} unidades.`);
        return;
      }
      updated = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...cartItems, { product, quantity: 1 }];
    }

    saveCart(updated);
    
    // Trigger toast alert
    setAddedToast({
      show: true,
      text: `¡${product.name} agregado al carrito con éxito!`
    });

    setTimeout(() => {
      setAddedToast(null);
    }, 2500);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.product.id !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("coconuco_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("coconuco_user");
  };

  const handleCategorySelect = (subcategory: string) => {
    setSelectedSubcategoryFilter(subcategory);
    setSearchQuery(""); // clear text searches to prioritize subcategory select
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative antialiased text-slate-800">
      
      {/* Toast Notification Alert Banner */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500/30"
          >
            <Check className="w-4 h-4 shrink-0 bg-white/20 p-0.5 rounded-full" />
            <span>{addedToast.text}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-3 bg-white text-emerald-800 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase hover:bg-slate-150 transition-colors"
            >
              Ver Carrito
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          // If moving away from catalog, clear category syncs so selection resets cleanly
          if (tab !== "medicamentos") {
            setSelectedSubcategoryFilter("");
          }
        }}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {currentTab === "inicio" && (
              <HomeSection
                onTabChange={setCurrentTab}
                onAddToCart={handleAddToCart}
                onCategorySelect={handleCategorySelect}
              />
            )}

            {currentTab === "nosotros" && <AboutSection />}

            {currentTab === "medicamentos" && (
              <ProductsSection
                onAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                onSearchClear={handleSearchClear}
                selectedSubcategoryFilter={selectedSubcategoryFilter}
                onSelectSubcategoryFilter={setSelectedSubcategoryFilter}
              />
            )}

            {currentTab === "blog-de-salud" && <BlogSection />}

            {currentTab === "contacto" && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onTabChange={(tab) => {
        setCurrentTab(tab);
        if (tab !== "medicamentos") {
          setSelectedSubcategoryFilter("");
        }
      }} />

      {/* Slide-over Shopping Cart sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            currentUser={currentUser}
            onOpenAuth={() => {
              setIsCartOpen(false);
              setIsAuthOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* User Login/Register Modal */}
      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={handleLogin}
          />
        )}
      </AnimatePresence>
      
    </div>
  );
}
