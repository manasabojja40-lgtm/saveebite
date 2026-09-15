import React from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  UtensilsCrossed,
  Users,
  PackageCheck,
  Trash2,
  Share2,
  IndianRupee,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Truck,
  BrainCircuit,
} from 'lucide-react';

export const KitchenDashboard: React.FC = () => {
  const {
    kitchenKpis,
    setActiveTab,
    surplusListings,
    pickupOrders,
  } = useSaveBite();

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const activeSurplus = surplusListings.filter((s) => s.status === 'Available');
  const activePickups = pickupOrders.filter((p) => p.status !== 'Delivered');

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Good Morning, Kitchen Manager 👋
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span className="font-semibold text-sky-700">{todayDate}</span>
            <span>•</span>
            <span>Green Campus Central Dining Hall</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium">FSSAI License: 10022011000491</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('prediction')}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            Predict Demand
          </button>
          <button
            onClick={() => setActiveTab('surplus')}
            className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <PackageCheck className="w-3.5 h-3.5" />
            List Surplus
          </button>
        </div>
      </div>

      {/* Today's AI Insight Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-2xl p-5 text-white shadow-md shadow-sky-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-sky-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-200">
                Today's AI Insight
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                Live Analysis
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
              “{kitchenKpis.todayAiInsight}”
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('prediction')}
          className="shrink-0 bg-white text-sky-700 hover:bg-sky-50 font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs flex items-center gap-1 transition-all cursor-pointer"
        >
          Adjust Tomorrow's Prep
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Meals Prepared */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-600">Meals Prepared</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {kitchenKpis.mealsPrepared.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-sky-600 font-semibold">Lunch service</span>
          </div>
        </div>

        {/* Meals Consumed */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-600">Meals Consumed</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {kitchenKpis.mealsConsumed.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            87.5% absorption rate
          </div>
        </div>

        {/* Surplus Meals */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-600">Surplus Meals</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <PackageCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 tracking-tight">
            {kitchenKpis.surplusMeals.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Safe for redistribution
          </div>
        </div>

        {/* Food Waste */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-600">Food Waste</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 tracking-tight">
            {kitchenKpis.wasteKg} <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            18 kg overproduction
          </div>
        </div>

        {/* Food Redistributed */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-600">Redistributed</span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Share2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-teal-700 tracking-tight">
            {kitchenKpis.redistributedMeals}
          </div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">
            Hope Food Bank matched
          </div>
        </div>

        {/* Money Saved */}
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold text-slate-600">Money Saved</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-indigo-700 tracking-tight">
            ₹{kitchenKpis.moneySavedRupees.toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">
            Today's estimated ROI
          </div>
        </div>
      </div>

      {/* Visual Operational Flow: Prepared -> Consumed -> Surplus -> Waste */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Live Food Mass Balance & Circular Flow
            </h2>
            <p className="text-xs text-slate-500">
              Auditing the conversion of prepared meals into consumption, redistribution, and diverted waste.
            </p>
          </div>
          <span className="text-xs bg-sky-50 text-sky-700 font-semibold px-2.5 py-1 rounded-lg border border-sky-200">
            Real-Time Audit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1: Prepared */}
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100">
            <div className="flex items-center justify-between text-xs text-sky-800 font-bold mb-1">
              <span>1. Prepared</span>
              <span className="bg-sky-200/60 px-1.5 py-0.5 rounded text-[10px]">100%</span>
            </div>
            <div className="text-xl font-extrabold text-sky-950">1,000 Meals</div>
            <p className="text-[11px] text-sky-800/80 mt-1">Batch produced at 11:30 AM</p>
          </div>

          {/* Step 2: Consumed */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-1">
              <span>2. Consumed</span>
              <span className="bg-emerald-200/60 px-1.5 py-0.5 rounded text-[10px]">87.5%</span>
            </div>
            <div className="text-xl font-extrabold text-emerald-950">875 Meals</div>
            <p className="text-[11px] text-emerald-800/80 mt-1">875 students & faculty dined</p>
          </div>

          {/* Step 3: Surplus */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
            <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-1">
              <span>3. Safe Surplus</span>
              <span className="bg-amber-200/60 px-1.5 py-0.5 rounded text-[10px]">12.5%</span>
            </div>
            <div className="text-xl font-extrabold text-amber-950">125 Meals</div>
            <p className="text-[11px] text-amber-800/80 mt-1">90 matched for food bank</p>
          </div>

          {/* Step 4: Waste */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100">
            <div className="flex items-center justify-between text-xs text-rose-800 font-bold mb-1">
              <span>4. Kitchen Waste</span>
              <span className="bg-rose-200/60 px-1.5 py-0.5 rounded text-[10px]">3.5%</span>
            </div>
            <div className="text-xl font-extrabold text-rose-950">35 kg Waste</div>
            <p className="text-[11px] text-rose-800/80 mt-1">11 kg plate waste + 18 kg overage</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Active Surplus & Dispatched Pickups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Surplus Listings */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">Current Surplus Inventory</h2>
            </div>
            <button
              onClick={() => setActiveTab('surplus')}
              className="text-xs text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              View All ({surplusListings.length})
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {activeSurplus.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No active unallocated surplus. All surplus has been safely matched!
            </div>
          ) : (
            <div className="space-y-3">
              {activeSurplus.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/30 hover:bg-sky-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">{item.foodName}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                        {item.dietaryType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                      <span className="font-semibold text-slate-700">{item.quantityMeals} meals ({item.quantityKg} kg)</span>
                      <span className="flex items-center gap-1 text-amber-700">
                        <Clock className="w-3 h-3" />
                        Until {item.availableUntil}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('redistribution');
                    }}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shrink-0 transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 text-sky-200" />
                    AI Smart Match
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Redistribution & Pickups */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">Live Pickup & Delivery Orders</h2>
            </div>
            <button
              onClick={() => setActiveTab('pickups')}
              className="text-xs text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              Manage Pickups
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {pickupOrders.map((pickup) => (
              <div
                key={pickup.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-sky-300 transition-all flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-800">{pickup.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pickup.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pickup.status === 'Collected'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {pickup.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    {pickup.foodDescription}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    To: <span className="font-medium text-slate-700">{pickup.destinationName}</span> • Driver: {pickup.driverName}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-700">{pickup.pickupTime}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    {pickup.status === 'Delivered' ? 'Completed' : `ETA: ~${pickup.estimatedArrivalMin} mins`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
