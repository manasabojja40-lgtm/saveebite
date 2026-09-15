import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  Layers,
  Sparkles,
  AlertTriangle,
  PackageCheck,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const FoodProcessingDashboard: React.FC = () => {
  const { setActiveTab, activeTab } = useSaveBite();

  const [batchActionTaken, setBatchActionTaken] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState<'all' | 'production' | 'inventory'>(
    activeTab === 'fpu_production' ? 'production' : activeTab === 'fpu_inventory' ? 'inventory' : 'all'
  );

  const inventoryItems = [
    {
      id: 'inv-1',
      product: 'Fortified Multi-Grain Flour (5kg bags)',
      batchNumber: 'FPU-2026-B81',
      quantityKg: 120,
      daysToExpiry: 6,
      status: 'Critical Alert',
      potentialBeneficiaries: '350 meals',
    },
    {
      id: 'inv-2',
      product: 'Pasteurized Fruit Puree (Cartons)',
      batchNumber: 'FPU-2026-P14',
      quantityKg: 75,
      daysToExpiry: 9,
      status: 'Warning',
      potentialBeneficiaries: '220 servings',
    },
    {
      id: 'inv-3',
      product: 'Vacuum-Packed Roasted Peanuts',
      batchNumber: 'FPU-2026-N09',
      quantityKg: 35,
      daysToExpiry: 14,
      status: 'Optimal',
      potentialBeneficiaries: '180 servings',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Sunrise Food Processors • Industrial Yield & Batch Control
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Batch output optimization, near-expiry inventory diversion, and bulk institutional redistribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('surplus');
            }}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            Redistribute Bulk Surplus
          </button>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 rounded-2xl p-5 text-white shadow-md shadow-indigo-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-100">
                AI Industrial Yield Insight
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                Batch Tuning
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
              “Product A has generated 15% more surplus this week. Consider reducing the next production batch based on demand trends.”
            </p>
          </div>
        </div>

        <button
          onClick={() => setBatchActionTaken(true)}
          className="shrink-0 bg-white text-indigo-800 hover:bg-indigo-50 font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all cursor-pointer"
        >
          {batchActionTaken ? '✓ Batch Trimmed (-15%)' : 'Reduce Next Batch (-15%)'}
        </button>
      </div>

      {/* 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Production</div>
          <div className="text-2xl font-black text-slate-900 mt-1">4,500 <span className="text-xs font-normal">units</span></div>
          <div className="text-[11px] text-sky-700 font-semibold mt-1">Batch 81-B</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accepted Yield</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">4,120 <span className="text-xs font-normal">units</span></div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">91.5% Quality Pass</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Surplus Products</div>
          <div className="text-2xl font-black text-amber-600 mt-1">280 <span className="text-xs font-normal">units</span></div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Over-run stock</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Near-Expiry Inventory</div>
          <div className="text-2xl font-black text-rose-600 mt-1">230 <span className="text-xs font-normal">kg</span></div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">Critical 6-14 day window</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Waste Diverted</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">100 <span className="text-xs font-normal">kg</span></div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">To bio-compost & feed</div>
        </div>
      </div>

      {/* Near-Expiry Food Alert Card & Inventory Table */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Near-Expiry Inventory Alert Matrix</h2>
              <p className="text-xs text-slate-500">
                Surplus product batches approaching shelf-life threshold eligible for discounted or NGO donation diversion.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
            3 Critical Batches Detected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Product Name</th>
                <th className="py-2.5 px-3">Batch #</th>
                <th className="py-2.5 px-3">Volume (kg)</th>
                <th className="py-2.5 px-3">Days to Expiry</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Redistribution Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-800">{item.product}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{item.batchNumber}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{item.quantityKg} kg</td>
                  <td className="py-3 px-3 font-bold text-amber-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.daysToExpiry} days
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Critical Alert'
                          ? 'bg-rose-100 text-rose-800'
                          : item.status === 'Warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setActiveTab('surplus');
                      }}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs transition-colors"
                    >
                      Offer to NGO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
