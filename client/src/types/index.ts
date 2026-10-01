export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Burgers' | 'Pizza' | 'Chicken' | 'Snacks' | 'Drinks' | 'Desserts';
  image: string;
  available: boolean | number;
  created_at?: string;
  rating?: number;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name?: string;
  product_image?: string;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  items?: OrderItem[];
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
}
