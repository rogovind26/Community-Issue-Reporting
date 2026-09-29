/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Issue, User } from '../types';

// Default Admin Account as required by specification
export const DEFAULT_ADMIN: User = {
  id: 'usr_admin_default',
  name: 'Municipal Admin Officer',
  email: 'admin@civicfix.com',
  role: 'admin',
  password: 'admin123',
  createdAt: '2026-09-01T08:00:00.000Z',
};

// Default Demo Citizens for quick college demonstration
export const DEMO_CITIZENS: User = {
  id: 'usr_citizen_rahul',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  role: 'citizen',
  password: 'user123',
  createdAt: '2026-09-10T10:30:00.000Z',
};

// Helper SVG images encoded for 100% reliable offline rendering
export const SAMPLE_IMAGES = {
  pothole: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%232c2a29"/><rect y="180" width="600" height="40" fill="%23eab308" stroke-dasharray="30 20"/><path d="M120 220 Q240 180 340 230 Q460 270 380 320 Q220 340 120 220 Z" fill="%231a1918"/><path d="M150 240 Q250 210 320 250 Q410 280 350 300 Q230 320 150 240 Z" fill="%230d0d0c"/><circle cx="280" cy="270" r="18" fill="%2344403c"/><text x="30" y="50" fill="%23f59e0b" font-family="sans-serif" font-weight="bold" font-size="22">CAUTION: ROAD HAZARD</text><text x="30" y="80" fill="%23d6d3d1" font-family="sans-serif" font-size="16">College Road Sector 4</text></svg>`,
  streetlight: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%230c141f"/><path d="M140 380 L140 120 Q140 60 220 60 L280 60" stroke="%2364748b" stroke-width="14" fill="none"/><polygon points="260,60 300,60 320,100 240,100" fill="%23475569"/><circle cx="280" cy="115" r="14" fill="%23334155"/><path d="M265 130 L295 160 M295 130 L265 160" stroke="%23ef4444" stroke-width="4"/><text x="340" y="100" fill="%23ef4444" font-family="sans-serif" font-weight="bold" font-size="20">NON-FUNCTIONAL LAMP</text><text x="340" y="130" fill="%2394a3b8" font-family="sans-serif" font-size="15">Main Market Junction 3</text><text x="340" y="160" fill="%2364748b" font-family="sans-serif" font-size="13">Reported: Dark corner at night</text></svg>`,
  garbage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%233f372e"/><rect x="180" y="160" width="240" height="180" rx="8" fill="%2315803d"/><text x="250" y="240" fill="%2386efac" font-family="sans-serif" font-size="48">♻</text><path d="M150 180 C200 130 250 150 280 120 C320 160 380 110 430 170" fill="%23a8a29e"/><circle cx="230" cy="130" r="15" fill="%23eab308"/><circle cx="340" cy="140" r="22" fill="%23ef4444"/><text x="40" y="60" fill="%23fbbf24" font-family="sans-serif" font-weight="bold" font-size="22">OVERFLOWING CIVIC BIN</text><text x="40" y="90" fill="%23e7e5e4" font-family="sans-serif" font-size="16">Central Park West Entrance</text></svg>`,
  water: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23132e35"/><rect x="40" y="260" width="520" height="40" rx="6" fill="%23475569"/><ellipse cx="280" cy="275" rx="20" ry="12" fill="%230284c7"/><path d="M280 260 Q320 180 340 120 Q360 190 400 240 Q430 310 280 340" fill="%2338bdf8" opacity="0.85"/><circle cx="300" cy="160" r="8" fill="%23e0f2fe"/><circle cx="360" cy="190" r="6" fill="%23e0f2fe"/><text x="40" y="60" fill="%2338bdf8" font-family="sans-serif" font-weight="bold" font-size="22">DRINKING WATER LEAKAGE</text><text x="40" y="90" fill="%23bae6fd" font-family="sans-serif" font-size="16">5th Cross Pipeline Division</text></svg>`,
  park: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231e3a2b"/><rect y="260" width="600" height="140" fill="%2314532d"/><path d="M160 300 L200 140 L240 300" stroke="%23a16207" stroke-width="10"/><path d="M360 300 L400 140 L440 300" stroke="%23a16207" stroke-width="10"/><line x1="200" y1="140" x2="400" y2="140" stroke="%23a16207" stroke-width="10"/><line x1="260" y1="140" x2="250" y2="230" stroke="%2378350f" stroke-width="4"/><line x1="340" y1="140" x2="355" y2="245" stroke="%2378350f" stroke-width="4"/><rect x="235" y="230" width="130" height="14" rx="3" fill="%23dc2626" transform="rotate(12 280 230)"/><text x="40" y="60" fill="%23fca5a5" font-family="sans-serif" font-weight="bold" font-size="22">DAMAGED PARK SWING</text><text x="40" y="90" fill="%23dcfce7" font-family="sans-serif" font-size="16">Green Valley Community Park</text></svg>`,
  traffic: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2318181b"/><rect x="240" y="60" width="120" height="280" rx="20" fill="%2327272a" stroke="%233f3f46" stroke-width="4"/><circle cx="300" cy="120" r="30" fill="%23ef4444"/><circle cx="300" cy="200" r="30" fill="%23451a03"/><circle cx="300" cy="280" r="30" fill="%23064e3b"/><line x1="300" y1="340" x2="300" y2="400" stroke="%2352525b" stroke-width="16"/><text x="40" y="60" fill="%23f87171" font-family="sans-serif" font-weight="bold" font-size="22">MALFUNCTIONING SIGNAL</text><text x="40" y="90" fill="%23e4e4e7" font-family="sans-serif" font-size="16">City Junction Clock Tower</text></svg>`,
};

// Initial Seed Issues for demo & college evaluation
export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'ISSUE-1001',
    title: 'Broken Street Light & Exposed Wiring in Market Lane',
    description:
      'The primary street light lamp post opposite shop #14 has been unlit for 10 days. Exposed lower junction box wires pose an electrocution hazard during evening rain.',
    category: 'Street Lights',
    location: 'Main Market, North Wing',
    image: SAMPLE_IMAGES.streetlight,
    status: 'Pending',
    upvotes: 24,
    upvotedBy: ['usr_citizen_rahul'],
    reportedBy: {
      id: 'usr_citizen_rahul',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
    },
    createdAt: '2026-09-24T18:30:00.000Z',
    resolutionNote: 'Assigned to Ward Electrical Maintenance Squad for inspection.',
  },
  {
    id: 'ISSUE-1002',
    title: 'Severe Road Pothole near College Metro Gate 2',
    description:
      'Large crater measuring nearly 2 feet wide and 6 inches deep on the primary commuting stretch. Several two-wheeler riders have lost balance during rush hour.',
    category: 'Roads',
    location: 'College Road, Metro Gate 2',
    image: SAMPLE_IMAGES.pothole,
    status: 'In Progress',
    upvotes: 37,
    upvotedBy: ['usr_citizen_rahul', 'usr_citizen_priya'],
    reportedBy: {
      id: 'usr_citizen_priya',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
    },
    createdAt: '2026-09-20T09:15:00.000Z',
    resolutionNote: 'Asphalt cold-mix patching underway by City Engineering division.',
  },
  {
    id: 'ISSUE-1003',
    title: 'Garbage Accumulation Outside Central Park Playground',
    description:
      'Municipal community bins have not been cleared for 4 days. Strays have scattered organic waste onto the pedestrian pavement causing foul smell and health concerns.',
    category: 'Garbage',
    location: 'Central Park West Gate',
    image: SAMPLE_IMAGES.garbage,
    status: 'Resolved',
    upvotes: 42,
    upvotedBy: ['usr_citizen_rahul'],
    reportedBy: {
      id: 'usr_citizen_kavita',
      name: 'Kavita Singh',
      email: 'kavita.singh@example.com',
    },
    createdAt: '2026-09-15T14:45:00.000Z',
    resolutionNote: 'Solid waste sanitization team deployed; area cleared and disinfected with lime powder.',
  },
  {
    id: 'ISSUE-1004',
    title: 'Drinking Water Pipeline Burst & Continuous Overflow',
    description:
      'High-pressure drinking water line ruptured beneath sidewalk. Thousands of liters of potable water wasting onto the roadway and flooding adjacent basements.',
    category: 'Water',
    location: '5th Cross Road, Subhash Nagar',
    image: SAMPLE_IMAGES.water,
    status: 'In Progress',
    upvotes: 19,
    upvotedBy: [],
    reportedBy: {
      id: 'usr_citizen_amit',
      name: 'Amit Verma',
      email: 'amit.verma@example.com',
    },
    createdAt: '2026-09-26T11:20:00.000Z',
    resolutionNote: 'Main isolation valve closed. Excavation and pipe sleeve replacement underway.',
  },
  {
    id: 'ISSUE-1005',
    title: 'Damaged Children Swing & Broken Safety Chain',
    description:
      'The swing set in the toddlers play zone has a snapped steel chain and cracked wooden plank. Children could suffer severe falls if not barricaded immediately.',
    category: 'Parks',
    location: 'Green Valley Park Zone B',
    image: SAMPLE_IMAGES.park,
    status: 'Pending',
    upvotes: 15,
    upvotedBy: ['usr_citizen_rahul'],
    reportedBy: {
      id: 'usr_citizen_rahul',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
    },
    createdAt: '2026-09-27T16:00:00.000Z',
    resolutionNote: 'Awaiting replacement timber and safety-link hardware from parks dept.',
  },
  {
    id: 'ISSUE-1006',
    title: 'Traffic Light Blinking Red & Timer Stalled at Peak Hours',
    description:
      'The multi-lane signal controller is rebooting constantly, leading to major bottleneck congestion, near-collisions, and emergency vehicle delays.',
    category: 'Traffic',
    location: 'City Junction Clock Tower',
    image: SAMPLE_IMAGES.traffic,
    status: 'In Progress',
    upvotes: 53,
    upvotedBy: ['usr_citizen_priya'],
    reportedBy: {
      id: 'usr_citizen_priya',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
    },
    createdAt: '2026-09-28T08:10:00.000Z',
    resolutionNote: 'Traffic police personnel deployed manually; electronics contractor dispatched.',
  },
];
