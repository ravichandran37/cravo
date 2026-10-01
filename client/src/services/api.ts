import type { Product, Order, AdminStats } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Helper to get auth header
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('cravo_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const api = {
  // Products
  async getProducts(category?: string, search?: string): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (search) params.append('search', search);
      const url = `${API_BASE}/products${params.toString() ? `?${params.toString()}` : ''}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data;
    } catch {
      // Fallback to sample data when backend not connected yet
      let list = [...INITIAL_PRODUCTS];
      if (category && category !== 'All') {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
      }
      return list;
    }
  },

  async getProductById(id: number): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch {
      const found = INITIAL_PRODUCTS.find((p) => p.id === Number(id));
      return found || null;
    }
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to create product' }));
      throw new Error(err.message || 'Failed to create product');
    }
    return await res.json();
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to update product' }));
      throw new Error(err.message || 'Failed to update product');
    }
    return await res.json();
  },

  async deleteProduct(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to delete product' }));
      throw new Error(err.message || 'Failed to delete product');
    }
    return await res.json();
  },

  // Orders
  async createOrder(orderData: {
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    total_amount: number;
    items: { product_id: number; quantity: number; price: number }[];
  }): Promise<{ id: number; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error('Order submission failed');
      return await res.json();
    } catch {
      // Local fallback simulation if server not reachable
      const mockId = Math.floor(1000 + Math.random() * 9000);
      return { id: mockId, message: 'Order placed successfully' };
    }
  },

  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  },

  async getOrderById(id: number): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch order');
    return await res.json();
  },

  async updateOrderStatus(id: number, status: string): Promise<{ success: boolean; status: string }> {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return await res.json();
  },

  // Admin Auth & Stats
  async adminLogin(credentials: { username: string; password: string }): Promise<{ token: string; admin: any }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(err.message || 'Login failed');
    }
    return await res.json();
  },

  async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  },
};
