import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  HeartHandshake,
  PackageCheck,
  Truck,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const NgoDashboard: React.FC = () => {
  const {
    surplusListings,
    pickupOrders,
    matchPartner,
    setActiveTab,
    activeTab,
  } = useSaveBite();

  const [acceptedToast, setAcceptedToast] = useState<string | null>(null);

  const availableFood = surplusListings.filter((s) => s.status === 'Available');

  const handleAcceptDonation = (surplusId: string, foodName: string) => {
    matchPartner(surplusId, 'ngo-1', 'Hope Food Bank');
    setAcceptedToast(foodName);
    setTimeout(() => setAcceptedToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hope Food Bank & Community Nutrition Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Receiving surplus meals, scheduling volunteer collections, and distributing food to vulnerable families.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            FSSAI Verified NGO Partner
          </span>
        </div>
      </div>

      {acceptedToast && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Donation “{acceptedToast}” accepted! Automated EV pickup van dispatched.</span>
          </div>
          <button
            onClick={() => {
              setActiveTab('pickups');
            }}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            Track Pickup
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Nearby</div>
          <div className="text-3xl font-black text-sky-600 mt-1">{availableFood.length}</div>
          <div className="text-[11px] text-sky-700 font-semibold mt-1">Ready for pickup within 5 km</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accepted Donations</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">12</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">This calendar week</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">In-Transit Pickups</div>
          <div className="text-3xl font-black text-amber-600 mt-1">
            {pickupOrders.filter((p) => p.status !== 'Delivered').length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Active on road</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">People Nourished</div>
          <div className="text-3xl font-black text-indigo-700 mt-1">4,250</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Dignified wholesome meals</div>
        </div>
      </div>

      {/* Available Food Nearby */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Available Surplus Food Nearby</h2>
            <p className="text-xs text-slate-500">Live verified listings ready for claiming</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{availableFood.length} active listings</span>
        </div>

        {availableFood.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No unallocated surplus currently nearby. All available donations have been claimed!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableFood.map((food) => (
              <div
                key={food.id}
                className="p-4 rounded-xl border border-sky-100 bg-sky-50/30 hover:bg-sky-50/60 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{food.foodName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {food.dietaryType}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 mt-2 space-y-1">
                    <div className="font-semibold text-sky-800">
                      Quantity: {food.quantityMeals} meals ({food.quantityKg} kg)
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{food.kitchenName} • {food.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-amber-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Safe until: {food.availableUntil}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-sky-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Storage: {food.storageCondition}</span>
                  <button
                    onClick={() => handleAcceptDonation(food.id, food.foodName)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Accept Donation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Distribution Centers & Community Outposts */}
      <div className={`bg-white rounded-2xl p-6 border shadow-xs transition-all ${activeTab === 'distribution' ? 'border-sky-400 ring-2 ring-sky-200' : 'border-sky-100'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Community Distribution Hubs & Outposts</h2>
              {activeTab === 'distribution' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 uppercase">
                  Active Focus
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified ground centers where surplus meals are hygienically delivered and served to vulnerable citizens.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Shelter Kitchen Outpost A</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Operational</span>
            </div>
            <div className="text-slate-600 mt-2 space-y-1">
              <div>Capacity: <strong className="text-slate-800">150 meals/day</strong></div>
              <div>Coordinator: Ravi Verma (+91 98711 20031)</div>
              <div>Served Today: <strong className="text-sky-700">125 / 150 meals</strong></div>
            </div>
            <div className="text-emerald-700 font-semibold mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
              <span>Service Hours:</span>
              <span>5:00 PM - 8:30 PM</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Migrant Worker Community Camp</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Operational</span>
            </div>
            <div className="text-slate-600 mt-2 space-y-1">
              <div>Capacity: <strong className="text-slate-800">200 meals/day</strong></div>
              <div>Coordinator: Sunita Mehra (+91 99100 44321)</div>
              <div>Served Today: <strong className="text-sky-700">180 / 200 meals</strong></div>
            </div>
            <div className="text-emerald-700 font-semibold mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
              <span>Service Hours:</span>
              <span>6:00 PM - 9:00 PM</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Children Care Day Home</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Completed</span>
            </div>
            <div className="text-slate-600 mt-2 space-y-1">
              <div>Capacity: <strong className="text-slate-800">80 meals/day</strong></div>
              <div>Coordinator: Anand Joshi (+91 98112 39982)</div>
              <div>Served Today: <strong className="text-sky-700">80 / 80 meals</strong></div>
            </div>
            <div className="text-emerald-700 font-semibold mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
              <span>Service Hours:</span>
              <span>4:00 PM - 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
