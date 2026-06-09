import { useState, useMemo } from "react";
import { Clock, User, Heart, ArrowLeft, ArrowRight, Share2, AlertCircle } from "lucide-react";
import { BlogPost } from "../types";
import { BLOG_POSTS } from "../data/blog";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = ["Todos", "Bienestar", "Nutrición", "Salud Digestiva"];

  const filteredPosts = useMemo(() => {
    if (activeCategory === "Todos") return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  return (
    <div id="blog-section" className="space-y-10 pb-16 font-[sans-serif]">
      
      {/* If reading detailed post */}
      {selectedPost ? (
        <article id="detailed-blog-article" className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs">
          {/* Header image banner */}
          <div className="h-64 sm:h-80 w-full relative">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Overlay back button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 left-4 bg-white/95 hover:bg-white text-slate-800 hover:text-slate-900 rounded-xl px-3.5 py-2 text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la lista</span>
            </button>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100 italic">
              <span className="font-extrabold text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-full not-italic">
                {selectedPost.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Por {selectedPost.author}
              </span>
              <span>• Publicado el {selectedPost.date}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
              {selectedPost.title}
            </h2>

            {/* Summary description box */}
            <div className="bg-slate-50 p-4 border-l-4 border-emerald-500 rounded-r-xl text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              {selectedPost.summary}
            </div>

            {/* Structured markdown/paragraph rendering */}
            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line font-[sans-serif]">
              {selectedPost.content}
            </div>

            {/* Ethics disclaimer */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                <strong>Aviso de Divulgación Médica:</strong> Las informaciones divulgadas en este blog son de carácter exclusivamente ilustrativo y educativo con fines preventivos. Bajo ningún escenario sustituyen la consulta profesional directa con su médico de cabecera o regente calificado. Jamás altere tratamientos prescritos sin indicación explícita de su especialista.
              </p>
            </div>

            {/* Actions footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al listado de artículos
              </button>

              <button
                onClick={() => alert(`Enlace copiado al portapapeles. ¡Gracias por compartir salud!`)}
                className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>
            </div>
          </div>
        </article>
      ) : (
        <>
          {/* Blog Banner header */}
          <section className="bg-teal-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-emerald-950">
            <div className="max-w-xl space-y-3 relative z-10">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full">
                Portal Informativo Droguería Coconuco
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Blog de Salud y Bienestar Familiar
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
                Descubre artículos prácticos y recomendaciones preventivas elaboradas por médicos y especialistas para guiar tu estilo de vida y asegurar el correcto uso de tus medicamentos recetados.
              </p>
            </div>
            {/* Background design */}
            <div className="absolute right-0 bottom-[-20%] opacity-15 pointer-events-none md:block hidden text-9xl">
              🌿
            </div>
          </section>

          {/* Categories select options */}
          <section className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filtrar por tema:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </section>

          {/* Grid of articles */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                id={`blog-card-${post.id}`}
                className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col group"
              >
                {/* Visual */}
                <div className="h-48 bg-slate-50 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white text-slate-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Body metadata and info */}
                <div className="p-5 flex-1 flex flex-col space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-800 leading-snug line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => setSelectedPost(post)}>
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-50">
                    <span className="text-[10px] text-slate-400 italic">
                      Por: {post.author}
                    </span>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-extrabold text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Leer Más</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
      
    </div>
  );
}
