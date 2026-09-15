import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { FoodWasteRecord, WasteCategory } from '../types/database';
import {
  Trash2,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  PieChart,
  Calendar,
  PlusCircle,
  IndianRupee,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const WasteMonitoringView: React.FC = () => {
  const { wasteRecords, recordWaste, kitchenKpis } = useSaveBite();

  const [showLogModal, setShowLogModal] = useState(false);
  const [newMeal, setNewMeal] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>('Lunch');
  const [newCategory, setNewCategory] = useState<WasteCategory>('Plate Waste');
  const [newQty, setNewQty] = useState(8);
  const [newCause, setNewCause] = useState('Diners taking excessive rice portions at self-serve line');
  const [newAction, setNewAction] = useState('Introduce smaller ladles and conscious dining signboards');

  // Waste categories data
  const categoryBreakdown = [
    { category: 'Overproduction', kg: 18, pct: 51, color: 'bg-rose-500' },
    { category: 'Plate Waste', kg: 11, pct: 31, color: 'bg-amber-500' },
    { category: 'Preparation Waste', kg: 4, pct: 11, color: 'bg-blue-500' },
    { category: 'Spoilage', kg: 2, pct: 6, color: 'bg-purple-500' },
    { category: 'Expired Food', kg: 0, pct: 0, color: 'bg-slate-400' },
  ];

  // Meal breakdown
  const mealBreakdown = [
    { meal: 'Lunch', kg: 29, pct: 83 },
    { meal: 'Breakfast', kg: 6, pct: 17 },
    { meal: 'Dinner', kg: 0, pct: 0 },
  ];

  // 7-day trend data
  const weeklyTrend = [
    { day: 'Wed (Last)', kg: 42 },
    { day: 'Thu', kg: 38 },
    { day: 'Fri', kg: 35 },
    { day: 'Sat', kg: 26 },
    { day: 'Sun', kg: 22 },
    { day: 'Mon', kg: 48 }, // Spiked
    { day: 'Tue (Today)', kg: kitchenKpis.wasteKg },
  ];

  const handleLogWaste = (e: React.FormEvent) => {
    e.preventDefault();
    recordWaste({
      kitchenId: 'org-kit-1',
      date: 'Today',
      mealType: newMeal,
      category: newCategory,
      quantityKg: Number(newQty),
      estimatedCostLoss: Number(newQty) * 80,
      primaryCause: newCause,
      preventativeAction: newAction,
      loggedBy: 'Kitchen Supervisor',
    });
    setShowLogModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Food Waste Monitoring & Root-Cause Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track waste generation by category, pinpoint overproduction leaks, and enforce preventative actions.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Log Waste Incident
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Waste</div>
          <div className="text-3xl font-black text-rose-600 mt-1">
            {kitchenKpis.wasteKg} <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            ₹{(kitchenKpis.wasteKg * 80).toLocaleString()} direct ingredient loss
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Waste</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            195 <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            -14% vs previous week
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Waste</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            840 <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-semibold">
            Within green sustainability threshold
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Waste Reduction Trend</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            -28.4%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Since SaveBite AI deployment
          </div>
        </div>
      </div>

      {/* AI Waste Insight Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 rounded-2xl p-5 text-white shadow-md shadow-rose-500/15 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-100">
              AI Waste Pattern Insight
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
              High Priority Action
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white mt-1">
            “Monday lunch produces 28% more waste than the weekly average. Reducing preparation by approximately 8% may lower waste.”
          </p>
          <div className="mt-2 text-xs text-rose-100 font-medium">
            Root Cause: Unexpected student absenteeism due to early rain + high plate rejection on bitter vegetable sides.
          </div>
        </div>
      </div>

      {/* 2-Column Analytics: Categories vs Weekly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Waste By Category */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Waste Breakdown by Category</h2>
            <span className="text-xs text-slate-500">Today's Cumulative</span>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{cat.category}</span>
                  <span className="text-slate-900 font-bold">
                    {cat.kg} kg ({cat.pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.pct}%` }}
                    className={`h-full ${cat.color} rounded-full transition-all`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Primary Culprit: <strong>Overproduction (51%)</strong></span>
            <span className="text-rose-600 font-bold">Target: &lt;15%</span>
          </div>
        </div>

        {/* 7-Day Trend Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">7-Day Waste Generation Trend</h2>
            <span className="text-xs text-slate-500">Daily kg</span>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-200">
            {weeklyTrend.map((item, idx) => {
              const maxWaste = 60;
              const barHeight = (item.kg / maxWaste) * 140;
              const isSpike = item.kg >= 45;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none">
                    {item.day}: {item.kg} kg
                  </div>
                  <div
                    style={{ height: `${barHeight}px` }}
                    className={`w-full max-w-[36px] rounded-t-md transition-all ${
                      isSpike
                        ? 'bg-rose-500 group-hover:bg-rose-600'
                        : 'bg-sky-500 group-hover:bg-sky-600'
                    }`}
                  />
                  <span className="text-[10px] font-semibold text-slate-600 truncate max-w-[42px]">
                    {item.day.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Spike day (&gt;45kg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>Controlled trend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logged Incidents & Root Causes Table */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Recorded Waste Incidents & Prevention Log</h2>
          <span className="text-xs text-slate-500">{wasteRecords.length} recorded today</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Meal</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Cost Loss</th>
                <th className="py-2.5 px-3">Root Cause</th>
                <th className="py-2.5 px-3">Preventative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {wasteRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-800">{rec.mealType}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                        rec.category === 'Overproduction'
                          ? 'bg-rose-100 text-rose-700'
                          : rec.category === 'Plate Waste'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {rec.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">{rec.quantityKg} kg</td>
                  <td className="py-3 px-3 font-semibold text-rose-600">₹{rec.estimatedCostLoss}</td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs">{rec.primaryCause}</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium max-w-xs">
                    {rec.preventativeAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Log New Food Waste Incident</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogWaste} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meal Period</label>
                <select
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Waste Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="Overproduction">Overproduction</option>
                  <option value="Plate Waste">Plate Waste</option>
                  <option value="Spoilage">Spoilage</option>
                  <option value="Preparation Waste">Preparation Waste</option>
                  <option value="Expired Food">Expired Food</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  value={newQty}
                  onChange={(e) => setNewQty(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  min="0.5"
                  step="0.5"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Root Cause</label>
                <input
                  type="text"
                  value={newCause}
                  onChange={(e) => setNewCause(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preventative Action</label>
                <input
                  type="text"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl"
                >
                  Save Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
