import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'attendify_auth_v1';

export const demoFacultyList = [
  {
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@college.edu',
    role: 'Associate Professor, CSE Dept',
    department: 'Computer Science & Engineering',
  },
  {
    name: 'Prof. Nandyala Jashwanth Reddy',
    email: 'jashwanth.reddy@college.edu',
    role: 'Head of Department / Professor',
    department: 'Computer Science & Engineering',
  }
];

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored).isAuthenticated : true;
    } catch {
      return true;
    }
  });

  const [facultyUser, setFacultyUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored).facultyUser : demoFacultyList[0];
    } catch {
      return demoFacultyList[0];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ isAuthenticated, facultyUser })
      );
    } catch (e) {
      console.error('Error saving auth to localStorage:', e);
    }
  }, [isAuthenticated, facultyUser]);

  const login = useCallback((email, password) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid faculty email address.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    // Check if matching predefined demo professors
    const matched = demoFacultyList.find(f => f.email.toLowerCase() === email.toLowerCase());

    let user;
    if (matched) {
      user = matched;
    } else {
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      const formattedName = nameFromEmail
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      user = {
        name: `Prof. ${formattedName}`,
        email: email,
        role: 'Faculty Member',
        department: 'Engineering Department',
      };
    }

    setFacultyUser(user);
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    facultyUser,
    login,
    logout,
    demoFacultyList,
  };
};
