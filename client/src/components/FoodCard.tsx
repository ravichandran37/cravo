import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  product: Product;
  onAddedToast?: (productName: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ product, onAddedToast }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    if (onAddedToast) onAddedToast(product.name);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isAvailable = product.available === true || product.available === 1;

  return (
    <div className="group bg-white rounded-2xl border border-[#e8e4dc] overflow-hidden shadow-warm hover:shadow-warm-lg hover:border-[#cbd5e1] transition-all duration-300 flex flex-col justify-between h-full">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3] bg-[#f5f2eb]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#111c2d] rounded-full shadow-sm">
          {product.category}
        </span>

        {/* Rating or Popular Tag */}
        {product.isPopular && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-secondary text-white text-[11px] font-bold rounded-full shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Chef's Pick
          </span>
        )}

        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-md">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Link to={`/product/${product.id}`} className="font-display font-semibold text-lg text-[#111c2d] hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </Link>
          </div>
          <p className="text-xs text-[#5a4138] leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#f5f2eb] flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#8e7166] uppercase font-semibold tracking-wider">Price</span>
            <span className="font-display font-bold text-xl text-[#111c2d]">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!isAvailable}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
              !isAvailable
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : justAdded
                ? 'bg-sage text-white scale-95'
                : 'bg-primary hover:bg-primary-hover text-white active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
