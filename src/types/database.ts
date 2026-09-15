/**
 * SaveBite Core Database Schema & Domain Types
 * Enterprise food waste management and redistribution platform
 */

export type UserRole = 
  | 'kitchen_manager' 
  | 'food_processing_unit' 
  | 'ngo_food_bank' 
  | 'pickup_partner' 
  | 'administrator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  phone: string;
  avatarUrl?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'institutional_kitchen' | 'college_hostel' | 'hospital' | 'hotel' | 'corporate_cafeteria' | 'food_processing_unit' | 'ngo' | 'food_bank' | 'logistics_partner';
  address: string;
  lat: number;
  lng: number;
  contactPerson: string;
  phone: string;
  verified: boolean;
  dailyCapacity?: number;
}

export interface Kitchen {
  id: string;
  organizationId: string;
  name: string;
  type: 'Hostel Mess' | 'Hospital Dining' | 'Corporate Cafeteria' | 'Campus Central';
  chefInCharge: string;
  averageDailyMeals: number;
  fssaiLicense: string;
  operatingHours: string;
}

export interface FoodProductionRecord {
  id: string;
  kitchenId: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  menuItems: string[];
  quantityPrepared: number; // in meals/servings
  batchTime: string;
  targetAttendance: number;
  temperatureAtPrep: number; // in °C
  notes?: string;
}

export interface FoodConsumptionRecord {
  id: string;
  productionRecordId: string;
  kitchenId: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  quantityConsumed: number;
  peopleServed: number;
  surplusRemaining: number;
  unavoidableWasteKg: number;
  recordedAt: string;
  feedbackScore?: number;
}

export type WasteCategory = 
  | 'Overproduction'
  | 'Plate Waste'
  | 'Spoilage'
  | 'Preparation Waste'
  | 'Expired Food';

export interface FoodWasteRecord {
  id: string;
  kitchenId: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  category: WasteCategory;
  quantityKg: number;
  estimatedCostLoss: number; // in ₹
  primaryCause: string;
  preventativeAction: string;
  loggedBy: string;
}

export interface FoodInventoryItem {
  id: string;
  orgId: string;
  productName: string;
  category: 'Raw Grains' | 'Dairy' | 'Produce' | 'Cooked Semi-finished' | 'Packaged Goods';
  batchNumber: string;
  quantity: number;
  unit: 'kg' | 'liters' | 'packets' | 'crates';
  receivedDate: string;
  expiryDate: string;
  storageTemp: 'Ambient' | 'Refrigerated 4°C' | 'Frozen -18°C' | 'Warm 65°C';
  daysToExpiry: number;
  nearExpiryAlert: boolean;
}

export type SurplusStatus = 
  | 'Available'
  | 'Matched'
  | 'Pickup Scheduled'
  | 'Collected'
  | 'Redistributed';

export interface SurplusListing {
  id: string;
  kitchenId: string;
  kitchenName: string;
  foodName: string;
  category: 'Cooked Meals' | 'Bakery & Bread' | 'Curry & Rice' | 'Fresh Fruits/Veg' | 'Packaged Snacks';
  quantityMeals: number;
  quantityKg: number;
  dietaryType: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Jain';
  preparationTime: string;
  availableUntil: string;
  storageCondition: 'Hot Held (65°C+)' | 'Refrigerated (4°C)' | 'Ambient Room Temp';
  pickupLocation: string;
  pickupLat: number;
  pickupLng: number;
  status: SurplusStatus;
  matchedRecipientId?: string;
  matchedRecipientName?: string;
  pickupId?: string;
  notes?: string;
  foodSafetyVerified: boolean;
  createdAt: string;
}

export interface NGOPartner {
  id: string;
  name: string;
  type: 'Food Bank' | 'Children Shelter' | 'Elderly Care' | 'Community Kitchen' | 'Slum Relief';
  address: string;
  lat: number;
  lng: number;
  distanceKm: number;
  intakeCapacityMeals: number;
  activeVolunteerDrivers: number;
  pickupAvailability: 'Available' | 'Unavailable' | 'Limited';
  operatingHours: string;
  matchScore: number;
  matchReason?: string;
  verifiedFSSAI: boolean;
}

export interface NGORecommendation {
  ngoId: string;
  name: string;
  distanceKm: number;
  capacityMeals: number;
  pickupAvailable: boolean;
  matchScore: number;
  etaMinutes: number;
  urgencyScore: 'High' | 'Medium' | 'Low';
  rationale: string;
}

export type PickupStatus = 
  | 'Pending'
  | 'Assigned'
  | 'On the Way'
  | 'Collected'
  | 'Delivered';

export interface PickupOrder {
  id: string;
  surplusListingId: string;
  foodDescription: string;
  quantityMeals: number;
  pickupLocation: string;
  destinationName: string;
  destinationAddress: string;
  pickupTime: string;
  assignedPartner: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  temperatureAtPickup?: number;
  status: PickupStatus;
  estimatedArrivalMin: number;
  timeline: {
    status: PickupStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface AIPredictionResult {
  id: string;
  date: string;
  mealType: string;
  expectedPeople: number;
  menu: string;
  dayOfWeek: string;
  weatherCondition: string;
  specialEvent: string;
  predictedDemand: number;
  recommendedPrep: number;
  expectedSurplus: number;
  expectedWasteKg: number;
  confidenceScore: number;
  rationale: string;
  suggestedBatchTimes: string[];
}

export interface AppNotification {
  id: string;
  type: 'surplus' | 'match' | 'pickup' | 'waste_alert' | 'ai_insight' | 'alert' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: string;
  timeAgo?: string;
  read: boolean;
  actionRoute?: string;
  linkTab?: string;
}

export interface ImpactMetrics {
  totalMealsSaved: number;
  totalFoodRedistributedMeals: number;
  foodWasteReducedKg: number;
  moneySavedRupees: number;
  co2EmissionsPreventedKg: number;
  waterSavedLiters: number;
  landfillsAvoidedTons: number;
  activeKitchens: number;
  activeProcessingUnits: number;
  activeNGOs: number;
  activePickupPartners: number;
}
