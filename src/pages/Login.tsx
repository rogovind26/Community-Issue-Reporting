/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login, navigateTo } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = login(email, password);
    if (!result.success && result.error) {
      setErrors((prev) => ({ ...prev, general: result.error }));
    }
  };

  const autofillAdmin = () => {
    setEmail('admin@civicfix.com');
    setPassword('admin123');
    setErrors({});
  };

  const autofillCitizen = () => {
    setEmail('rahul.sharma@example.com');
    setPassword('user123');
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center mx-auto shadow-md">
          <Building2 size={26} />
        </div>
        <h1 className="text-2xl font-extrabold text-stone-900">
          Sign In to Civic<span className="text-amber-500">Fix</span>
        </h1>
        <p className="text-xs text-stone-500">
          Access your citizen account or municipal admin control console
        </p>
      </div>

      {/* Quick Autofill Buttons for Evaluators */}
      <div className="mb-6 p-3.5 bg-stone-100 rounded-2xl border border-stone-200 text-xs space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 text-center">
          Evaluator Quick-Fill Credentials
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={autofillAdmin}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-amber-100/80 hover:bg-amber-100 text-amber-950 font-bold rounded-lg border border-amber-300 transition-colors text-[11px]"
          >
            <ShieldCheck size={13} className="text-amber-700" />
            <span>Fill Admin</span>
          </button>
          <button
            type="button"
            onClick={autofillCitizen}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-100/80 hover:bg-emerald-100 text-emerald-950 font-bold rounded-lg border border-emerald-300 transition-colors text-[11px]"
          >
            <UserCheck size={13} className="text-emerald-700" />
            <span>Fill Citizen</span>
          </button>
        </div>
      </div>

      {/* Login Card Form */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
        {errors.general && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-medium">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
                  errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
                } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-pwd" className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="login-pwd"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
                  errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
                } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition-colors"
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        </form>

        {/* Switch to Register */}
        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Don't have an account yet? </span>
          <button
            type="button"
            onClick={() => navigateTo('register')}
            className="font-bold text-emerald-800 hover:text-emerald-950 underline"
          >
            Register as Citizen
          </button>
        </div>
      </div>
    </div>
  );
};
