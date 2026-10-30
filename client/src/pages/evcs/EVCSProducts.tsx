import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { api } from '../../services/api';
import { Product } from '../../types';
import { BatteryCharging, Cpu, Zap, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import AOS from 'aos';

const fallbackImageMap: Record<string, string> = {
  'PROD-VIV-360': '/images/evcs-hardware/hypercharge-360.jpg',
  'PROD-VIV-180': '/images/evcs-hardware/rapidpulse-180.jpg',
  'PROD-VIV-60': '/images/evcs-hardware/urbanfleet-60.jpg',
  'PROD-VIV-22': '/images/evcs-hardware/prowall-22.jpg',
  'PROD-VIV-DEPOT': '/images/evcs-hardware/megadepot-600.jpg',
  'PROD-VIV-240': '/images/evcs-solutions/highway-supercharger.jpg',
  'PROD-VIV-DEPOT-120': '/images/evcs-solutions/fleet-charging.jpg',
  'PROD-VIV-HOME-7': '/images/evcs-hardware/prowall-22.jpg',
  'Commercial Hub': '/images/evcs-hardware/hypercharge-360.jpg',
  'DC Fast': '/images/evcs-hardware/rapidpulse-180.jpg',
  'AC Wallbox': '/images/evcs-hardware/prowall-22.jpg',
  'Fleet Depot': '/images/evcs-hardware/megadepot-600.jpg',
};

const defaultProducts: Product[] = [
  {
    id: 1,
    product_code: 'PROD-VIV-360',
    name: 'Vivtron HyperCharge 360',
    category: 'Commercial Hub',
    power_rating: '360 kW Dual-Cabinet',
    price: 48500.00,
    stock_status: 'In Stock',
    description: 'Flagship ultra-fast DC fast charging station with liquid-cooled cables and dynamic power sharing up to 500A.',
    specs: { voltage: '200-1000V DC', efficiency: '96.5%', screen: '15.6" Sunlight Readable Touch', cableLength: '5.5m Liquid Cooled', protocol: 'OCPP 2.0.1 / ISO 15118' },
    image: '/images/evcs-hardware/hypercharge-360.jpg'
  },
  {
    id: 2,
    product_code: 'PROD-VIV-180',
    name: 'Vivtron RapidPulse 180',
    category: 'DC Fast',
    power_rating: '180 kW Modular',
    price: 28900.00,
    stock_status: 'In Stock',
    description: 'Compact high-reliability DC fast charger ideal for retail plazas, fleet depots, and highway corridors.',
    specs: { voltage: '150-1000V DC', efficiency: '95.8%', screen: '10.1" Touch', cableLength: '4.8m Air Cooled', protocol: 'OCPP 1.6J / 2.0.1' },
    image: '/images/evcs-hardware/rapidpulse-180.jpg'
  },
  {
    id: 3,
    product_code: 'PROD-VIV-60',
    name: 'Vivtron UrbanFleet 60',
    category: 'DC Fast',
    power_rating: '60 kW Compact',
    price: 14200.00,
    stock_status: 'In Stock',
    description: 'Wall-mountable or pedestal DC fast charger engineered for commercial fleets and overnight turnaround.',
    specs: { voltage: '200-920V DC', efficiency: '95.2%', screen: '7" Display', cableLength: '4.0m', protocol: 'OCPP 1.6J' },
    image: '/images/evcs-hardware/urbanfleet-60.jpg'
  },
  {
    id: 4,
    product_code: 'PROD-VIV-22',
    name: 'Vivtron ProWall 22',
    category: 'AC Wallbox',
    power_rating: '22 kW Three-Phase',
    price: 1850.00,
    stock_status: 'In Stock',
    description: 'Smart AC commercial charging station with integrated RFID, Wi-Fi/4G, and dynamic load balancing.',
    specs: { voltage: '400V AC 3-Phase', efficiency: '99.1%', screen: 'LED Matrix + App', cableLength: '7.0m Type 2', protocol: 'OCPP 1.6J' },
    image: '/images/evcs-hardware/prowall-22.jpg'
  },
  {
    id: 5,
    product_code: 'PROD-VIV-DEPOT',
    name: 'Vivtron MegaDepot Pantograph 600',
    category: 'Fleet Depot',
    power_rating: '600 kW Inverted Pantograph',
    price: 89000.00,
    stock_status: 'Built to Order',
    description: 'Heavy-duty automated overhead bus and truck charging system with automated connection in under 15 seconds.',
    specs: { voltage: '400-1000V DC', efficiency: '97.0%', screen: 'Industrial HMI Telemetry', cableLength: 'Overhead Mast', protocol: 'ISO 15118-20 / OCPP 2.0.1' },
    image: '/images/evcs-hardware/megadepot-600.jpg'
  },
  {
    id: 6,
    product_code: 'PROD-VIV-240',
    name: 'Vivtron Highway Express 240',
    category: 'Commercial Hub',
    power_rating: '240 kW Dual Gun',
    price: 36000.00,
    stock_status: 'In Stock',
    description: 'High-power commercial highway plaza DC charger engineered for continuous back-to-back fast charging on expressway corridors.',
    specs: { voltage: '150-1000V DC', efficiency: '96.2%', screen: '12" High Brightness Display', cableLength: '5.0m Dual CCS2', protocol: 'OCPP 1.6J / 2.0.1' },
    image: '/images/evcs-solutions/highway-supercharger.jpg'
  },
  {
    id: 7,
    product_code: 'PROD-VIV-DEPOT-120',
    name: 'Vivtron FleetHub Depot 120',
    category: 'Fleet Depot',
    power_rating: '120 kW Fleet Dual Dispenser',
    price: 22500.00,
    stock_status: 'In Stock',
    description: 'Engineered for logistics delivery hubs and commercial fleets with automated overnight scheduled charging and telematics.',
    specs: { voltage: '200-920V DC', efficiency: '95.6%', screen: '8" Rugged Touchscreen', cableLength: '5.0m Heavy Duty', protocol: 'OCPP 1.6J / Fleet API' },
    image: '/images/evcs-solutions/fleet-charging.jpg'
  },
  {
    id: 8,
    product_code: 'PROD-VIV-HOME-7',
    name: 'Vivtron HomeSmart 7.4',
    category: 'AC Wallbox',
    power_rating: '7.4 kW Single-Phase',
    price: 950.00,
    stock_status: 'In Stock',
    description: 'Compact residential and society EV charger with mobile app scheduling, solar integration, and RFID access.',
    specs: { voltage: '230V AC Single-Phase', efficiency: '99.3%', screen: 'LED Ring Indicator', cableLength: '5.0m Type 2', protocol: 'Wi-Fi / Bluetooth / OCPP' },
    image: '/images/evcs-hardware/prowall-22.jpg'
  }
];

export const EVCSProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    api.public.getProducts()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map(p => ({
            ...p,
            image: p.image || fallbackImageMap[p.product_code] || fallbackImageMap[p.category] || '/images/evcs-hardware/hypercharge-360.jpg'
          }));
          setProducts(mapped);
        } else {
          setProducts(defaultProducts);
        }
      })
      .catch((err) => {
        console.warn('Products fetch error, using default catalog', err);
        setProducts(defaultProducts);
      })
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
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
          {loading && products.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 mx-auto rounded-full border-4 border-[#082B59]/20 border-t-[#082B59] animate-spin"></div>
              <p className="mt-4 text-xs text-slate-500 uppercase tracking-wider font-semibold">Loading hardware catalog...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProducts.map((prod, idx) => {
                const specsObj = parseSpecs(prod.specs);
                const prodImg = prod.image || fallbackImageMap[prod.product_code] || fallbackImageMap[prod.category] || '/images/evcs-hardware/hypercharge-360.jpg';

                return (
                  <div
                    key={prod.id}
                    data-aos="fade-up"
                    data-aos-delay={((idx % 2) + 1) * 100}
                    data-aos-duration="800"
                    className="p-6 sm:p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-[#082B59]/15 hover:-translate-y-1 group"
                  >
                    <div>
                      {/* Product Hardware Studio Image */}
                      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-slate-200/90 shadow-sm bg-white flex items-center justify-center p-3">
                        <img
                          src={prodImg}
                          alt={prod.name}
                          className="w-full h-full object-contain sm:object-cover rounded-xl group-hover:scale-106 transition-transform duration-500"
                        />
                        
                        {/* Top Floating Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#082B59] text-xs font-mono font-bold shadow-sm border border-slate-200/70">
                            {prod.product_code}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                            {prod.stock_status}
                          </span>
                        </div>

                        {/* Bottom Floating Power Badge */}
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-[#082B59]/90 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20 shadow-sm">
                          {prod.power_rating}
                        </div>
                      </div>

                      {/* Header & Category */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#35C759] font-mono">
                          {prod.category}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">Vivtron Commercial</span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#082B59] font-heading group-hover:text-[#062042] transition-colors">
                        {prod.name}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
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
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white font-bold text-xs tracking-wide shadow-md shadow-[#082B59]/20 hover:shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
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
