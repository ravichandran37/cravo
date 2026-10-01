import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, AlertCircle } from 'lucide-react';
import type { Product } from '../../types';
import { api } from '../../services/api';
import { INITIAL_PRODUCTS } from '../../data/initialProducts';
import { Toast } from '../../components/Toast';

const CATEGORIES: ('Burgers' | 'Pizza' | 'Chicken' | 'Snacks' | 'Drinks' | 'Desserts')[] = [
  'Burgers',
  'Pizza',
  'Chicken',
  'Snacks',
  'Drinks',
  'Desserts',
];

const PRESET_IMAGES = [
  { label: 'Truffle Double Burger', path: '/images/truffle_burger_8.jpg' },
  { label: 'Bacon BBQ Burger', path: '/images/juicy_gourmet_bacon_barbecue_burger_with_thic_15.jpg' },
  { label: 'Cheeseburger', path: '/images/gourmet_double_smashed_beef_cheeseburger_with_7.jpg' },
  { label: 'Margherita Pizza', path: '/images/margherita_pizza_16.jpg' },
  { label: 'Pepperoni Pizza', path: '/images/pepperoni_pizza_17.jpg' },
  { label: 'Crispy Chicken Sandwich', path: '/images/chicken_18.jpg' },
  { label: 'Smoked BBQ Wings', path: '/images/platter_of_8_sticky_sweet_honey_glazed_smoked_19.jpg' },
  { label: 'Nashville Hot Tenders', path: '/images/golden_crisp_deep_fried_spicy_nashville_hot_c_10.jpg' },
  { label: 'Parmesan Truffle Fries', path: '/images/truffle_fries_11.jpg' },
  { label: 'Chocolate Lava Cake', path: '/images/decadent_individual_warm_belgian_chocolate_mo_21.jpg' },
  { label: 'Craft IPA Beer', path: '/images/beverage_27.jpg' },
  { label: 'Hibiscus Iced Tea', path: '/images/beverage_6.jpg' },
];

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State: Add or Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'Burgers' | 'Pizza' | 'Chicken' | 'Snacks' | 'Drinks' | 'Desserts'>('Burgers');
  const [image, setImage] = useState(PRESET_IMAGES[0].path);
  const [available, setAvailable] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data && data.length > 0 ? data : INITIAL_PRODUCTS);
    } catch {
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Burgers');
    setImage(PRESET_IMAGES[0].path);
    setAvailable(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description);
    setPrice(String(p.price));
    setCategory(p.category);
    setImage(p.image);
    setAvailable(p.available === true || p.available === 1);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !category) {
      setFormError('Please fill in product name, price, and category.');
      return;
    }

    setSaving(true);
    setFormError(null);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      image,
      available: available ? 1 : 0,
    };

    try {
      if (editingProduct) {
        // Update
        await api.updateProduct(editingProduct.id, payload);
        setProducts((prev) =>
          prev.map((item) =>
            item.id === editingProduct.id ? { ...item, ...payload, available: !!available } : item
          )
        );
        setToastMessage(`Updated "${name}" successfully!`);
      } else {
        // Create
        const created = await api.createProduct(payload as any);
        setProducts((prev) => [created || { ...payload, id: Date.now(), available: !!available }, ...prev]);
        setToastMessage(`Created product "${name}"!`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Operation failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, productName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) return;

    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setToastMessage(`Deleted "${productName}" from menu.`);
    } catch (err: any) {
      alert(err.message || 'Could not delete product.');
    }
  };

  const handleToggleAvailable = async (p: Product) => {
    const nextState = !(p.available === true || p.available === 1);
    try {
      await api.updateProduct(p.id, { available: nextState });
      setProducts((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, available: nextState } : item))
      );
      setToastMessage(`Updated availability for "${p.name}".`);
    } catch {
      // Local fallback
      setProducts((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, available: nextState } : item))
      );
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111c2d]">
            Product & Menu Management
          </h1>
          <p className="text-xs text-[#8e7166] mt-0.5">
            Add, update, or remove dishes, adjust prices, and toggle in-stock availability.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-warm flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#e8e4dc] shadow-warm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e7166]" />
          <input
            type="text"
            placeholder="Filter products by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
        <span className="text-xs text-[#8e7166] font-semibold">
          {filtered.length} products total
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#e8e4dc] shadow-warm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfbf9] text-[#8e7166] uppercase font-bold tracking-wider border-b border-[#e8e4dc]">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Availability</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f2eb]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Loading menu items...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((product) => {
                  const isAvail = product.available === true || product.available === 1;
                  return (
                    <tr key={product.id} className="hover:bg-[#fcfbf9] transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-[#e8e4dc]"
                        />
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-sm text-[#111c2d] truncate">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-[#8e7166] line-clamp-1 max-w-sm">
                            {product.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-[#ffefe9] text-primary rounded-full text-[10px] font-bold">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-display font-bold text-sm text-[#111c2d]">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleAvailable(product)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1.5 ${
                            isAvail
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isAvail ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span>{isAvail ? 'In Stock' : 'Out of Stock'}</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1.5 text-[#5a4138] hover:text-primary hover:bg-[#ffefe9] rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 text-[#8e7166] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No products matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#e8e4dc] shadow-warm-lg overflow-hidden animate-in fade-in duration-200">
            <div className="px-6 py-4 border-b border-[#e8e4dc] flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-[#111c2d]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cravo Truffle Burger"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Ingredients, preparation, flavor profile..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="15.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-10 px-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Selection / Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#5a4138] mb-1">
                  Product Image
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Image URL or local path"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="flex-1 h-10 px-3 text-xs bg-[#fcfbf9] text-[#111c2d] border border-[#e8e4dc] rounded-xl focus:outline-none focus:border-primary"
                    />
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-[#e8e4dc] shrink-0">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8e7166]">Select from Stitch AI presets:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setImage(preset.path)}
                        className={`h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          image === preset.path ? 'border-primary ring-2 ring-primary/20' : 'border-[#e8e4dc] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.path} alt={preset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="pt-2 flex items-center justify-between border-t border-[#f5f2eb]">
                <span className="text-xs font-semibold text-[#111c2d]">
                  Product Availability (In Stock)
                </span>
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded cursor-pointer"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#f5f2eb] hover:bg-[#e8e4dc] text-[#111c2d] text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white text-xs font-bold rounded-xl shadow-warm transition-colors"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
