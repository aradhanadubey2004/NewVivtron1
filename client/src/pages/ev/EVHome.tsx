import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVNavbar } from '../../components/ev/EVNavbar';
import { EVFooter } from '../../components/ev/EVFooter';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';
import {
  Zap,
  Gauge,
  BatteryCharging,
  Shield,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Phone,
  Building,
  Award,
  X,
  ArrowUpRight,
  Maximize2,
  ZoomIn
} from 'lucide-react';
import AOS from 'aos';

export const EVHome: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [fullScreenVehicle, setFullScreenVehicle] = useState<any | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);

  const realLeadership = [
    {
      name: 'Suraj Kesarwani',
      role: 'Director Technical',
      image: '/images/evcs/2026/06/Director-Technical.jpg',
      imagePosition: 'center top',
      aos: 'fade-left',
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
      aos: 'fade-right',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  ];

  const realVehicles = [
    {
      id: 'rover',
      name: 'ROVER',
      tagline: 'Ride the Spirit of Bharat',
      category: 'Flagship Electric Scooter',
      image: '/images/Rover.png',
      motor: '1000W, 30H Magnet High Output',
      controller: '12-Tube, 60V/72V Compatible',
      capacity: '175 Kg Loading Capacity',
      speed: '25 Kmph Revel Speed with Reverse Gear',
      rimAndTyre: 'Steel Rim 300-10 (Tyre: 90/100-10 Tubeless)',
      braking: 'Front 180mm Ventilated Disc, Rear Drum',
      suspension: 'Front Hydraulic Telescopic & Rear Spring Pressure',
      desc: 'The flagship Vivtron Rover delivers the pinnacle of Indian electric two-wheeler engineering. Equipped with a high-torque 1000W motor, reverse gear assist, unbreakable PC lights, and advanced hydraulic damping.',
      features: [
        'Multi-Functional Smart LED Digital Speedometer',
        'Dual 60V / 72V controller compatibility',
        '180mm ventilated front alloy disc brake',
        'Convenient reverse gear switch for tight parking',
        'Unbreakable high-impact polycarbonate light housings'
      ]
    },
    {
      id: 'cooper',
      name: 'COOPER',
      tagline: 'Smart & Efficient Urban Mobility',
      category: 'Urban Executive Electric Scooter',
      image: '/images/cooper.jpg.png',
      motor: 'High Torque BLDC Motor',
      controller: 'Smart Vector Sine-Wave 60V/72V',
      capacity: '160 Kg Capacity',
      speed: 'Smooth Multi-Speed Electronic Acceleration',
      rimAndTyre: 'Alloy Wheels with 90/100-10 Puncture-Resistant Tubeless',
      braking: 'Front Disc Brake & Rear Drum with Regenerative Assist',
      suspension: 'Telescopic Front Forks & Heavy-Duty Rear Dampers',
      desc: 'Sleek aerodynamic curves, long-life battery management, and ultra-smooth suspension tailored for everyday city commutes with zero fatigue.',
      features: [
        'Aerodynamic sleek body panels with anti-scratch coat',
        'Spacious under-seat storage with USB mobile charging port',
        'Remote anti-theft security alarm & keyless start',
        'Comfort-contoured dual passenger saddle'
      ]
    },
    {
      id: 'pluto',
      name: 'PLUTO',
      tagline: 'Power & Agility for Fast-Paced Lifestyles',
      category: 'Sport Electric Commuter',
      image: '/images/pluto.jpg.png',
      motor: 'Dynamic Brushless Hub Motor (1000W)',
      controller: 'Dual Voltage Quick-Response Controller',
      capacity: '165 Kg Capacity',
      speed: 'Instant Throttle Response & Sport Modes',
      rimAndTyre: 'Durable 3.00-10 Steel Rims & Anti-Skid Tyres',
      braking: 'High-Performance Front Disc Brake',
      suspension: 'Hydraulic Long-Travel Front Suspension',
      desc: 'Lightweight electric design with instant torque, making every ride smarter, faster, and more economical for college and office commuters.',
      features: [
        'Lightweight high-rigidity tubular steel chassis',
        'Instant torque delivery for quick overtakes in traffic',
        'Digital dashboard with battery state-of-charge indicator',
        'Ultra-low running cost under ₹0.15 per kilometer'
      ]
    },
    {
      id: 'evoque',
      name: 'EVOQUE',
      tagline: 'Luxury, Style & Innovation Redefined',
      category: 'Premium Electric Tourer',
      image: '/images/EVOQUE.jpg.png',
      motor: 'High Efficiency 1000W 30H Heavy Motor',
      controller: 'Advanced Digital Sinusoidal 60V/72V',
      capacity: '180 Kg Capacity',
      speed: 'Dual Riding Modes (Eco / Power)',
      rimAndTyre: 'Diamond-Cut Style Rim with 90/100-10 Tyres',
      braking: 'Front Disc Brake with Heavy Hydraulic Caliper',
      suspension: 'Dual Front Hydraulic & Dual Rear Gas-Charged Dampers',
      desc: 'Step into luxury electric mobility with cutting-edge battery technology, diamond-cut aesthetics, bold projector styling, and supreme road presence.',
      features: [
        'Plush gas-charged rear shockers for rough road damping',
        'Diamond-cut alloy aesthetic styling',
        'Generous 180 kg payload capacity',
        'Integrated mobile phone holder and high-speed USB charger'
      ]
    },
    {
      id: 'coupe',
      name: 'COUPE',
      tagline: 'Performance with Compact Elegance',
      category: 'Compact Electric Scooter',
      image: '/images/Coupe.jpg.png',
      motor: '1000W High Efficiency Hub Motor',
      controller: '60V/72V Multi-Speed Compatible',
      capacity: '160 Kg Capacity',
      speed: 'Comfort Cruise Control Mode',
      rimAndTyre: '300-10 Reinforced Rim & Tubeless Tyre',
      braking: 'Front 180mm Disc Brake, Rear Expanding Drum',
      suspension: 'Telescopic Front Shock Absorbers',
      desc: 'Engineered for riders who desire agility with supreme comfort, low center of gravity, light handling, and impressive daily battery efficiency.',
      features: [
        'Low center of gravity for effortless balance and parking',
        'Rust-treated chassis with 3-year anti-corrosion warranty',
        'Comfortable dual seating with ergonomic pillion back support',
        'Fast battery swap compatible tray design'
      ]
    },
    {
      id: 'martin',
      name: 'MARTIN',
      tagline: 'The Perfect Fusion of Modern Tech & Power',
      category: 'Rugged Urban Scooter',
      image: '/images/Martin.jpg.png',
      motor: 'Heavy-Duty BLDC Motor',
      controller: 'Reinforced 12-Tube Industrial',
      capacity: '170 Kg Capacity',
      speed: '25 Kmph + Reverse Assist Gear',
      rimAndTyre: 'Steel Rim 300-10 Heavy Duty',
      braking: 'Front Disc Brake & Rear Drum Brake',
      suspension: 'Hydraulic Telescopic Front & Spring Pressure Rear',
      desc: 'Timeless style with smooth acceleration, rugged durability on broken Indian roads, and reliable mechanical construction that lasts.',
      features: [
        'Reinforced front suspension handles potholes with ease',
        'Extra-wide floorboard for carrying packages and groceries',
        'Push-button reverse assist for easy parking',
        'Long-lasting LFP battery support with thermal safety'
      ]
    },
    {
      id: 'loadex',
      name: 'LOADEX',
      tagline: 'Heavy-Duty Commercial Load Carrier',
      category: 'Commercial Cargo Carrier',
      image: '/images/Lodex.jpg.png',
      motor: '1200W High-Torque Commercial Motor',
      controller: 'Heavy-Duty Industrial 12-Tube Controller',
      capacity: '250+ Kg Heavy Load Rating',
      speed: 'Low-End Climbing Torque with Governed Speed',
      rimAndTyre: 'Heavy Reinforced Rims with Puncture-Tough Tyres',
      braking: 'Dual Heavy Hydraulic Disc Brakes (Front & Rear)',
      suspension: 'Triple Spring Reinforced Heavy-Duty Rear Suspension',
      desc: 'Built to carry more, climb steeper flyovers, and last longer. The premier choice for delivery fleets, e-commerce couriers, and commercial cargo.',
      features: [
        'Massive 250+ Kg payload rating with reinforced rear subframe',
        'Triple-spring heavy-duty suspension eliminates frame bottoming',
        'Universal rear rack fits delivery boxes, crates, or milk cans',
        'Cuts last-mile delivery operating costs by over 80%'
      ]
    },
    {
      id: 'nexo',
      name: 'NEXO AUTO',
      tagline: 'Fully Automatic Electric Passenger Auto',
      category: 'Electric Passenger Auto',
      image: '/images/Nexo_Auto-removebg-preview.png',
      motor: 'Heavy-Duty Traction Motor',
      controller: 'Digital Regenerative Braking with Auto Reverse',
      capacity: 'Driver + 4 Passengers (500+ Kg)',
      speed: 'High Efficiency Automatic Drive',
      rimAndTyre: 'Heavy Steel Auto Rims with Commercial Radial Tyres',
      braking: 'Hydraulic Drum Brakes on All Wheels + Handbrake Lock',
      suspension: 'Heavy Leaf Spring Rear + Heavy Front Hydraulic Dampers',
      desc: 'Experience zero-emission passenger mobility with smooth automatic drive, long-range battery, vibration-free cabin, and high daily operator profits.',
      features: [
        'Saves auto drivers ₹400-₹600 daily compared to CNG/Diesel',
        'Spacious ergonomic passenger cabin with plush weather-proof curtains',
        'Regenerative braking energy recovery on descents',
        'Zero clutch fatigue with simple forward/reverse switch'
      ]
    },
  ];

  useEffect(() => {
    AOS.refresh();
    const updateItems = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) setItemsPerView(1);
        else if (window.innerWidth < 1024) setItemsPerView(2);
        else setItemsPerView(3);
      }
    };
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const maxIndex = Math.max(0, realVehicles.length - itemsPerView);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const currentFullScreenIndex = fullScreenVehicle
    ? realVehicles.findIndex((v) => v.id === fullScreenVehicle.id)
    : -1;

  const nextFullScreenVehicle = () => {
    if (currentFullScreenIndex === -1) return;
    const nextIdx = (currentFullScreenIndex + 1) % realVehicles.length;
    setFullScreenVehicle(realVehicles[nextIdx]);
  };

  const prevFullScreenVehicle = () => {
    if (currentFullScreenIndex === -1) return;
    const prevIdx = (currentFullScreenIndex - 1 + realVehicles.length) % realVehicles.length;
    setFullScreenVehicle(realVehicles[prevIdx]);
  };

  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-800 flex flex-col selection:bg-[#4D9900] selection:text-white">
      <EVNavbar />

      <main className="flex-1">
        {/* Full Page Hero Section - Light Theme with 10px side margins & subtle green tint */}
        <section className="px-[10px] pt-3 pb-8 lg:pb-12 bg-white">
          <div className="relative rounded-3xl overflow-hidden min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center bg-[#f4f9f0] border border-[#eaf3e5] shadow-xl">
            {/* Full Banner Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/ev-hero-light.jpg"
                alt="Vivtron Electric Vehicles"
                className="w-full h-full object-cover object-[80%_center] sm:object-right-center lg:object-right transform scale-[1.01] transition-transform duration-1000"
              />
              {/* Soft Light Gradient Overlay for crystal clear typography on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/80 to-transparent"></div>
              {/* Ambient Brand Glow */}
              <div className="absolute top-1/4 left-10 w-[550px] h-[350px] bg-[#4D9900]/10 rounded-full blur-[140px] pointer-events-none"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10 w-full py-12 sm:py-16 lg:py-20">
              {/* Left Column Content over Image */}
              <div className="max-w-2xl text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eaf3e5] border border-[#4D9900]/30 text-[#4D9900] text-xs sm:text-sm font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#4D9900]" />
                  <span className="tracking-wide">Powered By Navodaya Growth Pvt. Ltd.</span>
                </div>

                {/* Hero text: Dark Navy #101828 with Vibrant Green accent #4D9900 */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101828] leading-[1.12] font-heading">
                  Next-Generation Electric Vehicles <span className="text-[#4D9900]">Crafted for India</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Vivtron is leading climate-tech electric vehicle manufacturing in India. Delivering uncompromising power, long-lasting battery range, and exceptional after-sales support.
                </p>

                {/* Rounded Pill Buttons (Left-Aligned) */}
                <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
                  <button
                    onClick={() => navigate('/ev/products')}
                    className="px-8 py-3.5 rounded-full bg-[#4D9900] hover:bg-[#408000] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#4D9900]/25 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Explore 8 Vehicle Models</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/ev/contact')}
                    className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Gauge className="w-4 h-4 text-[#4D9900]" />
                    <span>Book a Test Ride</span>
                  </button>
                </div>

                {/* Quick Trust Badges (Left-Aligned) */}
                <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center gap-3 text-xs text-slate-700 font-medium">
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4D9900]" />
                    <span>100% Indigenous</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
                    <Shield className="w-3.5 h-3.5 text-[#4D9900]" />
                    <span>ARAI Tested</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
                    <Zap className="w-3.5 h-3.5 text-[#4D9900]" />
                    <span>3-Year Battery Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Hero Vehicle Card with Real Rover Photo */}
        <section className="py-14 bg-gradient-to-b from-[#f8fbf6] via-white to-white border-b border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              data-aos="fade-up"
              data-aos-duration="900"
              className="max-w-5xl mx-auto rounded-3xl bg-white border-2 border-[#4D9900]/30 p-8 sm:p-12 shadow-2xl shadow-[#4D9900]/10 relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-md">
                  <div className="inline-block px-3 py-1 rounded-md bg-[#EAF3E5] text-[#4D9900] text-xs font-mono font-bold">
                    FEATURED MODEL: VIVTRON ROVER
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] font-heading">ROVER</h2>
                  <p className="text-[#4D9900] text-xs font-bold uppercase tracking-wider">Ride the Spirit of Bharat</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Powered by a robust 1000W 30H magnet motor and 12-tube 60V/72V dual-compatible controller. Built with front hydraulic telescopic shockers, 180mm front disc brake, reverse gear, and unbreakable PC lights.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs">
                    <div>
                      <div className="text-xl font-extrabold text-[#4D9900] font-heading">1000W</div>
                      <div className="text-[11px] text-slate-500 font-medium">Motor Power</div>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-[#101828] font-heading">175 Kg</div>
                      <div className="text-[11px] text-slate-500 font-medium">Loading Capacity</div>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-[#4D9900] font-heading">60V/72V</div>
                      <div className="text-[11px] text-slate-500 font-medium">Dual Controller</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedVehicle(realVehicles[0])}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9900] hover:text-[#438300] transition cursor-pointer"
                    >
                      <span>View Full Rover Specifications</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Real Vehicle Image Display */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="w-full p-6 rounded-2xl bg-slate-50 border border-slate-200 relative flex items-center justify-center shadow-inner">
                    <img
                      src="/images/Rover.png"
                      alt="Vivtron Rover"
                      className="max-h-72 w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(77,153,0,0.25)] hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-white border border-[#4D9900]/40 text-[10px] text-[#4D9900] font-bold shadow-sm">
                      100% ELECTRIC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Engineered Component Highlights */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EAF3E5] text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">Engineered Excellence</span>
              <h3 className="text-3xl font-extrabold text-[#101828] mt-2 font-heading">Precision Component Details</h3>
              <p className="text-xs text-slate-600 mt-2">Every component is engineered for extreme durability on Indian terrains.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
                className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200/90 relative flex items-center justify-center shadow-xs">
                    <img
                      src="/images/ro.1.jpg"
                      alt="Multi-Functional Digital Meter"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      DIGITAL CLUSTER
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-[#101828] group-hover:text-[#4D9900] transition-colors">
                    Multi-Functional Digital Meter
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Smart LED speedometer, trip meter, and battery state-of-charge indicator.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200/90 relative flex items-center justify-center shadow-xs">
                    <img
                      src="/images/ro2.jpg"
                      alt="Alloy Front Disc Brake"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      VENTILATED DISC
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-[#101828] group-hover:text-[#4D9900] transition-colors">
                    Alloy Front Disc Brake
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    180mm ventilated disc brake with hydraulic caliper for instant stopping power.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
                className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200/90 relative flex items-center justify-center shadow-xs">
                    <img
                      src="/images/ro4.jpg"
                      alt="Sporty LED Head Light"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      HIGH INTENSITY
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-[#101828] group-hover:text-[#4D9900] transition-colors">
                    Sporty LED Head Light
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Integrated daytime running lights (DRL) with high-intensity night beam.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
                className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200/90 relative flex items-center justify-center shadow-xs">
                    <img
                      src="/images/ro5.jpg"
                      alt="Color-Matched Styling"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      AERODYNAMIC
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-[#101828] group-hover:text-[#4D9900] transition-colors">
                    Color-Matched Styling
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Aerodynamic body styling and durable weather-sealed battery enclosure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Vehicle Lineup Showcase (3 Columns Carousel with Clean Images & Full Screen Preview) */}
        <section className="py-20 bg-gradient-to-b from-[#eaf3e5]/40 via-white to-[#eaf3e5]/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
            {/* Section Header with Carousel Navigation Buttons */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">Models & Engineering</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#101828] mt-1 font-heading">
                  The Complete Vivtron EV Lineup
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Explore India's cleanest, high-performance electric two-wheelers and commercial carriers.
                </p>
              </div>

              {/* Header Carousel Buttons & Catalog Link */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2.5 rounded-full bg-white border border-slate-200 text-[#101828] hover:text-[#4D9900] hover:border-[#4D9900] shadow-sm hover:shadow transition-all cursor-pointer"
                    aria-label="Previous Vehicles"
                    title="Previous Vehicles"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2.5 rounded-full bg-white border border-slate-200 text-[#101828] hover:text-[#4D9900] hover:border-[#4D9900] shadow-sm hover:shadow transition-all cursor-pointer"
                    aria-label="Next Vehicles"
                    title="Next Vehicles"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => navigate('/ev/products')}
                  className="text-[#4D9900] hover:text-[#408000] text-sm font-bold flex items-center gap-1.5 ml-2 transition"
                >
                  <span>Compare All Models</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Container (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
            <div className="relative" data-aos="fade-up" data-aos-duration="900">
              {/* Floating Side Arrow Buttons - Positioned outside the cards' borders */}
              <button
                onClick={prevSlide}
                className="hidden lg:flex absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200/90 text-[#101828] hover:text-[#4D9900] hover:border-[#4D9900] shadow-xl items-center justify-center transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="hidden lg:flex absolute -right-14 xl:-right-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200/90 text-[#101828] hover:text-[#4D9900] hover:border-[#4D9900] shadow-xl items-center justify-center transition-all hover:scale-110 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Sliding Track */}
              <div className="overflow-hidden py-4 -mx-3">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)`
                  }}
                >
                  {realVehicles.map((v) => (
                    <div
                      key={v.id}
                      className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3 flex"
                    >
                      <div className="w-full rounded-3xl bg-white border border-[#eaf3e5] hover:border-[#4D9900] p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-2xl hover:shadow-[#4D9900]/15 hover:-translate-y-1.5">
                        <div>
                          {/* Clean Vehicle Photo Container - Crisp White Studio Look */}
                          <div
                            onClick={() => setFullScreenVehicle(v)}
                            className="h-52 w-full rounded-2xl bg-gradient-to-b from-white via-slate-50/70 to-white p-4 mb-5 flex items-center justify-center border border-slate-200/80 relative overflow-hidden group/img cursor-pointer hover:border-[#4D9900]/50 transition-all shadow-inner"
                            title={`Click to view full image of ${v.name}`}
                          >
                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#eaf3e5] border border-[#4D9900]/25 text-[#4D9900] text-[10px] font-bold font-mono tracking-wide">
                              100% ELECTRIC
                            </div>

                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                              <span className="opacity-0 group-hover/img:opacity-100 transition-opacity text-[10px] font-bold text-slate-600 bg-white/95 px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
                                Full Image
                              </span>
                              <div className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 group-hover/img:text-[#4D9900] group-hover/img:border-[#4D9900] transition-colors shadow-xs">
                                <ZoomIn className="w-3.5 h-3.5" />
                              </div>
                            </div>

                            {/* Crisp Clean Vehicle Image */}
                            <img
                              src={v.image}
                              alt={v.name}
                              className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover/img:scale-108 filter drop-shadow-md"
                            />

                            {/* Motor Badge */}
                            <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-slate-900/5 border border-slate-200 text-[10px] font-mono font-medium text-slate-600">
                              {v.motor.split(',')[0]}
                            </div>
                          </div>

                          {/* EV Name & Tagline */}
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-2xl font-black text-[#101828] font-heading tracking-tight group-hover:text-[#4D9900] transition-colors">
                                {v.name}
                              </h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D9900] bg-[#eaf3e5] px-2 py-0.5 rounded font-mono">
                                {v.category.split(' ')[0]}
                              </span>
                            </div>
                            <p className="text-xs text-[#4D9900] font-bold tracking-wide">{v.tagline}</p>
                          </div>

                          {/* Quick Highlight Feature Badges */}
                          <div className="flex flex-wrap gap-1.5 mb-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                              {v.motor.split(',')[0]}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#eaf3e5] text-[#4D9900] text-[10px] font-mono font-semibold">
                              {v.capacity.split(' ')[0]} {v.capacity.split(' ')[1]} Load
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                              Reverse Assist
                            </span>
                          </div>

                          {/* Collapsible Section: Opens on Button Click */}
                          {expandedVehicleId === v.id && (
                            <div className="mb-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                              <p className="text-xs text-slate-600 leading-relaxed bg-[#f8fbf6] p-3 rounded-xl border border-[#eaf3e5]">
                                {v.desc}
                              </p>

                              <div className="p-3 rounded-xl bg-[#eaf3e5]/60 border border-[#4D9900]/25 space-y-2 text-[11px]">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600 font-medium">Loading Capacity:</span>
                                  <span className="font-bold text-[#101828]">{v.capacity}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600 font-medium">Max Speed / Modes:</span>
                                  <span className="font-semibold text-slate-800">{v.speed}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Inline Toggle Button to Open/Close Specs on Card */}
                          <button
                            onClick={() => setExpandedVehicleId(expandedVehicleId === v.id ? null : v.id)}
                            className="w-full mb-3 py-2 px-3 rounded-xl border border-slate-200 hover:border-[#4D9900]/50 hover:bg-[#eaf3e5]/40 text-slate-700 hover:text-[#4D9900] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <span>{expandedVehicleId === v.id ? 'Hide Description & Specs' : 'View Description & Specs'}</span>
                            {expandedVehicleId === v.id ? (
                              <ChevronUp className="w-4 h-4 text-[#4D9900]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                        </div>

                        {/* Buttons: Explore Details Modal & Full Image Preview */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => setSelectedVehicle(v)}
                            className="flex-1 py-3 px-4 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-[#4D9900]/25 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group/btn"
                          >
                            <span>Explore {v.name}</span>
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>

                          <button
                            onClick={() => setFullScreenVehicle(v)}
                            title={`View full image of ${v.name}`}
                            className="p-3 rounded-xl bg-[#eaf3e5] hover:bg-[#dfeada] text-[#101828] hover:text-[#4D9900] transition cursor-pointer"
                            aria-label={`View full image of ${v.name}`}
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      carouselIndex === idx
                        ? 'w-8 h-2.5 bg-[#4D9900]'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* FULL PAGE IMAGE LIGHTBOX MODAL */}
            {fullScreenVehicle && (
              <div className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-200">
                {/* Full Screen Top Bar */}
                <div className="flex items-center justify-between w-full max-w-6xl mx-auto pb-4 border-b border-white/10 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4F9A00] flex items-center justify-center font-black text-white shadow-lg text-lg">
                      V
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                          VIVTRON {fullScreenVehicle.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4F9A00]/20 text-[#4F9A00] border border-[#4F9A00]/40 text-[11px] font-mono font-bold">
                          {fullScreenVehicle.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        {fullScreenVehicle.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const v = fullScreenVehicle;
                        setFullScreenVehicle(null);
                        setSelectedVehicle(v);
                      }}
                      className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/15 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#4F9A00]" />
                      <span>View Specifications</span>
                    </button>

                    <button
                      onClick={() => setFullScreenVehicle(null)}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                      aria-label="Close Fullscreen"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Middle Stage: Clean Studio Vehicle Showcase with Prev/Next Controls */}
                <div className="relative w-full max-w-5xl mx-auto my-auto py-6 sm:py-8 flex items-center justify-center">
                  <button
                    onClick={prevFullScreenVehicle}
                    className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-white/15 hover:bg-[#4F9A00] text-white backdrop-blur-md transition-all shadow-xl hover:scale-110 cursor-pointer"
                    aria-label="Previous Vehicle"
                    title="Previous Vehicle"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextFullScreenVehicle}
                    className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-white/15 hover:bg-[#4F9A00] text-white backdrop-blur-md transition-all shadow-xl hover:scale-110 cursor-pointer"
                    aria-label="Next Vehicle"
                    title="Next Vehicle"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Clean Stage Container */}
                  <div className="w-full rounded-3xl bg-gradient-to-b from-white via-slate-50 to-white p-6 sm:p-12 border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/5 text-slate-600 text-xs font-mono font-bold">
                      CLEAN STUDIO PROFILE
                    </div>

                    <img
                      src={fullScreenVehicle.image}
                      alt={fullScreenVehicle.name}
                      className="max-h-[50vh] sm:max-h-[55vh] max-w-full object-contain filter drop-shadow-2xl transition-all duration-300 hover:scale-105"
                    />

                    <div className="mt-4 pt-3 border-t border-slate-200/80 w-full flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
                      <span>MODEL: <strong className="text-slate-800">{fullScreenVehicle.name}</strong></span>
                      <span className="text-[#4F9A00] font-bold">{fullScreenVehicle.motor}</span>
                      <span>PAYLOAD: <strong className="text-slate-800">{fullScreenVehicle.capacity}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Full Screen Bottom Actions Bar */}
                <div className="w-full max-w-6xl mx-auto pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-white">
                  <div className="text-xs text-slate-400 font-mono">
                    Model {currentFullScreenIndex + 1} of {realVehicles.length} — Use arrows to navigate models
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFullScreenVehicle(null)}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition cursor-pointer"
                    >
                      Close Preview
                    </button>
                    <button
                      onClick={() => {
                        const v = fullScreenVehicle;
                        setFullScreenVehicle(null);
                        setSelectedVehicle(v);
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#4F9A00] hover:bg-[#438300] text-white text-xs sm:text-sm font-bold transition shadow-lg shadow-[#4F9A00]/30 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Explore Specifications</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive EV Model Specification & Details Modal */}
            {selectedVehicle && (
              <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#4F9A00]/15 flex items-center justify-center text-[#4F9A00] shadow-xs">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-black text-slate-900 font-heading">
                            VIVTRON {selectedVehicle.name}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#4F9A00]/10 text-[#4F9A00] text-[11px] font-mono font-bold">
                            {selectedVehicle.category}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#4F9A00] tracking-wide mt-0.5">
                          {selectedVehicle.tagline}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedVehicle(null)}
                      className="p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body (Scrollable) */}
                  <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                    {/* Big Clean Showcase Image */}
                    <div
                      onClick={() => {
                        const v = selectedVehicle;
                        setSelectedVehicle(null);
                        setFullScreenVehicle(v);
                      }}
                      className="w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-slate-50 via-slate-50/40 to-white border border-slate-200/80 p-6 flex items-center justify-center relative overflow-hidden shadow-xs cursor-pointer group/modalimg"
                      title="Click to view full screen"
                    >
                      <img
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        className="max-h-56 sm:max-h-64 w-auto object-contain filter drop-shadow-lg group-hover/modalimg:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-xs text-slate-600 font-medium flex items-center gap-1.5 shadow-xs">
                        <Maximize2 className="w-3.5 h-3.5 text-[#4F9A00]" />
                        <span>View Full Screen</span>
                      </div>
                    </div>

                    {/* Prominent Overview & Description */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#eaf3e5]/80 via-[#eaf3e5]/50 to-white border border-[#4D9900]/25 shadow-xs">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4D9900] uppercase tracking-wider mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Flagship Engineering Overview</span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                        {selectedVehicle.desc}
                      </p>
                    </div>

                    {/* Primary Highlight Specs: Loading Capacity & Max Speed / Modes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#4D9900]/30 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#eaf3e5] text-[#4D9900] flex items-center justify-center shrink-0 shadow-xs">
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            Loading Capacity
                          </span>
                          <span className="text-base sm:text-lg font-black text-slate-900 font-heading">
                            {selectedVehicle.capacity}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#4D9900]/30 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#eaf3e5] text-[#4D9900] flex items-center justify-center shrink-0 shadow-xs">
                          <Gauge className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            Max Speed / Modes
                          </span>
                          <span className="text-base sm:text-lg font-black text-slate-900 font-heading">
                            {selectedVehicle.speed}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Technical Specifications Grid */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] text-slate-500 font-medium block">Motor & Power</span>
                          <span className="text-sm font-bold text-slate-900">{selectedVehicle.motor}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] text-slate-500 font-medium block">Smart Controller</span>
                          <span className="text-sm font-bold text-slate-900">{selectedVehicle.controller}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] text-slate-500 font-medium block">Braking System</span>
                          <span className="text-sm font-bold text-slate-900">{selectedVehicle.braking}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] text-slate-500 font-medium block">Suspension & Shockers</span>
                          <span className="text-sm font-bold text-slate-900">{selectedVehicle.suspension}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                          <span className="text-[11px] text-slate-500 font-medium block">Rim & Tyre</span>
                          <span className="text-sm font-bold text-slate-900">{selectedVehicle.rimAndTyre}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                        Key Engineering Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedVehicle.features?.map((f: string, i: number) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                            <CheckCircle2 className="w-4 h-4 text-[#4F9A00] shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        setSelectedVehicle(null);
                        navigate('/ev/products');
                      }}
                      className="text-xs sm:text-sm font-bold text-[#4F9A00] hover:text-[#438300] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Compare All 8 Models in Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedVehicle(null)}
                        className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold transition cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVehicle(null);
                          navigate('/ev/contact');
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#4F9A00] hover:bg-[#438300] text-white text-xs sm:text-sm font-bold transition shadow-md shadow-[#4F9A00]/25 flex items-center gap-2 cursor-pointer"
                      >
                        <Gauge className="w-4 h-4" />
                        <span>Book a Test Ride</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Company Welcome Section with Real Photo */}
        <section className="py-20 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#4F9A00] text-xs font-bold uppercase tracking-wider font-mono">Welcome to Vivtron</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
                  Ride the Spirit of Bharat
                </h3>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Vivtron is committed to driving a cleaner and greener future through innovative solutions in electric mobility and renewable energy by developing sustainable transportation and harnessing clean power sources.
                </p>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Vivtron is the climate-tech electric vehicle manufacturing company with an innovative and sustainable approach. Our focus is on addressing EV industry challenges to provide exceptional quality and unmatched after-sales service.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center" data-aos="fade-up" data-aos-duration="800">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-2xl font-extrabold text-[#4F9A00] font-heading">
                      <AnimatedCounter end={2016} start={1990} duration={1600} />
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">Incorporation Year</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-2xl font-extrabold text-slate-900 font-heading">
                      <AnimatedCounter end={100} suffix="%" duration={1800} />
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">Indigenous Tech</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-2xl font-extrabold text-[#4F9A00] font-heading">Noida</div>
                    <div className="text-[11px] text-slate-600 font-medium">Headquarters</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => navigate('/ev/about')}
                    className="px-8 py-3.5 rounded-full bg-[#4F9A00] hover:bg-[#438300] text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-[#4F9A00]/20"
                  >
                    Learn About Our Mission
                  </button>
                  <a
                    href="tel:0120-4144584"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#4F9A00]"
                  >
                    <Phone className="w-4 h-4 text-[#4F9A00]" />
                    <span>0120-4144584</span>
                  </a>
                </div>
              </div>

              {/* Real Home Image */}
              <div
                data-aos="fade-left"
                data-aos-duration="900"
                className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative bg-slate-50"
              >
                <img
                  src="/images/homeimg.jpg"
                  alt="Vivtron Technology"
                  className="w-full h-auto object-cover hover:scale-102 transition duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Leadership Section */}
        <section className="py-20 bg-white border-t border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                <span className="text-[#101828]">Company </span>
                <span className="text-[#4D9900]">Leadership</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {realLeadership.map((leader, idx) => (
                <div
                  key={idx}
                  data-aos={leader.aos}
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic"
                  className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 text-center flex flex-col items-center shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-[#4D9900]/10 hover:-translate-y-1 transition-all duration-300"
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
                    <h3 className="text-base sm:text-lg font-extrabold text-[#101828] tracking-tight font-heading leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#4D9900] mt-0.5">
                      {leader.role}
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center justify-center gap-2.5 mt-5 mb-2">
                    <a
                      href={leader.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="Facebook"
                    >
                      f
                    </a>
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="X / Twitter"
                    >
                      𝕏
                    </a>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="LinkedIn"
                    >
                      in
                    </a>
                    <a
                      href={leader.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white flex items-center justify-center transition shadow-xs"
                      title="Instagram"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Real Showroom & Gallery Highlights */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#4F9A00] text-xs font-bold uppercase tracking-wider">Experience Vivtron</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">Our Showrooms & Dealership Network</h3>
              <p className="text-xs text-slate-600 mt-2">Visit one of our verified dealerships across India to experience Vivtron in person.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="100"
                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group bg-white"
              >
                <img src="/images/shoor1.JPG" alt="Vivtron Showroom 1" className="h-44 w-full object-cover group-hover:scale-105 transition" />
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="200"
                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group bg-white"
              >
                <img src="/images/sho1.jpg" alt="Vivtron Showroom 2" className="h-44 w-full object-cover group-hover:scale-105 transition" />
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="300"
                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group bg-white"
              >
                <img src="/images/shoor2.JPG" alt="Vivtron Showroom 3" className="h-44 w-full object-cover group-hover:scale-105 transition" />
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="400"
                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group bg-white"
              >
                <img src="/images/sho2.jpeg" alt="Vivtron Showroom 4" className="h-44 w-full object-cover group-hover:scale-105 transition" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <EVFooter />
    </div>
  );
};
