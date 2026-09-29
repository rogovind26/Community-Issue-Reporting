/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IssueStatus } from '../types';
import { Check, Clock, Wrench, CheckCircle, FileText } from 'lucide-react';

interface StatusTimelineProps {
  status: IssueStatus;
  createdAt: string;
  updatedAt?: string;
  resolutionNote?: string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  status,
  createdAt,
  updatedAt,
  resolutionNote,
}) => {
  // Steps in civic issue resolution
  const steps = [
    {
      id: 'reported',
      label: 'Reported',
      description: 'Submitted by citizen to civic register',
      date: new Date(createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      icon: FileText,
    },
    {
      id: 'pending',
      label: 'Pending Review',
      description: 'Verified & queued for department allocation',
      date: 'Logged in system',
      icon: Clock,
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      description: 'Municipal squad deployed on site',
      date: status === 'In Progress' || status === 'Resolved' ? (updatedAt ? new Date(updatedAt).toLocaleDateString() : 'Active inspection') : 'Upcoming',
      icon: Wrench,
    },
    {
      id: 'resolved',
      label: 'Resolved',
      description: 'Repairs completed & verified by authorities',
      date: status === 'Resolved' ? (updatedAt ? new Date(updatedAt).toLocaleDateString() : 'Completed') : 'Pending completion',
      icon: CheckCircle,
    },
  ];

  // Helper to determine step completion
  const getStepState = (index: number) => {
    // 0: Reported is always done
    if (index === 0) return 'completed';

    // 1: Pending Review is done if status is Pending, In Progress, or Resolved
    if (index === 1) {
      if (status === 'Pending') return 'current';
      return 'completed';
    }

    // 2: In Progress
    if (index === 2) {
      if (status === 'In Progress') return 'current';
      if (status === 'Resolved') return 'completed';
      return 'upcoming';
    }

    // 3: Resolved
    if (index === 3) {
      if (status === 'Resolved') return 'current-resolved';
      return 'upcoming';
    }

    return 'upcoming';
  };

  return (
    <div className="bg-stone-50/80 rounded-xl border border-stone-200/80 p-5 md:p-6 my-6">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-200/80">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Official Issue Status Timeline</h3>
          <p className="text-xs text-stone-500 mt-0.5">Workflow: Pending → In Progress → Resolved</p>
        </div>
        <div className="text-xs font-medium text-stone-600 bg-stone-200/70 px-3 py-1 rounded-md">
          Current State: <strong className="text-stone-900">{status}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const state = getStepState(idx);
          const Icon = step.icon;

          const isCompleted = state === 'completed' || state === 'current-resolved';
          const isCurrent = state === 'current' || state === 'current-resolved';

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/20'
                  : isCompleted
                  ? 'bg-white/80 border-stone-300'
                  : 'bg-stone-100/60 border-stone-200 text-stone-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isCurrent
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {isCompleted && !isCurrent ? <Check size={14} /> : <Icon size={15} />}
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                    Step 0{idx + 1}
                  </span>
                  <div
                    className={`text-sm font-semibold ${
                      isCurrent ? 'text-emerald-900' : isCompleted ? 'text-stone-900' : 'text-stone-500'
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{step.description}</p>
              <div className="text-[11px] text-stone-600 mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                <span>Timeline:</span>
                <span className="font-medium text-stone-700">{step.date}</span>
              </div>
            </div>
          );
        })}
      </div>

      {resolutionNote && (
        <div className="mt-5 p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900">
          <div className="mt-0.5 text-amber-700 font-semibold shrink-0">Official Note:</div>
          <div className="leading-relaxed">{resolutionNote}</div>
        </div>
      )}
    </div>
  );
};
