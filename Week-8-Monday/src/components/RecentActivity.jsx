import React from 'react';
import { Activity, CheckCircle2, XCircle, RotateCcw, Info } from 'lucide-react';

export const RecentActivity = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'present':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'reset':
        return <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-indigo-500 shrink-0" />;
    }
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Recent Activity
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Live Feed</span>
      </div>

      <div className="mt-4 space-y-3">
        {activities.length > 0 ? (
          activities.slice(0, 7).map((act) => (
            <div
              key={act.id}
              className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 hover:bg-slate-100/80 dark:hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {getIcon(act.type)}
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {act.text}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                {act.time}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-slate-400 text-xs">
            No recent activity recorded today.
          </div>
        )}
      </div>
    </div>
  );
};
