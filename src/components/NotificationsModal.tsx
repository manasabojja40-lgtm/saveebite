import React from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import {
  Bell,
  X,
  AlertTriangle,
  PackageCheck,
  Truck,
  CheckCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const context = useSaveBite();
  const notifications = context.notifications || [];
  const markNotificationAsRead = context.markNotificationAsRead || context.markNotificationRead || (() => {});
  const markAllNotificationsRead = context.markAllNotificationsRead || (() => {});
  const setActiveTab = context.setActiveTab;

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-sky-100 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-sky-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-sky-600" />
            <h2 className="font-bold text-base text-slate-900">Notifications & Alerts</h2>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={() => markAllNotificationsRead()}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1 cursor-pointer mr-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2 opacity-50" />
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => {
              const isAlert = n.type === 'alert' || n.type === 'waste_alert';
              const isWarning = n.type === 'warning';
              const isSuccess = n.type === 'success' || n.type === 'match';
              const targetRoute = n.linkTab || n.actionRoute;

              return (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    n.read
                      ? 'bg-slate-50/70 border-slate-200/80 text-slate-600'
                      : 'bg-white border-sky-200 shadow-xs ring-1 ring-sky-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isWarning
                            ? 'bg-amber-100 text-amber-800'
                            : isAlert
                            ? 'bg-rose-100 text-rose-800'
                            : isSuccess
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {n.type.replace('_', ' ')}
                      </span>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {n.timeAgo || n.timestamp}
                    </span>
                  </div>

                  <div className="font-bold text-xs text-slate-900 mt-2">
                    {n.title}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {n.message}
                  </p>

                  {targetRoute && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(n.id);
                        if (setActiveTab) {
                          setActiveTab(targetRoute);
                        }
                        onClose();
                      }}
                      className="mt-2 text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View in Dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 text-center text-xs text-slate-400">
          SaveBite Smart Alert Network • Instant Event Dispatch
        </div>
      </div>
    </div>
  );
};
