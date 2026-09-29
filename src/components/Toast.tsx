/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />,
    error: <AlertCircle size={16} className="text-rose-700 shrink-0" />,
    info: <Info size={16} className="text-amber-800 shrink-0" />,
  };

  const borderAndBg = {
    success: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    error: 'bg-rose-50 border-rose-300 text-rose-950',
    info: 'bg-amber-50 border-amber-300 text-amber-950',
  }[toast.type];

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full transition-all animate-bounce-subtle pointer-events-none">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md pointer-events-auto ${borderAndBg}`}
      >
        {icons[toast.type]}
        <div className="text-xs font-semibold leading-relaxed flex-1">{toast.text}</div>
      </div>
    </div>
  );
};
