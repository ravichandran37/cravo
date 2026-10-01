import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, ShieldCheck, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e8e4dc] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="group flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[#5a4138] hover:text-[#111c2d] hover:bg-[#f5f2eb]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/menu')
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[#5a4138] hover:text-[#111c2d] hover:bg-[#f5f2eb]'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/contact')
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[#5a4138] hover:text-[#111c2d] hover:bg-[#f5f2eb]'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-xs md:max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166] pointer-events-none" />
            <input
              type="search"
              placeholder="Search burgers, pizza, drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[#fcfbf9] text-sm text-[#111c2d] placeholder:text-[#8e7166] rounded-full border border-[#e8e4dc] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </form>

        {/* Actions: Cart & Admin */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-3.5 py-2 bg-[#fcfbf9] hover:bg-[#f5f2eb] text-[#111c2d] rounded-lg border border-[#e8e4dc] transition-all group"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-xs font-bold text-[#111c2d]">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-white text-[11px] font-bold rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Admin Login / Portal */}
          <Link
            to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#5a4138] hover:text-[#111c2d] hover:bg-[#f5f2eb] border border-[#e8e4dc]/70 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-[#8e7166]" />
            <span>{isAuthenticated ? 'Admin Portal' : 'Admin Login'}</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#5a4138] hover:text-[#111c2d] hover:bg-[#f5f2eb] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e8e4dc] px-4 pt-3 pb-5 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166] pointer-events-none" />
            <input
              type="search"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[#fcfbf9] text-sm text-[#111c2d] rounded-lg border border-[#e8e4dc] focus:outline-none focus:border-primary"
            />
          </form>

          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive('/') ? 'bg-primary text-white' : 'text-[#5a4138] hover:bg-[#f5f2eb]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive('/menu') ? 'bg-primary text-white' : 'text-[#5a4138] hover:bg-[#f5f2eb]'
              }`}
            >
              Menu & Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive('/contact') ? 'bg-primary text-white' : 'text-[#5a4138] hover:bg-[#f5f2eb]'
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive('/cart') ? 'bg-primary text-white' : 'text-[#5a4138] hover:bg-[#f5f2eb]'
              }`}
            >
              <span>Shopping Cart</span>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                  {totalItems} items
                </span>
              )}
            </Link>
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-[#fff5f0]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
