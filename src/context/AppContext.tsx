/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Issue, IssueCategory, IssueStatus, PageView } from '../types';
import { DEFAULT_ADMIN, DEMO_CITIZENS, INITIAL_ISSUES } from '../data/initialData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  issues: Issue[];
  currentPage: PageView;
  selectedIssueId: string | null;
  toast: ToastMessage | null;
  // Navigation
  navigateTo: (page: PageView, issueId?: string | null) => void;
  // Auth methods
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password?: string) => { success: boolean; error?: string };
  logout: () => void;
  loginAsAdmin: () => void;
  loginAsCitizen: () => void;
  // Issue methods
  createIssue: (newIssueData: {
    title: string;
    description: string;
    category: IssueCategory;
    location: string;
    image?: string;
  }) => { success: boolean; error?: string; issueId?: string };
  toggleUpvote: (issueId: string) => { success: boolean; message: string };
  updateIssueStatus: (issueId: string, newStatus: IssueStatus, resolutionNote?: string) => boolean;
  deleteIssue: (issueId: string) => boolean;
  resetDemoData: () => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Storage Keys matching project guidelines
const STORAGE_KEYS = {
  USERS: 'civicfix_users',
  CURRENT_USER: 'civicfix_current_user',
  ISSUES: 'civicfix_issues',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Users from localStorage or default seeds
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
    }
    // Seed default admin and citizen
    const initialUsers = [DEFAULT_ADMIN, DEMO_CITIZENS];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
    return initialUsers;
  });

  // 2. Initialize Current Logged-in User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse currentUser from localStorage', e);
    }
    return null;
  });

  // 3. Initialize Issues from localStorage or initial sample data
  const [issues, setIssues] = useState<Issue[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ISSUES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse issues from localStorage', e);
    }
    // Seed default issues
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(INITIAL_ISSUES));
    return INITIAL_ISSUES;
  });

  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Sync issues to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));
  }, [issues]);

  // Navigation handler
  const navigateTo = (page: PageView, issueId: string | null = null) => {
    setCurrentPage(page);
    if (issueId !== undefined) {
      setSelectedIssueId(issueId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth: Login function
  const login = (email: string, password?: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Check admin credentials
    if (normalizedEmail === 'admin@civicfix.com') {
      if (password && password !== 'admin123') {
        showToast('Invalid admin password. Default is admin123', 'error');
        return { success: false, error: 'Invalid admin password. Default is: admin123' };
      }
      const adminUser = users.find((u) => u.email.toLowerCase() === 'admin@civicfix.com') || DEFAULT_ADMIN;
      setCurrentUser(adminUser);
      showToast('Logged in as Municipal Administrator', 'success');
      navigateTo('admin-dashboard');
      return { success: true };
    }

    // Check normal citizen
    const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!existingUser) {
      showToast('No account found with this email. Please register first.', 'error');
      return { success: false, error: 'No account found with this email. Please register.' };
    }

    if (password && existingUser.password && existingUser.password !== password) {
      showToast('Incorrect password.', 'error');
      return { success: false, error: 'Incorrect password.' };
    }

    setCurrentUser(existingUser);
    showToast(`Welcome back, ${existingUser.name}!`, 'success');
    if (existingUser.role === 'admin') {
      navigateTo('admin-dashboard');
    } else {
      navigateTo('citizen-dashboard');
    }
    return { success: true };
  };

  // Auth: Register function
  const register = (name: string, email: string, password?: string) => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail) {
      return { success: false, error: 'Name and email are required.' };
    }

    // Check if user already exists
    const userExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (userExists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: trimmedName,
      email: normalizedEmail,
      role: 'citizen',
      password: password || 'user123',
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
    navigateTo('citizen-dashboard');
    return { success: true };
  };

  // Auth: Logout
  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
    navigateTo('home');
  };

  // 1-Click Demo Logins for quick evaluators
  const loginAsAdmin = () => {
    const admin = users.find((u) => u.role === 'admin') || DEFAULT_ADMIN;
    setCurrentUser(admin);
    showToast('Switched to Municipal Administrator (admin@civicfix.com)', 'success');
    navigateTo('admin-dashboard');
  };

  const loginAsCitizen = () => {
    const citizen = users.find((u) => u.email === 'rahul.sharma@example.com') || DEMO_CITIZENS;
    setCurrentUser(citizen);
    showToast('Switched to Demo Citizen (Rahul Sharma)', 'success');
    navigateTo('citizen-dashboard');
  };

  // Report Issue
  const createIssue = (data: {
    title: string;
    description: string;
    category: IssueCategory;
    location: string;
    image?: string;
  }) => {
    if (!currentUser) {
      showToast('Please login to report an issue.', 'error');
      navigateTo('login');
      return { success: false, error: 'Authentication required' };
    }

    // Generate readable civic issue ID: ISSUE-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `ISSUE-${randomNum}`;

    const newIssue: Issue = {
      id: newId,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      location: data.location.trim(),
      image: data.image,
      status: 'Pending', // Specification: automatically set to Pending
      upvotes: 0, // Specification: automatically set to 0
      upvotedBy: [],
      reportedBy: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
      },
      createdAt: new Date().toISOString(),
    };

    setIssues((prev) => [newIssue, ...prev]);
    showToast(`Issue ${newId} logged successfully! Status is Pending.`, 'success');
    return { success: true, issueId: newId };
  };

  // Upvote System
  const toggleUpvote = (issueId: string) => {
    if (!currentUser) {
      showToast('Please login to upvote this issue.', 'info');
      navigateTo('login');
      return { success: false, message: 'Please login to upvote.' };
    }

    const targetIssue = issues.find((i) => i.id === issueId);
    if (!targetIssue) {
      return { success: false, message: 'Issue not found.' };
    }

    const hasUpvoted = targetIssue.upvotedBy.includes(currentUser.id);

    if (hasUpvoted) {
      // User has already upvoted
      showToast('You have already upvoted this issue.', 'info');
      return { success: false, message: 'Already Upvoted' };
    }

    // Add upvote
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          return {
            ...item,
            upvotes: item.upvotes + 1,
            upvotedBy: [...item.upvotedBy, currentUser.id],
          };
        }
        return item;
      })
    );

    showToast('Upvoted! Thank you for supporting your community.', 'success');
    return { success: true, message: 'Upvoted successfully!' };
  };

  // Admin: Update Status
  const updateIssueStatus = (issueId: string, newStatus: IssueStatus, resolutionNote?: string) => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Unauthorized access. Admin role required.', 'error');
      return false;
    }

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          return {
            ...item,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            resolutionNote: resolutionNote !== undefined ? resolutionNote : item.resolutionNote,
          };
        }
        return item;
      })
    );

    showToast(`Issue status changed to "${newStatus}".`, 'success');
    return true;
  };

  // Admin: Delete Issue
  const deleteIssue = (issueId: string) => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Unauthorized access. Admin role required.', 'error');
      return false;
    }

    setIssues((prev) => prev.filter((item) => item.id !== issueId));
    showToast('Issue has been removed by Municipal Admin.', 'info');

    // If currently viewing deleted issue details, navigate back to browse or admin
    if (selectedIssueId === issueId) {
      navigateTo('admin-dashboard');
    }
    return true;
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.ISSUES);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

    const initialUsers = [DEFAULT_ADMIN, DEMO_CITIZENS];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(INITIAL_ISSUES));

    setUsers(initialUsers);
    setIssues(INITIAL_ISSUES);
    setCurrentUser(null);
    showToast('Demo data and sample issues restored to defaults!', 'info');
    navigateTo('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        issues,
        currentPage,
        selectedIssueId,
        toast,
        navigateTo,
        login,
        register,
        logout,
        loginAsAdmin,
        loginAsCitizen,
        createIssue,
        toggleUpvote,
        updateIssueStatus,
        deleteIssue,
        resetDemoData,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
