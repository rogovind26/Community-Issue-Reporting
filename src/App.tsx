/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { BrowseIssues } from './pages/BrowseIssues';
import { ReportIssue } from './pages/ReportIssue';
import { IssueDetails } from './pages/IssueDetails';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="flex-1">
      {currentPage === 'home' && <Home />}
      {currentPage === 'browse' && <BrowseIssues />}
      {currentPage === 'report' && <ReportIssue />}
      {currentPage === 'details' && <IssueDetails />}
      {currentPage === 'citizen-dashboard' && <CitizenDashboard />}
      {currentPage === 'admin-dashboard' && <AdminDashboard />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'register' && <Register />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Quick academic demo evaluator bar */}
        <DemoBanner />

        {/* Responsive primary navigation */}
        <Navbar />

        {/* Active page content */}
        <MainContent />

        {/* Academic credentials and project footer */}
        <Footer />

        {/* Global floating toast notification */}
        <Toast />
      </div>
    </AppProvider>
  );
}
