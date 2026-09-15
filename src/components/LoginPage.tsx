import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { UserRole } from '../types/database';
import {
  Leaf,
  UtensilsCrossed,
  Layers,
  HeartHandshake,
  Truck,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  Shield,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setRole, setIsLoggedIn } = useSaveBite();
  const [selectedRole, setSelectedRole] = useState<UserRole>('kitchen_manager');
  const [email, setEmail] = useState('kitchen.mgr@savebite.org');
  const [password, setPassword] = useState('••••••••••••');

  const roles: { role: UserRole; title: string; desc: string; icon: any; email: string; tag: string }[] = [
    {
      role: 'kitchen_manager',
      title: 'Kitchen Manager',
      desc: 'Institutional dining halls, hostel mess & cafeteria operations',
      icon: UtensilsCrossed,
      email: 'kitchen.mgr@savebite.org',
      tag: 'Demand & Surplus',
    },
    {
      role: 'food_processing_unit',
      title: 'Food Processing Unit',
      desc: 'Industrial batch production, near-expiry inventory & bulk redistribution',
      icon: Layers,
      email: 'operations@sunriseprocessors.com',
      tag: 'Batch Control',
    },
    {
      role: 'ngo_food_bank',
      title: 'NGO / Food Bank',
      desc: 'Surplus intake verification, meal distribution & beneficiary care',
      icon: HeartHandshake,
      email: 'anita@hopefoodbank.org',
      tag: 'Redistribution Hub',
    },
    {
      role: 'pickup_partner',
      title: 'Pickup Partner',
      desc: 'Temperature-controlled EV fleet, logistics dispatch & cold-chain delivery',
      icon: Truck,
      email: 'ramesh@swiftlogistics.in',
      tag: 'Logistics Fleet',
    },
    {
      role: 'administrator',
      title: 'System Administrator',
      desc: 'City-wide food security governance, organization audit & ESG metrics',
      icon: ShieldCheck,
      email: 'admin@savebite.gov.in',
      tag: 'Governance & ESG',
    },
  ];

  const handleSelectRole = (r: UserRole) => {
    setSelectedRole(r);
    const match = roles.find((x) => x.role === r);
    if (match) {
      setEmail(match.email);
    }
  };

  const handleSignIn = (targetRole: UserRole) => {
    setRole(targetRole);
    setIsLoggedIn(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(selectedRole);
  };

  const activeRoleObj = roles.find((r) => r.role === selectedRole) || roles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50/40 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-lg shadow-sky-500/25 mb-4">
            <div className="relative">
              <Leaf className="w-9 h-9 fill-white/20 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Save<span className="text-sky-600">Bite</span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl font-bold text-sky-800">
            “Save Food. Share Hope.”
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Integrated AI Platform for Food Waste Prevention, Demand Forecasting & Certified Redistribution
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl shadow-sky-100/50 border border-sky-100 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Sign in to SaveBite</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your role and access your dedicated dashboard.
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800">
                {activeRoleObj.tag}
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected Role
                </label>
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleSelectRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer font-medium text-slate-800"
                  >
                    {roles.map((r) => (
                      <option key={r.role} value={r.role}>
                        {r.title} — {r.tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    placeholder="you@organization.org"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md shadow-sky-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Sign In as {activeRoleObj.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                FSSAI Regulatory Verified
              </span>
              <span>256-bit TLS Encrypted</span>
            </div>
          </div>

          {/* Quick Select Role Cards */}
          <div className="lg:col-span-6 space-y-3">
            <div className="bg-sky-50/80 border border-sky-200/70 rounded-2xl p-4 mb-2">
              <div className="font-bold text-sm text-sky-900">
                Choose Access Perspective
              </div>
              <p className="text-xs text-sky-700 mt-1">
                Click any portal below to choose your operational role and sign in immediately.
              </p>
            </div>

            <div className="space-y-2.5">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.role;
                return (
                  <div
                    key={r.role}
                    onClick={() => handleSelectRole(r.role)}
                    className={`w-full text-left rounded-xl p-3.5 transition-all shadow-xs group cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-sky-600 text-white'
                            : 'bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm truncate ${isSelected ? 'text-sky-900' : 'text-slate-800 group-hover:text-sky-700'}`}>
                            {r.title}
                          </span>
                          {isSelected && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                              <CheckCircle2 className="w-3 h-3" /> Selected
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {r.desc}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSignIn(r.role);
                      }}
                      className={`ml-2 shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-xs'
                          : 'bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800'
                      }`}
                    >
                      <span>Enter</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
