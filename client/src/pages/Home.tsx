import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Clock, Award, ShieldCheck, Sparkles, ChefHat } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { Toast } from '../components/Toast';
import type { Product } from '../types';
import { api } from '../services/api';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    api.getProducts().then((data) => {
      if (data && data.length > 0) setProducts(data);
    }).catch(() => {
      // Keep initial
    });
  }, []);

  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);
  const featuredProducts = products.slice(0, 8);

  const categories = [
    { name: 'Burgers', icon: '🍔', desc: 'Smashed Angus & Truffle' },
    { name: 'Pizza', icon: '🍕', desc: 'Wood-fired Neapolitan' },
    { name: 'Chicken', icon: '🍗', desc: 'Nashville Hot & Smoked' },
    { name: 'Snacks', icon: '🍟', desc: 'Hand-cut Truffle Fries' },
    { name: 'Drinks', icon: '🍺', desc: 'Craft Brews & Herbal Teas' },
    { name: 'Desserts', icon: '🍰', desc: 'Molten Lava & Gelato' },
  ];

  const showToast = (name: string) => {
    setToastMessage(`Added "${name}" to your cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ffefe9] border border-[#ffdbce] text-primary rounded-full w-fit">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Warm Epicurean Dining • Direct Delivery
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111c2d] leading-[1.1] tracking-tight">
                Delicious Food, <br />
                <span className="text-primary italic">Delivered Fresh</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5a4138] leading-relaxed max-w-xl">
                Experience the soulful craft of Cravo Kitchen & Bar. Smashed Angus beef burgers on brioche, blistering wood-fired Neapolitan pizzas, and small-batch desserts made to order.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/menu"
                  className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-warm hover:shadow-warm-lg transition-all active:scale-95"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-4 bg-white hover:bg-[#f5f2eb] text-[#111c2d] rounded-xl font-bold text-sm border border-[#e8e4dc] transition-all"
                >
                  Reserve a Table
                </Link>
              </div>

              {/* Mini Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#e8e4dc]">
                <div>
                  <span className="font-display font-bold text-2xl text-[#111c2d]">30 min</span>
                  <p className="text-xs text-[#8e7166]">Average Delivery</p>
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-[#111c2d]">100%</span>
                  <p className="text-xs text-[#8e7166]">Fresh Ingredients</p>
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-[#111c2d]">4.9 ★</span>
                  <p className="text-xs text-[#8e7166]">Over 2,400 Reviews</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-secondary/15 to-transparent rounded-3xl blur-2xl -z-10" />
                
                {/* Main Food Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white aspect-[4/3] bg-white group">
                  <img
                    src="/images/gourmet_double_smashed_beef_cheeseburger_with_7.jpg"
                    alt="Cravo Signature Gourmet Double Smashed Burger"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#e8e4dc] shadow-warm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        <Flame className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#111c2d]">Signature Angus Double</h4>
                        <p className="text-[11px] text-[#5a4138]">Melted gouda & black truffle aioli</p>
                      </div>
                      <span className="ml-auto font-display font-bold text-sm text-primary">$18.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Shortcuts Section */}
      <section className="py-12 bg-white border-y border-[#e8e4dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Browse By Dish</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111c2d] mt-1">
                Explore Our Kitchen Categories
              </h2>
            </div>
            <Link
              to="/menu"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/menu?category=${cat.name}`)}
                className="group p-5 bg-[#fcfbf9] hover:bg-white rounded-2xl border border-[#e8e4dc] hover:border-primary/50 hover:shadow-warm transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div>
                  <h3 className="font-bold text-sm text-[#111c2d] group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#8e7166] mt-0.5 line-clamp-1">{cat.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Food Section */}
      <section className="py-16 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-secondary">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Crowd Favorites
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111c2d] mt-1">
                Popular Dishes This Week
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>See All Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((p) => (
              <FoodCard key={p.id} product={p} onAddedToast={showToast} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white border-t border-[#e8e4dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Crafted With Passion</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111c2d] mt-1">
              Featured Menu Highlights
            </h2>
            <p className="text-sm text-[#5a4138] mt-2">
              Every dish is thoughtfully balanced with artisanal technique, local organic produce, and house-made sauces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <FoodCard key={p.id} product={p} onAddedToast={showToast} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm shadow-warm transition-all"
            >
              <span>Explore The Entire Cravo Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Us & Chef Elena Section */}
      <section className="py-20 bg-[#f5f2eb] border-t border-[#e8e4dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Chef Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white bg-white">
                <img
                  src="/images/chef_elena.png"
                  alt="Head Chef Elena Rostova at Cravo Kitchen"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#e8e4dc]">
                  <p className="font-display font-bold text-xs text-[#111c2d]">Chef Elena Rostova</p>
                  <p className="text-[10px] text-[#8e7166]">Executive Chef & Co-Founder</p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-[#5a4138] border border-[#e8e4dc] rounded-full w-fit text-xs font-semibold">
                <ChefHat className="w-4 h-4 text-primary" />
                <span>Our Culinary Story</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111c2d] leading-tight">
                Honest Ingredients, Wood-Fired Heat, and Hospitality.
              </h2>

              <p className="text-sm sm:text-base text-[#5a4138] leading-relaxed">
                Cravo was born from a simple belief: the comfort of everyday dining should never compromise on culinary excellence. We ferment our pizza dough for 72 hours, source pasture-raised Angus beef from small family farms, and hand-cut our fries every morning before service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-primary border border-[#e8e4dc]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#111c2d]">Artisan Craft</h4>
                    <p className="text-[11px] text-[#8e7166] mt-0.5">Custom spice blends & house sauces</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-primary border border-[#e8e4dc]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#111c2d]">Fresh On Order</h4>
                    <p className="text-[11px] text-[#8e7166] mt-0.5">Never pre-cooked or under heat lamps</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-primary border border-[#e8e4dc]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#111c2d]">Eco-Friendly</h4>
                    <p className="text-[11px] text-[#8e7166] mt-0.5">100% biodegradable craft packaging</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekend Dining Atmosphere Section */}
      <section className="py-16 bg-white border-t border-[#e8e4dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#111c2d] text-white">
            <img
              src="/images/plentiful_weekend_dining_table_loaded_with_cr_12.jpg"
              alt="Plentiful dining table at Cravo Kitchen & Bar"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary-light">Visit In Person</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-2 text-white">
                Gather Around Our Table This Evening
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed">
                Whether you're ordering direct to your doorstep or joining us for craft cocktails at the bar, we welcome you to the Cravo table.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/menu"
                  className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl shadow-warm transition-all"
                >
                  Order Delivery Online
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all"
                >
                  Table Reservations & Hours
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
