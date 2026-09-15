import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  ChefHat,
  Scale,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Clock,
  Building,
  PlusCircle,
  AlertTriangle,
} from 'lucide-react';

export const ProductionConsumptionView: React.FC = () => {
  const {
    kitchenKpis,
    recordProductionAndConsumption,
    setActiveTab,
  } = useSaveBite();

  // Production Form
  const [prodDate, setProdDate] = useState('2026-09-15');
  const [prodMeal, setProdMeal] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>('Lunch');
  const [prodQuantity, setProdQuantity] = useState(1000);
  const [prodKitchen, setProdKitchen] = useState('Central Hostel Mess A');
  const [prodTime, setProdTime] = useState('11:30 AM');

  // Consumption Form
  const [consumedQty, setConsumedQty] = useState(875);
  const [peopleServed, setPeopleServed] = useState(875);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const calculatedSurplus = Math.max(0, prodQuantity - consumedQty);
  const calculatedWaste = Math.round(consumedQty * 0.012 + calculatedSurplus * 0.08);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordProductionAndConsumption(prodQuantity, consumedQty, prodMeal);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Food Production & Consumption Balance
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Log kitchen preparation batches, record actual servings consumed, and audit residual food flow.
          </p>
        </div>

        {showSuccessToast && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Batch & Consumption Recorded Successfully!
          </div>
        )}
      </div>

      {/* Visual Operational Flow: Prepared → Consumed → Surplus → Waste */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            Active Batch Flow: Prepared → Consumed → Surplus → Waste
          </h2>
          <span className="text-[11px] text-slate-400">Mass-Balance Accounting</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Prepared */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Prepared Quantity</span>
              <span className="bg-sky-200 text-sky-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                100%
              </span>
            </div>
            <div className="text-3xl font-black text-sky-950 mt-1">
              {prodQuantity.toLocaleString()}{' '}
              <span className="text-sm font-medium text-sky-700">meals</span>
            </div>
            <div className="text-[11px] text-sky-700 mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Cooked at {prodTime}
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky-200/40 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Step 2: Consumed */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Consumed Quantity</span>
              <span className="bg-emerald-200 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                {Math.round((consumedQty / prodQuantity) * 100)}%
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-950 mt-1">
              {consumedQty.toLocaleString()}{' '}
              <span className="text-sm font-medium text-emerald-700">meals</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-2">
              Served to {peopleServed} registered diners
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-200/40 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Step 3: Surplus */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Safe Surplus</span>
              <span className="bg-amber-200 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                {Math.round((calculatedSurplus / prodQuantity) * 100)}%
              </span>
            </div>
            <div className="text-3xl font-black text-amber-950 mt-1">
              {calculatedSurplus.toLocaleString()}{' '}
              <span className="text-sm font-medium text-amber-700">meals</span>
            </div>
            <div className="text-[11px] text-amber-700 mt-2">
              Eligible for NGO Redistribution
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Step 4: Waste */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Unavoidable Waste</span>
              <span className="bg-rose-200 text-rose-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                ~{calculatedWaste} kg
              </span>
            </div>
            <div className="text-3xl font-black text-rose-950 mt-1">
              {calculatedWaste}{' '}
              <span className="text-sm font-medium text-rose-700">kg</span>
            </div>
            <div className="text-[11px] text-rose-700 mt-2">
              Plate scraps & trimming scrap
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-200/40 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Interactive Production & Consumption Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Food Production Logging Form */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">Record Food Production Batch</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Production Date</label>
                <input
                  type="date"
                  value={prodDate}
                  onChange={(e) => setProdDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meal Service</label>
                <select
                  value={prodMeal}
                  onChange={(e) => setProdMeal(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks / Refreshment</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quantity Prepared (Meals)</label>
                <input
                  type="number"
                  value={prodQuantity}
                  onChange={(e) => setProdQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  min="1"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preparation Time</label>
                <input
                  type="text"
                  value={prodTime}
                  onChange={(e) => setProdTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kitchen / Mess Unit</label>
              <input
                type="text"
                value={prodKitchen}
                onChange={(e) => setProdKitchen(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Consumption Logging Form */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Record Consumption & Residuals</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity Consumed (Meals)</label>
                  <input
                    type="number"
                    value={consumedQty}
                    onChange={(e) => setConsumedQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    max={prodQuantity}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Number of People Served</label>
                  <input
                    type="number"
                    value={peopleServed}
                    onChange={(e) => setPeopleServed(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Calculated Remaining Surplus:</span>
                  <span className="text-amber-700 font-extrabold">{calculatedSurplus} meals</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  SaveBite automatically tags remaining hot food for smart redistribution before the 4-hour food safety window expires.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Record Consumption & Update System
            </button>
            <button
              onClick={() => {
                setActiveTab('surplus');
              }}
              className="py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl text-xs border border-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              List Surplus Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
