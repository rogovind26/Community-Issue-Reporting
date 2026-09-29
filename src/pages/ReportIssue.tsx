/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IssueCategory } from '../types';
import { SAMPLE_IMAGES } from '../data/initialData';
import {
  PlusCircle,
  Upload,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  LogIn,
  Info,
} from 'lucide-react';

export const ReportIssue: React.FC = () => {
  const { currentUser, createIssue, navigateTo, loginAsCitizen } = useApp();

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('Roads');
  const [location, setLocation] = useState('');
  const [imagePreview, setImagePreview] = useState<string>(SAMPLE_IMAGES.pothole);
  const [imageSourceType, setImageSourceType] = useState<'preset' | 'upload'>('preset');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: IssueCategory[] = [
    'Roads',
    'Street Lights',
    'Garbage',
    'Water',
    'Parks',
    'Traffic',
    'Infrastructure',
    'Other',
  ];

  // Presets mapping for quick sample demonstration
  const presetImages: { [key in IssueCategory]?: string } = {
    Roads: SAMPLE_IMAGES.pothole,
    'Street Lights': SAMPLE_IMAGES.streetlight,
    Garbage: SAMPLE_IMAGES.garbage,
    Water: SAMPLE_IMAGES.water,
    Parks: SAMPLE_IMAGES.park,
    Traffic: SAMPLE_IMAGES.traffic,
  };

  const handleCategoryChange = (newCat: IssueCategory) => {
    setCategory(newCat);
    // If using preset image, auto-suggest relevant icon/graphic
    if (imageSourceType === 'preset' && presetImages[newCat]) {
      setImagePreview(presetImages[newCat]!);
    }
  };

  // Handle custom image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 2MB for localStorage safety)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: 'Image size exceeds 2MB limit for local storage. Please select a smaller photo.',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setImageSourceType('upload');
      setErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Issue Title is required.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please provide a detailed description of the problem.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Description should be at least 15 characters to assist municipal staff.';
    }

    if (!location.trim()) {
      newErrors.location = 'Specific location / street landmark is required.';
    }

    if (!category) {
      newErrors.category = 'Please select an issue category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setErrors({ auth: 'You must be logged in to report an issue. Please sign in.' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const result = createIssue({
      title,
      description,
      category,
      location,
      image: imagePreview,
    });

    setIsSubmitting(false);

    if (result.success && result.issueId) {
      // Redirect to issue details or browse
      navigateTo('details', result.issueId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Citizen Civic Filing
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
          Report a Community Issue
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Provide accurate details to notify the municipal administration. Your report will be automatically set to <span className="font-semibold text-amber-800">"Pending"</span> for municipal review.
        </p>
      </div>

      {/* Auth Guard Banner if not logged in */}
      {!currentUser && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-950">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-amber-700 shrink-0" />
            <div>
              <strong className="block text-sm font-bold">Authentication Required</strong>
              <span>You must be signed in to lodge official civic grievances.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={loginAsCitizen}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 font-bold text-stone-950 transition-colors shadow-xs"
            >
              1-Click Demo Login
            </button>
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-stone-800 hover:bg-stone-50"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label htmlFor="issue-title" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            Issue Title <span className="text-rose-600">*</span>
          </label>
          <input
            id="issue-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            placeholder="e.g. Major Pothole near Sector 9 Metro Gate, Damaged Street Light"
            className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
              errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
            } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
          />
          {errors.title && (
            <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        {/* Category & Location 2-col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label htmlFor="issue-category" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Category <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <select
                id="issue-category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as IssueCategory)}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Categorizes which municipal division receives the complaint.
            </p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="issue-location" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Location / Landmark <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="issue-location"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                }}
                placeholder="e.g. 5th Cross Road, Main Market Opp Shop #12"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
                  errors.location ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
                } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
              />
            </div>
            {errors.location && (
              <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                <AlertCircle size={13} />
                <span>{errors.location}</span>
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="issue-desc" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            Detailed Description <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="issue-desc"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
            }}
            placeholder="Explain the problem clearly: how long it has been broken, any safety hazards, impact on residents, nearby landmarks..."
            className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border ${
              errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'
            } text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors`}
          />
          {errors.description && (
            <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Photo Upload & Preview Section */}
        <div className="pt-2 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
            Attach Photo Evidence
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
            {/* Image Preview Box */}
            <div className="sm:col-span-1 rounded-xl border border-stone-200 overflow-hidden bg-stone-100 relative group aspect-4/3 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Issue visual proof"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4 text-stone-400">
                  <ImageIcon size={28} className="mx-auto mb-1 text-stone-300" />
                  <span className="text-[11px]">No image selected</span>
                </div>
              )}
            </div>

            {/* Upload Controls & Category Preset Buttons */}
            <div className="sm:col-span-2 space-y-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <span className="font-semibold text-stone-800">Photo Option:</span> Upload from your device or select from standard civic hazard diagrams.
              </div>

              {/* File Input */}
              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors">
                  <Upload size={14} />
                  <span>Upload Local Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-stone-500">Max size 2MB</span>
              </div>

              {/* Quick Presets */}
              <div>
                <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
                  Or select sample hazard graphic:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(presetImages).map((presetKey) => (
                    <button
                      key={presetKey}
                      type="button"
                      onClick={() => {
                        setImagePreview(presetImages[presetKey as IssueCategory]!);
                        setImageSourceType('preset');
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 rounded-md border border-stone-200 transition-colors"
                    >
                      {presetKey}
                    </button>
                  ))}
                </div>
              </div>

              {errors.image && (
                <p className="text-xs text-rose-600 font-medium">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        {/* Automatic Values Notice */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
          <Info size={16} className="text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>System Automated Invariants:</strong> Upon submission, this issue will be assigned a random unique ID, status will automatically be set to <strong>"Pending"</strong>, initial upvotes set to <strong>0</strong>, and logged under your authenticated citizen profile.
          </div>
        </div>

        {/* Submission Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigateTo('browse')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-all hover:shadow-md disabled:opacity-50"
          >
            <PlusCircle size={15} />
            <span>Submit Community Grievance</span>
          </button>
        </div>
      </form>
    </div>
  );
};
