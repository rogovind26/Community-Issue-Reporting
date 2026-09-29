/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Menu,
  X,
  PlusCircle,
  Search,
  LayoutDashboard,
  ShieldAlert,
  LogOut,
  User,
  Home,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentPage, navigateTo, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeAndNavigate = (page: any, issueId: any = null) => {
    navigateTo(page, issueId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => closeAndNavigate('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 shadow-inner group-hover:scale-105 transition-transform">
                <Building2 size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  Civic<span className="text-amber-400">Fix</span>
                </span>
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-stone-400">
                  Community Issue Platform
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              type="button"
              onClick={() => closeAndNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'bg-stone-800 text-amber-400'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Home size={15} />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => closeAndNavigate('browse')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === 'browse'
                  ? 'bg-stone-800 text-amber-400'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Search size={15} />
              <span>Browse Issues</span>
            </button>

            <button
              type="button"
              onClick={() => closeAndNavigate('report')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === 'report'
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-stone-800/60'
              }`}
            >
              <PlusCircle size={15} />
              <span>Report Issue</span>
            </button>

            {currentUser && currentUser.role === 'citizen' && (
              <button
                type="button"
                onClick={() => closeAndNavigate('citizen-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === 'citizen-dashboard'
                    ? 'bg-stone-800 text-amber-400'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <LayoutDashboard size={15} />
                <span>My Dashboard</span>
              </button>
            )}

            {currentUser && currentUser.role === 'admin' && (
              <button
                type="button"
                onClick={() => closeAndNavigate('admin-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === 'admin-dashboard'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                }`}
              >
                <ShieldAlert size={15} />
                <span>Admin Dashboard</span>
              </button>
            )}
          </nav>

          {/* User Auth Action Zone */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 pl-3 border-l border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-semibold text-white max-w-[120px] truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-amber-400 uppercase font-medium">
                      {currentUser.role}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => closeAndNavigate('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-stone-200 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => closeAndNavigate('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg shadow-xs transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {currentUser && (
            <div className="p-3 bg-stone-800/80 rounded-xl flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-amber-400 uppercase font-semibold">
                    Role: {currentUser.role}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 font-medium px-2 py-1 rounded bg-stone-900"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => closeAndNavigate('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left ${
              currentPage === 'home' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            <Home size={16} />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => closeAndNavigate('browse')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left ${
              currentPage === 'browse' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
            }`}
          >
            <Search size={16} />
            <span>Browse Community Issues</span>
          </button>

          <button
            type="button"
            onClick={() => closeAndNavigate('report')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left text-emerald-400 ${
              currentPage === 'report' ? 'bg-emerald-950/60' : ''
            }`}
          >
            <PlusCircle size={16} />
            <span>Report a New Issue</span>
          </button>

          {currentUser?.role === 'citizen' && (
            <button
              type="button"
              onClick={() => closeAndNavigate('citizen-dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left ${
                currentPage === 'citizen-dashboard' ? 'bg-stone-800 text-amber-400' : 'text-stone-300'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Citizen Dashboard</span>
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button
              type="button"
              onClick={() => closeAndNavigate('admin-dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-left bg-amber-500 text-stone-950"
            >
              <ShieldAlert size={16} />
              <span>Admin Management Dashboard</span>
            </button>
          )}

          {!currentUser && (
            <div className="pt-3 border-t border-stone-800 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => closeAndNavigate('login')}
                className="w-full text-center py-2 text-xs font-semibold text-stone-200 bg-stone-800 rounded-lg"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => closeAndNavigate('register')}
                className="w-full text-center py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
