import { useState, useEffect, useCallback, useMemo } from 'react';
import { initialStudents, initialActivities } from '../data/students';
import {
  getStoredStudents,
  setStoredStudents,
  getStoredActivities,
  setStoredActivities,
  getStoredSettings,
  setStoredSettings,
} from '../utils/storage';
import {
  updateStudentAttendanceStatus,
  revertTodayAttendance,
  computeAttendanceSummary,
  computeBranchStats,
  calculatePercentage,
  isEligible
} from '../utils/attendance';

export const useAttendance = () => {
  const [students, setStudents] = useState(() => getStoredStudents(initialStudents));
  const [activities, setActivities] = useState(() => getStoredActivities(initialActivities));
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [isLoading, setIsLoading] = useState(true);

  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Simulate short realistic skeleton loading on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Save changes to local storage
  useEffect(() => {
    setStoredStudents(students);
  }, [students]);

  useEffect(() => {
    setStoredActivities(activities);
  }, [activities]);

  useEffect(() => {
    setStoredSettings(settings);
  }, [settings]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  }, []);

  const addActivity = useCallback((text, type = 'system') => {
    const newAct = {
      id: Date.now(),
      text,
      time: 'Just now',
      type
    };
    setActivities(prev => [newAct, ...prev.slice(0, 19)]);
  }, []);

  /**
   * Mark individual student attendance (present or absent)
   */
  const markAttendance = useCallback((studentId, newStatus) => {
    setStudents(prevStudents => {
      const target = prevStudents.find(s => s.id === studentId);
      if (!target) return prevStudents;

      if (target.todayStatus === newStatus) {
        showToast(`${target.name} is already marked ${newStatus}`, 'info');
        return prevStudents;
      }

      const updated = prevStudents.map(student => {
        if (student.id === studentId) {
          return updateStudentAttendanceStatus(student, newStatus);
        }
        return student;
      });

      const label = newStatus === 'present' ? 'Present' : 'Absent';
      showToast(`${target.name} marked ${label}`, newStatus === 'present' ? 'success' : 'warning');
      addActivity(`${target.name} marked ${label}`, newStatus);

      return updated;
    });
  }, [showToast, addActivity]);

  /**
   * Reset today's attendance for all students
   */
  const resetAttendance = useCallback(() => {
    setStudents(prevStudents => {
      const resetList = prevStudents.map(student => revertTodayAttendance(student));
      return resetList;
    });

    showToast("Today's attendance has been reset", "info");
    addActivity("Attendance session reset for all students", "system");
  }, [showToast, addActivity]);

  /**
   * Update application settings
   */
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      showToast("Settings updated successfully", "success");
      return updated;
    });
  }, [showToast]);

  // Derived KPI summaries
  const summary = useMemo(() => {
    return computeAttendanceSummary(students, settings.eligibilityThreshold);
  }, [students, settings.eligibilityThreshold]);

  const branchStats = useMemo(() => {
    return computeBranchStats(students, settings.eligibilityThreshold);
  }, [students, settings.eligibilityThreshold]);

  return {
    students,
    activities,
    settings,
    isLoading,
    toast,
    summary,
    branchStats,
    markAttendance,
    resetAttendance,
    updateSettings,
    showToast,
    calculatePercentage: (att, tot) => calculatePercentage(att, tot),
    isEligible: (att, tot) => isEligible(att, tot, settings.eligibilityThreshold),
  };
};
