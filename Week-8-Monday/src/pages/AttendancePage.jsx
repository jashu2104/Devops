import React from 'react';
import { StudentList } from '../components/StudentList';
import { CheckSquare, RotateCcw, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export const AttendancePage = ({
  students,
  summary,
  threshold,
  onMarkPresent,
  onMarkAbsent,
  onViewDetails,
  onOpenResetModal,
  showToast
}) => {
  const {
    totalStudents = 0,
    presentToday = 0,
    absentToday = 0,
    unmarkedToday = 0,
    presentPercentage = 0,
    absentPercentage = 0,
  } = summary || {};

  const handleMarkAllPresent = () => {
    students.forEach((s) => {
      if (!s.todayStatus) {
        onMarkPresent(s.id);
      }
    });
    showToast('All unmarked students marked Present', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Today's Attendance Header & Live Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Daily Attendance Session
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Mark daily student presence, review class turnout, or reset today's session.
          </p>
        </div>

        {/* Batch Actions */}
        <div className="flex items-center gap-3">
          {unmarkedToday > 0 && (
            <button
              onClick={handleMarkAllPresent}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark All Unmarked Present
            </button>
          )}

          <button
            onClick={onOpenResetModal}
            className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Today
          </button>
        </div>
      </div>

      {/* Today's Attendance Live Summary Card */}
      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Present Pill */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase">
              Present Today
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100">
                {presentToday}
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                ({presentPercentage}%)
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Absent Pill */}
        <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-rose-800 dark:text-rose-300 uppercase">
              Absent Today
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-rose-900 dark:text-rose-100">
                {absentToday}
              </span>
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                ({absentPercentage}%)
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Not Marked Pill */}
        <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
              Not Marked
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {unmarkedToday}
              </span>
              <span className="text-xs text-slate-500">
                of {totalStudents}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Today's Turnout Progress Indicator */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
            <span>Class Turnout</span>
            <span>{presentPercentage}% Present</span>
          </div>

          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${presentPercentage}%` }}
              title={`Present: ${presentPercentage}%`}
            />
            <div
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${absentPercentage}%` }}
              title={`Absent: ${absentPercentage}%`}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Total: {totalStudents} Students</span>
            <span>Session: Today</span>
          </div>
        </div>

      </div>

      {/* Main Attendance Speed-Marking Table */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Class Attendance Sheet
        </h3>
        <StudentList
          students={students}
          threshold={threshold}
          onMarkPresent={onMarkPresent}
          onMarkAbsent={onMarkAbsent}
          onViewDetails={onViewDetails}
          viewMode="table"
        />
      </div>

    </div>
  );
};
