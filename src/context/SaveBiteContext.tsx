import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  SurplusListing,
  PickupOrder,
  FoodWasteRecord,
  FoodProductionRecord,
  FoodConsumptionRecord,
  AppNotification,
  ImpactMetrics,
  FoodInventoryItem,
  NGOPartner,
  PickupStatus,
} from '../types/database';
import {
  INITIAL_USERS,
  INITIAL_SURPLUS_LISTINGS,
  INITIAL_PICKUPS,
  INITIAL_NOTIFICATIONS,
  INITIAL_IMPACT_METRICS,
  INITIAL_WASTE_RECORDS,
  INITIAL_INVENTORY,
  INITIAL_NGO_PARTNERS,
} from '../services/dataStore';

interface DemoStep {
  stepNumber: number;
  title: string;
  description: string;
  targetRole: UserRole;
  targetTab: string;
  actionHint?: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Step 1: Kitchen Manager View',
    description: 'Inspect today\'s operational KPIs and AI surplus advisory.',
    targetRole: 'kitchen_manager',
    targetTab: 'dashboard',
    actionHint: 'View KPIs & Today\'s AI Insight',
  },
  {
    stepNumber: 2,
    title: 'Step 2: Today\'s Dashboard Insights',
    description: 'Notice: Prepared 1,000 | Consumed 875 | Surplus 125 meals.',
    targetRole: 'kitchen_manager',
    targetTab: 'dashboard',
    actionHint: 'Review live preparation vs consumption balance',
  },
  {
    stepNumber: 3,
    title: 'Step 3: AI Demand Prediction',
    description: 'Open the predictive intelligence engine.',
    targetRole: 'kitchen_manager',
    targetTab: 'prediction',
    actionHint: 'Configure expected attendees, menu, weather & events',
  },
  {
    stepNumber: 4,
    title: 'Step 4: Generate Recommendation',
    description: 'Generate tomorrow\'s recommended 890 meals with lean buffer.',
    targetRole: 'kitchen_manager',
    targetTab: 'prediction',
    actionHint: 'Click "Run AI Demand Prediction"',
  },
  {
    stepNumber: 5,
    title: 'Step 5: Record Food Production & Consumption',
    description: 'Log actual meals consumed and detect residual quantities.',
    targetRole: 'kitchen_manager',
    targetTab: 'production',
    actionHint: 'Review Prepared → Consumed → Surplus flow',
  },
  {
    stepNumber: 6,
    title: 'Step 6: Detected Surplus Analysis',
    description: 'Review the 90-125 safe surplus meals ready for redistribution.',
    targetRole: 'kitchen_manager',
    targetTab: 'surplus',
    actionHint: 'Examine safe food storage window (hot-held 65°C+)',
  },
  {
    stepNumber: 7,
    title: 'Step 7: Create Surplus Listing',
    description: 'Post compliant surplus with food safety validation.',
    targetRole: 'kitchen_manager',
    targetTab: 'surplus',
    actionHint: 'Click "List New Surplus"',
  },
  {
    stepNumber: 8,
    title: 'Step 8: AI Smart Redistribution',
    description: 'Open AI matching engine to rank nearby food banks.',
    targetRole: 'kitchen_manager',
    targetTab: 'redistribution',
    actionHint: 'See multi-variable ranking (Distance, Capacity, Pickup)',
  },
  {
    stepNumber: 9,
    title: 'Step 9: AI Ranked Recommendations',
    description: 'Hope Food Bank scored 96% Match with 2.4 km distance.',
    targetRole: 'kitchen_manager',
    targetTab: 'redistribution',
    actionHint: 'Review "Why this match?" criteria',
  },
  {
    stepNumber: 10,
    title: 'Step 10: Match Partner & Confirm',
    description: 'Confirm match with Hope Food Bank for 90 meals.',
    targetRole: 'kitchen_manager',
    targetTab: 'redistribution',
    actionHint: 'Click "Match Partner" on top ranked recipient',
  },
  {
    stepNumber: 11,
    title: 'Step 11: Schedule & Dispatch Pickup',
    description: 'Assign SwiftLogistics temperature-controlled electric van.',
    targetRole: 'kitchen_manager',
    targetTab: 'pickups',
    actionHint: 'Track pickup timeline & driver assignment',
  },
  {
    stepNumber: 12,
    title: 'Step 12: Collect & Deliver Verification',
    description: 'Advance timeline to "Collected" and "Delivered".',
    targetRole: 'pickup_partner',
    targetTab: 'pickups',
    actionHint: 'Advance pickup status through the verified chain',
  },
  {
    stepNumber: 13,
    title: 'Step 13: NGO Distribution Verification',
    description: 'Switch to NGO perspective to confirm meals served.',
    targetRole: 'ngo_food_bank',
    targetTab: 'dashboard',
    actionHint: 'View accepted donations & distributed meal count',
  },
  {
    stepNumber: 14,
    title: 'Step 14: Sustainability & Impact Dashboard',
    description: 'Measure 12,450 meals saved, 3,280 kg waste cut, ₹1.85L saved.',
    targetRole: 'kitchen_manager',
    targetTab: 'impact',
    actionHint: 'Explore carbon, water, and economic savings counters',
  },
  {
    stepNumber: 15,
    title: 'Step 15: Admin Ecosystem Dashboard',
    description: 'Complete high-level view of kitchens, FPUs, NGOs & fleet.',
    targetRole: 'administrator',
    targetTab: 'dashboard',
    actionHint: 'Review top performers and cross-city circular impact',
  },
];

interface SaveBiteContextType {
  currentUser: User;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  demoModeActive: boolean;
  setDemoModeActive: (val: boolean) => void;
  currentDemoStep: number;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  jumpToDemoStep: (step: number) => void;
  
  // Data
  surplusListings: SurplusListing[];
  pickupOrders: PickupOrder[];
  wasteRecords: FoodWasteRecord[];
  notifications: AppNotification[];
  impactMetrics: ImpactMetrics;
  inventoryItems: FoodInventoryItem[];
  ngoPartners: NGOPartner[];
  
  // Kitchen today metrics
  kitchenKpis: {
    mealsPrepared: number;
    mealsConsumed: number;
    surplusMeals: number;
    wasteKg: number;
    redistributedMeals: number;
    moneySavedRupees: number;
    todayAiInsight: string;
  };

  // Admin and Impact ecosystem KPIs
  adminEcosystemKpis: {
    totalFoodSavedMeals: number;
    totalFoodRedistributedMeals: number;
    totalWasteReducedKg: number;
    totalMoneySavedRupees: number;
    co2AvoidedKg: number;
    waterSavedLiters: number;
    activeKitchens: number;
    activeProcessingUnits: number;
    activeNgos: number;
    activePickups: number;
  };

  // Actions
  addSurplusListing: (item: Omit<SurplusListing, 'id' | 'createdAt'>) => void;
  matchSurplusWithPartner: (surplusId: string, partnerId: string) => void;
  matchPartner: (surplusId: string, partnerId: string, partnerName?: string) => void;
  updatePickupStatus: (pickupId: string, status: PickupStatus, note?: string) => void;
  recordWaste: (record: Omit<FoodWasteRecord, 'id'>) => void;
  recordProductionAndConsumption: (prepared: number, consumed: number, meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks') => void;
  markNotificationRead: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const SaveBiteContext = createContext<SaveBiteContextType | undefined>(undefined);

export const SaveBiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('kitchen_manager');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [demoModeActive, setDemoModeActive] = useState<boolean>(false);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);

  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS.kitchen_manager);
  const [surplusListings, setSurplusListings] = useState<SurplusListing[]>(INITIAL_SURPLUS_LISTINGS);
  const [pickupOrders, setPickupOrders] = useState<PickupOrder[]>(INITIAL_PICKUPS);
  const [wasteRecords, setWasteRecords] = useState<FoodWasteRecord[]>(INITIAL_WASTE_RECORDS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics>(INITIAL_IMPACT_METRICS);
  const [inventoryItems, setInventoryItems] = useState<FoodInventoryItem[]>(INITIAL_INVENTORY);
  const [ngoPartners, setNgoPartners] = useState<NGOPartner[]>(INITIAL_NGO_PARTNERS);

  const [kitchenKpis, setKitchenKpis] = useState({
    mealsPrepared: 1000,
    mealsConsumed: 875,
    surplusMeals: 125,
    wasteKg: 35,
    redistributedMeals: 90,
    moneySavedRupees: 4850,
    todayAiInsight: "Today's surplus is 12% higher than the weekly average. Consider reducing tomorrow's preparation quantity.",
  });

  // Sync current user when role changes
  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(INITIAL_USERS[role]);
    setActiveTab('dashboard');
  };

  const jumpToDemoStep = (step: number) => {
    setCurrentDemoStep(step);
    const s = DEMO_STEPS.find((d) => d.stepNumber === step);
    if (s && s.targetTab) {
      setActiveTab(s.targetTab);
    }
  };

  const nextDemoStep = () => {
    if (currentDemoStep < DEMO_STEPS.length) {
      jumpToDemoStep(currentDemoStep + 1);
    }
  };

  const prevDemoStep = () => {
    if (currentDemoStep > 1) {
      jumpToDemoStep(currentDemoStep - 1);
    }
  };

  const addSurplusListing = (item: Omit<SurplusListing, 'id' | 'createdAt'>) => {
    const newListing: SurplusListing = {
      ...item,
      id: `surp-${Date.now()}`,
      createdAt: 'Just now',
    };
    setSurplusListings((prev) => [newListing, ...prev]);

    // Push notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'surplus',
      title: 'Surplus Listed Successfully',
      message: `${newListing.quantityMeals} meals of "${newListing.foodName}" queued for AI Smart Matching.`,
      timestamp: 'Just now',
      read: false,
      actionRoute: 'redistribution',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const matchSurplusWithPartner = (surplusId: string, partnerId: string) => {
    const partner = ngoPartners.find((p) => p.id === partnerId);
    const surplus = surplusListings.find((s) => s.id === surplusId);
    if (!partner || !surplus) return;

    // Update surplus status
    setSurplusListings((prev) =>
      prev.map((s) =>
        s.id === surplusId
          ? {
              ...s,
              status: 'Matched',
              matchedRecipientId: partner.id,
              matchedRecipientName: partner.name,
            }
          : s
      )
    );

    // Create a new pickup order
    const newPickup: PickupOrder = {
      id: `pk-${Math.floor(1000 + Math.random() * 9000)}`,
      surplusListingId: surplus.id,
      foodDescription: `${surplus.quantityMeals} ${surplus.dietaryType} Meals (${surplus.foodName})`,
      quantityMeals: surplus.quantityMeals,
      pickupLocation: surplus.pickupLocation,
      destinationName: partner.name,
      destinationAddress: partner.address,
      pickupTime: 'Within 45 mins',
      assignedPartner: 'SwiftLogistics Clean EV Van',
      driverName: 'Ramesh Patel',
      driverPhone: '+91 98222 33445',
      vehicleNumber: 'DL-01-EF-4290',
      temperatureAtPickup: 67.2,
      status: 'Assigned',
      estimatedArrivalMin: Math.round(partner.distanceKm * 4 + 10),
      timeline: [
        { status: 'Pending', timestamp: 'Just now', note: `AI matched with ${partner.name}` },
        { status: 'Assigned', timestamp: 'Just now', note: 'Driver Ramesh Patel assigned' },
      ],
    };

    setPickupOrders((prev) => [newPickup, ...prev]);

    // Update KPI
    setKitchenKpis((prev) => ({
      ...prev,
      redistributedMeals: prev.redistributedMeals + surplus.quantityMeals,
      moneySavedRupees: prev.moneySavedRupees + Math.round(surplus.quantityMeals * 45),
    }));

    // Update impact
    setImpactMetrics((prev) => ({
      ...prev,
      totalFoodRedistributedMeals: prev.totalFoodRedistributedMeals + surplus.quantityMeals,
      totalMealsSaved: prev.totalMealsSaved + surplus.quantityMeals,
      moneySavedRupees: prev.moneySavedRupees + Math.round(surplus.quantityMeals * 45),
      co2EmissionsPreventedKg: prev.co2EmissionsPreventedKg + Math.round(surplus.quantityMeals * 0.65),
    }));

    // Notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'match',
      title: 'Partner Matched!',
      message: `${partner.name} accepted ${surplus.quantityMeals} meals. Pickup dispatched with Ramesh Patel.`,
      timestamp: 'Just now',
      read: false,
      actionRoute: 'pickups',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updatePickupStatus = (pickupId: string, status: PickupStatus, note?: string) => {
    setPickupOrders((prev) =>
      prev.map((p) => {
        if (p.id === pickupId) {
          const newTimeline = [
            ...p.timeline,
            {
              status,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: note || `Status updated to ${status}`,
            },
          ];

          // If delivered, update associated surplus status
          if (status === 'Delivered') {
            setSurplusListings((sl) =>
              sl.map((s) => (s.id === p.surplusListingId ? { ...s, status: 'Redistributed' } : s))
            );
          } else if (status === 'Collected') {
            setSurplusListings((sl) =>
              sl.map((s) => (s.id === p.surplusListingId ? { ...s, status: 'Collected' } : s))
            );
          }

          return {
            ...p,
            status,
            estimatedArrivalMin: status === 'Delivered' ? 0 : Math.max(0, p.estimatedArrivalMin - 10),
            timeline: newTimeline,
          };
        }
        return p;
      })
    );
  };

  const recordWaste = (record: Omit<FoodWasteRecord, 'id'>) => {
    const newRecord: FoodWasteRecord = {
      ...record,
      id: `w-${Date.now()}`,
    };
    setWasteRecords((prev) => [newRecord, ...prev]);
    setKitchenKpis((prev) => ({
      ...prev,
      wasteKg: prev.wasteKg + record.quantityKg,
    }));
  };

  const recordProductionAndConsumption = (
    prepared: number,
    consumed: number,
    meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
  ) => {
    const surplus = Math.max(0, prepared - consumed);
    const waste = Math.round(consumed * 0.015 + surplus * 0.08);

    setKitchenKpis((prev) => ({
      ...prev,
      mealsPrepared: prepared,
      mealsConsumed: consumed,
      surplusMeals: surplus,
      wasteKg: waste,
      todayAiInsight: surplus > 80
        ? `High surplus (${surplus} meals) detected in ${meal}. Automated NGO redistribution initiated to prevent spoilage.`
        : `Healthy consumption efficiency (${Math.round((consumed / prepared) * 100)}%) for ${meal}. Overproduction minimal.`,
    }));

    // Auto notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'ai_insight',
        title: `${meal} Production Logged`,
        message: `${prepared} prepared, ${consumed} consumed. ${surplus} safe surplus meals available.`,
        timestamp: 'Just now',
        read: false,
        actionRoute: 'surplus',
      },
      ...prev,
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markNotificationAsRead = (id: string) => {
    markNotificationRead(id);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const matchPartner = (surplusId: string, partnerId: string, partnerName?: string) => {
    matchSurplusWithPartner(surplusId, partnerId);
  };

  const adminEcosystemKpis = {
    totalFoodSavedMeals: impactMetrics.totalMealsSaved,
    totalFoodRedistributedMeals: impactMetrics.totalFoodRedistributedMeals,
    totalWasteReducedKg: impactMetrics.foodWasteReducedKg,
    totalMoneySavedRupees: impactMetrics.moneySavedRupees,
    co2AvoidedKg: impactMetrics.co2EmissionsPreventedKg,
    waterSavedLiters: impactMetrics.waterSavedLiters,
    activeKitchens: impactMetrics.activeKitchens || 4,
    activeProcessingUnits: impactMetrics.activeProcessingUnits || 2,
    activeNgos: impactMetrics.activeNGOs || 6,
    activePickups: impactMetrics.activePickupPartners || 3,
  };

  return (
    <SaveBiteContext.Provider
      value={{
        currentUser,
        currentRole,
        setRole,
        activeTab,
        setActiveTab,
        isLoggedIn,
        setIsLoggedIn,
        demoModeActive,
        setDemoModeActive,
        currentDemoStep,
        nextDemoStep,
        prevDemoStep,
        jumpToDemoStep,
        surplusListings,
        pickupOrders,
        wasteRecords,
        notifications,
        impactMetrics,
        inventoryItems,
        ngoPartners,
        kitchenKpis,
        adminEcosystemKpis,
        addSurplusListing,
        matchSurplusWithPartner,
        matchPartner,
        updatePickupStatus,
        recordWaste,
        recordProductionAndConsumption,
        markNotificationRead,
        markNotificationAsRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </SaveBiteContext.Provider>
  );
};

export const useSaveBite = () => {
  const context = useContext(SaveBiteContext);
  if (!context) {
    throw new Error('useSaveBite must be used within a SaveBiteProvider');
  }
  return context;
};
