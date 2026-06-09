import React, { useState } from "react";
import { Menu, X, ShoppingCart, User, LogIn, Search, PlusCircle, LogOut } from "lucide-react";
import { User as UserType } from "../types";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  currentTab,
  onTabChange,
  cartCount,
  onOpenCart,
  currentUser,
  onLogout,
  onOpenAuth,
  searchQuery,
  onSearchChange
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "medicamentos", label: "Medicamentos" },
    { id: "blog-de-salud", label: "Blog de Salud" },
    { id: "contacto", label: "Contacto" }
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onTabChange("medicamentos");
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-xs">
      {/* Top Tagline Bar */}
      <div id="top-announcement-bar" className="bg-emerald-600 text-white px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <span className="inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider animate-pulse">
          Atención Domicilios Medicos
        </span>
        <span>"Tu salud en las mejores manos" • WhatsApp Domicilios: (+57) 3105980923</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand section */}
          <div
            id="brand-logo-container"
            onClick={() => handleNavClick("inicio")}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            {/* Dynamic Pharmacy Vector Logo Symbol */}
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-700 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-xl rotate-0 group-hover:rotate-90 transition-transform duration-500 relative z-10 font-[Roboto]">
                ✚
              </span>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-xl font-black text-slate-800 tracking-tight leading-none uppercase">
                Coconuco
              </h1>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase leading-none mt-1">
                Droguería
              </span>
            </div>
          </div>

          {/* Core Search box */}
          <form
            id="header-search-form"
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentTab !== "medicamentos") {
                    onTabChange("medicamentos");
                  }
                }}
                placeholder="Buscar acetaminofén, vitaminas, leches de bebé..."
                className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Navigation Items - Desktop */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === item.id
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div id="right-actions" className="flex items-center gap-3">
            
            {/* Promotions Quick Access button */}
            <button
              id="header-promos-btn"
              onClick={() => {
                onSearchChange("PROMO:ON"); // custom status to activate promotion filter
                onTabChange("medicamentos");
              }}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold tracking-tight transition-colors duration-200 cursor-pointer"
            >
              🎉 Promociones
            </button>

            {/* Simulated Auth indicators */}
            {currentUser ? (
              <div id="logged-user-actions" className="flex items-center gap-2">
                <div className="hidden xl:flex flex-col text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase uppercase tracking-wider leading-none">
                    Paciente / Cliente
                  </span>
                  <span className="text-xs font-extrabold text-slate-800 max-w-[100px] truncate">
                    {currentUser.fullName}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs border border-emerald-200 cursor-pointer hover:bg-emerald-200 transition-colors">
                  {currentUser.fullName.charAt(0)}
                </div>
                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={onOpenAuth}
                className="py-2 px-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Ingresar</span>
              </button>
            )}

            {/* Shopping cart button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl hover:scale-105 transition-all text-xs font-bold flex items-center gap-1.5 relative border border-emerald-100 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown drawer panel */}
      {isMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-white/85 backdrop-blur-md border-t border-white/20 px-4 py-3 space-y-3">
          {/* Searching input on mobile */}
          <form
            id="mobile-search-form"
            onSubmit={handleSearchSubmit}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== "medicamentos") {
                  onTabChange("medicamentos");
                }
              }}
              placeholder="Buscar medicamentos..."
              className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-full"
            />
          </form>

          {/* Navigation link items */}
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  currentTab === item.id
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              id="mobile-promos-btn"
              onClick={() => {
                onSearchChange("PROMO:ON");
                onTabChange("medicamentos");
                setIsMenuOpen(false);
              }}
              className="px-3 py-1.5 bg-amber-50 rounded text-xs font-bold text-amber-800"
            >
              🎉 Ver Promociones
            </button>
            <span className="text-[10px] text-slate-400 font-medium">Coconuco, Cauca</span>
          </div>
        </div>
      )}
    </header>
  );
}
