import React, { useState } from 'react';
import { UserPlus, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { branchesList } from '../data/students';

export const AddStudentModal = ({ isOpen, onClose, onAddStudent, existingStudents = [] }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    branch: 'CSE',
    semester: '4th Sem',
    email: '',
    phone: '',
    totalClasses: 50,
    attendedClasses: 42,
  });

  const [error, setError] = useState('');

  const availableBranches = branchesList.filter(b => b !== 'All Branches');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const nameTrimmed = formData.name.trim();
    const rollTrimmed = formData.rollNumber.trim().toUpperCase();

    if (!nameTrimmed) {
      setError('Student name is required.');
      return;
    }
    if (!rollTrimmed) {
      setError('Roll number is required.');
      return;
    }

    // Check unique roll number
    const isDuplicate = existingStudents.some(
      s => s.rollNumber.toUpperCase() === rollTrimmed
    );
    if (isDuplicate) {
      setError(`Roll number "${rollTrimmed}" already exists in the system.`);
      return;
    }

    const total = Number(formData.totalClasses);
    const attended = Number(formData.attendedClasses);

    if (isNaN(total) || total < 1) {
      setError('Total classes must be at least 1.');
      return;
    }
    if (isNaN(attended) || attended < 0 || attended > total) {
      setError(`Attended classes cannot exceed total classes (${total}).`);
      return;
    }

    const newStudent = {
      name: nameTrimmed,
      rollNumber: rollTrimmed,
      branch: formData.branch,
      semester: formData.semester,
      email: formData.email || `${rollTrimmed.toLowerCase()}@college.edu`,
      phone: formData.phone || '+91 98765 00000',
      totalClasses: total,
      attendedClasses: attended,
      todayStatus: null,
      history: []
    };

    onAddStudent(newStudent);
    onClose();

    // Reset form state
    setFormData({
      name: '',
      rollNumber: '',
      branch: 'CSE',
      semester: '4th Sem',
      email: '',
      phone: '',
      totalClasses: 50,
      attendedClasses: 42,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden p-6 animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Add New Student
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Register a student profile to track attendance and eligibility.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                name="name"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Roll Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                name="rollNumber"
                placeholder="e.g. 23CS105"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Branch / Department
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {availableBranches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Semester
              </label>
              <input
                type="text"
                name="semester"
                placeholder="4th Sem"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Initial Total Classes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Total Classes
              </label>
              <input
                type="number"
                min="1"
                name="totalClasses"
                value={formData.totalClasses}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Initial Attended Classes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Attended Classes
              </label>
              <input
                type="number"
                min="0"
                name="attendedClasses"
                value={formData.attendedClasses}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Save Student Record
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
