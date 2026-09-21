import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

export const AttendanceChart = ({ summary, branchStats, isDark }) => {
  const {
    presentToday = 0,
    absentToday = 0,
    unmarkedToday = 0,
  } = summary || {};

  // Donut chart data for Today's Attendance
  const pieData = [
    { name: 'Present', value: presentToday, color: '#10b981' },
    { name: 'Absent', value: absentToday, color: '#ef4444' },
    { name: 'Not Marked', value: unmarkedToday, color: '#94a3b8' },
  ].filter(item => item.value > 0);

  // Custom tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs backdrop-blur-md">
          <p className="font-semibold border-b border-slate-700 pb-1 mb-1.5">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="flex items-center gap-2 my-0.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }}></span>
              <span className="text-slate-300">{entry.name}:</span>
              <span className="font-bold">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Main Bar Chart: Department/Branch Wise Average Attendance */}
      <div className="lg:col-span-2 glass-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Attendance Overview by Department
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Average attendance percentage and eligibility rate per branch.
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Live Analytics
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={branchStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis
                dataKey="branch"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={11}
                domain={[0, 100]}
                unit="%"
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
                formatter={(value) => <span className={isDark ? 'text-slate-300 font-medium' : 'text-slate-700 font-medium'}>{value}</span>}
              />
              <Bar dataKey="avgAttendance" name="Avg Attendance %" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
              <Bar dataKey="eligiblePercentage" name="Eligible % (>=75%)" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Today's Attendance Distribution */}
      <div className="glass-card p-5 flex flex-col justify-between">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <PieChartIcon className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Today's Attendance
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time status breakdown for current session.
          </p>
        </div>

        <div className="h-52 w-full flex items-center justify-center relative my-2">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Students`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-slate-400 text-xs">No data available</div>
          )}

          {/* Center text in donut chart */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {presentToday + absentToday}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Marked
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">Present</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">{presentToday} ({summary.presentPercentage}%)</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">Absent</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">{absentToday} ({summary.absentPercentage}%)</span>
          </div>
          {unmarkedToday > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">Not Marked</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{unmarkedToday}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
