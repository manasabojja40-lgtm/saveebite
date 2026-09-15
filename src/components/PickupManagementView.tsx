import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { PickupOrder, PickupStatus } from '../types/database';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Thermometer,
  ShieldCheck,
  ArrowRight,
  Phone,
  Navigation,
} from 'lucide-react';

export const PickupManagementView: React.FC = () => {
  const { pickupOrders, updatePickupStatus, setActiveTab } = useSaveBite();
  const [selectedPickup, setSelectedPickup] = useState<PickupOrder>(pickupOrders[0]);

  const statusSteps: PickupStatus[] = [
    'Pending',
    'Assigned',
    'On the Way',
    'Collected',
    'Delivered',
  ];

  const handleAdvanceStatus = (orderId: string, currentStatus: PickupStatus) => {
    const currentIndex = statusSteps.indexOf(currentStatus);
    if (currentIndex < statusSteps.length - 1) {
      const nextStatus = statusSteps[currentIndex + 1];
      updatePickupStatus(orderId, nextStatus);
      if (selectedPickup.id === orderId) {
        setSelectedPickup({ ...selectedPickup, status: nextStatus });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Pickup Fleet Management & Dispatch Tracking
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time cold-chain tracking for volunteer food transport and NGO delivery.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('map');
          }}
          className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" />
          View Live GPS Route Map
        </button>
      </div>

      {/* Orders List & Active Order Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pickup Orders List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Active Dispatches ({pickupOrders.length})
          </div>

          {pickupOrders.map((order) => {
            const isSelected = selectedPickup.id === order.id;

            return (
              <div
                key={order.id}
                onClick={() => setSelectedPickup(order)}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/20'
                    : 'border-slate-200/80 hover:border-sky-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-800">
                    {order.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Collected'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 mt-2">
                  {order.foodDescription} ({order.quantityMeals} meals)
                </div>

                <div className="text-[11px] text-slate-500 mt-1 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span className="truncate">From: {order.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">To: {order.destinationName}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Driver: <strong className="text-slate-700">{order.driverName}</strong></span>
                  <span className="font-semibold text-sky-700">ETA: ~{order.estimatedArrivalMin} mins</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Order Inspection & Timeline Advance */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  {selectedPickup.id}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Scheduled: {selectedPickup.pickupTime}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {selectedPickup.foodDescription}
              </h2>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">
                Volume: <strong>{selectedPickup.quantityMeals} meals</strong> ({selectedPickup.quantityKg} kg)
              </div>
            </div>

            <button
              onClick={() => handleAdvanceStatus(selectedPickup.id, selectedPickup.status)}
              disabled={selectedPickup.status === 'Delivered'}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Advance Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Delivery Timeline */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">
              Visual Dispatch Timeline & Milestones
            </div>

            <div className="relative flex items-center justify-between">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />

              {statusSteps.map((step, idx) => {
                const stepIndex = statusSteps.indexOf(selectedPickup.status);
                const isPassed = idx <= stepIndex;
                const isCurrent = idx === stepIndex;

                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-1.5 bg-slate-50 px-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-sky-600 text-white ring-4 ring-sky-100 animate-pulse'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-semibold text-center whitespace-nowrap ${
                        isCurrent
                          ? 'text-sky-800 font-bold'
                          : isPassed
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dispatch Particulars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Origin & Destination */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Pickup Location (Origin)</div>
                <div className="font-semibold text-slate-800 mt-0.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{selectedPickup.pickupLocation}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Delivery Destination</div>
                <div className="font-semibold text-slate-800 mt-0.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{selectedPickup.destinationName} ({selectedPickup.destinationAddress})</span>
                </div>
              </div>
            </div>

            {/* Logistics & Cold-Chain */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned Driver & Vehicle</div>
                <div className="font-semibold text-slate-800 mt-0.5 flex items-center justify-between">
                  <span>{selectedPickup.driverName} ({selectedPickup.vehicleNumber})</span>
                  <a
                    href={`tel:${selectedPickup.driverPhone}`}
                    className="text-sky-600 hover:text-sky-800 flex items-center gap-1 font-bold"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </a>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Cold-Chain Telemetry</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 rounded bg-sky-100 text-sky-800 font-bold flex items-center gap-1 text-[11px]">
                    <Thermometer className="w-3.5 h-3.5 text-sky-600" />
                    {selectedPickup.temperatureReading}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Hygienic Safe Threshold
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
