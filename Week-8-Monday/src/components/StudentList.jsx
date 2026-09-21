import React from 'react';
import { StudentCard } from './StudentCard';
import { calculatePercentage, isEligible } from '../utils/attendance';
import { Eye, Check, X, ShieldCheck, AlertTriangle, Users, SearchX } from 'lucide-react';

export const StudentList = ({
  students,
  threshold = 75,
  onMarkPresent,
  onMarkAbsent,
  onViewDetails,
  viewMode = 'table',
  onResetFilters
}) => {
  if (!students || students.length === 0) {
    return (
      <div className="glass-card p-12 text-center my-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No students found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
          Try searching with a different name or roll number, or adjust your branch and attendance filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  // Grid Mode View
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            threshold={threshold}
            onMarkPresent={onMarkPresent}
            onMarkAbsent={onMarkAbsent}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    );
  }

  // Premium Table View
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Roll Number</th>
              <th className="py-3.5 px-4">Branch</th>
              <th className="py-3.5 px-4">Attendance</th>
              <th className="py-3.5 px-4">Today's Status</th>
              <th className="py-3.5 px-4">Eligibility</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student) => {
              const { id, name, rollNumber, branch, attendedClasses, totalClasses, todayStatus } = student;
              const pct = calculatePercentage(attendedClasses, totalClasses);
              const eligible = isEligible(attendedClasses, totalClasses, threshold);

              const initials = name
                ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                : 'ST';

              return (
                <tr
                  key={id}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                    todayStatus === 'absent' ? 'bg-rose-50/30 dark:bg-rose-950/10' : ''
                  }`}
                >
                  {/* Student Avatar + Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          ID #{id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Roll Number */}
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {rollNumber}
                  </td>

                  {/* Branch */}
                  <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {branch}
                    </span>
                  </td>

                  {/* Attendance % + Bar */}
                  <td className="py-3.5 px-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {pct}%
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {attendedClasses}/{totalClasses}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            eligible ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Today's Status */}
                  <td className="py-3.5 px-4">
                    {todayStatus ? (
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          todayStatus === 'present'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {todayStatus}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium italic">
                        Not Marked
                      </span>
                    )}
                  </td>

                  {/* Eligibility */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        eligible
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
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
                  </td>

                  {/* Actions (Present / Absent / View) */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onMarkPresent(id)}
                        title="Mark Present"
                        className={`p-1.5 rounded-lg transition-colors ${
                          todayStatus === 'present'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-600'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onMarkAbsent(id)}
                        title="Mark Absent"
                        className={`p-1.5 rounded-lg transition-colors ${
                          todayStatus === 'absent'
                            ? 'bg-rose-600 text-white shadow'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 hover:text-rose-600'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onViewDetails(student)}
                        title="View Details"
                        className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
