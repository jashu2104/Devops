import React from 'react';
import { AttendanceChart } from '../components/AttendanceChart';
import { Download, Award, AlertTriangle, TrendingUp, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import { exportToCSV } from '../utils/export';
import { calculatePercentage, isEligible } from '../utils/attendance';

export const ReportsPage = ({
  students,
  summary,
  branchStats,
  threshold,
  isDark,
  onViewDetails
}) => {
  // Sort top performers and bottom at-risk students
  const sortedStudents = [...students].sort((a, b) => {
    const pctA = calculatePercentage(a.attendedClasses, a.totalClasses);
    const pctB = calculatePercentage(b.attendedClasses, b.totalClasses);
    return pctB - pctA;
  });

  const topPerformers = sortedStudents.slice(0, 5);
  const atRiskStudents = sortedStudents.filter(
    (s) => !isEligible(s.attendedClasses, s.totalClasses, threshold)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Attendance Reports & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Department-level insights, eligibility tracking, and academic performance reports.
          </p>
        </div>

        <button
          onClick={() => exportToCSV(students, threshold, 'full_academic_attendance_report.csv')}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          Export Full CSV Report
        </button>
      </div>

      {/* Analytics Visualization Charts */}
      <AttendanceChart summary={summary} branchStats={branchStats} isDark={isDark} />

      {/* Department Breakdown Table */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Department-Wise Attendance Performance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated attendance and eligibility data per branch.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4">Department / Branch</th>
                <th className="py-3 px-4">Total Students</th>
                <th className="py-3 px-4">Average Attendance %</th>
                <th className="py-3 px-4">Eligible Students (≥{threshold}%)</th>
                <th className="py-3 px-4">Eligibility Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {branchStats.map((b) => (
                <tr key={b.branch} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {b.branch}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {b.totalStudents} Students
                  </td>
                  <td className="py-3 px-4 font-semibold text-indigo-600 dark:text-indigo-400">
                    {b.avgAttendance}%
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {b.eligible} / {b.totalStudents}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {b.eligiblePercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Grid: Top Performers vs At-Risk (<75%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* At-Risk Students Below 75% Threshold */}
        <div className="glass-card p-5 space-y-4 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Students Below {threshold}% Threshold ({atRiskStudents.length})
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
              Needs Attention
            </span>
          </div>

          <div className="space-y-3">
            {atRiskStudents.length > 0 ? (
              atRiskStudents.map((s) => {
                const pct = calculatePercentage(s.attendedClasses, s.totalClasses);
                return (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {s.name} ({s.rollNumber})
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {s.branch} • {s.attendedClasses}/{s.totalClasses} classes attended
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
                        {pct}%
                      </span>
                      <button
                        onClick={() => onViewDetails(s)}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                🎉 Great job! All students are currently above the {threshold}% threshold.
              </div>
            )}
          </div>
        </div>

        {/* Top Performing Attendance Students */}
        <div className="glass-card p-5 space-y-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Top Attendance Performers
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Honors
            </span>
          </div>

          <div className="space-y-3">
            {topPerformers.map((s) => {
              const pct = calculatePercentage(s.attendedClasses, s.totalClasses);
              return (
                <div
                  key={s.id}
                  className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      {s.name} ({s.rollNumber})
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {s.branch} • {s.attendedClasses}/{s.totalClasses} classes attended
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      {pct}%
                    </span>
                    <button
                      onClick={() => onViewDetails(s)}
                      className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
