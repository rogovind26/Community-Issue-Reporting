/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IssueStatus } from '../types';
import { Clock, Wrench, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5 font-semibold',
  };

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 18,
  };

  if (status === 'Pending') {
    return (
      <span
        className={`inline-flex items-center font-medium rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-xs ${sizeClasses[size]}`}
      >
        <Clock size={iconSizes[size]} className="text-amber-700 animate-pulse" />
        <span>Pending</span>
      </span>
    );
  }

  if (status === 'In Progress') {
    return (
      <span
        className={`inline-flex items-center font-medium rounded-full bg-teal-100/90 text-teal-900 border border-teal-300/80 shadow-xs ${sizeClasses[size]}`}
      >
        <Wrench size={iconSizes[size]} className="text-teal-700" />
        <span>In Progress</span>
      </span>
    );
  }

  // Resolved
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full bg-emerald-100/90 text-emerald-950 border border-emerald-300/80 shadow-xs ${sizeClasses[size]}`}
    >
      <CheckCircle2 size={iconSizes[size]} className="text-emerald-700" />
      <span>Resolved</span>
    </span>
  );
};
