import React from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { UserRole } from '../types/database';
import {
  Bell,
  Sparkles,
  UtensilsCrossed,
  Layers,
  HeartHandshake,
  Truck,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Leaf,
} from 'lucide-react';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, onOpenAssistant }) => {
  const {
    currentRole,
    setRole,
    currentUser,
    notifications,
    setIsLoggedIn,
  } = useSaveBite();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string }> = {
    kitchen_manager: { label: 'Kitchen Manager', icon: UtensilsCrossed, color: 'text-sky-600' },
    food_processing_unit: { label: 'Food Processing Unit', icon: Layers, color: 'text-indigo-600' },
    ngo_food_bank: { label: 'NGO / Food Bank', icon: HeartHandshake, color: 'text-emerald-600' },
    pickup_partner: { label: 'Pickup Partner', icon: Truck, color: 'text-amber-600' },
    administrator: { label: 'Administrator', icon: ShieldCheck, color: 'text-blue-700' },
  };

  const CurrentRoleIcon = roleLabels[currentRole].icon;

  return (
    <header className="bg-white border-b border-sky-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <div className="relative">
              <Leaf className="w-5 h-5 fill-white/20 text-white" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Save<span className="text-sky-600">Bite</span>
              </span>
              <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                Enterprise
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 tracking-tight">
              “Save Food. Share Hope.”
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick AI Assistant Button */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold border border-sky-200/80 transition-all cursor-pointer shadow-xs"
            title="Ask SaveBite AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span className="hidden sm:inline">SaveBite AI</span>
          </button>

          {/* Role Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer text-xs transition-colors">
              <CurrentRoleIcon className={`w-4 h-4 ${roleLabels[currentRole].color}`} />
              <div className="text-left hidden md:block">
                <div className="text-[10px] text-slate-600 uppercase font-bold leading-none">Role View</div>
                <div className="font-bold text-slate-800 text-xs">{roleLabels[currentRole].label}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Switch Perspective
              </div>
              {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                const ItemIcon = roleLabels[r].icon;
                const isSelected = currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isSelected ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ItemIcon className={`w-4 h-4 ${roleLabels[r].color}`} />
                    <span>{roleLabels[r].label}</span>
                    {isSelected && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Pill / Logout */}
          <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center border border-sky-200">
              {currentUser.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-600 truncate max-w-[120px]">
                {currentUser.email}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
            title="Logout / Switch Account"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
