import React, { useEffect, useState } from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { api } from '../../services/api';
import { Product } from '../../types';
import { FileText, Download, Search } from 'lucide-react';

export const EmployeeProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.employee.getProducts()
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const parseSpecs = (specs: any) => {
    if (typeof specs === 'object' && specs !== null) return specs;
    try {
      return JSON.parse(specs || '{}');
    } catch {
      return {};
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.product_code.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#022353] font-heading">
              EVCS Equipment Technical Reference
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Field manuals, wiring schematics, and operating parameters for Vivtron charging hardware.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product manual..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 focus:border-[#022353] text-xs text-slate-900 placeholder-slate-400 outline-none shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500 font-medium">Loading equipment manuals...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProducts.map((p) => {
              const specs = parseSpecs(p.specs);

              return (
                <div
                  key={p.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 hover:border-[#022353]/30 transition shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-100 text-[#022353] font-bold border border-slate-200">
                      {p.product_code}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{p.category}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{p.name}</h3>
                    <p className="text-xs text-[#022353] font-bold">{p.power_rating}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{p.description}</p>
                  </div>

                  {/* Field Specs */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {specs.voltage && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">DC Voltage</span>
                        <span className="font-semibold text-slate-800">{specs.voltage}</span>
                      </div>
                    )}
                    {specs.efficiency && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Efficiency</span>
                        <span className="font-semibold text-emerald-600">{specs.efficiency}</span>
                      </div>
                    )}
                    {specs.protocol && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Protocol</span>
                        <span className="font-semibold text-[#022353]">{specs.protocol}</span>
                      </div>
                    )}
                    {specs.screen && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">HMI Screen</span>
                        <span className="font-semibold text-slate-700">{specs.screen}</span>
                      </div>
                    )}
                    {specs.cableLength && (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Cable Spec</span>
                        <span className="font-semibold text-slate-700">{specs.cableLength}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <FileText className="w-4 h-4 text-[#022353]" />
                      <span>OEM Technical Manual v4.2</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Downloaded technical wiring diagram for ${p.name}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-[#022353]" />
                      <span>Wiring Diagram</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
};
