# CivicFix - Community Issue Reporting Platform

> **Academic Project Type:** B.Tech Computer Science & Engineering (CSE) Final Project  
> **Architecture:** Modern Frontend-Only Single Page Application (SPA) with Browser `localStorage`  
> **Status:** Fully Functional & Persistent  

---

## 1. Project Description
**CivicFix** is an interactive, responsive community grievance management platform that empowers neighborhood residents to report, support, and track local public infrastructure problems (such as potholes, broken street lights, uncollected garbage, water pipeline leaks, damaged parks, and traffic hazards). It bridges the communication gap between citizens and municipal authorities through an automated resolution workflow: **Pending → In Progress → Resolved**.

---

## 2. Problem Statement
In urban and semi-urban communities, local civic issues frequently remain unresolved for weeks because:
1. Citizens lack a centralized, transparent platform to lodge complaints with photo evidence and geolocation.
2. Municipal corporations face difficulty prioritizing issues without knowing community urgency or collective impact.
3. Lack of a transparent tracking timeline leaves residents in the dark about repair status.

---

## 3. Project Objectives
- Enable citizens to register complaints with photo proof, location, and categorization within 30 seconds.
- Provide a community upvoting mechanism so high-priority grievances naturally rise to municipal attention.
- Provide an administrative dashboard for municipal officers to monitor issues, update progress status in real time, and remove spam.
- Implement full client-side persistence using browser `localStorage` without external server dependencies, making it portable, lightweight, and zero-cost to run.

---

## 4. Key Features

### For Citizens:
- **User Authentication:** Registration and login with client-side form validation.
- **Report Issue:** File grievances with Title, Category, Location, Detailed Description, and Photo Evidence.
- **Auto-Invariants:** Automatically assigns a unique `ISSUE-XXXX` ID, sets status to `Pending`, upvotes to `0`, and records user timestamp.
- **Feed & Exploration:** Browse issues with instant real-time search (by title, description, and location) and multifaceted filters (by Category and Status).
- **Single-Vote Upvoting System:** Logged-in citizens can upvote issues to signal urgency. Duplicate upvoting by the same user is strictly prevented.
- **Visual Status Timeline:** Live four-stage workflow tracker (`Reported` → `Pending` → `In Progress` → `Resolved`).
- **Citizen Dashboard:** View personal statistics, list of grievances filed, and all issues endorsed with upvotes.

### For Municipal Administrators:
- **Administrative Portal:** Secure dashboard with 5 real-time metrics:
  - *Total Issues*
  - *Pending Issues*
  - *In Progress Issues*
  - *Resolved Issues*
  - *Total Upvotes*
- **Status Advancement Workflow:** Instantly update issue status (`Pending` → `In Progress` → `Resolved`) with optional action notes.
- **Issue Moderation:** Delete spam, duplicate, or inappropriate community reports with confirmation safeguard.
- **Academic Export:** One-click CSV export of all civic reports for university documentation and presentation.

---

## 5. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React.js 19 (Functional Components, Custom Hooks) |
| **Language** | TypeScript / JavaScript |
| **Markup & Styling** | HTML5 / JSX, Tailwind CSS (Custom Earthy Civic Theme: Forest Green, Warm Amber, Slate, Oatmeal) |
| **Icons & Visuals** | Lucide React, Offline Encoded SVG Schematics |
| **Client Storage Engine**| Browser `localStorage` (Zero external database required) |
| **Build Tool** | Vite |

> **Important Limitation & Architectural Note:**  
> This application is intentionally built as a **frontend-only prototype**. It does **not** require or claim to use Node.js, Express.js, MongoDB, Firebase, MySQL, or any external backend. All state changes are immediately written to and loaded from the browser's `localStorage` engine.

---

## 6. Demo Credentials for Evaluation

For rapid testing and grading, pre-configured accounts are provided with 1-click login buttons in the application:

### Municipal Administrator Account:
- **Email:** `admin@civicfix.com`
- **Password:** `admin123`
- **Role:** `admin` (Unlocks Admin Dashboard, status controls, and delete tools)

### Sample Citizen Account:
- **Email:** `rahul.sharma@example.com`
- **Password:** `user123`
- **Role:** `citizen`

*You may also register brand new citizen accounts using the Register page.*

---

## 7. LocalStorage Data Schema

The application synchronizes data under three primary keys:

### 1. `civicfix_users` (Array of User Objects)
```json
[
  {
    "id": "usr_admin_default",
    "name": "Municipal Admin Officer",
    "email": "admin@civicfix.com",
    "role": "admin",
    "password": "admin123",
    "createdAt": "2026-09-01T08:00:00.000Z"
  }
]
```

### 2. `civicfix_current_user` (Active Session Object)
```json
{
  "id": "usr_citizen_rahul",
  "name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "role": "citizen"
}
```

### 3. `civicfix_issues` (Array of Issue Objects)
```json
[
  {
    "id": "ISSUE-1001",
    "title": "Broken Street Light & Exposed Wiring in Market Lane",
    "description": "The primary street light lamp post opposite shop #14 has been unlit for 10 days...",
    "category": "Street Lights",
    "location": "Main Market, North Wing",
    "image": "data:image/svg+xml;utf8,...",
    "status": "Pending",
    "upvotes": 24,
    "upvotedBy": ["usr_citizen_rahul"],
    "reportedBy": {
      "id": "usr_citizen_rahul",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@example.com"
    },
    "createdAt": "2026-09-24T18:30:00.000Z",
    "updatedAt": "2026-09-25T10:00:00.000Z",
    "resolutionNote": "Assigned to Ward Electrical Maintenance Squad"
  }
]
```

---

## 8. Project File Structure

```
community-issue-reporting/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive header with role badges & mobile drawer
│   │   ├── Footer.tsx             # Academic project footer & demo guide
│   │   ├── IssueCard.tsx          # Modern issue card with image, upvote & details trigger
│   │   ├── StatusBadge.tsx        # Distinct badges for Pending, In Progress, Resolved
│   │   ├── StatusTimeline.tsx     # Visual 4-stage resolution pipeline
│   │   ├── StatsCard.tsx          # Reusable statistic metric card
│   │   ├── AdminSidebar.tsx       # Sidebar navigation for admin filters
│   │   ├── DemoBanner.tsx         # Quick 1-click evaluator switcher
│   │   └── Toast.tsx              # Non-blocking feedback toast notifications
│   │
│   ├── context/
│   │   └── AppContext.tsx         # State management & localStorage sync engine
│   │
│   ├── data/
│   │   └── initialData.ts         # Initial sample civic issues & demo users
│   │
│   ├── pages/
│   │   ├── Home.tsx               # Landing page, statistics & How It Works
│   │   ├── BrowseIssues.tsx       # Search, category filters & issue feed
│   │   ├── ReportIssue.tsx        # Grievance submission form with image preview
│   │   ├── IssueDetails.tsx       # Detailed view with timeline & admin controls
│   │   ├── CitizenDashboard.tsx   # Personal reported & upvoted issues tracker
│   │   ├── AdminDashboard.tsx     # Municipal management console & CSV export
│   │   ├── Login.tsx              # Clean authentication page with evaluator autofill
│   │   └── Register.tsx           # Citizen sign-up with client validation
│   │
│   ├── types.ts                   # TypeScript interfaces and type definitions
│   ├── App.tsx                    # Root routing & layout container
│   ├── main.tsx                   # React root entry
│   └── index.css                  # Global Tailwind CSS styles & typography
│
├── package.json
├── index.html
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 9. Installation & Running Instructions

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### Steps to Run:
```bash
# 1. Clone or extract the repository
cd community-issue-reporting

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

---

## 10. Future Scope & Enhancements
- **GPS Geolocation Integration:** Auto-detect coordinates using the HTML5 Geolocation API.
- **REST / GraphQL Backend Integration:** Migrate `localStorage` services to an Express/PostgreSQL or Cloud SQL backend for multi-device citywide scaling.
- **SMS & Email Notifications:** Automated alerts when municipal officers change grievance status.
- **AI Triage & Classification:** Automatic duplicate issue detection and computer vision categorization.
