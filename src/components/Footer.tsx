/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Shield, Database, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, resetDemoData } = useApp();

  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 text-xs mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Academic project info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-300">
                <Building2 size={16} />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                Civic<span className="text-amber-400">Fix</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Community Issue Reporting Platform. Empowering neighborhood residents to voice civic grievances with transparent tracking.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-amber-300 text-[11px] font-semibold">
              <Award size={13} />
              <span>BTech CSE Final Project</span>
            </div>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              Explore Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('browse')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Browse Reported Issues
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('report')}
                  className="hover:text-amber-400 transition-colors"
                >
                  File a New Grievance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('admin-dashboard')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Municipal Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              Technical Stack
            </h4>
            <ul className="space-y-1.5 text-[11px] text-stone-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>React.js 19 + TypeScript</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Vite Frontend Build System</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Browser localStorage Client DB</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                <span>Tailwind CSS Custom Palette</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Evaluator Demo Guide */}
          <div className="bg-stone-800/70 p-4 rounded-xl border border-stone-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Shield size={13} />
              <span>Demo Credentials</span>
            </h4>
            <p className="text-[11px] text-stone-300 mb-1">
              <strong>Admin:</strong> admin@civicfix.com
            </p>
            <p className="text-[11px] text-stone-300 mb-1">
              <strong>Pass:</strong> admin123
            </p>
            <p className="text-[11px] text-stone-400 mb-3">
              <strong>Citizen:</strong> rahul.sharma@example.com (user123)
            </p>

            <button
              type="button"
              onClick={resetDemoData}
              className="text-[11px] font-semibold text-stone-300 hover:text-white underline decoration-stone-500"
            >
              Reset local storage data to default
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 text-center text-stone-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Built with React &amp; localStorage · Community Issue Reporting Platform (CivicFix)
          </div>
          <div className="text-stone-400">
            Workflow: Pending → In Progress → Resolved
          </div>
        </div>
      </div>
    </footer>
  );
};
