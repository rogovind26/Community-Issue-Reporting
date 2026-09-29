/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  subtext?: string;
  trend?: string;
  colorScheme?: 'stone' | 'amber' | 'teal' | 'emerald';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  subtext,
  trend,
  colorScheme = 'stone',
}) => {
  const styles = {
    stone: {
      bg: 'bg-white',
      border: 'border-stone-200/90',
      iconBg: 'bg-stone-100 text-stone-700',
      valueColor: 'text-stone-900',
    },
    amber: {
      bg: 'bg-white',
      border: 'border-amber-200/80',
      iconBg: 'bg-amber-100 text-amber-800',
      valueColor: 'text-amber-900',
    },
    teal: {
      bg: 'bg-white',
      border: 'border-teal-200/80',
      iconBg: 'bg-teal-100 text-teal-800',
      valueColor: 'text-teal-900',
    },
    emerald: {
      bg: 'bg-white',
      border: 'border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-800',
      valueColor: 'text-emerald-900',
    },
  }[colorScheme];

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-xl p-5 shadow-xs transition-transform hover:-translate-y-0.5`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${styles.iconBg}`}>
          <Icon size={18} />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold font-mono tabular-nums ${styles.valueColor}`}>
          {value}
        </span>
        {trend && (
          <span className="text-xs font-medium text-emerald-800">
            {trend}
          </span>
        )}
      </div>

      {subtext && <p className="text-xs text-stone-600 mt-2">{subtext}</p>}
    </div>
  );
};
