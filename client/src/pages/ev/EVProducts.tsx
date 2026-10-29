import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVNavbar } from '../../components/ev/EVNavbar';
import { EVFooter } from '../../components/ev/EVFooter';
import { Zap, Gauge, BatteryCharging, Shield, Check, ArrowRight, Layers, Sliders } from 'lucide-react';
import AOS from 'aos';

interface RealVehicle {
  id: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  motorPower: string;
  controller: string;
  loadingCapacity: string;
  speed: string;
  rimAndTyre: string;
  braking: string;
  suspension: string;
  lights: string;
  description: string;
  features: string[];
}

const REAL_VEHICLES: RealVehicle[] = [
  {
    id: 'rover',
    name: 'ROVER',
    tagline: 'Ride the Spirit of Bharat',
    category: 'Flagship Electric Scooter',
    image: '/images/Rover.png',
    motorPower: '1000 Watts, 30H Magnet',
    controller: '12Tube, 60V/72V Both Compatible',
    loadingCapacity: '175 Kg',
    speed: '25 Kmph, Revel Speed Change with Reverse Gear',
    rimAndTyre: 'Stylish Steel Rim 300-10 (Tyre: 90/100-10, 3.00-10 Tubeless)',
    braking: 'Front Disk Brake 180mm, Rear Drum',
    suspension: 'Front Hydraulic Telescopic Shocker, Rear Hydraulic Shocker & Spring Pressure',
    lights: 'LED Headlights, Smart Digital Speedometer (LED), DRL Light Features, Unbreakable PC Lights',
    description: 'The flagship Vivtron Rover delivers the pinnacle of Indian electric two-wheeler engineering. Equipped with a high-torque 1000W motor, reverse gear assist, and advanced hydraulic damping for supreme stability.',
    features: [
      'Multi-Functional Smart LED Digital Meter',
      'Dual 60V / 72V controller compatibility for flexible battery packs',
      '180mm ventilated front alloy disc brake for confident stopping',
      'Unbreakable high-impact polycarbonate light housings',
      'Convenient reverse gear switch for effortless parking'
    ]
  },
  {
    id: 'cooper',
    name: 'COOPER',
    tagline: 'Smart, Elegant & Effortless City Commuting',
    category: 'Urban Executive Electric Scooter',
    image: '/images/cooper.jpg.png',
    motorPower: '1000 Watts High Efficiency BLDC',
    controller: 'Sine-Wave Intelligent Controller 60V/72V',
    loadingCapacity: '165 Kg',
    speed: '25 Kmph Multi-Speed Modes',
    rimAndTyre: 'Alloy Wheels with 90/100-10 Puncture-Resistant Tubeless',
    braking: 'Front Disc Brake & Rear Drum with Regenerative Assist',
    suspension: 'Telescopic Front Forks & Heavy-Duty Rear Dampers',
    lights: 'High-Lumen Projector LED with Signature DRL Ring',
    description: 'Designed for the modern commuter who values grace, whisper-quiet efficiency, and ergonomic riding posture. The Cooper offers agile handling through bustling urban lanes.',
    features: [
      'Aerodynamic sleek body panels with scratch-resistant coat',
      'Spacious under-seat storage with dedicated USB phone charging port',
      'Keyless ignition with remote anti-theft security alarm',
      'Comfort-contoured dual passenger saddle'
    ]
  },
  {
    id: 'pluto',
    name: 'PLUTO',
    tagline: 'Instant Power & Agility for Fast-Paced Lifestyles',
    category: 'Sport Electric Commuter',
    image: '/images/pluto.jpg.png',
    motorPower: '1000 Watts High Torque Motor',
    controller: 'Quick-Response 12-Tube Controller',
    loadingCapacity: '160 Kg',
    speed: '25 Kmph Revel Speed with Sport Throttle',
    rimAndTyre: 'Durable 3.00-10 Steel Rims & Anti-Skid Tyres',
    braking: 'High-Performance Front Disc Brake',
    suspension: 'Hydraulic Long-Travel Front Suspension',
    lights: 'High-Intensity LED Front and Rear Clusters',
    description: 'Agile, spirited, and ultra-responsive. Pluto is built for riders who need lightning-quick throttle response for bustling traffic and everyday college or office commutes.',
    features: [
      'Lightweight high-rigidity tubular steel chassis',
      'Fast acceleration with intelligent power delivery mapping',
      'Digital dashboard with battery level & odometer',
      'Ultra-efficient energy consumption under 1.5 units per full charge'
    ]
  },
  {
    id: 'evoque',
    name: 'EVOQUE',
    tagline: 'Luxury, Style & Innovation Redefined',
    category: 'Premium Electric Tourer',
    image: '/images/EVOQUE.jpg.png',
    motorPower: '1000W 30H Heavy Magnet Motor',
    controller: 'Advanced Digital Sinusoidal 60V/72V',
    loadingCapacity: '180 Kg Maximum Load',
    speed: '25 Kmph Multi-Speed Switch',
    rimAndTyre: 'Diamond-Cut Style Rim with 90/100-10 Tyres',
    braking: 'Front Disk Brake with Heavy Hydraulic Caliper',
    suspension: 'Dual Front Hydraulic & Dual Rear Gas-Charged Dampers',
    lights: 'Unbreakable Polycarbonate LED Light Matrix with DRL',
    description: 'Evoque introduces luxury executive styling to the Indian electric two-wheeler market. With diamond-cut rim aesthetics, plush padded seats, and advanced digital control.',
    features: [
      'Dual riding modes (Eco / Power) for maximum range or swift overtakes',
      'Gas-charged rear shockers for ultra-plush ride on rough surfaces',
      'Heavy-duty 180 kg payload capacity',
      'Integrated mobile phone mount and high-speed USB charger'
    ]
  },
  {
    id: 'coupe',
    name: 'COUPE',
    tagline: 'Performance with Compact Elegance',
    category: 'Compact Electric Scooter',
    image: '/images/Coupe.jpg.png',
    motorPower: '1000 Watts Brushless DC Hub Motor',
    controller: '60V/72V Multi-Speed Compatible',
    loadingCapacity: '160 Kg Payload',
    speed: '25 Kmph Revel Speed Control',
    rimAndTyre: '300-10 Reinforced Rim & Tubeless Tyre',
    braking: 'Front 180mm Disc Brake, Rear Expanding Drum',
    suspension: 'Telescopic Front Shock Absorbers',
    lights: 'All-LED Headlamps with Crystal DRL Strips',
    description: 'Compact on the outside, spacious and comfortable on the inside. Coupe delivers smooth maneuverability, light handling, and impressive energy efficiency for everyday rides.',
    features: [
      'Low center of gravity for easy balance and control',
      'Durable rust-treated steel frame with 3-year anti-corrosion coating',
      'Comfortable dual seating with ergonomic pillion grab rail',
      'Fast battery swap compatible tray design'
    ]
  },
  {
    id: 'martin',
    name: 'MARTIN',
    tagline: 'The Perfect Fusion of Modern Tech & Power',
    category: 'Rugged Urban Scooter',
    image: '/images/Martin.jpg.png',
    motorPower: '1000 Watts High Output Motor',
    controller: '12-Tube Reinforced Controller',
    loadingCapacity: '170 Kg Tested Payload',
    speed: '25 Kmph Speed Mode + Reverse Assist',
    rimAndTyre: 'Steel Rim 300-10 Heavy Duty',
    braking: 'Front Disc Brake & Rear Drum Brake',
    suspension: 'Hydraulic Telescopic Front & Spring Pressure Rear',
    lights: 'Sporty LED Front Light with Daylight Running Features',
    description: 'Martin represents rugged resilience. Engineered with heavy-duty components and impact-resistant panels, making it the most reliable companion on city roads.',
    features: [
      'Reinforced front suspension handles potholes with ease',
      'Large footboard floor for carrying bags and luggage comfortably',
      'Smooth reverse assist button for tight parking spots',
      'Bright digital cluster displays battery status and trip meter'
    ]
  },
  {
    id: 'loadex',
    name: 'LOADEX',
    tagline: 'Heavy-Duty Commercial Delivery Load Carrier',
    image: '/images/Lodex.jpg.png',
    category: 'Commercial Cargo Electric Scooter',
    motorPower: '1000W - 1200W High Torque Heavy Motor',
    controller: 'Industrial Grade Heavy 12-Tube Controller',
    loadingCapacity: '250+ Kg Industrial Load Capacity',
    speed: '25 Kmph Governed Safe Commercial Speed',
    rimAndTyre: 'Heavy Reinforced Rims with Puncture-Tough Tyres',
    braking: 'Dual Heavy Hydraulic Disc Brakes (Front & Rear)',
    suspension: 'Triple Spring Reinforced Heavy-Duty Rear Suspension',
    lights: 'High-Visibility LED Light Bar for 24/7 Operations',
    description: 'Built for commercial fleets, e-commerce delivery riders, and logistics operators. Loadex features an elongated heavy-duty rear cargo deck engineered to hold delivery boxes or heavy crates with zero frame flex.',
    features: [
      'Massive 250+ Kg payload capacity with reinforced chassis subframe',
      'Triple-spring heavy-duty suspension eliminates bottoming out under full load',
      'Modular rear rack fits universal delivery boxes, milk crates, or gas cylinders',
      'Cuts last-mile commercial delivery fuel costs by over 80%'
    ]
  },
  {
    id: 'nexo',
    name: 'NEXO AUTO',
    tagline: 'Fully Automatic Electric Passenger Auto-Rickshaw',
    category: 'Commercial Electric Passenger Vehicle',
    image: '/images/Nexo_Auto-removebg-preview.png',
    motorPower: 'Heavy Duty High Traction BLDC Motor',
    controller: 'Smart Regenerative Controller with Auto Reverse',
    loadingCapacity: 'Driver + 4 Passengers (500+ Kg)',
    speed: 'High-Efficiency Regulated Passenger Speed',
    rimAndTyre: 'Heavy Steel Auto Rims with Commercial Radial Tyres',
    braking: 'Hydraulic Drum Brakes on All Wheels + Parking Lock',
    suspension: 'Heavy Leaf Spring Rear + Heavy Front Hydraulic Dampers',
    lights: 'Commercial LED High-Intensity Headlamp & Roof Cabin Lights',
    description: 'Transforming urban public transit with zero emissions and zero engine vibration. Nexo Auto provides passengers with comfortable seating and auto drivers with dramatically higher daily earnings.',
    features: [
      'Saves drivers over ₹400-₹600 every single day compared to CNG/Diesel autos',
      'Spacious ergonomic cabin with cushioned seats and weatherproof curtains',
      'Digital battery SOC indicator and regenerative braking energy recovery',
      'Fully automatic pedal drive eliminates driver clutch fatigue'
    ]
  }
];

export const EVProducts: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<RealVehicle>(REAL_VEHICLES[0]);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-800 flex flex-col selection:bg-[#4D9900] selection:text-white">
      <EVNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">
              Ride the Spirit of Bharat • 2026 Fleet
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101828] mt-2 font-heading">
              Vivtron Electric Vehicle Catalog
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Explore our comprehensive range of electric two-wheelers, heavy commercial cargo vehicles, and passenger auto-rickshaws engineered for India.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {REAL_VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border cursor-pointer ${
                  selectedVehicle.id === v.id
                    ? 'bg-[#4D9900] text-white border-[#4D9900] shadow-md shadow-[#4D9900]/25'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#4D9900]/50 hover:bg-[#EAF3E5]'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          {/* Active Model Spotlight */}
          <div
            data-aos="fade-up"
            data-aos-duration="900"
            className="rounded-3xl bg-white border-2 border-[#4D9900]/30 p-6 sm:p-12 shadow-xl mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left Column: Details */}
              <div className="space-y-5">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#EAF3E5] text-[#4D9900] text-xs font-mono font-bold uppercase">
                    {selectedVehicle.category}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101828] mt-2 font-heading">
                    {selectedVehicle.name}
                  </h2>
                  <p className="text-[#4D9900] text-xs sm:text-sm font-bold mt-1">{selectedVehicle.tagline}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedVehicle.description}
                </p>

                {/* Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-[#f4f9f0] border border-[#EAF3E5] text-xs shadow-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Motor Power</span>
                    <p className="font-extrabold text-[#4D9900] text-sm font-heading">{selectedVehicle.motorPower}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Controller</span>
                    <p className="font-bold text-[#101828] text-sm font-heading">{selectedVehicle.controller}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Payload Capacity</span>
                    <p className="font-extrabold text-[#4D9900] text-sm font-heading">{selectedVehicle.loadingCapacity}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Braking System</span>
                    <p className="font-semibold text-slate-800">{selectedVehicle.braking}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Tyres & Rims</span>
                    <p className="font-semibold text-slate-800">{selectedVehicle.rimAndTyre}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-medium">Suspension</span>
                    <p className="font-bold text-[#4D9900]">{selectedVehicle.suspension}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#101828] uppercase tracking-wider">Vehicle Highlights</h4>
                  {selectedVehicle.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/ev/contact')}
                    className="px-8 py-3.5 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#4D9900]/20 transition hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Test Ride for {selectedVehicle.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate('/ev/contact')}
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#EAF3E5] text-[#101828] font-bold text-sm border border-slate-300 shadow-sm transition cursor-pointer"
                  >
                    Apply for Dealership
                  </button>
                </div>
              </div>

              {/* Right Column: Real Vehicle Photo */}
              <div className="p-8 rounded-2xl bg-[#f8fbf6] border border-slate-200 shadow-sm flex flex-col items-center justify-center relative">
                <div className="w-full flex justify-between items-center text-xs text-slate-500 font-mono mb-4">
                  <span className="font-bold text-[#101828]">MODEL: {selectedVehicle.name}</span>
                  <span className="text-[#4D9900] font-bold bg-[#EAF3E5] px-2.5 py-1 rounded-full">BHARAT CERTIFIED</span>
                </div>

                <div className="h-72 w-full flex items-center justify-center py-4 bg-white rounded-xl">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="max-h-64 max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(77,153,0,0.22)] transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="w-full mt-4 pt-4 border-t border-slate-200 text-center">
                  <span className="text-xs font-mono text-[#4D9900] font-bold uppercase">
                    {selectedVehicle.name} • {selectedVehicle.tagline}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Genuine EV Powertrain Kits & Components Section */}
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">Genuine Components</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101828] mt-1 font-heading">
                Vivtron EV Power Components & Kits
              </h3>
              <p className="text-xs text-slate-600 mt-2">
                Certified original equipment manufacturer (OEM) grade chargers, battery management systems, and motors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition text-center"
              >
                <div className="h-44 w-full rounded-xl bg-[#f8fbf6] mb-4 p-3 flex items-center justify-center overflow-hidden border border-slate-100">
                  <img src="/images/bms-600x333.jpg" alt="Smart BMS" className="h-full w-auto object-contain hover:scale-105 transition" />
                </div>
                <h4 className="text-base font-bold text-[#101828] font-heading">Smart Battery Management System (BMS)</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Continuous cell voltage monitoring, thermal protection, short-circuit cutoff, and balanced charge distribution.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition text-center"
              >
                <div className="h-44 w-full rounded-xl bg-[#f8fbf6] mb-4 p-3 flex items-center justify-center overflow-hidden border border-slate-100">
                  <img src="/images/charger1.jpg" alt="Intelligent Charger" className="h-full w-auto object-contain hover:scale-105 transition" />
                </div>
                <h4 className="text-base font-bold text-[#101828] font-heading">Intelligent Smart Fast Charger</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Microcontroller-based auto cut-off charger with surge protection, active cooling fan, and LED status matrix.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition text-center"
              >
                <div className="h-44 w-full rounded-xl bg-[#f8fbf6] mb-4 p-3 flex items-center justify-center overflow-hidden border border-slate-100">
                  <img src="/images/dc-motors.png" alt="Brushless Motor" className="h-full w-auto object-contain hover:scale-105 transition" />
                </div>
                <h4 className="text-base font-bold text-[#101828] font-heading">1000W BLDC Hub & Traction Motors</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Waterproof high-torque permanent magnet brushless motors with 30H copper windings for superior climb torque.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <EVFooter />
    </div>
  );
};
