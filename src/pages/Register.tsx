/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Building2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export const Register: React.FC = () => {
  const { register, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: typeof errors = {};

    if (!name.trim()) {
      errs.name = 'Full Name is required.';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long.';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = register(name, email, password);
    if (!result.success && result.error) {
      setErrors((prev) => ({ ...prev, general: result.error! }));
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center mx-auto shadow-md">
          <Building2 size={26} />
        </div>
        <h1 className="text-2xl font-extrabold text-stone-900">
          Create Citizen Account
        </h1>
        <p className="text-xs text-stone-500">
          Register to report civic grievances, upvote neighborhood issues, and track resolutions.
        </p>
      </div>

      {/* Registration Card Form */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
        {errors.general && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-medium">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Full Name <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <UserIcon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
                  errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
                } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Email Address <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="citizen@community.org"
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
            <label htmlFor="reg-pwd" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Password (Min 6 chars) <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="reg-pwd"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="reg-confirm" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Confirm Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
                  errors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
                } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-rose-600 font-medium mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition-colors"
          >
            <UserPlus size={15} />
            <span>Complete Registration</span>
          </button>
        </form>

        {/* Switch to Login */}
        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Already registered as a resident? </span>
          <button
            type="button"
            onClick={() => navigateTo('login')}
            className="font-bold text-emerald-800 hover:text-emerald-950 underline"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
