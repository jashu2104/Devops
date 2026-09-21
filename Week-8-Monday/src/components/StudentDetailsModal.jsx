import React from 'react';
import { X, Calendar, Check, ShieldCheck, AlertTriangle, Mail, Phone, BookOpen, Clock } from 'lucide-react';
import { calculatePercentage, isEligible } from '../utils/attendance';

export const StudentDetailsModal = ({
  student,
  isOpen,
  onClose,
  threshold = 75,
  onMarkPresent,
  onMarkAbsent
}) => {
  if (!isOpen || !student) return null;

  const {
    id,
    name,
    rollNumber,
    branch,
    semester = '4th Sem',
    email,
    phone,
    totalClasses,
    attendedClasses,
    todayStatus,
    history = []
  } = student;

  const percentage = calculatePercentage(attendedClasses, totalClasses);
  const eligible = isEligible(attendedClasses, totalClasses, threshold);

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'ST';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 text-white font-bold text-xl flex items-center justify-center shadow-inner">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{name}</h3>
                <span className="text-[10px] bg-indigo-500/40 border border-indigo-400/30 font-mono px-2 py-0.5 rounded-md">
                  {rollNumber}
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                {branch} • {semester}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Attendance Overview Card inside Modal */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                Overall Attendance
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {percentage}%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ({attendedClasses} / {totalClasses} classes)
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                Eligibility Status
              </p>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  eligible
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {eligible ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {eligible ? 'Eligible (≥75%)' : 'Not Eligible (<75%)'}
              </span>
            </div>
          </div>

          {/* Quick Mark Attendance Controls */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Today's Marked Status
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                Current: <strong className="text-slate-900 dark:text-white">{todayStatus || 'Not Marked'}</strong>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onMarkPresent(id)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 ${
                  todayStatus === 'present'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Check className="w-3.5 h-3.5" /> Present
              </button>
              <button
                onClick={() => onMarkAbsent(id)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 ${
                  todayStatus === 'absent'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
                }`}
              >
                <X className="w-3.5 h-3.5" /> Absent
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300 truncate">{email || `${rollNumber.toLowerCase()}@college.edu`}</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">{phone || '+91 98765 00000'}</span>
            </div>
          </div>

          {/* Attendance History Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" /> Recent Attendance History
            </h4>
            
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {history.length > 0 ? (
                    history.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {h.date}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              h.status === 'present'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {h.status === 'present' ? 'Present' : 'Absent'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-4 text-center text-slate-400 text-xs">
                        No previous session records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Close Breakdown
          </button>
        </div>

      </div>
    </div>
  );
};
