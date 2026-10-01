import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, Star, ShieldCheck, Clock, ChefHat } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { Toast } from '../components/Toast';
import { FoodCard } from '../components/FoodCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const prodId = Number(id);

    api.getProductById(prodId).then((data) => {
      if (data) {
        setProduct(data);
      } else {
        const local = INITIAL_PRODUCTS.find((p) => p.id === prodId);
        setProduct(local || null);
      }
    }).catch(() => {
      const local = INITIAL_PRODUCTS.find((p) => p.id === prodId);
      setProduct(local || null);
    }).finally(() => {
      setLoading(false);
    });

    // Related products from same category or popular
    api.getProducts().then((all) => {
      const related = all.filter((p) => p.id !== prodId).slice(0, 4);
      setRelatedProducts(related);
    }).catch(() => {
      const related = INITIAL_PRODUCTS.filter((p) => p.id !== prodId).slice(0, 4);
      setRelatedProducts(related);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedSuccess(true);
    setToastMessage(`Added ${quantity}x "${product.name}" to your cart!`);
    setTimeout(() => {
      setAddedSuccess(false);
      setToastMessage(null);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 h-96 bg-gray-200 rounded-3xl" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-36 pb-20 max-w-md mx-auto text-center px-4">
        <h2 className="font-display font-bold text-2xl text-[#111c2d]">Product Not Found</h2>
        <p className="text-sm text-[#5a4138] mt-2 mb-6">
          The dish you are looking for is not available or has been removed.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-warm hover:bg-primary-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>
      </div>
    );
  }

  const isAvailable = product.available === true || product.available === 1;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5a4138] hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to dishes</span>
        </button>
      </div>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-white p-6 sm:p-10 rounded-3xl border border-[#e8e4dc] shadow-warm">
        {/* Large Food Image & Gallery */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#f5f2eb] border border-[#e8e4dc] group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.isPopular && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                Chef's Signature Pick
              </span>
            )}
            {!isAvailable && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-4 py-2 bg-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-lg">
                  Currently Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Sub-gallery preview thumbnails (from stitch assets) */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl overflow-hidden aspect-video border-2 border-primary cursor-pointer">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-video border border-[#e8e4dc] opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
              <img src="/images/close_up_dramatic_front_angle_of_a_towering_g_23.jpg" alt="Detail view" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-video border border-[#e8e4dc] opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
              <img src="/images/eco_friendly_cravo_restaurant_craft_delivery__25.jpg" alt="Packaging view" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Product Details & Purchase Action */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div>
            {/* Category Chip */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-[#8e7166]">Cravo Kitchen & Bar</span>
            </div>

            {/* Product Name */}
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111c2d] leading-tight">
              {product.name}
            </h1>

            {/* Price Tag */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-primary">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-xs text-[#8e7166]">Prepared fresh upon order</span>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-[#f5f2eb]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8e7166] mb-2">
                Dish Description
              </h4>
              <p className="text-sm text-[#5a4138] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[#5a4138]">
              <div className="flex items-center gap-2 p-2.5 bg-[#fcfbf9] rounded-xl border border-[#e8e4dc]">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Cooked in 15-20 min</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#fcfbf9] rounded-xl border border-[#e8e4dc]">
                <ChefHat className="w-4 h-4 text-primary shrink-0" />
                <span>Made from Scratch</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#fcfbf9] rounded-xl border border-[#e8e4dc]">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Fresh Local Sourcing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#fcfbf9] rounded-xl border border-[#e8e4dc]">
                <Star className="w-4 h-4 text-primary shrink-0" />
                <span>Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="pt-6 border-t border-[#f5f2eb] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#111c2d]">Select Quantity</span>
              <div className="flex items-center gap-3 bg-[#fcfbf9] border border-[#e8e4dc] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !isAvailable}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center text-[#111c2d] disabled:opacity-40 transition-colors shadow-sm"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#111c2d]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!isAvailable}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center text-[#111c2d] disabled:opacity-40 transition-colors shadow-sm"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-warm ${
                !isAvailable
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : addedSuccess
                  ? 'bg-sage text-white scale-[0.99]'
                  : 'bg-primary hover:bg-primary-hover text-white active:scale-[0.98]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add to Cart • ${(Number(product.price) * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-2xl text-[#111c2d]">
              You May Also Savor
            </h3>
            <Link to="/menu" className="text-xs font-bold text-primary hover:underline">
              View All Dishes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <FoodCard
                key={rel.id}
                product={rel}
                onAddedToast={(name) => {
                  setToastMessage(`Added "${name}" to your cart!`);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
