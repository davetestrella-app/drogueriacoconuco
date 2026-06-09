import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Shield, Scale, Send } from "lucide-react";

interface FooterProps {
  onTabChange: (tabId: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const [legalModal, setLegalModal] = useState<"privacidad" | "terminos" | null>(null);

  const handleLinkClick = (id: string) => {
    onTabChange(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-emerald-600 relative z-10 font-[sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Company Overview column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-base">
              ✚
            </div>
            <span className="text-lg font-black text-white tracking-wider uppercase">
              COCONUCO
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium italic">
            "Tu salud en las mejores manos"
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Droguería Coconuco está plenamente comprometida con el bienestar y la salud de la comunidad, ofreciendo productos farmacéuticos y de cuidado personal de alta calidad con atención profesional autorizada.
          </p>
          <div className="flex gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              Garantía de Origen Seguro
            </span>
          </div>
        </div>

        {/* Quick Links column */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-0.5 after:bg-emerald-500 pb-2">
            Enlaces Rápidos
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => handleLinkClick("inicio")}
                className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
              >
                • Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("nosotros")}
                className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
              >
                • Quiénes Somos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("medicamentos")}
                className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
              >
                • Medicamentos y Productos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("blog-de-salud")}
                className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
              >
                • Blog de Salud
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("contacto")}
                className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
              >
                • Formulario de Contacto
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info column */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-0.5 after:bg-emerald-500 pb-2">
            Contacto de Emergencia
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Carrera 3 # 5sur-45, Coconuco, Cauca, Colombia.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="tel:+573105980923" className="hover:text-white transition-colors">
                (+57) 3105980923
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="mailto:contacto@drogueriacoconuco.com" className="hover:text-white transition-colors">
                contacto@drogueriacoconuco.com
              </a>
            </li>
          </ul>
        </div>

        {/* Business Hours columns */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-0.5 after:bg-emerald-500 pb-2">
            Horarios de Atención
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="font-bold text-slate-200">Lunes a Sábado:</p>
                <p>8:00 a.m. – 8:00 p.m.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="font-bold text-slate-200">Domingos y Festivos:</p>
                <p>9:00 a.m. – 2:00 p.m.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>
          Derechos Reservados © 2026 Droguería Coconuco. Diseñado con altos estándares de seguridad y confianza.
        </p>
        
        {/* Legal buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setLegalModal("privacidad")}
            className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            Políticas de Privacidad
          </button>
          <button
            onClick={() => setLegalModal("terminos")}
            className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-slate-500" />
            Términos y Condiciones
          </button>
        </div>
      </div>

      {/* Dynamic Legal Overlay Modal */}
      {legalModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <h3 className="font-bold text-base text-slate-900 border-b pb-2 flex items-center gap-2">
              {legalModal === "privacidad" ? <Shield className="text-emerald-600" /> : <Scale className="text-emerald-600" />}
              {legalModal === "privacidad" ? "Políticas de Privacidad Tratamiento de Datos" : "Términos y Condiciones de Compra"}
            </h3>
            
            <div className="text-xs text-slate-600 space-y-2 h-64 overflow-y-auto pr-2">
              {legalModal === "privacidad" ? (
                <>
                  <p className="font-bold">1. Tratamiento de Datos Personales (Habeas Data):</p>
                  <p>En conformidad con la Ley 1581 de 2012 de la República de Colombia, Droguería Coconuco declara que la información recogida mediante el registro y canjes se emplea exclusivamente para:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>La tramitación de pedidos a domicilio en el Cauca.</li>
                    <li>Comunicación directa telefónica o vía WhatsApp para resolver dudas sobre prescripciones o stock.</li>
                    <li>Notificaciones exclusivas de seguridad de fármacos o promociones voluntarias.</li>
                  </ul>
                  <p>La información suministrada bajo ninguna circunstancia será transferida, vendida u ofrecida a terceros con intereses del tipo comercial o publicitario.</p>
                  <p className="font-bold">2. Almacenamiento Seguro:</p>
                  <p>Nuestras bases de datos están protegidas mediante estrictos protocolos HTTPS y cifrados locales para velar por la integridad de su perfil.</p>
                </>
              ) : (
                <>
                  <p className="font-bold">1. Compra de Medicamentos y Responsabilidad:</p>
                  <p>Los productos comercializados en Droguería Coconuco bajo la categoría de Venta Libre (OTC) no necesitan prescripción médica estricta. Sin embargo, instamos a leer instructivos y contraindicaciones impresas.</p>
                  <p className="font-bold">2. Cobertura de Domicilios y Contra Entrega:</p>
                  <p>Los pagos bajo la modalidad de Pago Contra Entrega aplican primordialmente dentro de la cabecera municipal de Coconuco, Cauca, así como áreas rurales aledañas con vialidad transitable disponible. Para despachos nacionales se requerirá validación de consignación previa.</p>
                  <p className="font-bold">3. Reclamos y Cancelaciones:</p>
                  <p>Por políticas nacionales de bioseguridad farmacéutica (Resolución 1403 de 2007), no se admiten devoluciones de medicamentos una vez hayan salido de la droguería, salvo por defectos comprobados en el lote de empaque original del laboratorio farmacéutico.</p>
                </>
              )}
            </div>

            <button
              onClick={() => setLegalModal(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs"
            >
              Entendido, Cerrar
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
