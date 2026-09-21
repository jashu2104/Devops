import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { StudentList } from '../components/StudentList';
import { LayoutGrid, Table, Download, UserPlus } from 'lucide-react';
import { calculatePercentage, isEligible } from '../utils/attendance';
import { exportToCSV } from '../utils/export';

export const StudentsPage = ({
  students,
  threshold,
  onMarkPresent,
  onMarkAbsent,
  onViewDetails,
  onOpenAddStudentModal,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [statusFilter, setStatusFilter] = useState('All');
  const [rangeFilter, setRangeFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // 1. Search Query
      const q = (searchQuery || '').toLowerCase().trim();
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.rollNumber.toLowerCase().includes(q) ||
        student.branch.toLowerCase().includes(q);

      // 2. Branch Filter
      const matchesBranch =
        selectedBranch === 'All Branches' || student.branch === selectedBranch;

      // 3. Today / Eligibility Status Filter
      const pct = calculatePercentage(student.attendedClasses, student.totalClasses);
      const eligible = isEligible(student.attendedClasses, student.totalClasses, threshold);

      let matchesStatus = true;
      if (statusFilter === 'Present') matchesStatus = student.todayStatus === 'present';
      else if (statusFilter === 'Absent') matchesStatus = student.todayStatus === 'absent';
      else if (statusFilter === 'Eligible') matchesStatus = eligible;
      else if (statusFilter === 'Not Eligible') matchesStatus = !eligible;

      // 4. Attendance Range Filter
      let matchesRange = true;
      if (rangeFilter === 'Below 75%') matchesRange = pct < 75;
      else if (rangeFilter === '75-85%') matchesRange = pct >= 75 && pct <= 85;
      else if (rangeFilter === 'Above 85%') matchesRange = pct > 85;

      return matchesSearch && matchesBranch && matchesStatus && matchesRange;
    });
  }, [students, searchQuery, selectedBranch, statusFilter, rangeFilter, threshold]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBranch('All Branches');
    setStatusFilter('All');
    setRangeFilter('All');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Student Management Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            View, search, filter, register, and update attendance records for all enrolled students.
          </p>
        </div>

        {/* View Mode Toggle, Add Student & Export Button */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={onOpenAddStudentModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>

          {/* Table / Grid Switcher */}
          <div className="flex items-center p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl border border-slate-300/50 dark:border-slate-700/50">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <Table className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => exportToCSV(filteredStudents, threshold, 'filtered_students.csv')}
            className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-400" />
            Export Filtered
          </button>
        </div>
      </div>

      {/* Multi-Dimensional Search & Filters Component */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        rangeFilter={rangeFilter}
        setRangeFilter={setRangeFilter}
        onResetFilters={handleResetFilters}
        resultCount={filteredStudents.length}
      />

      {/* Student List View Component */}
      <StudentList
        students={filteredStudents}
        threshold={threshold}
        onMarkPresent={onMarkPresent}
        onMarkAbsent={onMarkAbsent}
        onViewDetails={onViewDetails}
        viewMode={viewMode}
        onResetFilters={handleResetFilters}
      />

    </div>
  );
};
