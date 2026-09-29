/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Issue } from '../types';
import { StatusBadge } from './StatusBadge';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar, User as UserIcon, ThumbsUp, ArrowRight, Tag } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onOpenDetails?: (issueId: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onOpenDetails }) => {
  const { currentUser, toggleUpvote, navigateTo } = useApp();

  const isUpvotedByMe = currentUser ? issue.upvotedBy.includes(currentUser.id) : false;

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleUpvote(issue.id);
  };

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(issue.id);
    } else {
      navigateTo('details', issue.id);
    }
  };

  const formattedDate = new Date(issue.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer hover:border-emerald-800/40"
    >
      {/* Card Header Media */}
      <div className="relative h-48 w-full bg-stone-100 overflow-hidden shrink-0">
        {issue.image ? (
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
            <span className="text-xs font-medium">No photo attached</span>
          </div>
        )}

        {/* Status Badge in corner */}
        <div className="absolute top-3 right-3 shadow-xs">
          <StatusBadge status={issue.status} size="sm" />
        </div>

        {/* Category banner */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-xs text-stone-100 text-xs font-medium">
            <Tag size={12} className="text-amber-400" />
            <span>{issue.category}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line */}
          <div className="flex items-center gap-2 text-xs text-stone-600 mb-2">
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} className="text-emerald-800 shrink-0" />
              <span className="truncate max-w-[160px] sm:max-w-[200px]">{issue.location}</span>
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </span>
          </div>

          {/* Issue Title */}
          <h3 className="text-base font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-900 transition-colors">
            {issue.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Footer with reported by and actions */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Reported by */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 min-w-0">
            <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
              <UserIcon size={12} />
            </div>
            <span className="truncate max-w-[90px] sm:max-w-[120px] font-medium text-stone-700">
              {issue.reportedBy.name}
            </span>
          </div>

          {/* Actions: Upvote button & Details button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleUpvote}
              title={isUpvotedByMe ? 'You have already upvoted this issue' : 'Upvote this civic issue'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                isUpvotedByMe
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 active:scale-95'
              }`}
            >
              <ThumbsUp
                size={13}
                className={isUpvotedByMe ? 'fill-emerald-700 text-emerald-700' : 'text-stone-600'}
              />
              <span className="tabular-nums font-mono">{issue.upvotes}</span>
              <span className="hidden sm:inline">
                {isUpvotedByMe ? 'Upvoted' : 'Upvote'}
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <span>Details</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
