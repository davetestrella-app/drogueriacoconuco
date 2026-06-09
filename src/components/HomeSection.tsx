import { Heart, ShieldCheck, Zap, Award, Search, Sparkles, Star } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";

interface HomeSectionProps {
  onTabChange: (tabId: string) => void;
  onAddToCart: (product: Product) => void;
  onCategorySelect: (subcategory: string) => void;
}

export default function HomeSection({ onTabChange, onAddToCart, onCategorySelect }: HomeSectionProps) {
  // Get top 4 products for "Productos Destacados"
  const featuredProducts = PRODUCTS.slice(0, 4);

  const categories = [
    { name: "Analgésicos", sub: "Dolor y fiebre", icon: "💊", color: "from-emerald-50 to-teal-50 hover:bg-emerald-100" },
    { name: "Antigripales", sub: "Resfriado y gripe", icon: "🍵", color: "from-blue-50 to-sky-50 hover:bg-blue-100" },
    { name: "Antialérgicos", sub: "Alergias", icon: "🩺", color: "from-purple-50 to-pink-50 hover:bg-purple-100" },
    { name: "Antiácidos", sub: "Digestión", icon: "🍋", color: "from-amber-50 to-orange-50 hover:bg-amber-100" },
    { name: "Vitaminas", sub: "Vitaminas", icon: "🍎", color: "from-rose-50 to-red-50 hover:bg-rose-100" },
    { name: "Suplementos", sub: "Suplementos nutricionales", icon: "🍼", color: "from-teal-55 to-emerald-50 hover:bg-teal-100" }
  ];

  return (
    <div id="home-section" className="space-y-16 pb-16">
      
      {/* Banner Principal / Hero Section */}
      <section
        id="hero-banner"
        className="relative bg-gradient-to-r from-emerald-600 to-blue-700 rounded-3xl overflow-hidden shadow-xl text-white py-16 px-6 sm:px-12 lg:px-20 border border-white/20"
      >
        {/* Background Image with opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
            alt="Farmacia de confianza"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-10 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/80 via-teal-800/55 to-blue-900/40"></div>
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/25 border border-white/30 backdrop-blur-md rounded-full text-blue-100 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Servicio Certificado en el Cauca
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight font-[system-ui]">
            Droguería Coconuco: <br />
            <span className="text-emerald-300">productos de calidad</span> para cuidar tu salud y la de tu familia.
          </h2>

          <p className="text-sm sm:text-base text-blue-100 max-w-lg leading-relaxed font-medium">
            Consigue tus medicamentos de venta libre, leches de fórmula para bebé y vitaminas esenciales con domicilios directos a tu puerta. Rapidez, legalidad y atención farmacéutica experta.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onTabChange("medicamentos")}
              className="px-6 py-3 bg-white text-emerald-700 hover:bg-emerald-50 active:scale-95 font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Comprar ahora
            </button>
            <button
              onClick={() => {
                onCategorySelect("PROMO:ON"); // custom indicator for discount filter
                onTabChange("medicamentos");
              }}
              className="px-6 py-3 border-2 border-white/30 backdrop-blur-xs hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Ver promociones
            </button>
          </div>
        </div>

        {/* Floating Accent Badges (Desktop) */}
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-80 bg-white/20 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 space-y-4 shadow-xl">
          <h4 className="text-sm font-black text-white uppercase tracking-wider">
            Domicilios Coconuco:
          </h4>
          <div className="space-y-3 text-xs text-white/95 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-teal-200">✓</span>
              <span>Entregas rápidas en menos de 45 mins</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-200">✓</span>
              <span>Pago seguro contra entrega</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-200">✓</span>
              <span>Asesoría gratuita vía WhatsApp</span>
            </div>
          </div>
          <div className="pt-2 border-t border-white/20 text-center font-mono text-[10px] text-blue-200">
            Tel/WA: (+57) 3105980923
          </div>
        </div>
      </section>

      {/* Brand USPs Bar */}
      <section id="brand-usps" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-xs border border-white/40 flex items-start gap-4 hover:bg-white/80 transition-all duration-300">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Atención Humana</h4>
            <p className="text-xs text-slate-500 mt-1">Nuestros farmacéuticos certificados atienden todas tus consultas con calidez.</p>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-xs border border-white/40 flex items-start gap-4 hover:bg-white/80 transition-all duration-300">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Garantía 100% Real</h4>
            <p className="text-xs text-slate-500 mt-1">Medicamentos legítimos directos de laboratorios farmacéuticos aprobados por el INVIMA.</p>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-xs border border-white/40 flex items-start gap-4 hover:bg-white/80 transition-all duration-300">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Envío Express</h4>
            <p className="text-xs text-slate-500 mt-1">Despachamos inmediatamente en motocicleta en la cabecera de Coconuco.</p>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-xs border border-white/40 flex items-start gap-4 hover:bg-white/80 transition-all duration-300">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Precios Justos</h4>
            <p className="text-xs text-slate-500 mt-1">Ofrecemos genéricos homologados y marcas líderes a precios altamente competitivos.</p>
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section id="featured-categories" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">Encuentra rápido</span>
            <h3 className="text-xl font-bold text-slate-800 font-[sans-serif]">Medicamentos de Venta Libre</h3>
          </div>
          <button
            onClick={() => onTabChange("medicamentos")}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Ver todo el catálogo →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              id={`category-button-${idx}`}
              onClick={() => {
                onCategorySelect(cat.sub);
                onTabChange("medicamentos");
              }}
              className="p-5 rounded-2xl bg-white/45 backdrop-blur-md border border-white/50 text-center flex flex-col items-center justify-center gap-3 cursor-pointer group shadow-xs hover:bg-white/70 hover:scale-103 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/5 flex items-center justify-center text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="featured-products" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">Recomendaciones del mes</span>
            <h3 className="text-xl font-bold text-slate-800">Productos Destacados</h3>
          </div>
          <button
            onClick={() => onTabChange("medicamentos")}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            Filtrar por marca →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              id={`featured-card-${p.id}`}
              className="bg-white/60 backdrop-blur-md rounded-[24px] border border-white/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
            >
              {/* Badge */}
              {p.badge && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full z-10">
                  {p.badge}
                </span>
              )}

              {/* Product Visual */}
              <div className="h-44 bg-slate-50/50 relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Data */}
              <div className="p-4 flex-1 flex flex-col space-y-1">
                <span className="text-[9px] uppercase font-bold text-slate-405">
                  {p.subcategory}
                </span>
                
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight line-clamp-1">
                  {p.name}
                </h4>
                
                <p className="text-[11px] text-slate-400 italic line-clamp-1">
                  M. Comercial: {p.commercialName}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                  {p.description}
                </p>

                <div className="flex items-center gap-1 mt-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-750">{p.rating}</span>
                </div>

                {/* Presentation info */}
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">
                  Pres: {p.presentation}
                </p>

                {/* Price and Add button */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/40">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider leading-none">
                      Precio COP
                    </span>
                    <span className="text-sm font-black text-emerald-600 mt-0.5">
                      ${p.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(p)}
                    className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-[11px] rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote / Banner de Citas */}
      <section
        id="coconuco-quote"
        className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
      >
        <div className="space-y-2 max-w-xl">
          <h4 className="text-lg font-black text-slate-800">
            ¿Tienes alguna consulta sobre dosis o disponibilidad?
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nuestro regente farmacéutico puede asesorarte de forma totalmente gratuita. No arriesgues tu bienestar, consúltanos de inmediato por WhatsApp antes de consumir cualquier fármaco.
          </p>
        </div>
        <a
          href="https://wa.me/573105980923"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 shrink-0"
        >
          💬 Chatear con Farmacéutico
        </a>
      </section>
    </div>
  );
}
