/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { IssueCard } from '../components/IssueCard';
import { IssueCategory, IssueStatus } from '../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Tag,
  MapPin,
  Clock,
  Layers,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';

export const BrowseIssues: React.FC = () => {
  const { issues, navigateTo } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'upvotes' | 'oldest'>('latest');

  // Categories list
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

  // Statuses list
  const statuses: (IssueStatus | 'All')[] = ['All', 'Pending', 'In Progress', 'Resolved'];

  // Unique locations from existing issues for fast filtering
  const existingLocations = useMemo(() => {
    const locSet = new Set<string>();
    issues.forEach((i) => {
      if (i.location) locSet.add(i.location);
    });
    return Array.from(locSet);
  }, [issues]);

  // Filter & Sort Logic
  const filteredIssues = useMemo(() => {
    return issues
      .filter((issue) => {
        // Search by title, description, or location
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          issue.title.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query) ||
          issue.location.toLowerCase().includes(query);

        // Filter by category
        const matchesCategory =
          selectedCategory === 'All' || issue.category === selectedCategory;

        // Filter by status
        const matchesStatus =
          selectedStatus === 'All' || issue.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        // Default: 'latest'
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [issues, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSortBy('latest');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || selectedStatus !== 'All' || sortBy !== 'latest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Citizen Grievance Feed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            Browse Community Issues
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Explore reported neighborhood problems, upvote critical concerns, or check real-time repair progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('report')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition-colors self-start md:self-auto"
        >
          <PlusCircle size={15} />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-4">
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or location (e.g. 'Main Market', 'pothole')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <ArrowUpDown size={14} className="text-stone-500" />
              <label htmlFor="sort-select" className="text-stone-500 font-medium">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="upvotes">Most Upvoted 👍</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                title="Reset all filters"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Status Selector & Category Selector */}
        <div className="pt-3 border-t border-stone-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-stone-500 mr-1 flex items-center gap-1">
              <Clock size={13} />
              <span>Status:</span>
            </span>
            {statuses.map((status) => {
              const count =
                status === 'All'
                  ? issues.length
                  : issues.filter((i) => i.status === status).length;

              const isSelected = selectedStatus === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  <span>{status}</span>
                  <span className="ml-1.5 opacity-70 font-mono text-[11px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Tag size={13} className="text-stone-500" />
            <span className="text-xs font-medium text-stone-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-50 border border-stone-200 text-stone-800 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Count Status Bar */}
      <div className="flex items-center justify-between text-xs text-stone-600 px-1">
        <div>
          Showing <strong className="text-stone-900 font-mono">{filteredIssues.length}</strong> of{' '}
          <strong className="text-stone-900 font-mono">{issues.length}</strong> community reports
        </div>
        {hasActiveFilters && (
          <div className="text-emerald-800 font-medium">Filtered view active</div>
        )}
      </div>

      {/* Issues Grid or Empty State */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center max-w-md mx-auto my-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-base font-bold text-stone-900">No issues found</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            We couldn't find any community reports matching your search or active filter criteria. Try adjusting your search query or reset your filters.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
            <button
              type="button"
              onClick={() => navigateTo('report')}
              className="px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Report This Issue Instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
