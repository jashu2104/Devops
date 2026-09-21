import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { StudentDetailsModal } from './components/StudentDetailsModal';
import { ResetModal } from './components/ResetModal';
import { AddStudentModal } from './components/AddStudentModal';
import { DashboardSkeleton } from './components/Skeleton';

import { Dashboard } from './pages/Dashboard';
import { StudentsPage } from './pages/StudentsPage';
import { AttendancePage } from './pages/AttendancePage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

import { useAttendance } from './hooks/useAttendance';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { isAuthenticated, facultyUser, login, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const {
    students,
    activities,
    settings,
    isLoading,
    toast,
    summary,
    branchStats,
    addStudent,
    markAttendance,
    resetAttendance,
    updateSettings,
    showToast
  } = useAttendance();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  // Modals state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  // Modal handlers
  const handleViewStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleCloseStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedStudent(null);
  };

  // If faculty is not logged in, render LoginPage
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={login}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarMobileOpen}
        onClose={() => setSidebarMobileOpen(false)}
        facultyName={facultyUser?.name || settings.facultyName}
        facultyRole={facultyUser?.role || settings.facultyRole}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar */}
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
          onOpenMobileSidebar={() => setSidebarMobileOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={(q) => {
            setSearchQuery(q);
            if (activeTab !== 'students') setActiveTab('students');
          }}
          onOpenAddStudentModal={() => setIsAddStudentModalOpen(true)}
          onLogout={logout}
          facultyName={facultyUser?.name || settings.facultyName}
          facultyRole={facultyUser?.role || settings.facultyRole}
        />

        {/* Content Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  summary={summary}
                  branchStats={branchStats}
                  students={students}
                  activities={activities}
                  isDark={isDark}
                  threshold={settings.eligibilityThreshold}
                  facultyName={facultyUser?.name || settings.facultyName}
                  onMarkPresent={markAttendance}
                  onMarkAbsent={markAttendance}
                  onViewDetails={handleViewStudentDetails}
                  onOpenResetModal={() => setIsResetModalOpen(true)}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'students' && (
                <StudentsPage
                  students={students}
                  threshold={settings.eligibilityThreshold}
                  onMarkPresent={markAttendance}
                  onMarkAbsent={markAttendance}
                  onViewDetails={handleViewStudentDetails}
                  onOpenAddStudentModal={() => setIsAddStudentModalOpen(true)}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}

              {activeTab === 'attendance' && (
                <AttendancePage
                  students={students}
                  summary={summary}
                  threshold={settings.eligibilityThreshold}
                  onMarkPresent={markAttendance}
                  onMarkAbsent={markAttendance}
                  onViewDetails={handleViewStudentDetails}
                  onOpenResetModal={() => setIsResetModalOpen(true)}
                  showToast={showToast}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsPage
                  students={students}
                  summary={summary}
                  branchStats={branchStats}
                  threshold={settings.eligibilityThreshold}
                  isDark={isDark}
                  onViewDetails={handleViewStudentDetails}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsPage
                  settings={settings}
                  updateSettings={updateSettings}
                  isDark={isDark}
                  toggleTheme={toggleTheme}
                  showToast={showToast}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isStudentModalOpen}
        onClose={handleCloseStudentModal}
        threshold={settings.eligibilityThreshold}
        onMarkPresent={markAttendance}
        onMarkAbsent={markAttendance}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetAttendance}
      />

      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onAddStudent={addStudent}
        existingStudents={students}
      />

      <Toast toast={toast} />

    </div>
  );
}
