/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IssueCard } from '../components/IssueCard';
import { StatsCard } from '../components/StatsCard';
import {
  User,
  PlusCircle,
  FileText,
  ThumbsUp,
  CheckCircle2,
  Clock,
  LogOut,
  AlertCircle,
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { currentUser, issues, navigateTo, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'reported' | 'upvoted'>('reported');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-stone-200 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Please Sign In</h2>
        <p className="text-xs text-stone-500">
          You must be logged in to view your personalized citizen dashboard and tracked issues.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('login')}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // Filter issues reported by current user
  const myReportedIssues = issues.filter((i) => i.reportedBy.id === currentUser.id);

  // Filter issues upvoted by current user
  const myUpvotedIssues = issues.filter((i) => i.upvotedBy.includes(currentUser.id));

  // Resolved count of my reported issues
  const myResolvedCount = myReportedIssues.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center text-2xl font-extrabold shadow-inner shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[11px] font-semibold mb-1">
              <span>Verified Resident Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {currentUser.name}
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Email: {currentUser.email} · Account ID: {currentUser.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('report')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <PlusCircle size={15} />
            <span>File New Issue</span>
          </button>
          <button
            type="button"
            onClick={logout}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Citizen Personal Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatsCard
          label="My Reported Grievances"
          value={myReportedIssues.length}
          icon={FileText}
          colorScheme="stone"
          subtext="Issues you personally registered"
        />
        <StatsCard
          label="Issues Supported (Upvoted)"
          value={myUpvotedIssues.length}
          icon={ThumbsUp}
          colorScheme="amber"
          subtext="Community grievances you endorsed"
        />
        <StatsCard
          label="My Resolved Issues"
          value={myResolvedCount}
          icon={CheckCircle2}
          colorScheme="emerald"
          subtext="Your complaints successfully fixed"
        />
      </div>

      {/* Tabbed Issue List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('reported')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'reported'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>My Reported Issues</span>
              <span className="ml-2 font-mono text-[11px] opacity-80">
                ({myReportedIssues.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upvoted')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'upvoted'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>Issues I Upvoted</span>
              <span className="ml-2 font-mono text-[11px] opacity-80">
                ({myUpvotedIssues.length})
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'reported' ? (
          myReportedIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myReportedIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-10 text-center max-w-md mx-auto space-y-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                <FileText size={20} />
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                You haven't reported any issues yet
              </h3>
              <p className="text-xs text-stone-500">
                Notice a broken streetlight or pothole in your neighborhood? Submit your first report to alert the municipality.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('report')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl shadow-xs transition-colors"
              >
                <PlusCircle size={14} />
                <span>Report an Issue</span>
              </button>
            </div>
          )
        ) : myUpvotedIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myUpvotedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-10 text-center max-w-md mx-auto space-y-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
              <ThumbsUp size={20} />
            </div>
            <h3 className="text-sm font-bold text-stone-900">No upvoted issues</h3>
            <p className="text-xs text-stone-500">
              Browse issues reported by your fellow residents and click the Upvote button to help prioritize repairs.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('browse')}
              className="px-4 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-colors"
            >
              Browse Issues Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
