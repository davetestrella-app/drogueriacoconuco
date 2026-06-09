import React, { useState } from "react";
import { X, LogIn, UserPlus, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { User as UserType } from "../types";
import { motion } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Por favor complete los campos obligatorios.");
      return;
    }

    if (!isLogin && !fullName) {
      setError("Por favor ingrese su nombre completo.");
      return;
    }

    // Simple Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (isLogin) {
      // Simulate successful login
      const dummyUser: UserType = {
        id: "usr-" + Math.floor(Math.random() * 1000),
        fullName: email.split("@")[0].toUpperCase(),
        email: email,
        phone: "(+57) 300 123 4567",
        address: "Calle de las Rosas 12-45",
        city: "Coconuco, Cauca",
        orders: []
      };

      // If user had registered in this session, map it
      const savedUserStr = localStorage.getItem(`register_${email}`);
      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          dummyUser.fullName = parsed.fullName;
          dummyUser.phone = parsed.phone;
          dummyUser.address = parsed.address;
          dummyUser.city = parsed.city;
        } catch (e) {
          // ignore
        }
      }

      setSuccess("¡Bienvenido de nuevo! Inicio de sesión exitoso.");
      setTimeout(() => {
        onLoginSuccess(dummyUser);
        onClose();
        setEmail("");
        setPassword("");
      }, 1200);

    } else {
      // Register logic
      const newUser: UserType = {
        id: "usr-" + Math.floor(Math.random() * 1000),
        fullName,
        email,
        phone: phone || "(+57) " + Math.floor(Math.random() * 10000000),
        address: address || "Sin dirección",
        city: city || "Coconuco",
        orders: []
      };

      // Store temporarily to simulate persistent logins
      localStorage.setItem(`register_${email}`, JSON.stringify(newUser));

      setSuccess("¡Registro exitoso! Ya puedes iniciar sesión con tu correo.");
      setTimeout(() => {
        setIsLogin(true);
        setSuccess("");
        // Reset non-common fields
        setFullName("");
        setPhone("");
        setAddress("");
        setCity("");
      }, 1500);
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 bg-slate-950/45 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        id="auth-modal-card"
        className="bg-white/75 backdrop-blur-lg rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative border border-white/50"
      >
        <button
          id="auth-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100/30 rounded-full transition-colors duration-200 cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Toggle */}
        <div id="auth-modal-tabs" className="grid grid-cols-2 bg-white/20 border-b border-white/30 p-1">
          <button
            id="auth-tab-login"
            type="button"
            onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
            className={`py-3 text-center text-sm font-semibold rounded-t-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isLogin
                ? "bg-white/70 backdrop-blur-xs text-emerald-600 shadow-xs border-b-2 border-emerald-500"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <LogIn className="w-4 h-4" />
            Ingresar
          </button>
          <button
            id="auth-tab-register"
            type="button"
            onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
            className={`py-3 text-center text-sm font-semibold rounded-t-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !isLogin
                ? "bg-white/70 backdrop-blur-xs text-emerald-600 shadow-xs border-b-2 border-emerald-500"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Registrarse
          </button>
        </div>

        {/* Form Body */}
        <form id="auth-form" onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center mb-2">
            <h3 id="auth-modal-title" className="text-lg font-bold text-slate-800">
              {isLogin ? "Acceso de Clientes" : "Crear nueva cuenta"}
            </h3>
            <p className="text-xs text-slate-500">
              {isLogin
                ? "Ingresa tus credenciales para administrar tus pedidos"
                : "Regístrate para comprar más rápido y consultar promociones"
              }
            </p>
          </div>

          {error && (
            <div id="auth-error-alert" className="p-3 bg-rose-50/80 backdrop-blur-xs text-rose-700 text-xs rounded-lg border border-rose-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping"></span>
              {error}
            </div>
          )}

          {success && (
            <div id="auth-success-alert" className="p-3 bg-emerald-50/80 backdrop-blur-xs text-emerald-700 text-xs rounded-lg border border-emerald-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
              {success}
            </div>
          )}

          {/* Full Name for register */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-605 block">Nombre Completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  id="auth-input-fullname"
                  type="text"
                  placeholder="Juan Valdez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-slate-700 text-xs pl-10 pr-4 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-605 block">Correo Electrónico *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="auth-input-email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-slate-700 text-xs pl-10 pr-4 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-605 block">Contraseña *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="auth-input-password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-slate-700 text-xs pl-10 pr-4 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                required
              />
            </div>
          </div>

          {/* Optional phone, address and city for register */}
          {!isLogin && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-605 block">Teléfono / Celular</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    id="auth-input-phone"
                    type="tel"
                    placeholder="3105980923"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-slate-700 text-xs pl-10 pr-4 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-605 block">Dirección de entrega</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="auth-input-address"
                      type="text"
                      placeholder="Carrera 3 # 5-45"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-slate-700 text-xs pl-10 pr-2 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-605 block">Ciudad / Municipio</label>
                  <input
                    id="auth-input-city"
                    type="text"
                    placeholder="Coconuco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-slate-750 text-xs px-3 py-2.5 border border-white/60 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-xs"
                  />
                </div>
              </div>
            </>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            {isLogin ? "Entrar" : "Crear mi Cuenta de Salud"}
          </button>
        </form>

        <div className="p-4 bg-white/10 border-t border-white/20 text-center text-[11px] text-slate-500 font-medium">
          En Droguería Coconuco, resguardamos plenamente tu privacidad. Al ingresar aceptas las políticas Colombianas de tratamiento de datos personales Ley 1581 de 2012.
        </div>
      </motion.div>
    </div>
  );
}
