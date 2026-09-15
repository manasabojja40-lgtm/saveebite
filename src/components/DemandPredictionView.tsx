import React, { useState } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { predictDemand, PredictionInput } from '../services/aiService';
import { AIPredictionResult } from '../types/database';
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Calendar,
  CloudSun,
  Users,
  Utensils,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const DemandPredictionView: React.FC = () => {
  const { setActiveTab } = useSaveBite();

  const [input, setInput] = useState<PredictionInput>({
    expectedPeople: 850,
    mealType: 'Lunch',
    menu: 'Rajma Masala, Steamed Basmati Rice, Tawa Roti & Boondi Raita',
    dayOfWeek: 'Wednesday',
    previousConsumption: 820,
    specialEvent: 'Inter-College Sports Meet',
    isHoliday: false,
    weather: 'Sunny',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<AIPredictionResult>({
    id: 'pred-init',
    date: 'Tomorrow',
    mealType: 'Lunch',
    expectedPeople: 850,
    menu: 'Rajma Masala, Steamed Basmati Rice, Tawa Roti & Boondi Raita',
    dayOfWeek: 'Wednesday',
    weatherCondition: 'Sunny',
    specialEvent: 'Inter-College Sports Meet',
    predictedDemand: 865,
    recommendedPrep: 890,
    expectedSurplus: 25,
    expectedWasteKg: 8,
    confidenceScore: 94.6,
    rationale:
      'The prediction uses historical consumption, expected attendance (850), menu patterns, day of week (Wednesday), event uplift (Inter-College Sports Meet), and previous surplus data. A 2.8% safety buffer (890 meals) prevents student stockouts while capping unavoidable leftovers under 25 meals for planned redistribution.',
    suggestedBatchTimes: [
      'Batch 1 (65% volume - 580 meals): Prep at 11:15 AM',
      'Batch 2 (35% demand-tuned - 310 meals): Stagger at 1:00 PM',
    ],
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await predictDemand(input);
      setPrediction(res);
    } finally {
      setIsLoading(false);
    }
  };

  // Historical vs Predicted chart data
  const chartPoints = [
    { day: 'Thu', actual: 810, predicted: 825 },
    { day: 'Fri', actual: 780, predicted: 790 },
    { day: 'Sat', actual: 620, predicted: 635 },
    { day: 'Sun', actual: 590, predicted: 600 },
    { day: 'Mon', actual: 840, predicted: 850 },
    { day: 'Tue', actual: 875, predicted: 870 },
    { day: 'Tomorrow', actual: null, predicted: prediction.predictedDemand },
  ];

  const maxVal = 1000;
  const chartHeight = 160;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              AI Food Demand Prediction & Buffer Optimization
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prevent overproduction at source before cooking begins. Powered by multi-variable predictive regression models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            AI Model Active (Confidence: {prediction.confidenceScore}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Parameters Input */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Demand Input Variables
            </h2>
            <span className="text-[11px] text-slate-400">AI Demand Simulator</span>
          </div>

          <form onSubmit={handlePredict} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Expected Diners / Footfall
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={input.expectedPeople}
                  onChange={(e) => setInput({ ...input, expectedPeople: Number(e.target.value) })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  min="50"
                  max="5000"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meal Service</label>
                <select
                  value={input.mealType}
                  onChange={(e) => setInput({ ...input, mealType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Day of Week</label>
                <select
                  value={input.dayOfWeek}
                  onChange={(e) => setInput({ ...input, dayOfWeek: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Planned Menu Recipe</label>
              <div className="relative">
                <Utensils className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={input.menu}
                  onChange={(e) => setInput({ ...input, menu: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prev Consumption</label>
                <input
                  type="number"
                  value={input.previousConsumption}
                  onChange={(e) => setInput({ ...input, previousConsumption: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Weather Forecast</label>
                <select
                  value={input.weather}
                  onChange={(e) => setInput({ ...input, weather: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="Sunny">Sunny / Clear</option>
                  <option value="Heavy Rain">Heavy Rain (Lowers footfall)</option>
                  <option value="Humid">Humid & Cloudy</option>
                  <option value="Chilly">Chilly / Cold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Special Campus Event</label>
              <select
                value={input.specialEvent}
                onChange={(e) => setInput({ ...input, specialEvent: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="None">None (Standard Schedule)</option>
                <option value="Inter-College Sports Meet">Inter-College Sports Meet (+8% diners)</option>
                <option value="Annual Cultural Festival">Annual Cultural Festival (+15% diners)</option>
                <option value="Semester Final Exams">Semester Final Exams (-12% dining time)</option>
                <option value="Guest Academic Symposium">Guest Academic Symposium</option>
              </select>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="holiday"
                checked={input.isHoliday}
                onChange={(e) => setInput({ ...input, isHoliday: e.target.checked })}
                className="rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
              />
              <label htmlFor="holiday" className="text-slate-600 font-medium cursor-pointer">
                Official Holiday / Long Weekend (-18% attendance factor)
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating AI Neural Forecast...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  Run AI Demand Prediction
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Panel: AI Predictions Output & Historical Graph */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Result Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Predicted Demand */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                Predicted Demand
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-950 mt-1">
                {prediction.predictedDemand}
              </div>
              <div className="text-[11px] text-sky-700 mt-1 font-semibold">
                Expected actual meals
              </div>
            </div>

            {/* Recommended Prep */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Recommended Prep
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
                {prediction.recommendedPrep}
              </div>
              <div className="text-[11px] text-emerald-700 mt-1 font-semibold">
                Includes +2.8% lean buffer
              </div>
            </div>

            {/* Expected Surplus */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Expected Surplus
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-1">
                {prediction.expectedSurplus}
              </div>
              <div className="text-[11px] text-amber-700 mt-1 font-semibold">
                Pre-routed to NGOs
              </div>
            </div>

            {/* Expected Waste */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                Expected Waste
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-950 mt-1">
                {prediction.expectedWasteKg} <span className="text-sm font-semibold">kg</span>
              </div>
              <div className="text-[11px] text-rose-700 mt-1 font-semibold">
                Unavoidable scrap only
              </div>
            </div>
          </div>

          {/* AI Explanation Card */}
          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                AI Prediction Explanation & Model Rationale
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-sky-50/50 p-3.5 rounded-xl border border-sky-100">
              “{prediction.rationale}”
            </p>

            {/* Staggered Batch Recommendations */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                Recommended Staggered Cooking Schedule:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {prediction.suggestedBatchTimes.map((batch, i) => (
                  <div key={i} className="text-xs bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-700 font-medium">
                    {batch}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Consumption vs AI Predicted Demand Graph */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Historical Consumption vs AI Predicted Demand
                </h3>
                <p className="text-[11px] text-slate-500">
                  Past 6 days actual consumption validated against model forecasts + tomorrow's projection
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-sky-600" />
                  <span className="text-slate-600 font-medium">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 border border-dashed border-emerald-700" />
                  <span className="text-slate-600 font-medium">AI Predicted</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Chart */}
            <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-200">
              {chartPoints.map((pt, idx) => {
                const actualHeight = pt.actual ? (pt.actual / maxVal) * chartHeight : 0;
                const predHeight = (pt.predicted / maxVal) * chartHeight;
                const isTarget = pt.day === 'Tomorrow';

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                      {pt.day}: {pt.actual ? `Actual: ${pt.actual} | ` : ''}Pred: {pt.predicted}
                    </div>

                    <div className="w-full max-w-[42px] flex items-end justify-center gap-1 h-full">
                      {pt.actual && (
                        <div
                          style={{ height: `${actualHeight}px` }}
                          className="w-1/2 bg-sky-600 rounded-t-md transition-all group-hover:bg-sky-700"
                        />
                      )}
                      <div
                        style={{ height: `${predHeight}px` }}
                        className={`w-1/2 rounded-t-md transition-all ${
                          isTarget
                            ? 'bg-emerald-500 border-2 border-dashed border-emerald-600 animate-pulse'
                            : 'bg-emerald-400 group-hover:bg-emerald-500'
                        }`}
                      />
                    </div>
                    <span className={`text-[11px] font-semibold ${isTarget ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                      {pt.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Mean Absolute Percentage Error (MAPE): <strong className="text-slate-800">2.4%</strong> (High Accuracy)
              </div>
              <button
                onClick={() => {
                  setActiveTab('production');
                }}
                className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors"
              >
                Apply to Production Schedule
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
