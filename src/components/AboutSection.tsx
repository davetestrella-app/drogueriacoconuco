import { Heart, Landmark, Compass, Eye, ShieldAlert, BadgeCheck, Leaf, Group, Sparkles } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      title: "Responsabilidad",
      desc: "Compromiso absoluto en el manejo técnico de medicamentos vigentes y conservación idónea de cadenas de frío.",
      color: "border-emerald-200 bg-emerald-50 text-emerald-800",
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Honestidad",
      desc: "Precios oficiales transparentes, información legítima sobre alternativas genéricas y fechas de caducidad claras.",
      color: "border-blue-200 bg-blue-50 text-blue-800",
      icon: <BadgeCheck className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Compromiso",
      desc: "Entrega constante de bienestar y ayuda terapéutica oportuna a toda la comunidad de Coconuco y el Cauca.",
      color: "border-purple-200 bg-purple-50 text-purple-800",
      icon: <Heart className="w-5 h-5 text-purple-600" />
    },
    {
      title: "Calidad",
      desc: "Solo distribuimos productos respaldados por laboratorios acreditados ante entes de control sanitario (INVIMA).",
      color: "border-rose-200 bg-rose-50 text-rose-800",
      icon: <Leaf className="w-5 h-5 text-rose-600" />
    },
    {
      title: "Respeto",
      desc: "Atención digna, confidencialidad del paciente resguardada y trato familiar a cada uno de nuestros vecinos.",
      color: "border-amber-200 bg-amber-50 text-amber-800",
      icon: <Compass className="w-5 h-5 text-amber-600" />
    },
    {
      title: "Servicio",
      desc: "Asistencia ágil y domicilios prioritarios pensados especialmente para adultos mayores y personas con movilidad reducida.",
      color: "border-teal-200 bg-teal-50 text-teal-800",
      icon: <Sparkles className="w-5 h-5 text-teal-600" />
    }
  ];

  return (
    <div id="about-section" className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-white/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full inline-block border border-white/50">
          Droguería Coconuco
        </span>
        <h2 className="text-3xl font-black text-slate-800 leading-tight">
          Nuestra Trayectoria de Confianza y Bienestar
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          Trabajamos día tras día con la convicción de que una comunidad saludable es una comunidad próspera. Conoce los pilares que rigen nuestra labor en Coconuco, Puracé, Colombia.
        </p>
      </section>

      {/* Bento Grid: Quienes somos, Mision and Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quiénes somos card */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xs flex flex-col justify-between space-y-6 lg:col-span-1 hover:bg-white/80 transition-all duration-300">
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-500/10 rounded-2xl w-fit text-emerald-700">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">¿Quiénes Somos?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Droguería Coconuco es una empresa profundamente comprometida con el bienestar y la salud de la comunidad. Ofrecemos productos farmacéuticos y de cuidado personal de alta calidad con atención personalizada y asesoría profesional directa de nuestro personal, velando para que cada hogar reciba una opción terapéutica oportuna y confiable.
            </p>
          </div>
          <div className="pt-4 border-t border-white/30 font-mono text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
            ★ Orgullosamente Coconuqueños
          </div>
        </div>

        {/* Misión card */}
        <div className="bg-gradient-to-br from-emerald-950/85 to-teal-900/85 backdrop-blur-md rounded-3xl p-8 shadow-md text-white flex flex-col justify-between space-y-6 lg:col-span-1 border border-white/20">
          <div className="space-y-4">
            <div className="p-3.5 bg-white/10 rounded-2xl w-fit text-emerald-300 border border-white/10">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-emerald-300">Nuestra Misión</h3>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
              Brindar productos farmacéuticos y de cuidado personal con los más altos estándares de calidad, seguridad y excelente servicio al cliente. Contribuimos activamente al bienestar integral y a la tranquilidad de nuestros usuarios en cada etapa de su vida, garantizando el acceso oportuno a soluciones terapéuticas con calidez humana.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-teal-300 font-bold uppercase tracking-wider">
            ★ Salud con Propósito
          </div>
        </div>

        {/* Visión card */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xs flex flex-col justify-between space-y-6 lg:col-span-1 hover:bg-white/80 transition-all duration-300">
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-500/10 rounded-2xl w-fit text-emerald-700">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Nuestra Visión</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Ser la droguería líder en la región, reconocida por la confianza inquebrantable de la comunidad, la frescura y calidad de sus productos y la excelencia inigualable en el servicio al cliente. Proyectamos expandir nuestra cobertura de domicilios seguros para abarcar todos los rincones del corregimiento con tecnología y amor al prójimo.
            </p>
          </div>
          <div className="pt-4 border-t border-white/30 font-mono text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
            ★ Liderazgo en el Cauca 2030
          </div>
        </div>
      </section>

      {/* Valores Corporativos */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800">Nuestros Valores</h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            La ética profesional y la honradez son el corazón de todas nuestras actividades. Estos pilares guían cada dispensación de medicamentos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className={`p-6 bg-white/45 backdrop-blur-md rounded-2xl border ${v.color.replace('bg-emerald-50', 'bg-white/30').replace('bg-blue-50', 'bg-white/30').replace('bg-purple-50', 'bg-white/30').replace('bg-rose-50', 'bg-white/30').replace('bg-amber-50', 'bg-white/30').replace('bg-teal-50', 'bg-white/30')} border-white/50 flex flex-col gap-4 hover:scale-[1.02] hover:shadow-xs transition-all duration-300`}
            >
              <div className="p-2.5 bg-white rounded-xl w-fit shadow-xs">
                {v.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">
                  {v.title}
                </h4>
                <p className="text-xs text-slate-605 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Engagement Section with Image placeholder */}
      <section className="bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/50 p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center shadow-xs">
        <div className="lg:w-1/2 space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Impacto Comunitario</h4>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">Asesoría Farmacéutica Cercana</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Nuestra labor va mucho más allá de vender cajas de medicamentos. Nos enorgullece ser un punto de orientación en salud para los agricultores, indígenas, familias y visitantes del Cauca. Brindamos charlas gratuitas de prevención, tomas de tensión arterial coordinadas y recomendaciones éticas sobre el no-uso innecesario de antibióticos.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white/40 backdrop-blur-xs p-3 rounded-xl border border-white/50">
              <span className="block text-xl font-bold text-emerald-600 font-[mono]">100%</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Productos Legítimos</span>
            </div>
            <div className="bg-white/40 backdrop-blur-xs p-3 rounded-xl border border-white/50">
              <span className="block text-xl font-bold text-emerald-600 font-[mono]">+5,000</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Fórmulas Entregadas</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 h-64 lg:h-80 w-full rounded-2xl overflow-hidden shadow-xs relative">
          <img
            src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop"
            alt="Atención médica personalizada"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/15 hover:bg-transparent transition-all duration-300"></div>
        </div>
      </section>
    </div>
  );
}
