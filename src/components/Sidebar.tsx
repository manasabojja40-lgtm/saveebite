import React from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  LayoutDashboard,
  BrainCircuit,
  ChefHat,
  Scale,
  Trash2,
  PackageCheck,
  Share2,
  Truck,
  LineChart,
  Bot,
  Bell,
  Settings,
  Building2,
  Users,
  MapPin,
  ClipboardList,
  Store,
} from 'lucide-react';

interface SidebarProps {
  onOpenNotifications: () => void;
  onOpenAssistant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenNotifications, onOpenAssistant }) => {
  const { currentRole, activeTab, setActiveTab, notifications } = useSaveBite();
  const unreadCount = notifications.filter((n) => !n.read).length;

  interface NavItem {
    id: string;
    label: string;
    icon: any;
    badge?: number | string;
    action?: () => void;
  }

  const getNavItems = (): NavItem[] => {
    switch (currentRole) {
      case 'kitchen_manager':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'prediction', label: 'AI Demand Prediction', icon: BrainCircuit, badge: 'Core AI' },
          { id: 'production', label: 'Food Production', icon: ChefHat },
          { id: 'consumption', label: 'Consumption', icon: Scale },
          { id: 'waste', label: 'Waste Monitoring', icon: Trash2 },
          { id: 'surplus', label: 'Surplus Food', icon: PackageCheck, badge: 'Live' },
          { id: 'redistribution', label: 'Smart Redistribution', icon: Share2, badge: 'AI Match' },
          { id: 'pickups', label: 'Pickups', icon: Truck },
          { id: 'map', label: 'Redistribution Map', icon: MapPin },
          { id: 'impact', label: 'Impact & ESG', icon: LineChart },
          { id: 'assistant', label: 'SaveBite AI', icon: Bot, action: onOpenAssistant },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount || undefined, action: onOpenNotifications },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];

      case 'ngo_food_bank':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'surplus', label: 'Available Food', icon: PackageCheck, badge: 'Nearby' },
          { id: 'redistribution', label: 'Requests & Matches', icon: Share2 },
          { id: 'pickups', label: 'Pickups', icon: Truck },
          { id: 'map', label: 'Redistribution Map', icon: MapPin },
          { id: 'distribution', label: 'Distribution Hubs', icon: Store },
          { id: 'impact', label: 'Impact', icon: LineChart },
        ];

      case 'food_processing_unit':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'fpu_production', label: 'Production & Yield', icon: ChefHat },
          { id: 'fpu_inventory', label: 'Near-Expiry Inventory', icon: PackageCheck, badge: 'Alert' },
          { id: 'waste', label: 'Waste Analysis', icon: Trash2 },
          { id: 'surplus', label: 'Redistribution Opps', icon: Share2 },
          { id: 'map', label: 'Redistribution Map', icon: MapPin },
          { id: 'impact', label: 'Impact', icon: LineChart },
        ];

      case 'pickup_partner':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'pickups', label: 'Active Pickups', icon: Truck, badge: 'Live' },
          { id: 'map', label: 'Redistribution Map', icon: MapPin },
          { id: 'impact', label: 'Logistics Impact', icon: LineChart },
        ];

      case 'administrator':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'admin_orgs', label: 'Organizations', icon: Building2 },
          { id: 'admin_kitchens', label: 'Kitchens', icon: ChefHat },
          { id: 'admin_fpu', label: 'Food Processing Units', icon: Store },
          { id: 'admin_ngos', label: 'NGOs & Food Banks', icon: Users },
          { id: 'redistribution', label: 'Redistribution Flow', icon: Share2 },
          { id: 'waste', label: 'Analytics & Waste', icon: Trash2 },
          { id: 'map', label: 'Redistribution Map', icon: MapPin },
          { id: 'impact', label: 'Impact & SDG Goals', icon: LineChart },
          { id: 'admin_users', label: 'Users & Roles', icon: Users },
          { id: 'settings', label: 'System Settings', icon: Settings },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-sky-100 flex flex-col shrink-0 shadow-xs">
      <div className="p-4 border-b border-sky-100/60">
        <div className="bg-sky-50/80 rounded-xl p-3 border border-sky-100">
          <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-0.5">
            Ecosystem Pipeline
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-sky-700">
            <span>Predict</span>
            <span>→</span>
            <span>Prevent</span>
            <span>→</span>
            <span>Redistribute</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50/70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-600'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : typeof item.badge === 'number'
                      ? 'bg-rose-500 text-white'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-sky-100/60 bg-slate-50/50 text-[11px] text-slate-500">
        <div className="font-semibold text-slate-700">SaveBite Platform • v1.0</div>
        <div className="text-[10px] text-sky-600 mt-0.5">Circular Food Security System</div>
      </div>
    </aside>
  );
};
