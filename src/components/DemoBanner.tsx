/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, UserCheck, RefreshCw, X, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, loginAsAdmin, loginAsCitizen, resetDemoData } = useApp();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-2 px-4 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Sparkles size={13} />
            <span>BTech CSE Prototype:</span>
          </span>
          <span className="text-stone-300 hidden sm:inline">
            Frontend-only localStorage system. Test roles quickly:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Admin Login button */}
          <button
            type="button"
            onClick={loginAsAdmin}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              currentUser?.role === 'admin'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700'
            }`}
          >
            <ShieldCheck size={12} />
            <span>Test Admin (admin@civicfix.com)</span>
          </button>

          {/* Quick Citizen Login button */}
          <button
            type="button"
            onClick={loginAsCitizen}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              currentUser?.role === 'citizen'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-stone-700'
            }`}
          >
            <UserCheck size={12} />
            <span>Test Citizen (Rahul Sharma)</span>
          </button>

          {/* Reset Demo Data button */}
          <button
            type="button"
            onClick={resetDemoData}
            title="Reset localStorage to original seed issues"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <RefreshCw size={11} />
            <span className="hidden md:inline">Reset Data</span>
          </button>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="text-stone-400 hover:text-white p-1 ml-1"
            title="Dismiss demo banner"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
