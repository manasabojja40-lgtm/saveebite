import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  MapPin,
  UtensilsCrossed,
  Layers,
  HeartHandshake,
  Truck,
  ShieldCheck,
  Navigation,
  Filter,
  Phone,
  Clock,
  Layers as LayersIcon,
} from 'lucide-react';

interface MapNode {
  id: string;
  name: string;
  type: 'kitchen' | 'fpu' | 'ngo' | 'van';
  x: number; // percentage on map
  y: number; // percentage on map
  address: string;
  availableOrNeeded: string;
  capacity: string;
  contact: string;
  phone: string;
  fssaiVerified: boolean;
}

export const SaveBiteMap: React.FC = () => {
  const { pickupOrders } = useSaveBite();

  const [activeFilters, setActiveFilters] = useState<{
    kitchen: boolean;
    fpu: boolean;
    ngo: boolean;
    van: boolean;
  }>({
    kitchen: true,
    fpu: true,
    ngo: true,
    van: true,
  });

  const nodes: MapNode[] = [
    {
      id: 'k1',
      name: 'Green Campus Central Dining Hall',
      type: 'kitchen',
      x: 32,
      y: 40,
      address: 'Institutional Area, Sector 62, Noida',
      availableOrNeeded: '125 meals surplus (Lunch)',
      capacity: '1,500 daily meals',
      contact: 'Rajesh Kumar (Kitchen Head)',
      phone: '+91 98110 44211',
      fssaiVerified: true,
    },
    {
      id: 'k2',
      name: 'City Hospital Cafeteria',
      type: 'kitchen',
      x: 68,
      y: 35,
      address: 'Medical Enclave, Sector 24, Noida',
      availableOrNeeded: '45 diabetic/low-sodium meals surplus',
      capacity: '800 daily meals',
      contact: 'Dr. Meera Sen',
      phone: '+91 98711 33290',
      fssaiVerified: true,
    },
    {
      id: 'f1',
      name: 'Sunrise Food Processors Ltd',
      type: 'fpu',
      x: 20,
      y: 72,
      address: 'Industrial Area Phase II, Okhla',
      availableOrNeeded: '230 kg near-expiry packaged oats/pulses',
      capacity: '5,000 kg batch output',
      contact: 'Vikram Mehta (Plant Manager)',
      phone: '+91 99100 88231',
      fssaiVerified: true,
    },
    {
      id: 'n1',
      name: 'Hope Food Bank & Community Shelter',
      type: 'ngo',
      x: 48,
      y: 48,
      address: 'Shanti Niketan Community Center, Mayur Vihar',
      availableOrNeeded: 'Needs 250 evening meals',
      capacity: 'Intake: 400 meals/day',
      contact: 'Anita Sharma (Coordinator)',
      phone: '+91 98109 23114',
      fssaiVerified: true,
    },
    {
      id: 'n2',
      name: 'City Relief Foundation',
      type: 'ngo',
      x: 75,
      y: 65,
      address: 'Near Old Bus Terminal, Anand Vihar',
      availableOrNeeded: 'Needs 180 dinner portions',
      capacity: 'Intake: 300 meals/day',
      contact: 'Pooja Verma',
      phone: '+91 98188 77610',
      fssaiVerified: true,
    },
    {
      id: 'v1',
      name: 'EV Van SB-01 (Swift Logistics)',
      type: 'van',
      x: 39,
      y: 44,
      address: 'En route: Sector 62 → Mayur Vihar',
      availableOrNeeded: 'Carrying 90 hot meals @ 68°C',
      capacity: 'Payload: 350 kg insulated',
      contact: 'Ramesh Singh (Driver)',
      phone: '+91 98101 22345',
      fssaiVerified: true,
    },
  ];

  const [selectedNode, setSelectedNode] = useState<MapNode>(nodes[0]);

  const toggleFilter = (type: 'kitchen' | 'fpu' | 'ngo' | 'van') => {
    setActiveFilters({ ...activeFilters, [type]: !activeFilters[type] });
  };

  const visibleNodes = nodes.filter((n) => activeFilters[n.type]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              SaveBite Redistribution Map
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time geospatial network routing surplus donors to community hunger hubs.
          </p>
        </div>

        {/* Live Network Status */}
        <div className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Geographic Redistribution Grid</span>
        </div>
      </div>

      {/* Filter Toggles */}
      <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <Filter className="w-4 h-4 text-sky-600" />
          <span>Layer Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Kitchens */}
          <button
            onClick={() => toggleFilter('kitchen')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilters.kitchen
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Kitchens ({nodes.filter((n) => n.type === 'kitchen').length})
          </button>

          {/* FPUs */}
          <button
            onClick={() => toggleFilter('fpu')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilters.fpu
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Processing Units ({nodes.filter((n) => n.type === 'fpu').length})
          </button>

          {/* NGOs */}
          <button
            onClick={() => toggleFilter('ngo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilters.ngo
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            NGOs & Food Banks ({nodes.filter((n) => n.type === 'ngo').length})
          </button>

          {/* Vans */}
          <button
            onClick={() => toggleFilter('van')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilters.van
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Pickup Vans ({nodes.filter((n) => n.type === 'van').length})
          </button>
        </div>
      </div>

      {/* Map Stage & Selected Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Visual Stage */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-4 shadow-md relative min-h-[460px] overflow-hidden border border-slate-800 select-none">
          {/* Map Grid / Topo Styling */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Waterway / Highway lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-sky-500/20 stroke-2 fill-none">
            {/* Express highway curve */}
            <path d="M 50 120 Q 300 200 650 380" strokeDasharray="6,6" />
            <path d="M 220 50 Q 350 250 520 440" stroke="#0284c7" strokeWidth="3" opacity="0.3" />
            {/* Active transit corridor line */}
            <line x1="32%" y1="40%" x2="48%" y2="48%" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
          </svg>

          {/* Regional Labels */}
          <div className="absolute top-4 left-4 text-[11px] font-bold text-sky-400/80 uppercase tracking-widest">
            SaveBite Live City Grid • Sector 62 / NCR Corridor
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
            Latitude: 28.628° N | Longitude: 77.364° E
          </div>

          {/* Interactive Pins */}
          {visibleNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => setSelectedNode(node)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Ping animation for active vehicles and top donors */}
                {(node.type === 'van' || isSelected) && (
                  <div
                    className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                      node.type === 'kitchen'
                        ? 'bg-sky-400'
                        : node.type === 'ngo'
                        ? 'bg-emerald-400'
                        : node.type === 'van'
                        ? 'bg-amber-400'
                        : 'bg-indigo-400'
                    }`}
                  />
                )}

                <div
                  className={`relative p-2.5 rounded-2xl shadow-lg transition-transform duration-200 group-hover:scale-110 flex items-center justify-center ${
                    isSelected
                      ? 'ring-4 ring-white scale-110'
                      : 'hover:ring-2 hover:ring-sky-200'
                  } ${
                    node.type === 'kitchen'
                      ? 'bg-sky-500 text-white'
                      : node.type === 'ngo'
                      ? 'bg-emerald-500 text-white'
                      : node.type === 'van'
                      ? 'bg-amber-500 text-white'
                      : 'bg-indigo-500 text-white'
                  }`}
                >
                  {node.type === 'kitchen' && <UtensilsCrossed className="w-4 h-4" />}
                  {node.type === 'ngo' && <HeartHandshake className="w-4 h-4" />}
                  {node.type === 'van' && <Truck className="w-4 h-4 animate-bounce" />}
                  {node.type === 'fpu' && <Layers className="w-4 h-4" />}
                </div>

                {/* Floating label pill */}
                <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 bg-slate-950/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow whitespace-nowrap border border-slate-700 pointer-events-none group-hover:bg-sky-950 transition-colors">
                  {node.name.split(' ')[0]} {node.type === 'van' ? 'EV-01' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Node Inspection Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  selectedNode.type === 'kitchen'
                    ? 'bg-sky-100 text-sky-800'
                    : selectedNode.type === 'ngo'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedNode.type === 'van'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {selectedNode.type.toUpperCase()} NODE
              </span>
              {selectedNode.fssaiVerified && (
                <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Facility
                </span>
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {selectedNode.name}
              </h2>
              <div className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{selectedNode.address}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-sky-800 uppercase block">
                  Food Inventory / Demand Need
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {selectedNode.availableOrNeeded}
                </span>
              </div>
              <div className="pt-1 border-t border-sky-100">
                <span className="text-[10px] font-bold text-sky-800 uppercase block">
                  Capacity / Output Scale
                </span>
                <span className="text-slate-700 font-medium">
                  {selectedNode.capacity}
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1.5 pt-1">
              <div className="text-slate-500">Contact Representative:</div>
              <div className="font-bold text-slate-800">{selectedNode.contact}</div>
              <div className="flex items-center gap-1 text-sky-700 font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>{selectedNode.phone}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setSelectedNode(nodes[(nodes.indexOf(selectedNode) + 1) % nodes.length])}
              className="w-full py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              Inspect Next Map Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
