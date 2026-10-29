import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { api } from '../../services/api';
import { Product } from '../../types';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'DC Fast',
    power_rating: '180 kW',
    price: 25000,
    stock_status: 'In Stock' as Product['stock_status'],
    description: '',
    specs: JSON.stringify({ voltage: '200-1000V DC', efficiency: '96.2%', protocol: 'OCPP 2.0.1' }),
  });

  const [formError, setFormError] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.admin.getProducts();
      if (res.success && res.data) {
        setProducts(res.data);
      }
    } catch (err: any) {
      console.error('Fetch products error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      category: 'DC Fast',
      power_rating: '180 kW',
      price: 25000,
      stock_status: 'In Stock',
      description: '',
      specs: JSON.stringify({ voltage: '200-1000V DC', efficiency: '96.2%', protocol: 'OCPP 2.0.1' }),
    });
    setFormError('');
    setFormSuccess('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      power_rating: p.power_rating,
      price: p.price,
      stock_status: p.stock_status,
      description: p.description || '',
      specs: typeof p.specs === 'string' ? p.specs : JSON.stringify(p.specs || {}),
    });
    setFormError('');
    setFormSuccess('');
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setActionLoading(true);

    try {
      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(formData.specs);
      } catch (e) {
        parsedSpecs = { details: formData.specs };
      }

      const res = await api.admin.createProduct({
        ...formData,
        specs: parsedSpecs,
      });

      if (res.success) {
        setFormSuccess('Product created successfully!');
        setTimeout(() => {
          setIsAddModalOpen(false);
          fetchProducts();
        }, 1200);
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to create product.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setFormError('');
    setFormSuccess('');
    setActionLoading(true);

    try {
      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(formData.specs);
      } catch (e) {
        parsedSpecs = { details: formData.specs };
      }

      const res = await api.admin.updateProduct(editProduct.id, {
        ...formData,
        specs: parsedSpecs,
      });

      if (res.success) {
        setFormSuccess(res.message);
        setTimeout(() => {
          setEditProduct(null);
          fetchProducts();
        }, 1200);
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to update product.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from catalog?`)) {
      return;
    }

    try {
      const res = await api.admin.deleteProduct(id);
      if (res.success) {
        fetchProducts();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete product.');
    }
  };

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.product_code.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#022353] font-heading">
              EVCS Product Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Add hardware SKUs, manage pricing, inventory stock status, and technical specifications.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#022353] hover:bg-[#022353]/90 text-white font-bold text-xs tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-[#022353]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Equipment SKU</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product by name, code, category..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#022353] text-xs text-slate-900 placeholder-slate-400 outline-none transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
          <span className="text-xs font-semibold text-slate-500">{filteredProducts.length} Products in Catalog</span>
        </div>

        {/* Products Table */}
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-bold">SKU Code</th>
                  <th className="py-3.5 px-4 font-bold">Product Name</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Power Output</th>
                  <th className="py-3.5 px-4 font-bold">Catalog MSRP</th>
                  <th className="py-3.5 px-4 font-bold">Stock Status</th>
                  <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                      Loading EVCS product catalog...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                      No matching products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#022353]">
                        {p.product_code}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{p.description}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {p.category}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#022353]">
                        {p.power_rating}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ₹{p.price.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.stock_status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                            title="Remove Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditProduct(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#022353] font-heading flex items-center gap-2 mb-1">
              <Package className="w-5 h-5 text-[#022353]" />
              <span>{editProduct ? `Edit ${editProduct.name}` : 'Add New EVCS Equipment SKU'}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Configure product power ratings, pricing, and technical parameters.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={editProduct ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Vivtron HyperCharge 120"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  >
                    <option value="Commercial Hub">Commercial Hub</option>
                    <option value="DC Fast">DC Fast</option>
                    <option value="AC Wallbox">AC Wallbox</option>
                    <option value="Fleet Depot">Fleet Depot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Power Rating *</label>
                  <input
                    type="text"
                    required
                    value={formData.power_rating}
                    onChange={(e) => setFormData({ ...formData, power_rating: e.target.value })}
                    placeholder="120 kW Dual Gun"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Price (INR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="450000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Stock Status</label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => setFormData({ ...formData, stock_status: e.target.value as Product['stock_status'] })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Built to Order">Built to Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Liquid-cooled cables, dynamic power balancing, OCPP 2.0.1 compliance..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-[#022353] hover:bg-[#022353]/90 text-white text-xs font-bold transition disabled:opacity-50 shadow-md shadow-[#022353]/20"
                >
                  {actionLoading ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
