import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, Smartphone, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !subject || !message) {
      setErrorMsg("Por favor, rellene todos los campos obligatorios marcados con (*).");
      return;
    }

    setLoading(true);

    // Simulate sending form message to Colombian server
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Clean states
      setFullName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 1200);
  };

  return (
    <div id="contact-section" className="space-y-16 pb-16 font-[sans-serif]">
      {/* Intro Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-white/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full inline-block border border-white/50">
          Atención al Cliente
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
          Estamos Aquí para Atenderte y Cuidar de Ti
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          Ya sea que necesites resolver dudas sobre un fármaco, consultar disponibilidad de existencias o solicitar un despacho domiciliario ágil en Coconuco, escríbenos de inmediato.
        </p>
      </section>

      {/* Grid: Details on Left, Interactive Form on Right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Deck */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Canales Directos</h3>
            <p className="text-xs text-slate-500">
              Usa cualquiera de nuestras vías directas para conseguir cotizaciones con rapidez.
            </p>

            <ul className="space-y-5 text-xs text-slate-650">
              <li className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-700 rounded-xl mt-0.5 shadow-xs shrink-0 border border-emerald-500/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-tight">Dirección Principal:</h4>
                  <p className="text-slate-600 mt-0.5">Carrera 3 # 5sur-45, Coconuco, Cauca, Colombia.</p>
                  <span className="text-[10px] text-teal-600 font-bold uppercase mt-1 block">📍 Frente a Plaza de Coconuco</span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-700 rounded-xl mt-0.5 shadow-xs shrink-0 border border-emerald-500/10">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-tight">WhatsApp / Teléfono:</h4>
                  <p className="text-slate-600 mt-0.5">(+57) 3105980923</p>
                  <a
                    href="https://wa.me/573105980923"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 font-bold mt-1"
                  >
                    💬 Chatear con la Droguería ahora
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-700 rounded-xl mt-0.5 shadow-xs shrink-0 border border-emerald-500/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-tight">Correo Electrónico:</h4>
                  <p className="text-slate-600 mt-0.5">contacto@drogueriacoconuco.com</p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-500/10 text-emerald-700 rounded-xl mt-0.5 shadow-xs shrink-0 border border-emerald-500/10">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-tight">Horario de Despachos:</h4>
                  <p className="text-slate-600 mt-0.5">
                    <strong>Lunes a Sábado:</strong> 8:00 a.m. – 8:00 p.m.
                  </p>
                  <p className="text-slate-600 mt-1">
                    <strong>Domingos y Festivos:</strong> 9:00 a.m. – 2:00 p.m.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Styled Map Location Mockup */}
          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-5 relative overflow-hidden h-56 flex flex-col justify-end">
            {/* Visual background element representing grid roads */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Lines of stylized map */}
            <div className="absolute top-1/3 left-0 right-0 h-4 bg-slate-200/50 rotate-12 origin-center shadow-xs"></div>
            <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-slate-200/50 -rotate-6 origin-center shadow-xs"></div>
            
            {/* Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
              <div className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-emerald-100/50 animate-bounce">
                ✚
              </div>
              <span className="bg-slate-900/90 backdrop-blur-xs text-white font-bold text-[10px] py-1 px-2.5 rounded shadow-md inline-block mt-2 whitespace-nowrap">
                Droguería Coconuco (Cauca)
              </span>
            </div>

            <span className="relative z-10 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-left font-mono">
              📍 Ubicación Geográfica Certificada
            </span>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-7 bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xs">
          <div className="space-y-2 mb-6">
            <h3 className="text-lg font-bold text-slate-800">Formulario de Contacto Seguro</h3>
            <p className="text-xs text-slate-500">
              Compártenos de inmediato tus consultas. Responderemos al correo electrónico proporcionado a la mayor brevedad posible.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 bg-rose-50/80 backdrop-blur-xs border border-rose-100 rounded-xl flex items-center gap-2 text-xs text-rose-700 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {success ? (
            <div id="contact-success-box" className="p-6 bg-emerald-50/70 backdrop-blur-md border border-emerald-100/50 rounded-2xl text-center space-y-4 animate-fade-in">
              <div className="p-3 bg-emerald-100/50 text-emerald-600 rounded-full w-fit mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-sm font-bold text-slate-800">¡Mensaje Enviado Exitosamente!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gracias por tu mensaje. El regente de farmacia de Droguería Coconuco ya tiene constancia de tu solicitud y te contactará en un rango menor a 4 horas laborales.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 text-slate-700">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Nombre Completo *</label>
                <input
                  id="contact-input-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if(errorMsg) setErrorMsg("");
                  }}
                  placeholder="Ej: Juan de Dios Castro"
                  className="w-full text-slate-750 text-xs px-3.5 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Correo Electrónico *</label>
                  <input
                    id="contact-input-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(errorMsg) setErrorMsg("");
                    }}
                    placeholder="Ej: juan@ejemplo.com"
                    className="w-full text-slate-755 text-xs px-3.5 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Número telefónico</label>
                  <input
                    id="contact-input-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 3105980923"
                    className="w-full text-slate-750 text-xs px-3.5 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Asunto *</label>
                <input
                  id="contact-input-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if(errorMsg) setErrorMsg("");
                  }}
                  placeholder="Ej: Consulta disponibilidad Acetaminofén jarabe"
                  className="w-full text-slate-750 text-xs px-3.5 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Mensaje / Consulta *</label>
                <textarea
                  id="contact-input-message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if(errorMsg) setErrorMsg("");
                  }}
                  rows={4}
                  placeholder="Describe detalladamente tu pregunta médica, dosis, requieres domicilio, etc..."
                  className="w-full text-slate-750 text-xs px-3.5 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs resize-y"
                  required
                ></textarea>
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-bold text-sm shadow-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Enviando Mensaje...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje Comercial</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
