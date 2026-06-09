import React, { useState } from "react";
import { X, Trash2, ShoppingCart, Percent, CreditCard, Landmark, Truck, AlertTriangle, CheckCircle } from "lucide-react";
import { CartItem, Coupon, User } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: "COCONUCO10", discountPercentage: 10, description: "10% de descuento en medicamentos" },
  { code: "SALUD20", discountPercentage: 20, description: "20% de descuento para cuidar tu salud" },
  { code: "BIENVENIDA", discountPercentage: 15, description: "15% de descuento primer pedido" }
];

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onOpenAuth
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("contra_entrega");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<{ id: string; total: number; eta: string } | null>(null);

  // Form states if user is not fully registered or wants to confirm
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || "Carrera 3 # 5-45, Coconuco");
  const [shippingPhone, setShippingPhone] = useState(currentUser?.phone || "3105980923");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = activeCoupon ? Math.round((subtotal * activeCoupon.discountPercentage) / 100) : 0;
  const deliveryFee = paymentMethod === "contra_entrega" ? 3000 : 0; // nominal delivery fee
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (!couponCode) {
      setCouponError("Por favor ingresa un código.");
      return;
    }

    const found = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (found) {
      setActiveCoupon(found);
      setCouponSuccess(`¡Cupón "${found.code}" aplicado! (${found.discountPercentage}% de descuento)`);
      setCouponCode("");
    } else {
      setCouponError("Cupón no válido. Intenta con 'COCONUCO10' o 'SALUD20'.");
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (cartItems.length === 0) return;

    setIsCheckingOut(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = "PED-" + Math.floor(100000 + Math.random() * 900000);
      setPlacedOrderDetails({
        id: orderId,
        total: total,
        eta: paymentMethod === "contra_entrega" ? "30 - 45 minutos (Domicilio Expreso Coconuco)" : "Hoy mismo antes de las 6:00 p.m."
      });
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 1500);
  };

  const handleResetCartState = () => {
    setActiveCoupon(null);
    setCheckoutComplete(false);
    setPlacedOrderDetails(null);
    onClose();
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 bg-slate-950/45 backdrop-blur-md flex justify-end z-50">
      {/* Click outside to close (disabled when checkout complete to avoid accidental exits) */}
      <div className="absolute inset-0" onClick={checkoutComplete ? undefined : onClose} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        id="cart-drawer-panel"
        className="relative bg-white/75 backdrop-blur-lg border-l border-white/30 w-full max-w-md h-full shadow-2xl flex flex-col z-10"
      >
        {/* Header */}
        <div id="cart-drawer-header" className="px-6 py-4 bg-white/40 backdrop-blur-sm border-b border-white/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-base">Mi Carrito de Compras</h3>
            {cartItems.length > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            )}
          </div>
          <button
            id="cart-drawer-close"
            onClick={checkoutComplete ? handleResetCartState : onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Ticket Screen */}
        {checkoutComplete && placedOrderDetails ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="p-4 bg-emerald-100/80 text-emerald-600 rounded-full animate-bounce">
              <CheckCircle className="w-16 h-16" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-800">¡Pedido Realizado con Éxito!</h4>
              <p className="text-sm text-slate-600">
                Gracias {currentUser?.fullName}, tu solicitud ha sido enviada directamente a nuestra central de despachos en Coconuco.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 w-full text-left font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                <span className="text-slate-500">ID del Pedido:</span>
                <span className="font-bold text-slate-800">{placedOrderDetails.id}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                <span className="text-slate-500">Comprador:</span>
                <span className="font-bold text-slate-800">{currentUser?.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                <span className="text-slate-500">Destino:</span>
                <span className="font-bold text-slate-800">{shippingAddress}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                <span className="text-slate-500">Teléfono:</span>
                <span className="font-bold text-slate-800">{shippingPhone}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                <span className="text-slate-500">Medio de Pago:</span>
                <span className="font-bold text-emerald-700">
                  {paymentMethod === "contra_entrega" ? "Contra Entrega / Domiciliario" : 
                   paymentMethod === "transferencia" ? "Transferencia Directa" : "Tarjeta de Crédito"}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-bold">Total Facturado:</span>
                <span className="font-bold text-emerald-600 text-sm">
                  ${placedOrderDetails.total.toLocaleString()} COP
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100 text-left">
              <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800">Tiempo estimado de entrega:</p>
                <p className="text-xs text-amber-700">{placedOrderDetails.eta}</p>
              </div>
            </div>

            <button
              onClick={handleResetCartState}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Seguir Explorando Productos
            </button>
          </div>
        ) : (
          <>
            {/* Cart list screen */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-4/5 flex flex-col items-center justify-center text-center text-slate-400 p-8 space-y-4">
                  <ShoppingCart className="w-16 h-16 text-slate-200 stroke-[1.5]" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-700">Tu carrito está vacío</p>
                    <p className="text-xs max-w-[240px]">
                      Agrega productos desde nuestra sección de Medicamentos o Promociones para comenzar tu pedido.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3 flex gap-3 items-start">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg border border-slate-100 shrink-0 bg-slate-50"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] uppercase font-bold text-slate-400">
                          {item.product.subcategory}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-800 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 italic truncate">
                          CN: {item.product.commercialName}
                        </p>
                        <p className="text-xs font-bold text-emerald-600 mt-1">
                          ${item.product.price.toLocaleString()} COP
                        </p>

                        {/* Quantity Buttons */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2.5 py-0.5 text-xs text-slate-500 hover:bg-slate-200 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-xs text-slate-700 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                if (item.quantity >= item.product.stock) {
                                  alert(`Lo sentimos, el stock disponible para este producto es de ${item.product.stock} unidades.`);
                                  return;
                                }
                                onUpdateQuantity(item.product.id, 1);
                              }}
                              className="px-2.5 py-0.5 text-xs text-slate-500 hover:bg-slate-200 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Eliminar artículo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Checkout shipping info form when items exist */}
              {cartItems.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Información de Entrega
                  </h4>
                  {!currentUser ? (
                    <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded-lg border border-amber-100 flex flex-col gap-2">
                      <p className="flex items-center gap-1.5 font-semibold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        Se requiere iniciar sesión
                      </p>
                      <p>Para concluir tu pedido de medicamentos, por favor registrate o inicia sesión.</p>
                      <button
                        onClick={onOpenAuth}
                        className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-center text-[11px] self-start transition-colors"
                      >
                        Ingresar Ahora
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 bg-white/40 backdrop-blur-sm p-3 rounded-lg border border-white/40">
                      <p className="text-xs text-slate-650">
                        Entregar a: <span className="font-bold text-slate-800">{currentUser.fullName}</span>
                      </p>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 block">Confirmar Dirección *</label>
                        <input
                          type="text"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          className="w-full text-slate-700 text-xs mt-0.5 px-2 py-1.5 border border-white/60 rounded bg-white/40 backdrop-blur-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 block">Confirmar Celular *</label>
                        <input
                          type="text"
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          className="w-full text-slate-700 text-xs mt-0.5 px-2 py-1.5 border border-white/60 rounded bg-white/40 backdrop-blur-xs"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Payment Methods */}
                  <div className="space-y-2">
                    <h5 className="text-[11px] font-bold text-slate-600">Método de Pago:</h5>
                    <div className="grid grid-cols-3 gap-1.5 text-slate-700">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("contra_entrega")}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentMethod === "contra_entrega"
                            ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-800 ring-1 ring-emerald-500/30"
                            : "border-white/50 bg-white/30 hover:bg-white/50 text-slate-600"
                        }`}
                      >
                        <Truck className="w-4 h-4 mb-1" />
                        <span className="text-[10px] font-bold">Contra Entrega</span>
                        <span className="text-[8px] text-slate-400">En Coconuco</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transferencia")}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentMethod === "transferencia"
                            ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-800 ring-1 ring-emerald-500/30"
                            : "border-white/50 bg-white/30 hover:bg-white/50 text-slate-600"
                        }`}
                      >
                        <Landmark className="w-4 h-4 mb-1" />
                        <span className="text-[10px] font-bold">Transferencia</span>
                        <span className="text-[8px] text-slate-400">Nequi/Ahorros</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("tarjeta")}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentMethod === "tarjeta"
                            ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-800 ring-1 ring-emerald-500/30"
                            : "border-white/50 bg-white/30 hover:bg-white/50 text-slate-600"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mb-1" />
                        <span className="text-[10px] font-bold">Tarjeta Online</span>
                        <span className="text-[8px] text-slate-400">Visa / Mastercard</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Summary and checkout buttons footer */}
            {cartItems.length > 0 && (
              <div id="cart-drawer-footer" className="bg-white/40 backdrop-blur-md p-4 border-t border-white/30 space-y-3">
                {/* Coupon component */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Percent className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Código de descuento (ej: COCONUCO10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-slate-750 text-xs pl-8 pr-1 py-1.5 border border-white/60 rounded bg-white/40 backdrop-blur-xs uppercase font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
                  >
                    Aplicar
                  </button>
                </form>

                {couponError && <p className="text-[10px] text-rose-600 font-semibold">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-emerald-600 font-semibold">{couponSuccess}</p>}

                {/* Bill Breakdown */}
                <div className="space-y-1 text-slate-700 font-medium text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span>${subtotal.toLocaleString()} COP</span>
                  </div>

                  {activeCoupon && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span className="flex items-center gap-1">
                        Descuento ({activeCoupon.discountPercentage}%)
                      </span>
                      <span>-${discountAmount.toLocaleString()} COP</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-slate-500">Recargo domicilio</span>
                    <span>{deliveryFee > 0 ? `$${deliveryFee.toLocaleString()} COP` : "Gratis"}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-slate-800 border-t border-slate-200 pt-2 mt-1">
                    <span>Total estimado</span>
                    <span className="text-emerald-600">${total.toLocaleString()} COP</span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <button
                  id="cart-checkout-action-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !shippingAddress || !shippingPhone}
                  className={`w-full py-3 rounded-lg font-bold text-sm shadow-md transition-all text-white flex items-center justify-center gap-2 cursor-pointer ${
                    !currentUser
                      ? "bg-slate-800 hover:bg-slate-900"
                      : "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                  }`}
                >
                  {isCheckingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Procesando Pedido...
                    </>
                  ) : !currentUser ? (
                    "Inicia Sesión para Confirmar"
                  ) : (
                    "Finalizar e Inicializar Pedido"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
