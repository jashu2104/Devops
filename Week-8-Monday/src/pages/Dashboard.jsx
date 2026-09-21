import React from 'react';
import { Summary } from '../components/Summary';
import { AttendanceChart } from '../components/AttendanceChart';
import { RecentActivity } from '../components/RecentActivity';
import { StudentList } from '../components/StudentList';
import { CheckSquare, RotateCcw, Download, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { exportToCSV } from '../utils/export';

export const Dashboard = ({
  summary,
  branchStats,
  students,
  activities,
  isDark,
  threshold,
  facultyName = 'Dr. Priya Sharma',
  onMarkPresent,
  onMarkAbsent,
  onViewDetails,
  onOpenResetModal,
  onNavigate
}) => {
  // Quick subset of students for dashboard view
  const recentStudents = students.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome & Quick Action Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-2 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Faculty Dashboard Active
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {facultyName}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
              Here is your daily attendance summary for B.Tech 4th Semester. You have{' '}
              <strong className="text-amber-300 underline font-semibold">
                {summary.notEligibleCount} students
              </strong>{' '}
              currently below the {threshold}% eligibility threshold.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => onNavigate('attendance')}
              className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              Mark Attendance
            </button>

            <button
              onClick={onOpenResetModal}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Today
            </button>

            <button
              onClick={() => exportToCSV(students, threshold)}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              title="Export CSV Report"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Decorative background glow circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Cards Section */}
      <Summary summary={summary} threshold={threshold} />

      {/* Analytics Overview Section */}
      <AttendanceChart summary={summary} branchStats={branchStats} isDark={isDark} />

      {/* Bottom Grid: Quick Student Directory + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Student Quick Directory */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Class Attendance Quick List
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quickly toggle status or inspect recent student records.
              </p>
            </div>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All {students.length} Students <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <StudentList
            students={recentStudents}
            threshold={threshold}
            onMarkPresent={onMarkPresent}
            onMarkAbsent={onMarkAbsent}
            onViewDetails={onViewDetails}
            viewMode="table"
          />
        </div>

        {/* Recent Activity Log Feed */}
        <div>
          <RecentActivity activities={activities} />
        </div>

      </div>

    </div>
  );
};
