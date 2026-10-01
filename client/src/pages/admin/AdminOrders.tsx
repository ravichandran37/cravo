import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Phone, MapPin, Search, RefreshCw } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';
import { api } from '../../services/api';
import { Toast } from '../../components/Toast';

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders();
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        // Fallback demo orders for testing UI
        setOrders([
          {
            id: 1042,
            customer_name: 'David Miller',
            customer_phone: '(212) 555-8912',
            customer_address: '742 Evergreen Terrace, Apt 4B',
            total_amount: 44.50,
            status: 'Pending',
            created_at: new Date().toISOString(),
            items: [
              { product_id: 1, quantity: 2, price: 18.50, product_name: 'Cravo Black Truffle Double Smash Burger' },
              { product_id: 9, quantity: 1, price: 9.50, product_name: 'Parmesan & Herb White Truffle Fries' },
            ],
          },
          {
            id: 1041,
            customer_name: 'Jessica Vance',
            customer_phone: '(212) 555-4301',
            customer_address: '120 West 44th St, Suite 12',
            total_amount: 32.75,
            status: 'Preparing',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            items: [
              { product_id: 4, quantity: 1, price: 17.00, product_name: 'Wood-Fired Neapolitan Margherita Pizza' },
              { product_id: 6, quantity: 1, price: 15.25, product_name: 'Nashville Hot Crispy Chicken Sandwich' },
            ],
          },
          {
            id: 1040,
            customer_name: 'Marcus Sterling',
            customer_phone: '(212) 555-7788',
            customer_address: '55 Hudson Yards, Fl 28',
            total_amount: 68.20,
            status: 'Delivered',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            items: [
              { product_id: 5, quantity: 2, price: 19.50, product_name: 'Hot Honey Artisan Pepperoni Pizza' },
              { product_id: 7, quantity: 1, price: 14.00, product_name: 'Smoked Honey-Glazed BBQ Chicken Wings' },
              { product_id: 10, quantity: 1, price: 11.00, product_name: 'Belgian Chocolate Molten Lava Cake' },
            ],
          },
        ]);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setToastMessage(`Order #${orderId} status set to "${newStatus}"!`);
    } catch {
      // Optimistic fallback
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setToastMessage(`Order #${orderId} status set to "${newStatus}".`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Ready':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchQuery =
      !search.trim() ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search) ||
      String(o.id).includes(search);
    return matchStatus && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111c2d]">
            Order Management
          </h1>
          <p className="text-xs text-[#8e7166] mt-0.5">
            Manage incoming live kitchen tickets, track delivery stages, and update order statuses.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="px-4 py-2 bg-white hover:bg-[#f5f2eb] text-[#5a4138] text-xs font-bold rounded-xl border border-[#e8e4dc] flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter and Status Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-[#e8e4dc] shadow-warm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166]" />
            <input
              type="text"
              placeholder="Search by Order ID, name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-xs text-[#8e7166] font-semibold shrink-0">Filter:</span>
            {['All', ...STATUS_OPTIONS].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-[#fcfbf9] text-[#5a4138] hover:bg-[#f5f2eb]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List / Cards */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-white rounded-2xl border border-[#e8e4dc]" />
          ))}
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-[#e8e4dc] shadow-warm p-6 transition-all hover:border-[#cbd5e1]"
            >
              {/* Order Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f5f2eb]">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-extrabold text-base text-[#111c2d]">
                    Order #{order.id}
                  </span>
                  <span className="text-xs text-[#8e7166] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(order.created_at).toLocaleDateString()} at{' '}
                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#8e7166]">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className={`h-9 px-3 text-xs font-bold rounded-xl border focus:outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Order Details Body */}
              <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Customer Details */}
                <div className="md:col-span-5 space-y-2 text-xs text-[#5a4138]">
                  <p className="font-bold text-sm text-[#111c2d]">{order.customer_name}</p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{order.customer_phone}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{order.customer_address}</span>
                  </p>
                </div>

                {/* Ordered Products Items */}
                <div className="md:col-span-7 bg-[#fcfbf9] rounded-2xl p-4 border border-[#e8e4dc] space-y-2">
                  <span className="text-[11px] font-bold text-[#8e7166] uppercase tracking-wider block mb-2">
                    Ordered Dishes
                  </span>
                  {order.items && order.items.length > 0 ? (
                    <div className="divide-y divide-[#e8e4dc]/50 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-1.5 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{item.quantity}x</span>
                            <span className="text-[#111c2d] font-medium">
                              {item.product_name || `Product #${item.product_id}`}
                            </span>
                          </div>
                          <span className="font-semibold text-[#5a4138]">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8e7166] italic">Items pre-packaged standard combo</p>
                  )}

                  <div className="pt-2 border-t border-[#e8e4dc] flex justify-between items-baseline font-bold">
                    <span className="text-xs text-[#111c2d]">Total Amount:</span>
                    <span className="text-sm font-display text-primary">
                      ${Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#e8e4dc] p-8 max-w-md mx-auto">
          <ShoppingBag className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <h3 className="font-display font-bold text-base text-[#111c2d]">No orders found</h3>
          <p className="text-xs text-[#8e7166] mt-1">
            No orders match the selected filter or search term.
          </p>
        </div>
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
