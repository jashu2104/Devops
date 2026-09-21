import React from 'react';
import { Check, X, ShieldCheck, AlertTriangle } from 'lucide-react';
import { calculatePercentage, isEligible } from '../utils/attendance';

export const Attendance = ({
  student,
  threshold = 75,
  onMarkPresent,
  onMarkAbsent,
  compact = false
}) => {
  const { attendedClasses = 0, totalClasses = 0, todayStatus = null } = student || {};
  const percentage = calculatePercentage(attendedClasses, totalClasses);
  const eligible = isEligible(attendedClasses, totalClasses, threshold);

  return (
    <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'}`}>
      
      {/* Percentage & Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {percentage}% Attendance
          </span>
          <span className="text-[11px] text-slate-400">
            {attendedClasses}/{totalClasses} Classes
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              eligible ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>
      </div>

      {/* Eligibility Badge + Present / Absent Controls */}
      <div className="flex items-center justify-between gap-2">
        
        {/* Badge */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
            eligible
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
          }`}
        >
          {eligible ? (
            <>
              <ShieldCheck className="w-3 h-3" /> Eligible
            </>
          ) : (
            <>
              <AlertTriangle className="w-3 h-3" /> Not Eligible
            </>
          )}
        </span>

        {/* Action Toggle Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onMarkPresent && onMarkPresent(student.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center gap-1 ${
              todayStatus === 'present'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Present</span>
          </button>

          <button
            onClick={() => onMarkAbsent && onMarkAbsent(student.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center gap-1 ${
              todayStatus === 'absent'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-500/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            <span>Absent</span>
          </button>
        </div>

      </div>

    </div>
  );
};
