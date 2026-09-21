import React from 'react';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>

      {/* List Skeleton */}
      <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
    </div>
  );
};
