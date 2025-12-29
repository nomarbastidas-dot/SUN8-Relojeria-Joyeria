export type Language = 'en' | 'es' | 'fr';

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: 'watches' | 'jewelry';
  stock: number;
  description: string;
  features: string[];
}

export interface CartItem extends Product {
  qty: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
}