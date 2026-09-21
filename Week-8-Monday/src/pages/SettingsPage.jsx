import React, { useState } from 'react';
import { Settings, Sun, Moon, Bell, Shield, Sliders, RefreshCw, CheckCircle2, User } from 'lucide-react';

export const SettingsPage = ({
  settings,
  updateSettings,
  isDark,
  toggleTheme,
  showToast
}) => {
  const [thresholdInput, setThresholdInput] = useState(settings.eligibilityThreshold || 75);
  const [facultyNameInput, setFacultyNameInput] = useState(settings.facultyName || 'Dr. Priya Sharma');
  const [facultyRoleInput, setFacultyRoleInput] = useState(settings.facultyRole || 'Associate Professor, CSE Dept');

  const handleSaveThreshold = (e) => {
    e.preventDefault();
    const val = Number(thresholdInput);
    if (isNaN(val) || val < 50 || val > 95) {
      showToast('Threshold must be a percentage between 50% and 95%', 'warning');
      return;
    }
    updateSettings({ eligibilityThreshold: val });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSettings({
      facultyName: facultyNameInput,
      facultyRole: facultyRoleInput
    });
  };

  const handleResetLocalStorage = () => {
    if (window.confirm("Reset all data and restore initial demo dataset?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Application Preferences & Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure attendance thresholds, appearance mode, faculty profile, and notifications.
        </p>
      </div>

      {/* Card 1: Appearance Settings */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Appearance & Theme
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize interface color mode according to your environment.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isDark ? 'Sleek dark theme optimized for low light' : 'Clean high-contrast light layout'}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>

      {/* Card 2: Attendance Eligibility Threshold */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Attendance Eligibility Criteria
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set the mandatory attendance percentage threshold for university exam eligibility.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveThreshold} className="space-y-4 pt-2">
          <div className="max-w-xs space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Minimum Required Attendance Threshold (%)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="50"
                max="95"
                value={thresholdInput}
                onChange={(e) => setThresholdInput(e.target.value)}
                className="w-28 px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">%</span>

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Save Threshold
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Default college standard is 75%. Changing this immediately updates all eligibility badges.
            </p>
          </div>
        </form>
      </div>

      {/* Card 3: Faculty Profile Info */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Faculty Profile & Designation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update faculty name and department title displayed on headers and reports.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Faculty Name
              </label>
              <input
                type="text"
                value={facultyNameInput}
                onChange={(e) => setFacultyNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role & Department
              </label>
              <input
                type="text"
                value={facultyRoleInput}
                onChange={(e) => setFacultyRoleInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            Update Faculty Profile
          </button>
        </form>
      </div>

      {/* Card 4: System Reset & Local Storage Clearance */}
      <div className="glass-card p-6 space-y-4 border-l-4 border-l-rose-500">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Reset Application Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear local storage and restore default student dataset.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            This will wipe your current local browser state and re-initialize the 22 default Indian student profiles.
          </p>

          <button
            onClick={handleResetLocalStorage}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20"
          >
            Restore Demo Dataset
          </button>
        </div>
      </div>

    </div>
  );
};
