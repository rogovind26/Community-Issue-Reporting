/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { StatusTimeline } from '../components/StatusTimeline';
import { IssueStatus } from '../types';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User as UserIcon,
  ThumbsUp,
  Tag,
  ShieldAlert,
  Trash2,
  CheckCircle,
  Share2,
  AlertTriangle,
} from 'lucide-react';

export const IssueDetails: React.FC = () => {
  const {
    issues,
    selectedIssueId,
    currentUser,
    navigateTo,
    toggleUpvote,
    updateIssueStatus,
    deleteIssue,
    showToast,
  } = useApp();

  const [adminNote, setAdminNote] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Find issue by selectedIssueId or fallback to first
  const issue = issues.find((i) => i.id === selectedIssueId) || issues[0];

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Issue Not Found</h2>
        <p className="text-xs text-stone-500">The requested civic grievance record could not be found or has been deleted.</p>
        <button
          type="button"
          onClick={() => navigateTo('browse')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
        >
          Return to Browse Feed
        </button>
      </div>
    );
  }

  const isUpvotedByMe = currentUser ? issue.upvotedBy.includes(currentUser.id) : false;
  const isAdmin = currentUser?.role === 'admin';

  const handleStatusChange = (newStatus: IssueStatus) => {
    updateIssueStatus(issue.id, newStatus, adminNote || undefined);
  };

  const handleDeleteConfirm = () => {
    deleteIssue(issue.id);
    setShowDeleteModal(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Issue ${issue.id} details link copied to clipboard!`, 'info');
  };

  const formattedDate = new Date(issue.createdAt).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('browse')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Browse Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
            {issue.id}
          </span>
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100"
            title="Copy reference link"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Issue Card Container */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        {/* Large Image Header */}
        <div className="relative h-64 sm:h-96 w-full bg-stone-900 overflow-hidden">
          {issue.image ? (
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-500">
              <span className="text-sm">No photo evidence attached</span>
            </div>
          )}

          {/* Status Badge Overlay */}
          <div className="absolute top-4 right-4">
            <StatusBadge status={issue.status} size="md" />
          </div>

          {/* Category Tag Overlay */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950/80 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
              <Tag size={13} className="text-amber-400" />
              <span>{issue.category}</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Row: Title & Upvote CTA */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                {issue.title}
              </h1>

              {/* Location & Date */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-600">
                <span className="inline-flex items-center gap-1 font-medium text-stone-800">
                  <MapPin size={14} className="text-emerald-800" />
                  <span>{issue.location}</span>
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-stone-500">
                  <Calendar size={14} />
                  <span>{formattedDate}</span>
                </span>
              </div>
            </div>

            {/* Upvote Button with 👍 count */}
            <div className="shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => toggleUpvote(issue.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                  isUpvotedByMe
                    ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500/70'
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white active:scale-95'
                }`}
              >
                <ThumbsUp
                  size={16}
                  className={isUpvotedByMe ? 'fill-emerald-700 text-emerald-700' : 'text-white'}
                />
                <span className="tabular-nums font-mono">{issue.upvotes} Upvotes</span>
                <span className="text-xs opacity-90">
                  {isUpvotedByMe ? '(Already Upvoted)' : ''}
                </span>
              </button>
            </div>
          </div>

          {/* Description Prose */}
          <div className="space-y-2 border-t border-stone-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Grievance Description
            </h3>
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-stone-50/70 p-4 rounded-xl border border-stone-200/60">
              {issue.description}
            </p>
          </div>

          {/* Reporter Identification */}
          <div className="flex items-center gap-3 p-4 bg-stone-100/70 rounded-xl border border-stone-200/80 text-xs">
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              <UserIcon size={16} />
            </div>
            <div>
              <div className="font-semibold text-stone-900">
                Reported by: {issue.reportedBy.name}
              </div>
              <div className="text-[11px] text-stone-500">
                Registered Citizen · Citizen ID: {issue.reportedBy.id}
              </div>
            </div>
          </div>

          {/* Status Timeline Workflow */}
          <StatusTimeline
            status={issue.status}
            createdAt={issue.createdAt}
            updatedAt={issue.updatedAt}
            resolutionNote={issue.resolutionNote}
          />

          {/* Administrative Control Panel (Visible for Admin role) */}
          {isAdmin && (
            <div className="p-5 sm:p-6 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-amber-400" />
                  <span className="text-sm font-bold text-white">
                    Municipal Administrative Resolution Controls
                  </span>
                </div>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">
                  Admin Authorized
                </span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
                  Update Official Status (Pending → In Progress → Resolved):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['Pending', 'In Progress', 'Resolved'] as IssueStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        issue.status === st
                          ? 'bg-amber-400 text-stone-950 shadow-sm ring-2 ring-amber-300'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                      }`}
                    >
                      Set to: {st}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label htmlFor="dept-note" className="block text-xs font-medium text-stone-400 mb-1">
                    Municipal Action Note / Crew Dispatched (Optional):
                  </label>
                  <input
                    id="dept-note"
                    type="text"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="e.g. Electrical crew scheduled for Oct 1, replacement parts ordered..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-800 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Delete Inappropriate Issue */}
              <div className="pt-3 border-t border-stone-800 flex justify-between items-center">
                <span className="text-xs text-stone-400">
                  Inappropriate, spam, or duplicate issue?
                </span>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/80 text-rose-300 hover:bg-rose-900 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Delete Issue</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Issue Deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-stone-900">Delete Civic Issue?</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Are you sure you want to permanently delete issue <strong className="text-stone-800">{issue.id}</strong>? This action will remove it immediately from localStorage and the community feed.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
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
