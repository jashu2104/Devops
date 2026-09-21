const KEYS = {
  STUDENTS: 'attendify_students_v1',
  ACTIVITIES: 'attendify_activities_v1',
  SETTINGS: 'attendify_settings_v1',
};

export const defaultSettings = {
  eligibilityThreshold: 75,
  facultyName: 'Dr. Priya Sharma',
  facultyRole: 'Associate Professor, CSE Dept',
  emailNotifications: true,
  lowAttendanceAlerts: true,
};

export const getStoredStudents = (fallback) => {
  try {
    const data = localStorage.getItem(KEYS.STUDENTS);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error('Error reading students from localStorage:', error);
    return fallback;
  }
};

export const setStoredStudents = (students) => {
  try {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students to localStorage:', error);
  }
};

export const getStoredActivities = (fallback) => {
  try {
    const data = localStorage.getItem(KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error('Error reading activities from localStorage:', error);
    return fallback;
  }
};

export const setStoredActivities = (activities) => {
  try {
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(activities));
  } catch (error) {
    console.error('Error saving activities to localStorage:', error);
  }
};

export const getStoredSettings = () => {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch (error) {
    console.error('Error reading settings from localStorage:', error);
    return defaultSettings;
  }
};

export const setStoredSettings = (settings) => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
};
