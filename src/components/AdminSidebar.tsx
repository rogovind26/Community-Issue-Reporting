/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ListFilter,
  Clock,
  Wrench,
  CheckCircle2,
  LogOut,
  Home,
  ShieldAlert,
} from 'lucide-react';
import { IssueStatus } from '../types';

interface AdminSidebarProps {
  currentTab: 'overview' | 'all' | IssueStatus;
  onSelectTab: (tab: 'overview' | 'all' | IssueStatus) => void;
  pendingCount: number;
  inProgressCount: number;
  resolvedCount: number;
  totalCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingCount,
  inProgressCount,
  resolvedCount,
  totalCount,
}) => {
  const { logout, navigateTo, currentUser } = useApp();

  const menuItems = [
    {
      id: 'overview' as const,
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      count: undefined,
    },
    {
      id: 'all' as const,
      label: 'All Reported Issues',
      icon: ListFilter,
      count: totalCount,
    },
    {
      id: 'Pending' as const,
      label: 'Pending Review',
      icon: Clock,
      count: pendingCount,
      countColor: 'bg-amber-100 text-amber-900 border border-amber-300',
    },
    {
      id: 'In Progress' as const,
      label: 'In Progress',
      icon: Wrench,
      count: inProgressCount,
      countColor: 'bg-teal-100 text-teal-900 border border-teal-300',
    },
    {
      id: 'Resolved' as const,
      label: 'Resolved',
      icon: CheckCircle2,
      count: resolvedCount,
      countColor: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-stone-900 text-stone-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 border border-stone-800">
      <div>
        {/* Admin Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-stone-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Admin Portal
            </div>
            <div className="text-sm font-bold text-white truncate max-w-[150px]">
              {currentUser?.name || 'Administrator'}
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="mt-5 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono tabular-nums font-semibold ${
                      item.countColor || 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Return & Logout */}
      <div className="pt-6 mt-6 border-t border-stone-800 space-y-2">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 transition-colors"
        >
          <Home size={15} />
          <span>Exit to Public Portal</span>
        </button>

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
        >
          <LogOut size={15} />
          <span>Sign Out as Admin</span>
        </button>
      </div>
    </aside>
  );
};
