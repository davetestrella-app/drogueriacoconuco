/**
 * Datetime: 2026-06-09
 * Droguería Coconuco Shared Types
 */

export interface Product {
  id: string;
  name: string;
  commercialName: string; // Nombre comercial
  category: string; // Medicamentos, Cuidado Personal, etc.
  subcategory: string; // Dolor y fiebre, Alergias, etc.
  description: string;
  indications: string; // Indicaciones generales
  presentation: string; // Presentación (e.g. "Caja x 10 tabletas")
  price: number; // Price in COP (Colombian Peso)
  availability: boolean; // Disponibilidad (stock)
  stock: number;
  rating: number;
  image: string; // Path or external URL
  badge?: string; // "Promoción", "Nuevo", etc.
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  orders?: Order[];
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  discountCode?: string;
  discountAmount: number;
  paymentMethod: string;
  status: 'Pendiente' | 'En camino' | 'Entregado' | 'Cancelado';
}
