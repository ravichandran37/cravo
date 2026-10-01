import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Utensils, ShoppingCart, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const AdminLayout: React.FC = () => {
  const { admin, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-[#e8e4dc] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin/dashboard" className="flex items-center gap-2 group">
              <Logo size="sm" showText={false} />
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-[#111c2d] leading-none">
                  Cravo<span className="text-primary">.</span> Admin
                </span>
                <span className="text-[10px] text-primary font-semibold">Management Console</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 border-l border-[#e8e4dc] pl-6 ml-2">
              <Link
                to="/admin/dashboard"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/admin/dashboard')
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-[#5a4138] hover:bg-[#f5f2eb] hover:text-[#111c2d]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/products"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/admin/products')
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-[#5a4138] hover:bg-[#f5f2eb] hover:text-[#111c2d]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Products</span>
              </Link>
              <Link
                to="/admin/orders"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/admin/orders')
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-[#5a4138] hover:bg-[#f5f2eb] hover:text-[#111c2d]'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Orders</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-[#5a4138] hover:text-primary flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[#f5f2eb]"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>

            <div className="flex items-center gap-2 border-l border-[#e8e4dc] pl-3">
              <img
                src="/images/admin_profile.png"
                alt="Admin"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#e8e4dc]"
              />
              <span className="text-xs font-bold text-[#111c2d] hidden sm:inline">
                {admin?.username || 'Admin'}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="p-1.5 text-[#8e7166] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile secondary bar */}
        <div className="md:hidden flex items-center justify-around border-t border-[#e8e4dc] py-2 bg-[#fcfbf9] text-xs font-bold">
          <Link
            to="/admin/dashboard"
            className={`px-3 py-1 rounded-lg ${isActive('/admin/dashboard') ? 'bg-primary text-white' : 'text-[#5a4138]'}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`px-3 py-1 rounded-lg ${isActive('/admin/products') ? 'bg-primary text-white' : 'text-[#5a4138]'}`}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={`px-3 py-1 rounded-lg ${isActive('/admin/orders') ? 'bg-primary text-white' : 'text-[#5a4138]'}`}
          >
            Orders
          </Link>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
