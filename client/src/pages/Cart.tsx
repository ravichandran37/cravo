import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CheckCircle, Clock, MapPin, Phone, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export const Cart: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    totalAmount,
    totalItems,
  } = useCart();

  // Checkout form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{ id: number; total: number } | null>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Add items before placing an order.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        customer_address: `${customerAddress.trim()}${orderNotes.trim() ? ` (Notes: ${orderNotes.trim()})` : ''}`,
        total_amount: Number(totalAmount.toFixed(2)),
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: Number(item.product.price),
        })),
      };

      const result = await api.createOrder(orderPayload);
      setCompletedOrder({ id: result.id, total: totalAmount });
      clearCart();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Order Success Screen
  if (completedOrder) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-4 text-center">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#e8e4dc] shadow-warm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Order Confirmed
          </span>
          <h1 className="font-display font-extrabold text-3xl text-[#111c2d] mt-1">
            Thank You, {customerName}!
          </h1>
          <p className="text-sm text-[#5a4138] mt-2 max-w-md">
            Your culinary order has been received by the kitchen and is being prepped with fresh ingredients.
          </p>

          <div className="w-full my-6 p-4 bg-[#fcfbf9] rounded-2xl border border-[#e8e4dc] text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#8e7166]">Order ID:</span>
              <span className="font-bold font-mono text-[#111c2d]">#{completedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8e7166]">Estimated Delivery:</span>
              <span className="font-bold text-primary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 30-40 minutes
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8e7166]">Delivery To:</span>
              <span className="font-medium text-[#111c2d] truncate max-w-[200px]">{customerAddress}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#e8e4dc]">
              <span className="font-bold text-[#111c2d]">Total Charged:</span>
              <span className="font-bold text-base text-primary">${completedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              to="/menu"
              className="flex-1 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-warm"
            >
              Order More Dishes
            </Link>
            <Link
              to="/"
              className="flex-1 py-3.5 bg-[#f5f2eb] hover:bg-[#e8e4dc] text-[#111c2d] text-xs font-bold rounded-xl transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart Screen
  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#ffefe9] text-primary flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display font-bold text-2xl text-[#111c2d]">Your Cart is Empty</h2>
        <p className="text-sm text-[#5a4138] mt-2 mb-6">
          Looks like you haven't added any dishes yet. Discover our fresh artisanal burgers, pizzas, and drinks!
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-warm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111c2d]">
          Your Shopping Cart
        </h1>
        <p className="text-xs text-[#8e7166] mt-1">
          Review your selected items and complete your delivery details below.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e8e4dc] p-6 shadow-warm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#f5f2eb]">
            <span className="font-bold text-sm text-[#111c2d]">
              Order Items ({totalItems})
            </span>
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="divide-y divide-[#f5f2eb]">
            {cart.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-4 items-center">
                {/* Product Image */}
                <Link to={`/product/${item.product.id}`} className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f2eb] shrink-0 border border-[#e8e4dc]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="font-display font-semibold text-sm text-[#111c2d] hover:text-primary transition-colors truncate block"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-[#8e7166] mt-0.5">{item.product.category}</p>
                  <span className="font-display font-bold text-sm text-primary mt-1 block">
                    ${Number(item.product.price).toFixed(2)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#fcfbf9] border border-[#e8e4dc] rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-gray-100 text-[#111c2d] shadow-xs"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#111c2d]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-gray-100 text-[#111c2d] shadow-xs"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Item Subtotal */}
                <div className="text-right shrink-0">
                  <span className="font-display font-bold text-sm text-[#111c2d] block">
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#8e7166] hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Add more dishes to order</span>
            </Link>
          </div>
        </div>

        {/* Right: Checkout & Delivery Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#e8e4dc] p-6 sm:p-8 shadow-warm space-y-6">
          <h3 className="font-display font-bold text-lg text-[#111c2d]">
            Delivery & Summary
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166]" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. (212) 555-0149"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                Delivery Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#8e7166]" />
                <textarea
                  required
                  rows={2}
                  placeholder="Street address, Apt / Suite number"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                Special Delivery Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Gate code, leave on porch, allergy alerts..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-[#f5f2eb] space-y-2 text-xs">
              <div className="flex justify-between text-[#5a4138]">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-[#111c2d]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5a4138]">
                <span>Delivery Fee</span>
                <span className="font-semibold text-[#111c2d]">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-[10px]">Free Delivery</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[#5a4138]">
                <span>Estimated Sales Tax (8.25%)</span>
                <span className="font-semibold text-[#111c2d]">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-[#e8e4dc] flex justify-between items-baseline">
                <span className="font-display font-bold text-base text-[#111c2d]">Total Amount</span>
                <span className="font-display font-extrabold text-2xl text-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white font-bold text-sm rounded-xl shadow-warm hover:shadow-warm-lg transition-all active:scale-[0.99] mt-4"
            >
              {submitting ? 'Placing Your Order...' : 'Place Order Now'}
            </button>

            <p className="text-[11px] text-center text-[#8e7166] mt-2">
              Payment is accepted upon delivery via Card or Cash.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
