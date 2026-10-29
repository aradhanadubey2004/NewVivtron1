import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';
import { api } from '../../services/api';
import { ChargingStation } from '../../types';
import AOS from 'aos';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Phone,
  TrendingUp,
  Award,
  Zap,
  Smartphone,
  IndianRupee,
  RefreshCw,
  Cpu,
  BatteryCharging,
  Layers,
  Activity,
  Truck,
  ArrowUpRight,
  Eye,
  X,
  Maximize2
} from 'lucide-react';

interface ChargerProduct {
  id: string;
  name: string;
  modelCode: string;
  badge: string;
  category: string;
  popular?: boolean;
  image: string;
  power: string;
  description: string;
  highlights: string[];
  specs: {
    powerOutput: string;
    connectors: string;
    efficiency: string;
    chargeSpeed: string;
    voltageRange: string;
    maxCurrent: string;
    inputSupply: string;
    enclosure: string;
    display: string;
    payment: string;
    protocol: string;
    warranty: string;
  };
  features: string[];
  idealFor: string;
  buttonText: string;
}

const CHARGER_PORTFOLIO: ChargerProduct[] = [
  {
    id: '40kw-fast-charger',
    name: '40kW EV Fast Charger',
    modelCode: 'EVCS-DC40-DUAL',
    badge: '40kW DC DUAL',
    category: 'Societies & Offices',
    image: '/images/evcs/2026/05/EcoPower-Charging-1-768x512-1.webp',
    power: '40 kW DC Fast Output',
    description: 'Ideal for small to medium charging stations, residential societies, institutions, and small businesses. Delivers efficient performance with compact footprint.',
    highlights: [
      'Dual CCS2 charging guns',
      'RFID card & App payment',
      'IP54 weather-proof enclosure'
    ],
    specs: {
      powerOutput: '40 kW DC Peak',
      connectors: 'Dual CCS2 (Simultaneous)',
      efficiency: '≥ 95.5% Conversion',
      chargeSpeed: '~45–60 mins (20–80%)',
      voltageRange: '150V – 1000V DC',
      maxCurrent: '133A Peak Current',
      inputSupply: '415V AC ±15%, 3-Phase, 50Hz',
      enclosure: 'IP54 Weather-proof, IK10',
      display: '7-inch High Brightness Touchscreen',
      payment: 'RFID Card, Mobile App, Dynamic QR',
      protocol: 'OCPP 1.6J / 2.0.1 Ready',
      warranty: '3-Year Comprehensive Warranty'
    },
    features: [
      'Over-voltage, Under-voltage & Earth Leakage Protection',
      'Emergency Stop Safety Switch with Rapid Disconnect',
      'Intelligent Air-Cooled Smart Thermal Regulation',
      'Cloud Telematics & CMS Remote Monitoring',
      'Anti-tamper & Heavy Vandal-resistant Casing',
      'Auto-lock Connector Security during Charging'
    ],
    idealFor: 'Residential Societies, Corporate Campuses, Clinics, Hotels & Commercial Parking',
    buttonText: 'View 40kW Specs & Pricing'
  },
  {
    id: '60kw-urban-fast-charger',
    name: '60kW Urban Fast Charger',
    modelCode: 'EVCS-DC60-ULTRA',
    badge: '60kW DC ULTRA',
    category: 'Malls & Public Hubs',
    popular: true,
    image: '/images/evcs/2026/05/FastCharge-Express-01-1-768x512-1.webp',
    power: '60 kW Ultra Fast DC',
    description: 'Designed for urban high-traffic areas requiring fast and reliable charging. Suitable for commercial malls, paid parking garages, and highway transit points.',
    highlights: [
      '10% to 80% charge in ~45 mins',
      'Dynamic load sharing between 2 cars',
      'Integrated 7-inch touch screen'
    ],
    specs: {
      powerOutput: '60 kW Ultra Fast',
      connectors: 'Dual CCS2 Smart Power Sharing',
      efficiency: '≥ 96.0% Conversion',
      chargeSpeed: '~35–45 mins (10–80%)',
      voltageRange: '150V – 1000V DC',
      maxCurrent: '200A Peak Current',
      inputSupply: '415V AC ±15%, 3-Phase, 50Hz',
      enclosure: 'IP55 Outdoor Rated, IK10',
      display: '7-inch Sunlight-Readable Touchscreen',
      payment: 'Integrated POS, UPI QR, RFID & App',
      protocol: 'Dual SIM 4G LTE, Ethernet, OCPP 1.6J',
      warranty: '5-Year Commercial Grade Warranty'
    },
    features: [
      'Dynamic Dual-Car Load Balancing & Power Allocation',
      'Integrated POS Terminal & Multi-Lingual Audio Voice Guidance',
      'Built-in Type 2 Surge Protection Device (SPD)',
      'Dual-Fan Intelligent Variable-Speed Thermal System',
      'EV-CMS Remote Diagnostics & Real-time Firmware OTA',
      'Smart Billing Engine with Time-of-Day Tariff Support'
    ],
    idealFor: 'Shopping Malls, Highway Fuel Outlets, Commercial Multiplexes & Paid Public Hubs',
    buttonText: 'View 60kW Specs & Quotation'
  },
  {
    id: '120kw-heavy-supercharger',
    name: '120kW Heavy Supercharger',
    modelCode: 'EVCS-DC120-SUPERHUB',
    badge: '120kW SUPERHUB',
    category: 'Fleets & Highways',
    image: '/images/evcs/2026/05/SmartCharge-Network-768x511-1.webp',
    power: '120 kW Heavy Supercharging',
    description: 'Built for commercial fleets, e-buses, logistics trucks, and expressway rapid corridors. Dramatically cuts vehicle turnaround time to under 25 minutes.',
    highlights: [
      'Liquid-cooled cable option',
      '250A continuous charging current',
      'EV-CMS cloud telemetry integration'
    ],
    specs: {
      powerOutput: '120 kW Heavy Supercharging',
      connectors: 'Dual Boost / Liquid-Cooled CCS2',
      efficiency: '≥ 96.5% SiC Modules',
      chargeSpeed: 'Under 25 mins Rapid',
      voltageRange: '200V – 1000V DC Wideband',
      maxCurrent: '250A Continuous (300A Boost)',
      inputSupply: '415V AC ±10%, 3-Phase Industrial',
      enclosure: 'IP55 Heavy Industry, C5-M Coating',
      display: '10-inch Full HD Interactive Display',
      payment: 'Fleet Telematics, POS, UPI, RFID',
      protocol: 'Dual 5G/4G, Gigabit LAN, OCPP 2.0.1',
      warranty: '5-Year Enterprise SLA & 99.5% Uptime'
    },
    features: [
      'Liquid-Cooled Ultra-High-Current Option for Heavy Vehicles',
      'Modular Silicon Carbide (SiC) Power Blocks with Hot-Swap',
      'Fleet Telematics Token & Automated Driver Authentication',
      'C5-M Coastal Anti-Corrosion Heavy Protective Coating',
      'Multi-Zone Smart Thermal Management with Sensor Mesh',
      'Digital Signage / Advertising Display Support on 10-inch Screen'
    ],
    idealFor: 'Expressway Corridors, E-Bus & Truck Depots, Logistics Yards & Intercity Corridors',
    buttonText: 'View 120kW Specs & Proposal'
  }
];

export const EVCSHome: React.FC = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [selectedCharger, setSelectedCharger] = useState<ChargerProduct | null>(null);
  const [networkStats, setNetworkStats] = useState({
    totalStations: 100,
    activeStations: 92,
    totalKwhDispensed: 740400,
    totalSessions: 19870,
    uptimePercentage: 99.85,
  });

  // Handle ESC and body scroll lock when details modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCharger(null);
    };
    if (selectedCharger) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCharger]);

  // Interactive Charging Calculator state
  const [batterySize, setBatterySize] = useState<number>(60); // kWh
  const [chargerKw, setChargerKw] = useState<number>(60); // kW

  useEffect(() => {
    api.public.getNetworkStats()
      .then(res => {
        if (res.success && res.data) setNetworkStats(res.data);
      })
      .catch(err => console.warn('Network stats fetch error', err));

    api.public.getStations()
      .then(res => {
        if (res.success && res.data) setStations(res.data.slice(0, 4));
      })
      .catch(err => console.warn('Stations fetch error', err));

    AOS.refresh();
  }, []);

  // Calculate estimated charging time from 10% to 80% (70% capacity)
  const energyNeeded = batterySize * 0.7;
  const timeInHours = energyNeeded / (chargerKw * 0.92); // 92% thermal efficiency
  const timeInMinutes = Math.max(12, Math.round(timeInHours * 60));

  // Leadership Team from vivtronevcs.com
  const realLeadership = [
    {
      name: 'Suraj Kesarwani',
      role: 'Director Technical',
      image: '/images/evcs/2026/06/Director-Technical.jpg',
      imagePosition: 'center top',
      aos: 'fade-right',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    {
      name: 'Vivek Kumar Singh',
      role: 'Director Production',
      image: '/images/evcs/2026/06/Director-production.jpg',
      imagePosition: 'center 20%',
      aos: 'fade-up',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    {
      name: 'Arvind Kumar',
      role: 'Director – Sales & Marketing',
      image: '/images/evcs/2026/06/Arvind-kumar.jpg',
      imagePosition: 'center 75%',
      aos: 'fade-left',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  ];

  // Professional EV Charging Services list from vivtronevcs.com/index.html
  const servicesList = [
    {
      title: 'Manufacturing',
      description: 'Innovative EV charger manufacturing delivering durable, efficient, smart, and sustainable charging infrastructure solutions.',
      icon: Cpu,
      path: '/evcs/products',
      tag: 'Hardware',
    },
    {
      title: 'EVCS Solution',
      description: 'Smart EVCS solutions providing reliable, fast, secure, and efficient charging infrastructure for modern electric mobility needs.',
      icon: BatteryCharging,
      path: '/evcs/solutions',
      tag: 'Turnkey',
    },
    {
      title: 'Fleet Charging',
      description: 'Efficient fleet charging solutions ensuring fast, scalable, reliable, and smart power management for commercial vehicles.',
      icon: Truck,
      path: '/evcs/solutions',
      tag: 'Commercial',
    },
    {
      title: 'EV-CMS',
      description: 'Advanced EV-CMS platform enabling smart monitoring, remote management, seamless operations, and optimized EV charging network performance.',
      icon: Activity,
      path: '/evcs/services',
      tag: 'Software',
    },
    {
      title: 'EV Mobile APP',
      description: 'Smart EV mobile app offering real-time charging access, monitoring, navigation, payments, and seamless user experience management.',
      icon: Smartphone,
      path: '/evcs/services',
      tag: 'App & Cloud',
    },
  ];

  // 4 Counter Stats with animated count up
  const statsCounters = [
    { target: 5, suffix: '+', label: 'Years of Experience' },
    { target: 100, suffix: '+', label: 'Charging Stations' },
    { target: 100, suffix: '%', label: 'Quality Services' },
    { target: 1550, suffix: '+', label: 'Satisfied Clients' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#082B59] selection:text-white">
      <EVCSNavbar />

      <main className="flex-1">
        {/* HERO SECTION - Self-Service Client EV Charging with Reference Layout */}
        {/* ========================================================= */}
        <section className="px-[10px] pt-3 pb-8 lg:pb-12 bg-white">
          <div className="relative rounded-3xl overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center bg-slate-950 border border-slate-900 shadow-2xl">
            {/* Full Banner Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/evcs-hero-self-charge.jpg"
                alt="Client charging electric vehicle at Vivtron EVCS fast charger"
                className="w-full h-full object-cover object-[75%_center] sm:object-center transform scale-[1.01] transition-transform duration-1000"
              />
              {/* Dark Gradient Overlay on left for perfect contrast and sharp readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 sm:via-slate-950/60 to-slate-950/15 lg:to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"></div>
              {/* Ambient Glow */}
              <div className="absolute top-1/4 left-10 w-[550px] h-[350px] bg-[#35C759]/15 rounded-full blur-[140px] pointer-events-none"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10 w-full py-12 sm:py-16 lg:py-20">
              {/* Left Column Content over Image */}
              <div
                className="max-w-2xl text-left space-y-6"
                data-aos="fade-up"
                data-aos-duration="900"
              >
                <div
                  className="inline-flex items-center gap-2 text-white/95 text-xs sm:text-sm font-semibold tracking-wide"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <Zap className="w-4 h-4 text-[#35C759]" />
                  <span>Vivtronevcs Powered By Navodaya Growth Pvt. Ltd.</span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-heading drop-shadow-md"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Fast EV Charging Solutions <br className="hidden sm:inline" />
                  for India’s Electric Future
                </h1>

                <p
                  className="text-base sm:text-lg text-slate-200/95 leading-relaxed max-w-xl font-normal drop-shadow"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Experience dependable EV charging solutions engineered for modern mobility.
                </p>

                {/* Primary CTA Buttons (Get Started + Call Us Now with Phone Circle) */}
                <div
                  className="flex flex-wrap items-center justify-start gap-5 pt-2"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <button
                    onClick={() => navigate('/evcs/products')}
                    className="px-6 py-3 rounded-full bg-[#082B59] hover:bg-[#062247] text-white font-bold text-sm tracking-wide border border-[#35C759]/40 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <span>Get Started</span>
                    <span className="w-7 h-7 rounded-full bg-[#35C759] text-white flex items-center justify-center shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>

                  <a
                    href="tel:07651912140"
                    className="inline-flex items-center gap-3.5 group cursor-pointer transition hover:opacity-90"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#35C759] flex items-center justify-center text-white shadow-md shadow-[#35C759]/30 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 fill-white" />
                    </div>
                    <div className="text-left leading-tight">
                      <p className="text-sm font-bold text-white tracking-wide">Call Us Now</p>
                      <p className="text-xs text-slate-200 font-medium tracking-wider">07651912140</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ABOUT US SECTION (Design Matched to Reference Image 2 & Secondary Cool Grey BG) */}
        {/* ========================================================= */}
        <section className="py-16 lg:py-24 bg-[#F1F5F9] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row: Left Heading & Right Description */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
              <div className="max-w-xl" data-aos="fade-right" data-aos-duration="800">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#082B59]/10 text-[#082B59] text-xs font-bold tracking-wider uppercase mb-3 font-mono">
                  ABOUT US VIVTRON EVCS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082B59] font-heading tracking-tight leading-[1.15]">
                  Smart EV Charging <br />
                  <span className="text-[#35C759]">for Every Journey</span>
                </h2>
              </div>

              <div className="max-w-xl text-slate-600 text-sm sm:text-base leading-relaxed lg:pt-8" data-aos="fade-left" data-aos-duration="800">
                <p>
                  Vivtron EVCS is a venture of <strong className="text-slate-900 font-semibold">Navodaya Growth Private Limited</strong>, dedicated to delivering smart and reliable EV charging infrastructure solutions. Backed by the experience and vision of a diversified business group, we help accelerate the adoption of electric mobility through innovative, scalable, and sustainable charging solutions for homes, businesses, and public spaces.
                </p>
              </div>
            </div>

            {/* Bottom Grid: Left Tall Portrait Photo & Right Mission/Vision + Team */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Tall Portrait Image (5 of 12 columns) */}
              <div className="lg:col-span-5" data-aos="fade-right" data-aos-duration="900">
                <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl h-full min-h-[480px] sm:min-h-[560px] group">
                  <img
                    src="/images/evcs-about-charging-man.jpg"
                    alt="Customer charging electric car at Vivtron EVCS"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Since 2026 Badge */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 text-xs font-extrabold text-[#082B59] tracking-wider uppercase shadow-md">
                    SINCE 2026
                  </div>
                  {/* Bottom Feature Strip */}
                  <div className="absolute bottom-5 left-5 right-5 bg-slate-950/80 backdrop-blur-md rounded-2xl py-3 px-4 text-center text-white text-xs font-bold tracking-wider uppercase border border-white/20 shadow-lg">
                    FAST • RELIABLE • IN-HOUSE BUILT
                  </div>
                </div>
              </div>

              {/* Right Column: Mission/Vision Cards + Team Image (7 of 12 columns) */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                {/* Two Side-by-Side Mission & Vision Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Our Mission Card */}
                  <div
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="800"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#35C759]/15 text-[#35C759] flex items-center justify-center mb-4">
                      <TrendingUp className="w-5 h-5 text-[#35C759]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#082B59] font-heading">Our Mission</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      Deliver fast, smart, and sustainable EV charging solutions enhancing convenient electric mobility.
                    </p>
                  </div>

                  {/* Our Vision Card */}
                  <div
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="800"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#35C759]/15 text-[#35C759] flex items-center justify-center mb-4">
                      <Award className="w-5 h-5 text-[#35C759]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#082B59] font-heading">Our Vision</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      Build a cleaner future through innovative, reliable, and accessible EV charging infrastructure for everyone.
                    </p>
                  </div>
                </div>

                {/* Wide Landscape Team Photo Card */}
                <div
                  className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl flex-1 min-h-[260px] sm:min-h-[300px] group"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="900"
                >
                  <img
                    src="/images/evcs-about-team.jpg"
                    alt="Vivtron EVCS Professional Team"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Circular Green Badge with Plug Icon */}
                  <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-[#35C759] text-white flex items-center justify-center shadow-lg shadow-[#35C759]/30 hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* OUR PRODUCTS / PROFESSIONAL SERVICES SECTION */}
        {/* ========================================================= */}
        <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up" data-aos-duration="800">
              <div className="max-w-2xl">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#082B59]/10 text-[#082B59] text-xs font-bold tracking-wider uppercase font-mono">
                  Our Products & Services
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082B59] mt-2 font-heading tracking-tight">
                  Professional EV Charging <span className="text-[#35C759]">Services.</span>
                </h2>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Delivering professional EV charging services with fast, secure, reliable, and smart solutions for convenient, sustainable, and uninterrupted electric mobility experiences.
                </p>
              </div>

              <button
                onClick={() => navigate('/evcs/products')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#082B59] hover:bg-[#062247] text-white text-xs font-bold tracking-wider uppercase transition shadow-md shrink-0 cursor-pointer"
              >
                <span>View All Products</span>
                <ArrowUpRight className="w-4 h-4 text-[#35C759]" />
              </button>
            </div>

            {/* 5 Product / Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((svc, idx) => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={((idx % 3) + 1) * 100}
                    data-aos-duration="800"
                    className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#082B59] shadow-xs hover:shadow-xl hover:shadow-[#082B59]/10 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 group-hover:bg-[#082B59] text-[#082B59] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-slate-600 text-[11px] font-bold">
                          {svc.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-[#082B59] transition-colors">
                        {svc.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {svc.description}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(svc.path)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#082B59] hover:text-[#062247] transition group/btn cursor-pointer"
                    >
                      <span>Learn Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#35C759] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* COUNTER STATS SECTION (Secondary Cool Grey Background) */}
        {/* ========================================================= */}
        <section className="py-12 lg:py-16 bg-[#F1F5F9] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {statsCounters.map((stat, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082B59] font-heading group-hover:text-[#35C759] transition-colors">
                    <AnimatedCounter
                      end={stat.target}
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHY CHOOSE US SECTION */}
        {/* Exact Layout: 3 Columns (Left Features | Center Graphic | Right Features) */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="800">
              <span className="inline-block px-5 py-2 rounded-full bg-[#082B59]/10 text-[#082B59] text-xs font-bold tracking-widest uppercase mb-3 font-mono">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082B59] font-heading leading-tight">
                Smart EV Charging <br />
                <span className="text-[#35C759]">Solutions for Modern Spaces</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                Delivering reliable EV charging infrastructure with intelligent technology, seamless software integration, and scalable deployment for every business.
              </p>
            </div>

            {/* Main 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column (3 Feature Boxes) */}
              <div className="lg:col-span-4 space-y-5">
                {/* Box 1: Smart App Access */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="800"
                  className="p-6 rounded-3xl bg-[#F1F5F9] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="w-1 bg-[#35C759] absolute top-0 left-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                    <Smartphone className="w-6 h-6 text-[#35C759] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Smart App Access</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Manage charging sessions, payments, and station monitoring directly from your smartphone with real-time analytics.
                    </p>
                  </div>
                </div>

                {/* Box 2: Instant Charging Control */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="800"
                  className="p-6 rounded-3xl bg-[#F1F5F9] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="w-1 bg-[#35C759] absolute top-0 left-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                    <Zap className="w-6 h-6 text-[#35C759] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Instant Charging Control</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Start, stop, and schedule charging sessions instantly using smart connectivity and automation.
                    </p>
                  </div>
                </div>

                {/* Box 3: Affordable Pricing */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="800"
                  className="p-6 rounded-3xl bg-[#F1F5F9] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="w-1 bg-[#35C759] absolute top-0 left-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                    <IndianRupee className="w-6 h-6 text-[#35C759] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Affordable Pricing</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Cost-effective EV charging plans designed for apartments, offices, fleets, and commercial locations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Column: Center Graphic Card with Glowing Pulse */}
              <div className="lg:col-span-4 flex items-center justify-center py-6" data-aos="zoom-in" data-aos-duration="900">
                <div className="relative flex items-center justify-center">
                  {/* Glowing Pulse Circle */}
                  <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-[#35C759]/25 to-[#082B59]/15 animate-pulse blur-xl"></div>

                  {/* Center Card */}
                  <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-[35px] bg-[#F1F5F9] border border-slate-200 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
                    <div className="absolute inset-3 border-2 border-dashed border-[#35C759]/30 rounded-[28px] pointer-events-none"></div>
                    <BatteryCharging className="w-16 h-16 text-[#35C759] mb-3 animate-bounce" />
                    <h4 className="text-2xl font-extrabold text-[#082B59] font-heading">EV Charging</h4>
                    <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Fast • Smart • Reliable</span>
                  </div>
                </div>
              </div>

              {/* Right Column (3 Feature Boxes) */}
              <div className="lg:col-span-4 space-y-5">
                {/* Box 4: Regular Updates */}
                <div
                  data-aos="fade-left"
                  data-aos-delay="100"
                  data-aos-duration="800"
                  className="p-6 rounded-3xl bg-[#F1F5F9] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="w-1 bg-[#35C759] absolute top-0 left-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                    <RefreshCw className="w-6 h-6 text-[#35C759] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Regular Updates</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Continuous software improvements ensure smooth operation, enhanced security, and better user experience.
                    </p>
                  </div>
                </div>

                {/* Box 5: In-House Manufacturing */}
                <div
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-duration="800"
                  className="p-6 rounded-3xl bg-[#F1F5F9] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="w-1 bg-[#35C759] absolute top-0 left-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                    <Cpu className="w-6 h-6 text-[#35C759] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">In-House Manufacturing</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Built and tested with strict quality standards to ensure long-lasting and reliable charging systems.
                    </p>
                  </div>
                </div>

                {/* Box 6: Perfect for Any Location */}
                <div
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="800"
                  className="p-6 rounded-3xl bg-[#F1F5F9] border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="w-1 bg-[#35C759] absolute top-0 left-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                    <MapPin className="w-6 h-6 text-[#35C759] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Perfect for Any Location</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Ideal for societies, hotels, restaurants, malls, offices, and smart parking infrastructures.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* HARDWARE CHARGER CATALOG (40kW, 60kW, 120kW) */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#F1F5F9] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12" data-aos="fade-up" data-aos-duration="800">
              <div>
                <span className="text-[#082B59] text-xs font-bold uppercase tracking-wider font-mono">Hardware Portfolio</span>
                <h3 className="text-3xl font-extrabold text-[#082B59] mt-1 font-heading">
                  High-Performance DC Fast Chargers
                </h3>
              </div>
              <button
                onClick={() => navigate('/evcs/products')}
                className="mt-4 md:mt-0 text-[#082B59] hover:underline text-sm font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Full Charger Catalog</span>
                <ChevronRight className="w-4 h-4 text-[#35C759]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CHARGER_PORTFOLIO.map((charger, idx) => (
                <div
                  key={charger.id}
                  data-aos="fade-up"
                  data-aos-delay={(idx + 1) * 100}
                  data-aos-duration="800"
                  className={`rounded-3xl bg-white p-7 transition flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 group relative ${
                    charger.popular
                      ? 'border-2 border-[#082B59] shadow-xl shadow-[#082B59]/10'
                      : 'border border-slate-200 hover:border-[#082B59]'
                  }`}
                >
                  {charger.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#082B59] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      MOST POPULAR COMMERCIAL
                    </div>
                  )}

                  <div>
                    {/* Enlarged Clickable Charger Showcase Image */}
                    <div
                      onClick={() => setSelectedCharger(charger)}
                      className="h-60 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-100 mb-5 relative cursor-pointer border border-slate-200/80 group/img shadow-inner"
                      title="Click to view full specifications & details"
                    >
                      <img
                        src={charger.image}
                        alt={charger.name}
                        className="w-full h-full object-cover group-hover/img:scale-108 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                        <span className="px-3 py-1.5 rounded-full bg-white text-[#082B59] text-xs font-bold shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#35C759]" />
                          <span>Click for Full Specs</span>
                        </span>
                        <span className="p-1.5 rounded-full bg-black/40 text-white backdrop-blur-xs">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm border border-white/15">
                        <Eye className="w-3 h-3 text-[#35C759]" />
                        <span>Click for Details</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#082B59]/10 text-[#082B59] text-xs font-mono font-bold">
                        {charger.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{charger.category}</span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 font-heading mb-3">
                      {charger.name}
                    </h4>

                    {/* Description paragraph removed from card to keep layout clean & emphasize visual display */}

                    <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                      {charger.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedCharger(charger)}
                    className={`w-full py-2.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      charger.popular
                        ? 'bg-[#082B59] hover:bg-[#062247] text-white shadow-md shadow-[#082B59]/20'
                        : 'bg-[#F1F5F9] hover:bg-[#082B59] hover:text-white text-[#082B59] border border-slate-200'
                    }`}
                  >
                    <span>{charger.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#35C759]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE CHARGING SPEED CALCULATOR */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#082B59]/10 border border-[#082B59]/20 text-[#082B59] text-xs font-bold mb-3 font-mono">
                <Calculator className="w-4 h-4 text-[#35C759]" />
                <span>Interactive Speed Calculator</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#082B59] font-heading">Estimate Your Charge Time</h3>
              <p className="text-xs text-slate-600 mt-2">
                Slide to configure battery capacity and charger output to see how rapidly Vivtron EVCS gets your vehicle back on the road.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="900"
              className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#F1F5F9] border border-slate-200 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700">Vehicle Battery Size</label>
                      <span className="text-sm font-extrabold text-[#082B59] font-mono">{batterySize} kWh</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={120}
                      step={5}
                      value={batterySize}
                      onChange={(e) => setBatterySize(Number(e.target.value))}
                      className="w-full accent-[#082B59] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>30 kWh (Compact)</span>
                      <span>60 kWh (Sedan)</span>
                      <span>120 kWh (SUV / Commercial)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700">Charger Output Power</label>
                      <span className="text-sm font-extrabold text-[#082B59] font-mono">{chargerKw} kW</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[40, 60, 120].map((kw) => (
                        <button
                          key={kw}
                          onClick={() => setChargerKw(kw)}
                          className={`py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${chargerKw === kw
                              ? 'bg-[#082B59] text-white border-[#082B59] shadow-md shadow-[#082B59]/20'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                          {kw} kW DC
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-500">
                    * Estimated from 10% to 80% State of Charge (SOC) factoring battery thermal management curves.
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center flex flex-col items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated 10% → 80% Charge</span>
                  <div className="text-5xl sm:text-6xl font-extrabold text-[#082B59] font-heading my-4">
                    {timeInMinutes} <span className="text-2xl font-bold text-slate-600">min</span>
                  </div>
                  <div className="text-xs text-slate-600 max-w-xs leading-relaxed">
                    Delivers approximately <strong className="text-slate-900">{Math.round((batterySize * 0.7) * 6)} km</strong> of driving range in a single short stop.
                  </div>
                  <button
                    onClick={() => navigate('/evcs/contact')}
                    className="mt-6 px-8 py-3.5 rounded-full bg-[#082B59] hover:bg-[#062247] text-white font-bold text-xs shadow-md shadow-[#082B59]/20 transition cursor-pointer"
                  >
                    Deploy This Charger Setup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* COMPANY LEADERSHIP SECTION (Secondary Cool Grey Background) */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-[#F1F5F9] border-b border-slate-200/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                <span className="text-[#082B59]">Company </span>
                <span className="text-[#35C759]">Leadership</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {realLeadership.map((leader, idx) => (
                <div
                  key={idx}
                  data-aos={leader.aos}
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic"
                  className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 text-center flex flex-col items-center shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Photo Container */}
                  <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      style={{ objectPosition: (leader as any).imagePosition || 'center top' }}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Overlapping Name & Designation Badge */}
                  <div className="-mt-7 sm:-mt-8 relative z-10 w-[88%] sm:w-[84%] bg-[#F1F5F9] rounded-2xl py-3 px-4 shadow-sm border border-slate-200 text-center">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#082B59] tracking-tight font-heading leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#35C759] mt-0.5">
                      {leader.role}
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center justify-center gap-2.5 mt-5 mb-2">
                    <a
                      href={leader.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#35C759] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="Facebook"
                    >
                      f
                    </a>
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#35C759] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="X / Twitter"
                    >
                      𝕏
                    </a>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#35C759] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="LinkedIn"
                    >
                      in
                    </a>
                    <a
                      href={leader.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#35C759] text-white flex items-center justify-center transition shadow-xs"
                      title="Instagram"
                    >
                      📷
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* START CHARGING SMARTER TODAY BANNER */}
        {/* ========================================================= */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="/images/evcs/2026/05/Start-Charging-Smarter-Today-and-Power-Your-Journey.webp"
              alt="Start Charging Smarter"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-5" data-aos="fade-up" data-aos-duration="900">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading leading-tight">
                Start Charging Smarter Today and Power Your Journey
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Experience smarter EV charging solutions designed for reliable performance, seamless connectivity, and sustainable travel. Power every journey confidently with fast, efficient, and future-ready electric vehicle charging technology.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => navigate('/evcs/contact')}
                  className="px-8 py-3.5 rounded-full bg-[#35C759] hover:bg-[#2eb44e] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#35C759]/25 transition hover:scale-105 cursor-pointer"
                >
                  Contact Now
                </button>
                <a
                  href="tel:07651912140"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#35C759]" />
                  <span>Call Us Now: 07651912140</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DEALERSHIP BANNER (Deep Navy Blue #082B59) */}
        {/* ========================================================= */}
        <section className="py-16 bg-[#082B59] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl text-center lg:text-left" data-aos="fade-right" data-aos-duration="800">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#35C759] text-xs font-bold uppercase tracking-wider font-mono">
                  Partner With Us
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                  Vivtron EVCS Dealership Smart Business, Sustainable Future
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Experience intelligent EV charging solutions designed for seamless travel, faster charging, real-time connectivity, and reliable performance.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 shrink-0" data-aos="fade-left" data-aos-duration="800">
                <button
                  onClick={() => navigate('/evcs/contact')}
                  className="px-8 py-3.5 rounded-full bg-[#35C759] hover:bg-[#2eb44e] text-white font-extrabold text-sm shadow-xl transition hover:scale-105 cursor-pointer"
                >
                  Join Dealership
                </button>
                <a
                  href="tel:07651912140"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#35C759]" />
                  <span>07651912140</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHARGER SPECIFICATIONS & PRODUCT DETAILS MODAL */}
        {/* ========================================================= */}
        {selectedCharger && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedCharger(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/90">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 flex items-center justify-center text-[#082B59] shrink-0 shadow-xs">
                    <Zap className="w-6 h-6 text-[#35C759]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-black text-[#082B59] font-heading">
                        {selectedCharger.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#082B59]/10 text-[#082B59] text-[11px] font-mono font-bold">
                        {selectedCharger.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Target Deployment: <span className="text-slate-800 font-bold">{selectedCharger.category}</span> • Model: <span className="font-mono text-slate-700">{selectedCharger.modelCode}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCharger(null)}
                  className="p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                {/* Large Showcase Image */}
                <div className="w-full h-64 sm:h-80 rounded-2xl bg-slate-900 overflow-hidden relative border border-slate-200 shadow-inner group">
                  <img
                    src={selectedCharger.image}
                    alt={selectedCharger.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end justify-between p-4 sm:p-5">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#35C759] text-white text-xs font-bold font-mono shadow">
                        {selectedCharger.power}
                      </span>
                      <p className="text-white text-xs sm:text-sm font-semibold mt-1.5 drop-shadow">
                        {selectedCharger.specs.connectors}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-mono font-medium border border-white/10">
                      {selectedCharger.specs.enclosure}
                    </span>
                  </div>
                </div>

                {/* Prominent Overview Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#082B59]/5 border border-[#082B59]/15">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#082B59] uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#35C759]" />
                    <span>Hardware Engineering & Deployment Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedCharger.description}
                  </p>
                </div>

                {/* Key Performance Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-[#F1F5F9] border border-slate-200">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Peak Output</span>
                    <span className="text-base sm:text-lg font-black text-[#082B59] font-heading">{selectedCharger.specs.powerOutput}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F1F5F9] border border-slate-200">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Connectors</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 font-heading">{selectedCharger.specs.connectors}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F1F5F9] border border-slate-200">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Efficiency</span>
                    <span className="text-base sm:text-lg font-black text-[#35C759] font-heading">{selectedCharger.specs.efficiency}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F1F5F9] border border-slate-200">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Charge Speed</span>
                    <span className="text-base sm:text-lg font-black text-[#082B59] font-heading">{selectedCharger.specs.chargeSpeed}</span>
                  </div>
                </div>

                {/* Complete Technical Specifications Grid */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#082B59]" />
                    <span>Complete Technical Specifications</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Output Voltage</span>
                      <span className="font-bold text-slate-900">{selectedCharger.specs.voltageRange}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Max Output Current</span>
                      <span className="font-bold text-slate-900">{selectedCharger.specs.maxCurrent}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Input Power Supply</span>
                      <span className="font-bold text-slate-900">{selectedCharger.specs.inputSupply}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Enclosure Protection</span>
                      <span className="font-bold text-[#35C759]">{selectedCharger.specs.enclosure}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Display & Touch UI</span>
                      <span className="font-bold text-slate-900">{selectedCharger.specs.display}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Payment & Billing</span>
                      <span className="font-bold text-slate-900">{selectedCharger.specs.payment}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Communication Protocol</span>
                      <span className="font-bold text-slate-900">{selectedCharger.specs.protocol}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Commercial Warranty</span>
                      <span className="font-bold text-[#082B59]">{selectedCharger.specs.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Safety Protections & Features */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#35C759]" />
                    <span>Included Safety Systems & Features</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedCharger.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Sites */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-mono font-bold uppercase text-slate-500 block mb-1">Recommended Deployment Sites</span>
                  <p className="text-slate-700 font-semibold">{selectedCharger.idealFor}</p>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCharger(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedCharger(null);
                      navigate('/evcs/products');
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-[#082B59] text-xs font-bold transition cursor-pointer"
                  >
                    View Full Catalog
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCharger(null);
                      navigate('/evcs/contact');
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#082B59] hover:bg-[#062247] text-white text-xs font-bold transition shadow-md shadow-[#082B59]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4 text-[#35C759]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <EVCSFooter />
    </div>
  );
};
