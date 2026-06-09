import { useState, useMemo, useEffect } from "react";
import { Star, Search, Filter, ShieldCheck, ShoppingCart, Heart, Info, X } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  onSearchClear: () => void;
  selectedSubcategoryFilter: string;
  onSelectSubcategoryFilter: (sub: string) => void;
}

const CATEGORIES = ["Todos", "Medicamentos de Venta Libre", "Cuidado Personal", "Cuidado del Bebé"];

const SUBCATEGORIES: Record<string, string[]> = {
  "Todos": ["Todos"],
  "Medicamentos de Venta Libre": [
    "Todos",
    "Dolor y fiebre",
    "Resfriado y gripe",
    "Alergias",
    "Digestión",
    "Vitaminas",
    "Suplementos nutricionales"
  ],
  "Cuidado Personal": ["Todos", "Protección Solar", "Cuidado del Cabello"],
  "Cuidado del Bebé": ["Todos", "Protección de Rozaduras", "Nutrición Infantil"]
};

export default function ProductsSection({
  onAddToCart,
  searchQuery,
  onSearchClear,
  selectedSubcategoryFilter,
  onSelectSubcategoryFilter
}: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Todos");
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

  // Sync state if category has been pre-selected from other components (like home quicklinks)
  useEffect(() => {
    if (selectedSubcategoryFilter) {
      if (selectedSubcategoryFilter === "PROMO:ON") {
        setSelectedCategory("Todos");
        setSelectedSubcategory("Todos");
        return;
      }
      // Locate what parent category this sub belongs to
      let parent = "Todos";
      for (const [catName, subs] of Object.entries(SUBCATEGORIES)) {
        if (subs.includes(selectedSubcategoryFilter)) {
          parent = catName;
          break;
        }
      }
      setSelectedCategory(parent);
      setSelectedSubcategory(selectedSubcategoryFilter);
    }
  }, [selectedSubcategoryFilter]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory("Todos");
    onSelectSubcategoryFilter(""); // reset external filter override
  };

  const handleSubcategoryChange = (sub: string) => {
    setSelectedSubcategory(sub);
    onSelectSubcategoryFilter(""); // reset external filter override
  };

  const isPromoOnly = searchQuery === "PROMO:ON" || selectedSubcategoryFilter === "PROMO:ON";

  // Filtered Products Memoized
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Promotions filter rule
      if (isPromoOnly) {
        const isPromo = product.badge === "Promoción" || product.badge === "Oferta" || product.id === "med-002" || product.id === "beb-001" || product.id === "sup-015";
        // Apply categories filter on top of promos if desired
        if (selectedCategory !== "Todos" && product.category !== selectedCategory) return false;
        if (selectedSubcategory !== "Todos" && product.subcategory !== selectedSubcategory) return false;
        return isPromo;
      }

      // 2. Main Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.commercialName.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.indications.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // 3. Category Filter
      if (selectedCategory !== "Todos" && product.category !== selectedCategory) {
        return false;
      }

      // 4. Subcategory Filter
      if (selectedSubcategory !== "Todos" && product.subcategory !== selectedSubcategory) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, isPromoOnly]);

  return (
    <div id="products-section" className="space-y-10 pb-16 font-[sans-serif]">
      {/* Banner / Header descriptor */}
      <section className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/50 relative overflow-hidden shadow-xs">
        <div className="max-w-xl space-y-3 relative z-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-white/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/45">
            Droguería Coconuco Catálogo
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {isPromoOnly ? "🔥 Ofertas y Promociones Especiales" : "Medicamentos legítimos de Venta Libre"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {isPromoOnly 
              ? "Aprovecha descuentos exclusivos diseñados para cuidar de tu bolsillo y de tu salud integral hoy mismo."
              : "Explora productos para el cuidado del bebé, suplementos nutricionales de alta absorción y analgésicos de marcas confiables certificadas."}
          </p>
          {isPromoOnly && (
            <button
              onClick={() => {
                onSearchClear();
                onSelectSubcategoryFilter("");
                setSelectedCategory("Todos");
                setSelectedSubcategory("Todos");
              }}
              className="text-xs font-bold text-slate-700 bg-white/75 backdrop-blur-xs border px-3.5 py-1.5 rounded-lg hover:bg-slate-100/90 transition-colors"
            >
              Ver todo el catálogo ordinario
            </button>
          )}
        </div>
        {/* Abstract background graphics */}
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none md:block hidden">
          <span className="text-9xl font-black text-emerald-950 absolute -right-10 bottom-[-40px]">✚</span>
        </div>
      </section>

      {/* Categories & Subcategories Filter Grid (only if not searching with general text strictly) */}
      <section className="space-y-4">
        {/* Level 1 Category Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/30 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2 tracking-wider">Línea de productos:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`category-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-200/50 hover:bg-slate-200/80 text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level 2 Sub-category Pills */}
        {SUBCATEGORIES[selectedCategory] && SUBCATEGORIES[selectedCategory].length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase mr-2.5 tracking-wider">Sub-líneas:</span>
            {SUBCATEGORIES[selectedCategory].map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubcategoryChange(sub)}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  selectedSubcategory === sub && !isPromoOnly
                    ? "bg-teal-50 border border-teal-200 text-teal-800 font-extrabold"
                    : "bg-white/50 backdrop-blur-md border border-white/40 text-slate-500 hover:bg-white/70"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Notification if Search Active */}
      {searchQuery && !isPromoOnly && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
          <span>
            Mostrando resultados para: <strong className="text-slate-800">"{searchQuery}"</strong>
          </span>
          <button
            onClick={onSearchClear}
            className="text-xs font-bold text-emerald-600 underline hover:text-emerald-800 cursor-pointer"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Product List Grid Container */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border border-dashed rounded-3xl space-y-4 max-w-md mx-auto">
            <p className="text-slate-400 text-2xl font-black font-mono">🔍 ?</p>
            <div>
              <p className="font-bold text-slate-700">Ningún producto coincide</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 px-4">
                No encontramos productos en la categoría <strong className="text-slate-800">"{selectedCategory} / {selectedSubcategory}"</strong> con tus condiciones actuales.
              </p>
            </div>
            <button
              onClick={() => {
                onSearchClear();
                onSelectSubcategoryFilter("");
                setSelectedCategory("Todos");
                setSelectedSubcategory("Todos");
              }}
              className="py-1.5 px-4 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Restaurar Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                id={`cat-card-${p.id}`}
                className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
              >
                {/* Badge if available */}
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full z-10">
                    {p.badge}
                  </span>
                )}

                {/* Imagery */}
                <div className="h-44 bg-slate-100/40 relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                    <span>{p.subcategory}</span>
                    <span className={p.availability ? "text-emerald-600" : "text-rose-500"}>
                      ● {p.availability ? "Disponible" : "Agotado"}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-800 truncate leading-tight mt-1">
                    {p.name}
                  </h4>

                  <p className="text-[11px] text-slate-404 italic font-medium truncate">
                    Nombre comercial: {p.commercialName}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2 mt-1">
                    {p.description}
                  </p>

                  {/* Quick info badges */}
                  <div className="pt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-white/40 backdrop-blur-xs border border-white/30 rounded text-[9px] text-slate-600 font-semibold">
                      <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      {p.rating}
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50/50 backdrop-blur-xs border border-emerald-100/30 rounded text-[9px] text-emerald-700 font-bold">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                      Seguro OTC
                    </span>
                  </div>

                  {/* Presentation details */}
                  <p className="text-[10px] text-slate-400 mt-2 font-semibold">
                    Pres: {p.presentation}
                  </p>

                  {/* Footer checkout bar handles */}
                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/45 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 uppercase font-black leading-none">
                        Precio COP
                      </span>
                      <span className="text-sm font-black text-emerald-600 mt-0.5">
                        ${p.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setSelectedProductDetails(p)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                        title="Ver Ficha Técnica"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(p)}
                        disabled={!p.availability}
                        className={`py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-[11px] rounded-lg shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer ${
                          !p.availability && "opacity-50 cursor-not-allowed bg-slate-300 hover:bg-slate-300"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Dynamic Product Details Modal */}
      {selectedProductDetails && (
        <div id="product-detail-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl overflow-hidden relative border border-slate-100 flex flex-col md:flex-row">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProductDetails(null)}
              className="absolute top-4 right-4 p-2 bg-white/70 hover:bg-white text-slate-500 hover:text-slate-800 rounded-full shadow-xs transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Side */}
            <div className="md:w-1/2 h-56 md:h-auto bg-slate-50 relative shrink-0">
              <img
                src={selectedProductDetails.image}
                alt={selectedProductDetails.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {selectedProductDetails.badge && (
                <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[9px] font-bold uppercase py-0.5 px-2.5 rounded-full shadow-md">
                  {selectedProductDetails.badge}
                </span>
              )}
            </div>

            {/* Right details content side */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {selectedProductDetails.subcategory}
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-1 leading-tight">
                    {selectedProductDetails.name}
                  </h3>
                  <p className="text-xs text-slate-400 italic">
                    Nombre comercial: {selectedProductDetails.commercialName}
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Descripción:</h5>
                    <p className="text-xs text-slate-600 leading-normal">
                      {selectedProductDetails.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Indicaciones Generales:</h5>
                    <p className="text-xs bg-emerald-50/50 p-2 border border-emerald-50 text-slate-700 leading-relaxed rounded-lg italic">
                      " {selectedProductDetails.indications} "
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] pt-1 border-t border-slate-50">
                  <div>
                    <span className="text-slate-400 font-semibold">Presentación:</span>
                    <p className="font-bold text-slate-700 mt-0.5">{selectedProductDetails.presentation}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Disponibilidad:</span>
                    <p className="font-bold text-emerald-700 mt-0.5">
                      {selectedProductDetails.availability ? `Vigente (${selectedProductDetails.stock} u)` : "Agotado temporal"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Trigger with price footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider leading-none">Precio</span>
                  <span className="text-base font-black text-emerald-600 mt-0.5">
                    ${selectedProductDetails.price.toLocaleString()} COP
                  </span>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(selectedProductDetails);
                    setSelectedProductDetails(null);
                  }}
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir al Pedido</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}
