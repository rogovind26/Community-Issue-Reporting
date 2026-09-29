/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'citizen' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  createdAt: string;
}

export type IssueCategory =
  | 'Roads'
  | 'Street Lights'
  | 'Garbage'
  | 'Water'
  | 'Parks'
  | 'Traffic'
  | 'Infrastructure'
  | 'Other';

export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  image?: string;
  status: IssueStatus;
  upvotes: number;
  upvotedBy: string[]; // List of user IDs who upvoted
  reportedBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string; // ISO date string
  updatedAt?: string;
  resolutionNote?: string;
}

export type PageView =
  | 'home'
  | 'browse'
  | 'report'
  | 'details'
  | 'citizen-dashboard'
  | 'admin-dashboard'
  | 'login'
  | 'register';
