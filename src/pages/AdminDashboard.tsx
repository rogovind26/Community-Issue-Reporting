/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AdminSidebar } from '../components/AdminSidebar';
import { StatsCard } from '../components/StatsCard';
import { StatusBadge } from '../components/StatusBadge';
import { Issue, IssueStatus, IssueCategory } from '../types';
import {
  FileText,
  Clock,
  Wrench,
  CheckCircle2,
  ThumbsUp,
  Search,
  Filter,
  Trash2,
  Eye,
  ShieldAlert,
  ArrowRight,
  Download,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    issues,
    updateIssueStatus,
    deleteIssue,
    navigateTo,
    loginAsAdmin,
    showToast,
  } = useApp();

  const [currentTab, setCurrentTab] = useState<'overview' | 'all' | IssueStatus>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [deletingIssueId, setDeletingIssueId] = useState<string | null>(null);

  // Access Control Guard
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-stone-200 text-center shadow-lg space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-stone-900">Unauthorized Access</h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          The Admin Portal is restricted to Municipal Officers. Please login with official admin credentials.
        </p>

        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
          <strong>Default Admin Demo:</strong> admin@civicfix.com / admin123
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={loginAsAdmin}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 font-bold text-stone-950 text-xs rounded-xl shadow-xs transition-colors"
          >
            1-Click Admin Access (Demo)
          </button>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-semibold"
          >
            Back to Public Portal
          </button>
        </div>
      </div>
    );
  }

  // Statistical calculations
  const totalCount = issues.length;
  const pendingCount = issues.filter((i) => i.status === 'Pending').length;
  const inProgressCount = issues.filter((i) => i.status === 'In Progress').length;
  const resolvedCount = issues.filter((i) => i.status === 'Resolved').length;
  const totalUpvotes = issues.reduce((acc, curr) => acc + curr.upvotes, 0);

  // Filter issues based on active sidebar tab, search, and category
  const displayedIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Tab filter
      if (currentTab !== 'overview' && currentTab !== 'all') {
        if (issue.status !== currentTab) return false;
      }

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        issue.title.toLowerCase().includes(q) ||
        issue.id.toLowerCase().includes(q) ||
        issue.location.toLowerCase().includes(q) ||
        issue.reportedBy.name.toLowerCase().includes(q);

      // Category filter
      const matchesCat =
        selectedCategory === 'All' || issue.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [issues, currentTab, searchQuery, selectedCategory]);

  const categories: (IssueCategory | 'All')[] = [
    'All',
    'Roads',
    'Street Lights',
    'Garbage',
    'Water',
    'Parks',
    'Traffic',
    'Infrastructure',
    'Other',
  ];

  // Quick status change helper
  const handleQuickStatusChange = (issueId: string, newStatus: IssueStatus) => {
    updateIssueStatus(issueId, newStatus);
  };

  // Export data as JSON / CSV report for BTech CSE presentation
  const handleExportCSV = () => {
    const headers = ['Issue ID', 'Title', 'Category', 'Location', 'Status', 'Upvotes', 'Reported By', 'Created At'];
    const rows = issues.map((i) => [
      i.id,
      `"${i.title.replace(/"/g, '""')}"`,
      i.category,
      `"${i.location.replace(/"/g, '""')}"`,
      i.status,
      i.upvotes,
      `"${i.reportedBy.name}"`,
      i.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `civicfix_issues_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Municipal CSV summary downloaded for academic submission!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <ShieldAlert size={13} />
              <span>Municipal Control Console</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1.5">
            Admin Issue Management Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Logged in as <strong className="text-stone-800">{currentUser.name}</strong> ({currentUser.email})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl shadow-xs transition-colors"
            title="Download CSV report of all issues"
          >
            <Download size={14} />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar + Dashboard Panels */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Sidebar */}
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          pendingCount={pendingCount}
          inProgressCount={inProgressCount}
          resolvedCount={resolvedCount}
          totalCount={totalCount}
        />

        {/* Dashboard Main Area */}
        <div className="flex-1 w-full space-y-6">
          {/* Top 5 Statistics Cards (Matches Spec: Total Issues, Pending, In Progress, Resolved, Total Upvotes) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <StatsCard
              label="Total Issues"
              value={totalCount}
              icon={FileText}
              colorScheme="stone"
            />
            <StatsCard
              label="Pending"
              value={pendingCount}
              icon={Clock}
              colorScheme="amber"
            />
            <StatsCard
              label="In Progress"
              value={inProgressCount}
              icon={Wrench}
              colorScheme="teal"
            />
            <StatsCard
              label="Resolved"
              value={resolvedCount}
              icon={CheckCircle2}
              colorScheme="emerald"
            />
            <StatsCard
              label="Total Upvotes"
              value={totalUpvotes}
              icon={ThumbsUp}
              colorScheme="amber"
            />
          </div>

          {/* Issue Management Panel */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-5 space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by ID, Title, Location, Reporter..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-stone-500 font-medium">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl font-medium text-stone-800 focus:outline-hidden"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'All Categories' : c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Active View Indicator */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1 pb-2 border-b border-stone-100">
              <div>
                Active View:{' '}
                <strong className="text-stone-900 capitalize font-semibold">
                  {currentTab === 'overview'
                    ? 'Dashboard Overview'
                    : currentTab === 'all'
                    ? 'All Reported Issues'
                    : `${currentTab} Issues`}
                </strong>{' '}
                · Showing <span className="font-mono text-stone-800">{displayedIssues.length}</span> records
              </div>

              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-emerald-800 font-semibold hover:underline"
                >
                  Clear search/filters
                </button>
              )}
            </div>

            {/* Issues Table / List */}
            {displayedIssues.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-3">Issue ID</th>
                      <th className="py-3 px-3">Title &amp; Category</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Upvotes</th>
                      <th className="py-3 px-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {displayedIssues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* ID */}
                        <td className="py-3.5 px-3 font-mono font-bold text-stone-800 whitespace-nowrap">
                          {issue.id}
                        </td>

                        {/* Title & Category */}
                        <td className="py-3.5 px-3 max-w-xs">
                          <button
                            type="button"
                            onClick={() => navigateTo('details', issue.id)}
                            className="text-left font-bold text-stone-900 hover:text-emerald-800 hover:underline line-clamp-1"
                          >
                            {issue.title}
                          </button>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                            <span>{issue.category}</span>
                            <span>·</span>
                            <span>By: {issue.reportedBy.name}</span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-3 text-stone-600 whitespace-nowrap">
                          <span className="truncate max-w-[140px] block">{issue.location}</span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <StatusBadge status={issue.status} size="sm" />
                        </td>

                        {/* Upvotes */}
                        <td className="py-3.5 px-3 font-mono tabular-nums text-stone-900 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <ThumbsUp size={12} className="text-amber-600" />
                            <span>{issue.upvotes}</span>
                          </span>
                        </td>

                        {/* Status Workflow Controls & Actions */}
                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {/* Fast status cycler */}
                            <select
                              value={issue.status}
                              onChange={(e) =>
                                handleQuickStatusChange(issue.id, e.target.value as IssueStatus)
                              }
                              className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 cursor-pointer focus:outline-hidden"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                            {/* View details */}
                            <button
                              type="button"
                              onClick={() => navigateTo('details', issue.id)}
                              className="p-1.5 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors"
                              title="View full grievance details"
                            >
                              <Eye size={15} />
                            </button>

                            {/* Delete inappropriate */}
                            <button
                              type="button"
                              onClick={() => setDeletingIssueId(issue.id)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete issue (inappropriate / spam)"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <FileText size={24} className="mx-auto text-stone-300" />
                <div className="text-xs font-semibold text-stone-600">
                  No issues found in this view
                </div>
                <p className="text-[11px] text-stone-400">
                  Try changing your status tab or clearing search filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingIssueId && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-stone-900">Confirm Deletion</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                As Municipal Administrator, you are about to delete record <strong className="text-stone-800">{deletingIssueId}</strong>. This cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingIssueId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteIssue(deletingIssueId);
                  setDeletingIssueId(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
