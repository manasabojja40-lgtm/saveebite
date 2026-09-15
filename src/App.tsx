import React, { useState } from 'react';
import { SaveBiteProvider, useSaveBite } from './context/SaveBiteContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './components/LoginPage';
import { KitchenDashboard } from './components/KitchenDashboard';
import { DemandPredictionView } from './components/DemandPredictionView';
import { ProductionConsumptionView } from './components/ProductionConsumptionView';
import { WasteMonitoringView } from './components/WasteMonitoringView';
import { SurplusFoodView } from './components/SurplusFoodView';
import { SmartRedistributionView } from './components/SmartRedistributionView';
import { PickupManagementView } from './components/PickupManagementView';
import { SaveBiteMap } from './components/SaveBiteMap';
import { NgoDashboard } from './components/NgoDashboard';
import { FoodProcessingDashboard } from './components/FoodProcessingDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ImpactDashboard } from './components/ImpactDashboard';
import { SettingsView } from './components/SettingsView';
import { SaveBiteAiAssistant } from './components/SaveBiteAiAssistant';
import { NotificationsModal } from './components/NotificationsModal';

const AppContent: React.FC = () => {
  const { isLoggedIn, currentRole, activeTab } = useSaveBite();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Render the current view according to active tab & role
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentRole === 'kitchen_manager') return <KitchenDashboard />;
        if (currentRole === 'ngo_food_bank') return <NgoDashboard />;
        if (currentRole === 'food_processing_unit') return <FoodProcessingDashboard />;
        if (currentRole === 'pickup_partner') return <PickupManagementView />;
        if (currentRole === 'administrator') return <AdminDashboard />;
        return <KitchenDashboard />;

      case 'prediction':
        return <DemandPredictionView />;

      case 'production':
      case 'consumption':
        return <ProductionConsumptionView />;

      case 'waste':
        return <WasteMonitoringView />;

      case 'surplus':
        return <SurplusFoodView />;

      case 'redistribution':
        return <SmartRedistributionView />;

      case 'pickups':
        return <PickupManagementView />;

      case 'map':
        return <SaveBiteMap />;

      case 'impact':
        return <ImpactDashboard />;

      case 'settings':
        return <SettingsView />;

      case 'fpu_production':
      case 'fpu_inventory':
        return <FoodProcessingDashboard />;

      case 'distribution':
        return <NgoDashboard />;

      case 'admin_orgs':
      case 'admin_kitchens':
      case 'admin_fpu':
      case 'admin_ngos':
      case 'admin_users':
        return <AdminDashboard />;

      default:
        if (currentRole === 'ngo_food_bank') return <NgoDashboard />;
        if (currentRole === 'food_processing_unit') return <FoodProcessingDashboard />;
        if (currentRole === 'pickup_partner') return <PickupManagementView />;
        if (currentRole === 'administrator') return <AdminDashboard />;
        return <KitchenDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Primary Navigation Bar */}
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main App Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Role-Specific Sidebar */}
        <Sidebar
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderCurrentView()}</div>
        </main>
      </div>

      {/* Floating SaveBite AI Drawer */}
      <SaveBiteAiAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Floating Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SaveBiteProvider>
      <AppContent />
    </SaveBiteProvider>
  );
}
