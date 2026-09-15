import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  Settings,
  ShieldCheck,
  Building,
  Bell,
  Sliders,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentUser, currentRole } = useSaveBite();
  const [savedToast, setSavedToast] = useState(false);

  const [orgName, setOrgName] = useState(
    currentRole === 'kitchen_manager'
      ? 'Green Campus Central Dining Hall'
      : currentRole === 'food_processing_unit'
      ? 'Sunrise Food Processors Ltd'
      : currentRole === 'ngo_food_bank'
      ? 'Hope Food Bank & Community Shelter'
      : currentRole === 'pickup_partner'
      ? 'Swift Logistics & Cold Fleet'
      : 'National Food Waste Regulatory Authority'
  );
  const [fssaiNumber, setFssaiNumber] = useState('10022011000491');
  const [safetyBufferPct, setSafetyBufferPct] = useState('2.8');
  const [autoDispatchNgo, setAutoDispatchNgo] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Organization & Safety Parameters
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure FSSAI regulatory compliance, AI buffer ratios, and automated dispatch triggers.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Configuration Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Org Profile */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-sky-600" />
            Organization Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Entity Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">FSSAI License Number</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={fssaiNumber}
                  onChange={(e) => setFssaiNumber(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Parameters */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-600" />
            AI Demand Engine Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kitchen Safety Buffer Margin (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={safetyBufferPct}
                onChange={(e) => setSafetyBufferPct(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Recommended between 2.5% and 3.5% to prevent cafeteria shortages.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Redistribution Auto-Dispatch</label>
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoDispatch"
                  checked={autoDispatchNgo}
                  onChange={(e) => setAutoDispatchNgo(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor="autoDispatch" className="text-slate-700 font-medium cursor-pointer">
                  Auto-alert top-ranked NGO when surplus exceeds 50 meals
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
