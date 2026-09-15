import React from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Layers,
  HeartHandshake,
  Truck,
  IndianRupee,
  Sparkles,
  TrendingDown,
  Award,
  ArrowRight,
  LineChart,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { adminEcosystemKpis, setActiveTab } = useSaveBite();

  const performers = [
    { rank: 1, name: 'Green Campus Central Dining', type: 'University Mess', reductionPct: 34.2, savedMeals: 3450 },
    { rank: 2, name: 'City Hospital Cafeteria', type: 'Hospitality & Health', reductionPct: 28.5, savedMeals: 2180 },
    { rank: 3, name: 'Central Hostel Complex B', type: 'Student Dining', reductionPct: 24.1, savedMeals: 1890 },
    { rank: 4, name: 'Apex Tech Corporate Dining', type: 'Corporate Cafeteria', reductionPct: 21.0, savedMeals: 1420 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              SaveBite Ecosystem Administration & Governance
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Macro-level food security monitoring, circular economy tracking, and ESG compliance audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('impact');
            }}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <LineChart className="w-3.5 h-3.5" />
            View Full ESG Impact
          </button>
        </div>
      </div>

      {/* 8 Macro KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Food Saved</div>
          <div className="text-2xl sm:text-3xl font-black text-sky-600 mt-1">
            {adminEcosystemKpis.totalFoodSavedMeals.toLocaleString()}{' '}
            <span className="text-xs font-medium text-slate-500">meals</span>
          </div>
          <div className="text-[11px] text-sky-700 font-semibold mt-1">+1,240 this month</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Food Redistributed</div>
          <div className="text-2xl sm:text-3xl font-black text-teal-600 mt-1">
            {adminEcosystemKpis.totalFoodRedistributedMeals.toLocaleString()}{' '}
            <span className="text-xs font-medium text-slate-500">meals</span>
          </div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">71.6% transfer rate</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Waste Reduced</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            {adminEcosystemKpis.totalWasteReducedKg.toLocaleString()}{' '}
            <span className="text-xs font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">-28.4% average delta</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Financial Savings</div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1">
            ₹{(adminEcosystemKpis.totalMoneySavedRupees / 100000).toFixed(2)}{' '}
            <span className="text-xs font-medium text-slate-500">Lakh</span>
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Operational ROI</div>
        </div>
      </div>

      {/* Network Partner Nodes Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-sky-950">{adminEcosystemKpis.activeKitchens}</div>
            <div className="text-xs font-bold text-sky-800">Active Kitchens</div>
          </div>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-950">{adminEcosystemKpis.activeProcessingUnits}</div>
            <div className="text-xs font-bold text-indigo-800">Processing Units</div>
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-950">{adminEcosystemKpis.activeNgos}</div>
            <div className="text-xs font-bold text-emerald-800">NGOs & Food Banks</div>
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-950">{adminEcosystemKpis.activePickups}</div>
            <div className="text-xs font-bold text-amber-800">EV Logistics Fleet</div>
          </div>
        </div>
      </div>

      {/* Top Performers Leaderboard */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Top Waste Reduction Performers</h2>
              <p className="text-xs text-slate-500">Benchmark institutions leading circular food operations</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Zero-Waste Champions
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {performers.map((p) => (
            <div key={p.rank} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    p.rank === 1
                      ? 'bg-amber-100 text-amber-800'
                      : p.rank === 2
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  #{p.rank}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-800">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.type} • {p.savedMeals.toLocaleString()} meals diverted</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-emerald-600 flex items-center gap-1 justify-end">
                  <TrendingDown className="w-4 h-4" />
                  -{p.reductionPct}%
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">Overproduction drop</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
