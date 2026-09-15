import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  Sparkles,
  Droplets,
  CloudRain,
  IndianRupee,
  Leaf,
  Heart,
  Globe,
  Share2,
  TrendingUp,
  Download,
} from 'lucide-react';

export const ImpactDashboard: React.FC = () => {
  const { adminEcosystemKpis } = useSaveBite();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  // Monthly progress chart
  const monthlyProgress = [
    { month: 'Apr', saved: 4200, co2: 2600 },
    { month: 'May', saved: 6100, co2: 3800 },
    { month: 'Jun', saved: 7800, co2: 4900 },
    { month: 'Jul', saved: 9400, co2: 5900 },
    { month: 'Aug', saved: 11100, co2: 7000 },
    { month: 'Sep (Now)', saved: 12450, co2: 7850 },
  ];

  const maxVal = 14000;
  const chartHeight = 140;

  return (
    <div className="space-y-6">
      {/* Top Banner with Quote */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 rounded-2xl p-8 text-white shadow-lg shadow-teal-500/15 relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            Environmental, Social & Governance (ESG) Audit
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            “Together, SaveBite helped prevent food from becoming waste.”
          </h1>
          <p className="text-sm sm:text-base text-teal-100 font-medium">
            Transforming institutional overproduction into certified human nutrition and planetary regeneration.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 5 Big Impact Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Meals Saved */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meals Saved</div>
          <div className="text-3xl font-black text-sky-600 mt-1">
            {adminEcosystemKpis.totalFoodSavedMeals.toLocaleString()}
          </div>
          <div className="text-[11px] text-sky-700 font-semibold mt-1">
            Diverted from landfills
          </div>
        </div>

        {/* Waste Reduced */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Food Waste Reduced</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            {adminEcosystemKpis.totalWasteReducedKg.toLocaleString()}{' '}
            <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Source reduction
          </div>
        </div>

        {/* Meals Redistributed */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meals Redistributed</div>
          <div className="text-3xl font-black text-teal-600 mt-1">
            {adminEcosystemKpis.totalFoodRedistributedMeals.toLocaleString()}
          </div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">
            Delivered to community
          </div>
        </div>

        {/* CO2 Emissions Prevented */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">CO₂e Prevented</div>
          <div className="text-3xl font-black text-indigo-600 mt-1">
            {adminEcosystemKpis.co2AvoidedKg.toLocaleString()}{' '}
            <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-1">
            Methane decomposition avoided
          </div>
        </div>

        {/* Water Conserved */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Water Conserved</div>
          <div className="text-3xl font-black text-blue-600 mt-1">
            1.9M <span className="text-sm font-medium text-slate-500">Liters</span>
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">
            Agricultural water embedded
          </div>
        </div>
      </div>

      {/* UN Sustainable Development Goals (SDG) Badges */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              United Nations Sustainable Development Goals (SDGs)
            </h2>
            <p className="text-xs text-slate-500">SaveBite directly accelerates 3 primary global sustainability mandates</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-sky-50 text-sky-800 rounded-lg">
            UN Agenda 2030 Aligned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SDG 2 */}
          <div className="p-4 rounded-2xl bg-amber-500 text-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest bg-white/20 px-2 py-0.5 rounded">
                SDG 2
              </span>
              <Heart className="w-5 h-5 text-white/80" />
            </div>
            <div className="text-lg font-black leading-snug">Zero Hunger</div>
            <p className="text-xs text-amber-100 leading-relaxed">
              Target 2.1: Ensuring universal access to safe, nutritious, and sufficient food year-round by redirecting institutional surplus.
            </p>
          </div>

          {/* SDG 12 */}
          <div className="p-4 rounded-2xl bg-orange-500 text-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest bg-white/20 px-2 py-0.5 rounded">
                SDG 12
              </span>
              <Leaf className="w-5 h-5 text-white/80" />
            </div>
            <div className="text-lg font-black leading-snug">Responsible Consumption & Production</div>
            <p className="text-xs text-orange-100 leading-relaxed">
              Target 12.3: Halving per capita global food waste at the retail and consumer levels and reducing food losses along supply chains.
            </p>
          </div>

          {/* SDG 13 */}
          <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest bg-white/20 px-2 py-0.5 rounded">
                SDG 13
              </span>
              <Globe className="w-5 h-5 text-white/80" />
            </div>
            <div className="text-lg font-black leading-snug">Climate Action</div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Preventing organic food degradation in anaerobic landfills, averting potent greenhouse methane emissions at scale.
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Progress Chart */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Cumulative Meals Saved (6-Month Growth)</h3>
            <p className="text-xs text-slate-500">Tracked trajectory across institutional network partners</p>
          </div>
          <div className="flex items-center gap-2">
            {downloadSuccess && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                ESG Audit Report Exported (PDF)
              </span>
            )}
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download ESG Report (PDF)
            </button>
          </div>
        </div>

        <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-slate-200">
          {monthlyProgress.map((pt, idx) => {
            const barHeight = (pt.saved / maxVal) * chartHeight;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                  {pt.month}: {pt.saved.toLocaleString()} meals | {pt.co2} kg CO2
                </div>
                <div
                  style={{ height: `${barHeight}px` }}
                  className="w-full max-w-[48px] bg-gradient-to-t from-sky-600 to-teal-500 rounded-t-lg transition-all group-hover:from-sky-700 group-hover:to-teal-600 shadow-xs"
                />
                <span className="text-xs font-bold text-slate-600">{pt.month}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Starting Baseline: <strong>4,200 meals (Apr)</strong></span>
          <span className="text-emerald-600 font-bold">Compound Growth: +196%</span>
        </div>
      </div>
    </div>
  );
};
