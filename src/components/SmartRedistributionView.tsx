import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { SurplusListing, NGORecommendation } from '../types/database';
import {
  Share2,
  Sparkles,
  MapPin,
  Clock,
  Truck,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  TrendingUp,
} from 'lucide-react';

export const SmartRedistributionView: React.FC = () => {
  const {
    surplusListings,
    matchPartner,
    setActiveTab,
  } = useSaveBite();

  // Find active surplus (default to first available or matched)
  const activeSurplus =
    surplusListings.find((s) => s.status === 'Available') || surplusListings[0];

  const [selectedSurplus, setSelectedSurplus] = useState<SurplusListing>(activeSurplus);
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState<string | null>(null);

  // Recommendations for the selected surplus
  const recommendations: NGORecommendation[] = [
    {
      ngoId: 'ngo-1',
      name: 'Hope Food Bank',
      distanceKm: 2.4,
      capacityMeals: 100,
      pickupAvailable: true,
      matchScore: 96,
      etaMinutes: 18,
      urgencyScore: 'High',
      rationale:
        'Hope Food Bank has the highest match score (96%) due to immediate proximity (2.4 km), 100-meal intake capacity, active evening shelter dinner service starting in 45 minutes, and an insulated EV pickup van ready for immediate dispatch.',
    },
    {
      ngoId: 'ngo-2',
      name: 'Community Care NGO',
      distanceKm: 4.1,
      capacityMeals: 70,
      pickupAvailable: true,
      matchScore: 89,
      etaMinutes: 32,
      urgencyScore: 'Medium',
      rationale:
        'Good fit with 4.1 km distance and 70-meal intake capacity. Pickup van available with 32-minute transit time. Slightly lower intake capacity for large batches.',
    },
    {
      ngoId: 'ngo-3',
      name: 'City Shelter & Relief Foundation',
      distanceKm: 6.2,
      capacityMeals: 120,
      pickupAvailable: false,
      matchScore: 72,
      etaMinutes: 55,
      urgencyScore: 'Low',
      rationale:
        'Large capacity (120 meals), but 6.2 km distance and own pickup van is currently deployed on another mission, requiring third-party logistics dispatch.',
    },
  ];

  const handleMatchPartner = (rec: NGORecommendation) => {
    setMatchingInProgress(true);
    setTimeout(() => {
      matchPartner(selectedSurplus.id, rec.ngoId, rec.name);
      setMatchingInProgress(false);
      setMatchSuccess(rec.name);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              AI Smart Redistribution Matching Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous multi-criteria matching algorithm optimizing distance, intake capacity, and rapid cold-chain dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Matching Matrix Active
          </span>
        </div>
      </div>

      {/* Match Success Toast */}
      {matchSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div>Matched successfully with <strong>{matchSuccess}</strong>!</div>
              <div className="text-[11px] text-emerald-700 font-normal">
                Dispatched automated pickup order with cold-chain tracking. Driver notified.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTab('pickups');
            }}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
          >
            Track Active Pickup
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Active Surplus Selector Card */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-md shadow-sky-500/15">
        <div className="text-xs font-bold uppercase tracking-wider text-sky-100 mb-1 flex items-center justify-between">
          <span>Active Surplus Ready for Redistribution</span>
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px]">
            Status: {selectedSurplus.status}
          </span>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">
              {selectedSurplus.foodName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-sky-100">
              <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                {selectedSurplus.quantityMeals} Meals ({selectedSurplus.quantityKg} kg)
              </span>
              <span>•</span>
              <span className="font-medium text-white">{selectedSurplus.dietaryType}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-white font-semibold">
                <Clock className="w-3.5 h-3.5" />
                Available until {selectedSurplus.availableUntil}
              </span>
              <span>•</span>
              <span>Storage: {selectedSurplus.storageCondition}</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <select
              value={selectedSurplus.id}
              onChange={(e) => {
                const found = surplusListings.find((s) => s.id === e.target.value);
                if (found) setSelectedSurplus(found);
              }}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
            >
              {surplusListings.map((s) => (
                <option key={s.id} value={s.id} className="text-slate-800">
                  {s.foodName} ({s.quantityMeals} meals)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AI Recommended Partners Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              SaveBite AI Ranked Recommendations
            </h2>
            <p className="text-xs text-slate-500">
              Ranked dynamically by proximity, intake capacity, dietary fit, and immediate cold-chain readiness.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            3 verified NGO partners scored
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((rec, index) => {
            const isTopMatch = index === 0;

            return (
              <div
                key={rec.ngoId}
                className={`bg-white rounded-2xl p-6 border transition-all shadow-xs ${
                  isTopMatch
                    ? 'border-sky-300 ring-2 ring-sky-500/20 bg-gradient-to-b from-sky-50/20 to-white'
                    : 'border-slate-200/80 hover:border-sky-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Partner Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-base font-extrabold text-slate-900">
                        {rec.name}
                      </span>
                      {isTopMatch && (
                        <span className="bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3" />
                          Top AI Recommendation
                        </span>
                      )}
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        FSSAI Verified
                      </span>
                    </div>

                    {/* Quick Metric Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Distance</div>
                        <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-sky-600" />
                          {rec.distanceKm} km
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Intake Capacity</div>
                        <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1 mt-0.5">
                          <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                          {rec.capacityMeals} meals
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Pickup Status</div>
                        <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1 mt-0.5">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          {rec.pickupAvailable ? 'Available Now' : 'Unavailable'}
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Estimated Arrival</div>
                        <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          ~{rec.etaMinutes} mins
                        </div>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-sky-600" />
                        AI Matching Rationale:
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                        {rec.rationale}
                      </p>
                    </div>
                  </div>

                  {/* Match Score & CTA */}
                  <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 shrink-0 lg:pl-6 lg:border-l border-slate-100">
                    <div className="text-center">
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Match Score</div>
                      <div
                        className={`text-3xl font-black mt-0.5 ${
                          rec.matchScore >= 90
                            ? 'text-emerald-600'
                            : rec.matchScore >= 80
                            ? 'text-sky-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {rec.matchScore}%
                      </div>
                    </div>

                    <button
                      onClick={() => handleMatchPartner(rec)}
                      disabled={matchingInProgress}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                        isTopMatch
                          ? 'bg-sky-600 hover:bg-sky-700 text-white'
                          : 'bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Match Partner
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
