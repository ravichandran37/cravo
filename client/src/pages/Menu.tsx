import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, UtensilsCrossed, X } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { CategoryPills } from '../components/CategoryPills';
import { Toast } from '../components/Toast';
import type { Product } from '../types';
import { api } from '../services/api';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Chicken', 'Snacks', 'Drinks', 'Desserts'];

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync category with URL query params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    api.getProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    }).catch(() => {
      // Fallback already in api
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const clearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchCat && matchQuery;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const showToast = (name: string) => {
    setToastMessage(`Added "${name}" to your cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Cravo Kitchen & Bar
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111c2d] mt-1">
          Menu & Artisanal Products
        </h1>
        <p className="text-sm text-[#5a4138] mt-2">
          Handcrafted smash burgers, wood-fired pizzas, Nashville hot chicken, crispy truffle fries, and small-batch desserts.
        </p>
      </div>

      {/* Top Filter & Search Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e8e4dc] shadow-warm mb-10 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166] pointer-events-none" />
            <input
              type="text"
              placeholder="Search products by name or ingredient..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-11 pl-10 pr-10 bg-[#fcfbf9] text-sm text-[#111c2d] placeholder:text-[#8e7166] rounded-xl border border-[#e8e4dc] focus:outline-none focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#8e7166]" />
            <span className="text-xs font-semibold text-[#5a4138]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-3.5 bg-[#fcfbf9] text-xs font-semibold text-[#111c2d] rounded-xl border border-[#e8e4dc] focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="featured">Featured / Default</option>
              <option value="popular">Popular / Chef's Pick</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="pt-2 border-t border-[#f5f2eb]">
          <CategoryPills
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold text-[#5a4138]">
          Showing <span className="font-bold text-[#111c2d]">{filteredProducts.length}</span> dishes
          {selectedCategory !== 'All' && <span> in <strong className="text-primary">{selectedCategory}</strong></span>}
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </span>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-white rounded-2xl border border-[#e8e4dc]" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <FoodCard key={product.id} product={product} onAddedToast={showToast} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-2xl border border-[#e8e4dc] p-8 max-w-md mx-auto">
          <UtensilsCrossed className="w-12 h-12 text-[#8e7166] mx-auto mb-3 opacity-60" />
          <h3 className="font-display font-bold text-lg text-[#111c2d]">No dishes found</h3>
          <p className="text-xs text-[#5a4138] mt-1 mb-5">
            We couldn't find any products matching your search criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              clearSearch();
            }}
            className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-warm hover:bg-primary-hover transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
