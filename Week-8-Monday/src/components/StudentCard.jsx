import React from 'react';
import { Eye, User } from 'lucide-react';
import { Attendance } from './Attendance';

export const StudentCard = ({
  student,
  threshold = 75,
  onMarkPresent,
  onMarkAbsent,
  onViewDetails
}) => {
  const { name, rollNumber, branch, todayStatus } = student;

  // Get student initials for avatar
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'ST';

  return (
    <div className={`glass-card-hover p-5 flex flex-col justify-between relative ${
      student.todayStatus === 'absent' ? 'border-l-4 border-l-rose-500' : ''
    }`}>
      
      <div>
        {/* Header: Avatar, Name, Roll Number, Branch */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              {initials}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                {name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {rollNumber}
                </span>
                <span>•</span>
                <span className="font-medium">{branch}</span>
              </div>
            </div>
          </div>

          {/* Today's Status Indicator Badge */}
          {todayStatus ? (
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                todayStatus === 'present'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {todayStatus}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400">
              Unmarked
            </span>
          )}
        </div>

        {/* Embedded Reusable Attendance Component */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <Attendance
            student={student}
            threshold={threshold}
            onMarkPresent={onMarkPresent}
            onMarkAbsent={onMarkAbsent}
          />
        </div>
      </div>

      {/* View Details Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button
          onClick={() => onViewDetails && onViewDetails(student)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View Full Breakdown
        </button>
      </div>

    </div>
  );
};
