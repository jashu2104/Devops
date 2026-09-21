import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { branchesList } from '../data/students';

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedBranch,
  setSelectedBranch,
  statusFilter,
  setStatusFilter,
  rangeFilter,
  setRangeFilter,
  onResetFilters,
  resultCount = 0
}) => {
  const hasActiveFilters = searchQuery || selectedBranch !== 'All Branches' || statusFilter !== 'All' || rangeFilter !== 'All';

  return (
    <div className="glass-card p-4 space-y-3">
      
      {/* Search Input Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clear Filters Button if any active filter */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="px-3.5 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Multi-Dimensional Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        
        {/* Branch Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Department / Branch
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            {branchesList.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Today's / Eligibility Status Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Attendance Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present Today</option>
            <option value="Absent">Absent Today</option>
            <option value="Eligible">Eligible (≥ 75%)</option>
            <option value="Not Eligible">Not Eligible (&lt; 75%)</option>
          </select>
        </div>

        {/* Attendance Range Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Attendance Range
          </label>
          <select
            value={rangeFilter}
            onChange={(e) => setRangeFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="All">All Ranges</option>
            <option value="Below 75%">Below 75% (Critical)</option>
            <option value="75-85%">75% – 85% (Average)</option>
            <option value="Above 85%">Above 85% (Excellent)</option>
          </select>
        </div>

      </div>

      {/* Results summary pill */}
      <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400">
        <span>Showing <strong className="text-slate-900 dark:text-white">{resultCount}</strong> students</span>
        {hasActiveFilters && <span className="italic text-[11px]">Filtered view active</span>}
      </div>

    </div>
  );
};
