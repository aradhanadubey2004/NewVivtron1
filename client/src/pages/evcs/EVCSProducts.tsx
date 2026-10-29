import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { api } from '../../services/api';
import { Product } from '../../types';
import { BatteryCharging, Cpu, Zap, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import AOS from 'aos';

export const EVCSProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    api.public.getProducts()
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.warn('Products fetch error', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Commercial Hub', 'DC Fast', 'AC Wallbox', 'Fleet Depot'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  useEffect(() => {
    AOS.refresh();
  }, [filteredProducts, loading]);

  const parseSpecs = (specs: any) => {
    if (typeof specs === 'object' && specs !== null) return specs;
    try {
      return JSON.parse(specs || '{}');
    } catch {
      return {};
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#082B59] selection:text-white">
      <EVCSNavbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
            <span className="text-[#082B59] text-xs font-bold uppercase tracking-wider font-mono">
              Hardware & Dispensers • In-House Manufacturing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#082B59] mt-2 font-heading">
              EVCS Charging Hardware Catalog
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Commercial-grade, ruggedized, and future-proof charging equipment designed for 24/7 continuous operation in all Indian climates.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  selectedCategory === cat
                    ? 'bg-[#082B59] text-white border-[#082B59] shadow-md shadow-[#082B59]/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#082B59]/40 hover:bg-[#F1F5F9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 mx-auto rounded-full border-4 border-[#082B59]/20 border-t-[#082B59] animate-spin"></div>
              <p className="mt-4 text-xs text-slate-500 uppercase tracking-wider font-semibold">Loading hardware catalog...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProducts.map((prod, idx) => {
                const specsObj = parseSpecs(prod.specs);

                return (
                  <div
                    key={prod.id}
                    data-aos="fade-up"
                    data-aos-delay={((idx % 2) + 1) * 100}
                    data-aos-duration="800"
                    className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] transition flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-md bg-[#082B59]/10 text-[#082B59] text-xs font-mono font-bold">
                          {prod.product_code}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {prod.stock_status}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">{prod.category}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-[#082B59] font-heading">{prod.name}</h3>
                      <p className="text-[#35C759] text-xs font-bold mt-1">{prod.power_rating}</p>
                      
                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Technical Specs Breakdown */}
                      <div className="my-6 p-4 rounded-2xl bg-white border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs shadow-xs">
                        {specsObj.voltage && (
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-medium">Voltage</span>
                            <span className="font-bold text-slate-900">{specsObj.voltage}</span>
                          </div>
                        )}
                        {specsObj.efficiency && (
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-medium">Efficiency</span>
                            <span className="font-bold text-[#35C759]">{specsObj.efficiency}</span>
                          </div>
                        )}
                        {specsObj.protocol && (
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-medium">Protocols</span>
                            <span className="font-bold text-[#082B59]">{specsObj.protocol}</span>
                          </div>
                        )}
                        {specsObj.screen && (
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-medium">Display UI</span>
                            <span className="font-semibold text-slate-800">{specsObj.screen}</span>
                          </div>
                        )}
                        {specsObj.cableLength && (
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-medium">Cable Type</span>
                            <span className="font-semibold text-slate-800">{specsObj.cableLength}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-medium">Pricing Est.</span>
                          <span className="font-extrabold text-[#082B59]">₹{(prod.price * 80).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <ShieldCheck className="w-4 h-4 text-[#35C759]" />
                        <span>Includes 5-Year Hardware Warranty</span>
                      </div>

                      <button
                        onClick={() => navigate('/evcs/contact')}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white font-bold text-xs tracking-wide shadow-md shadow-[#082B59]/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Request Commercial Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#35C759]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <EVCSFooter />
    </div>
  );
};
