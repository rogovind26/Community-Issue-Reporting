/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { IssueCard } from '../components/IssueCard';
import { StatsCard } from '../components/StatsCard';
import {
  FileText,
  Clock,
  Wrench,
  CheckCircle2,
  PlusCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  Flame,
  Layers,
  MapPin,
} from 'lucide-react';
import { IssueCategory } from '../types';

export const Home: React.FC = () => {
  const { issues, navigateTo } = useApp();

  // Statistics calculation
  const totalCount = issues.length;
  const pendingCount = issues.filter((i) => i.status === 'Pending').length;
  const inProgressCount = issues.filter((i) => i.status === 'In Progress').length;
  const resolvedCount = issues.filter((i) => i.status === 'Resolved').length;
  const totalUpvotes = issues.reduce((acc, curr) => acc + curr.upvotes, 0);

  // Highest upvoted & recent issues
  const trendingIssues = [...issues].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
  const recentIssues = [...issues].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  // Categories list for quick discovery
  const categories: { label: IssueCategory; icon: string; count: number }[] = [
    { label: 'Roads', icon: '🛣️', count: issues.filter((i) => i.category === 'Roads').length },
    { label: 'Street Lights', icon: '💡', count: issues.filter((i) => i.category === 'Street Lights').length },
    { label: 'Garbage', icon: '🗑️', count: issues.filter((i) => i.category === 'Garbage').length },
    { label: 'Water', icon: '💧', count: issues.filter((i) => i.category === 'Water').length },
    { label: 'Parks', icon: '🌳', count: issues.filter((i) => i.category === 'Parks').length },
    { label: 'Traffic', icon: '🚦', count: issues.filter((i) => i.category === 'Traffic').length },
    { label: 'Infrastructure', icon: '🏗️', count: issues.filter((i) => i.category === 'Infrastructure').length },
    { label: 'Other', icon: '📌', count: issues.filter((i) => i.category === 'Other').length },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-stone-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md border-b border-stone-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Direct Citizen-to-Municipality Grievance Bridge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Report Problems.{' '}
            <span className="text-amber-400">Improve Your Community.</span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Report local problems, support important issues, and track their progress through an official transparent resolution pipeline.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigateTo('report')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <PlusCircle size={18} />
              <span>Report an Issue</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('browse')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
            >
              <Search size={18} />
              <span>Browse Issues</span>
            </button>
          </div>

          {/* Quick Civic Metric Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-2xl mx-auto border-t border-stone-800/80">
            <div>
              <div className="text-2xl font-extrabold font-mono text-white tabular-nums">{totalCount}</div>
              <div className="text-xs text-stone-400">Total Logged</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">{pendingCount}</div>
              <div className="text-xs text-stone-400">Under Review</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-teal-400 tabular-nums">{inProgressCount}</div>
              <div className="text-xs text-stone-400">Work in Progress</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-emerald-400 tabular-nums">{resolvedCount}</div>
              <div className="text-xs text-stone-400">Fixed &amp; Resolved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Statistics Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Live Civic Statistics</h2>
              <p className="text-xs text-stone-500">Real-time status updates from our municipality database</p>
            </div>
            <div className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-md font-medium">
              Total Community Upvotes: <strong className="text-stone-900 font-mono">{totalUpvotes}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              label="Total Issues"
              value={totalCount}
              icon={FileText}
              colorScheme="stone"
              subtext="Aggregated across all civic categories"
            />
            <StatsCard
              label="Pending Issues"
              value={pendingCount}
              icon={Clock}
              colorScheme="amber"
              subtext="Queued for municipal inspection"
            />
            <StatsCard
              label="In Progress Issues"
              value={inProgressCount}
              icon={Wrench}
              colorScheme="teal"
              subtext="Contractors & squads active on ground"
            />
            <StatsCard
              label="Resolved Issues"
              value={resolvedCount}
              icon={CheckCircle2}
              colorScheme="emerald"
              subtext="Successfully completed repairs"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-stone-100/90 rounded-2xl p-6 sm:p-10 border border-stone-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Transparent Community Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              How CivicFix Works
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              A four-step streamlined process empowering citizens and holding local authorities accountable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-extrabold flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-stone-900">1. Report</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Spot a broken road, light, or waste dump? Take a photo, pinpoint the location, and submit the details in 30 seconds.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-amber-800 mt-4 pt-3 border-t border-stone-100">
                Auto-assigned unique Issue ID
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-stone-900">2. Support</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Neighbors browse local grievances and upvote critical issues. Higher upvotes elevate visibility for urgency.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-emerald-800 mt-4 pt-3 border-t border-stone-100">
                1 Upvote per citizen restriction
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-900 font-extrabold flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-stone-900">3. Track</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Follow the live status timeline as authorities verify reports, allocate budget, and deploy repair crew on site.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-teal-800 mt-4 pt-3 border-t border-stone-100">
                Pending → In Progress → Resolved
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-stone-100 font-extrabold flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-stone-900">4. Resolve</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Once repairs are confirmed with photo evidence and notes, the issue transitions to Resolved for public record.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-stone-800 mt-4 pt-3 border-t border-stone-100">
                Verified community resolution
              </div>
            </div>
          </div>
        </section>

        {/* Categories Directory */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Browse by Category</h2>
              <p className="text-xs text-stone-500">Filter problems by civic department</p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('browse')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => navigateTo('browse')}
                className="bg-white border border-stone-200 hover:border-emerald-700/60 p-3.5 rounded-xl text-center group transition-all hover:-translate-y-0.5 shadow-xs"
              >
                <div className="text-2xl mb-1.5">{cat.icon}</div>
                <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-900 truncate">
                  {cat.label}
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5 font-mono">
                  {cat.count} {cat.count === 1 ? 'issue' : 'issues'}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Trending & Most Upvoted Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Flame size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">High-Priority Community Issues</h2>
                <p className="text-xs text-stone-500">Most upvoted problems requiring urgent municipal action</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('browse')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
            >
              <span>See All ({totalCount})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </section>

        {/* Community Call to Action Banner */}
        <section className="bg-emerald-900 text-emerald-50 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-800">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
              Be the Change in Your Neighborhood
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Notice a problem in your street today?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Don't wait for someone else to report it. Snap a photo, add the location, and alert both your fellow residents and municipal ward engineers instantly.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('report')}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors shadow-sm"
              >
                File an Issue Now
              </button>
              <button
                type="button"
                onClick={() => navigateTo('browse')}
                className="px-5 py-3 rounded-xl font-semibold text-xs bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-700/80 transition-colors"
              >
                Browse Neighborhood Feed
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
