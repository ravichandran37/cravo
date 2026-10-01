import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, ShoppingCart, Clock, CheckCircle2, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import type { AdminStats, Order } from '../../types';
import { api } from '../../services/api';
import { INITIAL_PRODUCTS } from '../../data/initialProducts';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: INITIAL_PRODUCTS.length,
    totalOrders: 3,
    pendingOrders: 1,
    completedOrders: 2,
    totalRevenue: 124.50,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, ordersData] = await Promise.all([
        api.getAdminStats().catch(() => null),
        api.getOrders().catch(() => []),
      ]);

      if (statsData) {
        setStats(statsData);
      } else if (ordersData) {
        const pending = ordersData.filter((o) => o.status === 'Pending').length;
        const completed = ordersData.filter((o) => o.status === 'Delivered').length;
        const rev = ordersData.reduce((acc, o) => acc + Number(o.total_amount), 0);
        setStats({
          totalProducts: INITIAL_PRODUCTS.length,
          totalOrders: ordersData.length,
          pendingOrders: pending,
          completedOrders: completed,
          totalRevenue: rev,
        });
      }

      if (ordersData && ordersData.length > 0) {
        setRecentOrders(ordersData.slice(0, 5));
      } else {
        // Mock sample orders for initial display if DB empty
        setRecentOrders([
          {
            id: 1042,
            customer_name: 'David Miller',
            customer_phone: '(212) 555-8912',
            customer_address: '742 Evergreen Terrace, Apt 4B',
            total_amount: 44.50,
            status: 'Pending',
            created_at: new Date().toISOString(),
          },
          {
            id: 1041,
            customer_name: 'Jessica Vance',
            customer_phone: '(212) 555-4301',
            customer_address: '120 West 44th St, Suite 12',
            total_amount: 32.75,
            status: 'Preparing',
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 1040,
            customer_name: 'Marcus Sterling',
            customer_phone: '(212) 555-7788',
            customer_address: '55 Hudson Yards, Fl 28',
            total_amount: 68.20,
            status: 'Delivered',
            created_at: new Date(Date.now() - 7200000).toISOString(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ready':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111c2d]">
            Restaurant Management Overview
          </h1>
          <p className="text-xs text-[#8e7166] mt-0.5">
            Monitor real-time kitchen orders, menu inventory, and sales performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="px-3.5 py-2 bg-white hover:bg-[#f5f2eb] text-[#5a4138] text-xs font-bold rounded-xl border border-[#e8e4dc] flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-warm transition-colors"
          >
            + Manage Menu
          </Link>
        </div>
      </div>

      {/* 4 Primary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e4dc] shadow-warm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#8e7166] uppercase tracking-wider">Total Products</p>
            <h3 className="font-display font-extrabold text-2xl text-[#111c2d] mt-0.5">
              {stats.totalProducts}
            </h3>
            <Link to="/admin/products" className="text-[11px] text-primary hover:underline font-bold mt-1 block">
              Manage items →
            </Link>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e4dc] shadow-warm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#8e7166] uppercase tracking-wider">Total Orders</p>
            <h3 className="font-display font-extrabold text-2xl text-[#111c2d] mt-0.5">
              {stats.totalOrders}
            </h3>
            <Link to="/admin/orders" className="text-[11px] text-blue-700 hover:underline font-bold mt-1 block">
              View all orders →
            </Link>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e4dc] shadow-warm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#8e7166] uppercase tracking-wider">Pending Orders</p>
            <h3 className="font-display font-extrabold text-2xl text-amber-700 mt-0.5">
              {stats.pendingOrders}
            </h3>
            <span className="text-[11px] text-[#8e7166]">Requires kitchen prep</span>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#e8e4dc] shadow-warm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#8e7166] uppercase tracking-wider">Completed Orders</p>
            <h3 className="font-display font-extrabold text-2xl text-emerald-700 mt-0.5">
              {stats.completedOrders}
            </h3>
            <span className="text-[11px] text-[#8e7166]">Successfully delivered</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-[#e8e4dc] shadow-warm overflow-hidden">
        <div className="p-6 border-b border-[#f5f2eb] flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-[#111c2d]">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-[#8e7166]">Latest live orders placed through the website</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Full Orders Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfbf9] text-[#8e7166] uppercase font-bold tracking-wider border-b border-[#e8e4dc]">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f2eb]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#fcfbf9] transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#111c2d]">
                    #{order.id}
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#111c2d]">
                    {order.customer_name}
                  </td>
                  <td className="py-4 px-6 text-[#5a4138]">
                    {order.customer_phone}
                  </td>
                  <td className="py-4 px-6 font-bold text-primary">
                    ${Number(order.total_amount).toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to="/admin/orders"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f5f2eb] hover:bg-[#e8e4dc] text-[#111c2d] font-bold text-[11px] rounded-lg transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
