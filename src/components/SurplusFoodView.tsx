import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { SurplusListing, SurplusStatus } from '../types/database';
import {
  PackageCheck,
  PlusCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Thermometer,
  Calendar,
  HeartHandshake,
} from 'lucide-react';

export const SurplusFoodView: React.FC = () => {
  const {
    surplusListings,
    addSurplusListing,
    setActiveTab,
    currentRole,
    matchPartner,
  } = useSaveBite();

  const [showModal, setShowModal] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // New Listing Form state
  const [foodName, setFoodName] = useState('Freshly Cooked Veg Pulao & Mix Raita');
  const [category, setCategory] = useState<SurplusListing['category']>('Cooked Meals');
  const [quantityMeals, setQuantityMeals] = useState(75);
  const [quantityKg, setQuantityKg] = useState(30);
  const [dietaryType, setDietaryType] = useState<SurplusListing['dietaryType']>('Vegetarian');
  const [preparationTime, setPreparationTime] = useState('1:00 PM Today');
  const [availableUntil, setAvailableUntil] = useState('6:00 PM Today');
  const [storageCondition, setStorageCondition] = useState<SurplusListing['storageCondition']>('Hot Held (65°C+)');
  const [pickupLocation, setPickupLocation] = useState('Central Hostel Mess Dispatch Gate 2, Noida');
  const [notes, setNotes] = useState('Maintained at 68°C in commercial insulated containers.');
  const [safetyAgreed, setSafetyAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyAgreed) return;

    addSurplusListing({
      kitchenId: 'org-kit-1',
      kitchenName: 'Green Campus Central Dining',
      foodName,
      category,
      quantityMeals: Number(quantityMeals),
      quantityKg: Number(quantityKg),
      dietaryType,
      preparationTime,
      availableUntil,
      storageCondition,
      pickupLocation,
      pickupLat: 28.628,
      pickupLng: 77.364,
      status: 'Available',
      foodSafetyVerified: true,
      notes,
    });

    setShowModal(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 5000);
  };

  const statusSteps: SurplusStatus[] = [
    'Available',
    'Matched',
    'Pickup Scheduled',
    'Collected',
    'Redistributed',
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Surplus Food Listings & Redistribution Lifecycle
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Safe, verified surplus food ready for AI matching and rapid volunteer pickup.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          List New Surplus
        </button>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Surplus successfully listed. AI is ranking optimal nearby recipients.</span>
          </div>
          <button
            onClick={() => {
              setActiveTab('redistribution');
            }}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            Go to Smart Redistribution
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Food Safety Warning Card (Section 9 requirement) */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4.5 flex items-start gap-3.5 text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-bold text-amber-950 uppercase tracking-wider text-[11px] mb-0.5">
            Mandatory Food Safety Warning & Regulatory Compliance
          </div>
          <p className="leading-relaxed text-amber-900 font-medium">
            “Only list food that is safe for redistribution and complies with applicable food-safety requirements.”
          </p>
          <p className="text-[11px] text-amber-800/80 mt-1">
            Ensure hot food is held above 65°C and cold food below 4°C. Max transfer window: 4 hours from preparation.
          </p>
        </div>
      </div>

      {/* Listings Cards with Lifecycle Status Tracking */}
      <div className="space-y-4">
        {surplusListings.map((item) => {
          const currentStepIndex = statusSteps.indexOf(item.status);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs hover:border-sky-200 transition-all space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-bold text-slate-900">{item.foodName}</h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.dietaryType === 'Vegetarian'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.dietaryType}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-slate-700">
                      {item.quantityMeals} Servings ({item.quantityKg} kg)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Prep: {item.preparationTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-700">
                      <Clock className="w-3.5 h-3.5" />
                      Available Until: {item.availableUntil}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'Available' && (
                    <>
                      {currentRole === 'ngo_food_bank' ? (
                        <button
                          onClick={() => {
                            matchPartner(item.id, 'ngo-1', 'Hope Food Bank & Community Shelter');
                          }}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <HeartHandshake className="w-3.5 h-3.5 text-emerald-200" />
                          Claim for Food Bank
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveTab('redistribution');
                          }}
                          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                          AI Smart Match
                        </button>
                      )}
                    </>
                  )}
                  {item.status === 'Matched' && (
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1">
                      Matched with {item.matchedRecipientName}
                    </span>
                  )}
                  {item.status === 'Redistributed' && (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Redistributed
                    </span>
                  )}
                </div>
              </div>

              {/* Status Tracking Pipeline: Available → Matched → Pickup Scheduled → Collected → Redistributed */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Redistribution Status Pipeline
                </div>
                <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-semibold">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-full h-1.5 rounded-full transition-colors ${
                            isCompleted ? 'bg-sky-600' : 'bg-slate-200'
                          }`}
                        />
                        <span
                          className={`${
                            isCurrent
                              ? 'text-sky-700 font-bold'
                              : isCompleted
                              ? 'text-slate-700 font-medium'
                              : 'text-slate-400'
                          } truncate max-w-full`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extra details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Storage: <strong className="text-slate-800">{item.storageCondition}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Pickup: {item.pickupLocation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Surplus Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">List Surplus Food</h3>
                <p className="text-xs text-slate-500">Provide accurate details for instant NGO matching</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Food Item Name & Menu</label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Cooked Meals">Cooked Meals</option>
                    <option value="Curry & Rice">Curry & Rice</option>
                    <option value="Bakery & Bread">Bakery & Bread</option>
                    <option value="Fresh Fruits/Veg">Fresh Fruits/Veg</option>
                    <option value="Packaged Snacks">Packaged Snacks</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dietary Type</label>
                  <select
                    value={dietaryType}
                    onChange={(e) => setDietaryType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Vegetarian">Vegetarian (Veg)</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Jain">Jain (No Root Veg)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity (Number of Servings)</label>
                  <input
                    type="number"
                    value={quantityMeals}
                    onChange={(e) => setQuantityMeals(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    min="5"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Weight (kg)</label>
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preparation Time</label>
                  <input
                    type="text"
                    value={preparationTime}
                    onChange={(e) => setPreparationTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Available Until (Urgency)</label>
                  <input
                    type="text"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Storage Condition</label>
                <select
                  value={storageCondition}
                  onChange={(e) => setStorageCondition(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="Hot Held (65°C+)">Hot Held (65°C+ in warmers)</option>
                  <option value="Refrigerated (4°C)">Refrigerated (4°C)</option>
                  <option value="Ambient Room Temp">Ambient Room Temperature</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pickup Location / Gate</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Packaging / Handling Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* Mandatory Food Safety Confirmation Checkbox */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900">
                <input
                  type="checkbox"
                  id="safetyCheck"
                  checked={safetyAgreed}
                  onChange={(e) => setSafetyAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  required
                />
                <label htmlFor="safetyCheck" className="text-[11px] font-medium leading-tight cursor-pointer">
                  <strong>Food Safety Certification:</strong> I certify that this food is safe, hygienic, unconsumed, stored within regulated temperatures, and complies with FSSAI redistribution guidelines.
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!safetyAgreed}
                  className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  Submit & List Surplus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
