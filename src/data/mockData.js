

export const CITY_NAME = 'India'

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
]

export const CATEGORIES = [
  {
    id: "road",
    label: "Road Infrastructure",
    icon: "Construction",
    color: "brick",
  },
  {
    id: "water",
    label: "Water Supply",
    icon: "Droplets",
    color: "civic",
  },
  {
    id: "sanitation",
    label: "Sanitation & Waste",
    icon: "Trash2",
    color: "forest",
  },
  {
    id: "lighting",
    label: "Street Lighting",
    icon: "Lightbulb",
    color: "marigold",
  },
  {
    id: "drainage",
    label: "Drainage",
    icon: "Waves",
    color: "civic",
  },
  {
    id: "electricity",
    label: "Electricity",
    icon: "Zap",
    color: "gold",
  },

  {
    id: "police",
    label: "Police & Public Safety",
    icon: "Shield",
    color: "brick",
  },
  {
    id: "health",
    label: "Healthcare",
    icon: "HeartPulse",
    color: "forest",
  },
  {
    id: "veterinary",
    label: "Veterinary & Animal Welfare",
    icon: "PawPrint",
    color: "gold",
  },
  {
    id: "environment",
    label: "Environment",
    icon: "Trees",
    color: "forest",
  },
  {
    id: "transport",
    label: "Public Transport",
    icon: "Bus",
    color: "marigold",
  },
  {
    id: "education",
    label: "Education",
    icon: "School",
    color: "civic",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    icon: "Wheat",
    color: "forest",
  },
  {
    id: "fire",
    label: "Fire & Emergency",
    icon: "Flame",
    color: "brick",
  },
  {
    id: "revenue",
    label: "Revenue & Land Records",
    icon: "Landmark",
    color: "gold",
  },
  {
    id: "excise",
    label: "Excise & Illegal Activities",
    icon: "ShieldAlert",
    color: "brick",
  },
];

export const DEPARTMENTS = [
  {
    id: "pwd",
    name: "Public Works Department (PWD)",
    handles: ["road", "drainage"],
    activeCases: 1248,
    avgResponseDays: 4,
  },
  {
    id: "water",
    name: "Central Water Commission (CWC)",
    handles: ["water"],
    activeCases: 742,
    avgResponseDays: 3,
  },
  {
    id: "sanitation",
    name: "Municipal Corporation sanitation department",
    handles: ["sanitation"],
    activeCases: 985,
    avgResponseDays: 2,
  },
  {
    id: "lighting",
    name: "Energy Department",
    handles: ["lighting"],
    activeCases: 436,
    avgResponseDays: 3,
  },
  {
    id: "electricity",
    name: "TPCODL",
    handles: ["electricity"],
    activeCases: 318,
    avgResponseDays: 2,
  },
  {
    id: "municipal",
    name: "Municipal Corporation.",
    handles: ["road", "sanitation", "drainage"],
    activeCases: 611,
    avgResponseDays: 4,
  },
  {
  id: "police",
  name: " State Police",
  handles: ["police"],
  activeCases: 562,
  avgResponseDays: 1,
},

{
  id: "health",
  name: "Health & Family Welfare Department",
  handles: ["health"],
  activeCases: 401,
  avgResponseDays: 2,
},

{
  id: "veterinary",
  name: "Animal Resources Development Department",
  handles: ["veterinary"],
  activeCases: 128,
  avgResponseDays: 3,
},

{
  id: "environment",
  name: "Forest, Environment & Climate Change Department",
  handles: ["environment"],
  activeCases: 215,
  avgResponseDays: 5,
},

{
  id: "transport",
  name: "State Transport Authority",
  handles: ["transport"],
  activeCases: 290,
  avgResponseDays: 4,
},

{
  id: "education",
  name: "School & Mass Education Department",
  handles: ["education"],
  activeCases: 185,
  avgResponseDays: 5,
},

{
  id: "agriculture",
  name: "Department of Agriculture & Farmers' Empowerment",
  handles: ["agriculture"],
  activeCases: 164,
  avgResponseDays: 6,
},

{
  id: "fire",
  name: "All IndiaFire & Emergency Services",
  handles: ["fire"],
  activeCases: 57,
  avgResponseDays: 1,
},

{
  id: "revenue",
  name: "Revenue & Disaster Management Department",
  handles: ["revenue"],
  activeCases: 143,
  avgResponseDays: 5,
},

{
  id: "excise",
  name: "State Excise Department",
  handles: ["excise"],
  activeCases: 92,
  avgResponseDays: 3,
}
]

export const STATUS_STEPS = [
  'Submitted',
  'AI Verified',
  'Department Assigned',
  'Under Review',
  'Work in Progress',
  'Resolved',
]



export const COMPLAINTS = [
  {
  id: "CIV-3001",
  mine: true,
  title: "Severe waterlogging near ISKCON Square",
  description:
    "Heavy rainfall has caused knee-deep water near ISKCON Square due to blocked storm-water drains. The area becomes difficult for vehicles and pedestrians during every monsoon.",
  category: "drainage",
  department: "municipal",
  priority: "High",
  status: "Work in Progress",
  language: "en",
  ward: "Ward 30",
  location: {
    area: "ISKCON Square, Bhubaneswar",
    lat: 20.2961,
    lng: 85.8245,
  },
  submittedDate: "2026-08-02",
  reporter: "Citizen #4471",
  supportCount: 124,
  duplicateGroup: null,
  similarComplaints: [],
  aiConfidence: 95,
  evidence: {
    before: img("iskcon-before"),
    progress: img("iskcon-progress"),
    resolution: null,
  },
  timeline: [
    {
      step: "Submitted",
      date: "2026-08-02",
      note: "Reported by local residents with photos.",
    },
    {
      step: "AI Verified",
      date: "2026-08-02",
      note: "Recurring monsoon flooding detected.",
    },
    {
      step: "Department Assigned",
      date: "2026-08-03",
      note: "Forwarded to Municipal Corporation.",
    },
    {
      step: "Work in Progress",
      date: "2026-08-05",
      note: "Drain desilting work started.",
    },
  ],
},
  
  {
  id: "CIV-3002",
  title: "Road flooding on Cuttack Road near Rasulgarh",
  description:
    "Water accumulates after every rainfall because of poor drainage, causing long traffic jams.",
  category: "road",
  department: "pwd",
  priority: "High",
  status: "Department Assigned",
  language: "en",
  ward: "Ward 33",
  location: {
    area: "Rasulgarh, Bhubaneswar",
    lat: 20.2863,
    lng: 85.8556,
  },
  submittedDate: "2026-08-03",
  reporter: "Citizen #2290",
  supportCount: 178,
  duplicateGroup: null,
  similarComplaints: [],
  aiConfidence: 92,
  evidence: {
    before: img("rasulgarh-road"),
    progress: null,
    resolution: null,
  },
  timeline: [
    {
      step: "Submitted",
      date: "2026-08-03",
      note: "Reported during heavy rain.",
    },
  ],
},
  {
  id: "CIV-3003",
  title: "Blocked drain near Tala Telenga Bazaar",
  description:
    "Garbage has blocked the drain causing foul smell and flooding after rainfall.",
  category: "sanitation",
  department: "sanitation",
  priority: "High",
  status: "Under Review",
  language: "en",
  ward: "Ward 21",
  location: {
    area: "Tala Telenga Bazaar, Cuttack",
    lat: 20.4628,
    lng: 85.8825,
  },
  submittedDate: "2026-08-04",
  reporter: "Citizen #1183",
  supportCount: 96,
  duplicateGroup: null,
  similarComplaints: [],
  aiConfidence: 94,
  evidence: {
    before: img("cuttack-drain"),
    progress: null,
    resolution: null,
  },
  timeline: [
    {
      step: "Submitted",
      date: "2026-08-04",
      note: "Awaiting drain cleaning.",
    },
  ],
},
  {
  id: "CIV-3004",
  title: "Damaged road near Koraput Bus Stand",
  description:
    "Multiple potholes have developed after the monsoon making travel unsafe.",
  category: "road",
  department: "pwd",
  priority: "Medium",
  status: "Submitted",
  language: "or",
  ward: "Ward 8",
  location: {
    area: "Koraput Bus Stand",
    lat: 18.8135,
    lng: 82.7105,
  },
  submittedDate: "2026-08-06",
  reporter: "Citizen #3345",
  supportCount: 48,
  duplicateGroup: null,
  similarComplaints: [],
  aiConfidence: 88,
  evidence: {
    before: img("koraput-road"),
    progress: null,
    resolution: null,
  },
  timeline: [
    {
      step: "Submitted",
      date: "2026-08-06",
      note: "Road inspection pending.",
    },
  ],
},
  {
  id: "CIV-3005",
  mine: true,
  title: "Irregular drinking water supply in Bhawanipatna",
  description:
    "Residents are receiving low-pressure drinking water for only a few hours each day because of aging pipelines.",
  category: "water",
  department: "water",
  priority: "High",
  status: "AI Verified",
  language: "or",
  ward: "Ward 12",
  location: {
    area: "Bhawanipatna Town",
    lat: 19.9074,
    lng: 83.1663,
  },
  submittedDate: "2026-08-10",
  reporter: "Citizen #5502",
  supportCount: 87,
  duplicateGroup: null,
  similarComplaints: [],
  aiConfidence: 93,
  evidence: {
    before: img("bhawanipatna-water"),
    progress: null,
    resolution: null,
  },
  timeline: [
    {
      step: "Submitted",
      date: "2026-08-10",
      note: "Water supply complaint registered.",
    },
  ],
},
]

export const NOTIFICATIONS = [
  {
    id: "n1",
    type: "status",
    complaintId: "CIV-3001",
    message: "Drain cleaning work has started near ISKCON Square, Bhubaneswar.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "n2",
    type: "assigned",
    complaintId: "CIV-3002",
    message: "Road flooding complaint at Rasulgarh has been assigned to the Public Works Department.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "n3",
    type: "status",
    complaintId: "CIV-3003",
    message: "Drain cleaning inspection scheduled at Tala Telenga Bazaar, Cuttack.",
    time: "2 days ago",
    read: false,
  },
  {
    id: "n4",
    type: "status",
    complaintId: "CIV-3004",
    message: "Road inspection completed near Koraput Bus Stand.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "n5",
    type: "status",
    complaintId: "CIV-3005",
    message: "Water supply issue in Bhawanipatna has been verified by the Water Department.",
    time: "5 days ago",
    read: true,
  },
  {
    id: "n6",
    type: "vote",
    complaintId: null,
    message: "The ISKCON Square drainage improvement proposal has received 1,200+ citizen supports.",
    time: "1 week ago",
    read: true,
  },
]

export const PROJECTS = [
  {
    id: "PB-301",
    name: "Permanent Drainage Improvement at ISKCON Square, Bhubaneswar",
    description:
      "Construct and upgrade storm-water drainage to permanently address recurring monsoon waterlogging around ISKCON Square and nearby roads.",
    category: "drainage",
    ward: "Ward 30",
    budget: 35000000,
    votes: 3241,
    supportPercentage: 91,
    priority: "High",
    status: "Under community review",
  },

  {
    id: "PB-302",
    name: "Resurface Rasulgarh–Cuttack Road Corridor",
    description:
      "Repair potholes and resurface damaged stretches between Rasulgarh and Cuttack Road to improve traffic flow and road safety.",
    category: "road",
    ward: "Ward 33",
    budget: 48000000,
    votes: 2876,
    supportPercentage: 88,
    priority: "High",
    status: "Approved",
  },

  {
    id: "PB-303",
    name: "Modern Drain Cleaning System for Cuttack",
    description:
      "Install trash screens and improve desilting of major drains around Tala Telenga Bazaar to reduce flooding during heavy rainfall.",
    category: "sanitation",
    ward: "Ward 21",
    budget: 22000000,
    votes: 2145,
    supportPercentage: 82,
    priority: "High",
    status: "Under community review",
  },

  {
    id: "PB-304",
    name: "Road Reconstruction near Koraput Bus Stand",
    description:
      "Completely reconstruct the damaged road near Koraput Bus Stand with proper drainage and pedestrian footpaths.",
    category: "road",
    ward: "Ward 8",
    budget: 18500000,
    votes: 1632,
    supportPercentage: 76,
    priority: "Medium",
    status: "Proposed",
  },

  {
    id: "PB-305",
    name: "Upgrade Drinking Water Supply in Bhawanipatna",
    description:
      "Replace aging pipelines and improve water distribution to provide uninterrupted drinking water across Bhawanipatna town.",
    category: "water",
    ward: "Ward 12",
    budget: 41000000,
    votes: 2450,
    supportPercentage: 84,
    priority: "High",
    status: "Approved",
  },

  {
    id: "PB-306",
    name: "Solar LED Street Lighting in Smart City Bhubaneswar",
    description:
      "Install energy-efficient LED street lights on major roads and residential areas to improve public safety and reduce electricity consumption.",
    category: "lighting",
    ward: "Ward 18",
    budget: 16000000,
    votes: 1824,
    supportPercentage: 79,
    priority: "Medium",
    status: "Proposed",
  },
]

export const TRANSPARENCY_STATS = {
  totalComplaints: 184,
  resolved: 112,
  pending: 42,
  inProgress: 30,
  avgResponseDays: 3.6,

  monthly: [
    { month: "Mar", reported: 18, resolved: 14 },
    { month: "Apr", reported: 25, resolved: 20 },
    { month: "May", reported: 31, resolved: 28 },
    { month: "Jun", reported: 37, resolved: 32 },
    { month: "Jul", reported: 42, resolved: 36 },
    { month: "Aug", reported: 31, resolved: 24 },
  ],

  byCategory: [
    { category: "Road Infrastructure", count: 42, fill: "#B94A3B" },
    { category: "Drainage", count: 28, fill: "#4F7E81" },
    { category: "Water Supply", count: 24, fill: "#1F4A4E" },
    { category: "Sanitation & Waste", count: 20, fill: "#2E7D4F" },
    { category: "Street Lighting", count: 16, fill: "#DD8623" },
    { category: "Electricity", count: 12, fill: "#BC9226" },
    { category: "Police & Public Safety", count: 10, fill: "#B94A3B" },
    { category: "Healthcare", count: 8, fill: "#2E7D4F" },
    { category: "Veterinary & Animal Welfare", count: 5, fill: "#BC9226" },
    { category: "Public Transport", count: 7, fill: "#DD8623" },
    { category: "Education", count: 4, fill: "#1F4A4E" },
    { category: "Environment", count: 8, fill: "#2E7D4F" },
    { category: "Agriculture", count: 3, fill: "#2E7D4F" },
    { category: "Fire & Emergency", count: 2, fill: "#B94A3B" },
    { category: "Revenue & Land Records", count: 1, fill: "#BC9226" },
    { category: "Excise & Illegal Activities", count: 2, fill: "#B94A3B" },
  ],

  departmentPerformance: [
    {
      department: "Public Works Department (PWD)",
      avgDays: 4.2,
      resolvedRate: 86,
    },
    {
      department: "Bhubaneswar Municipal Corporation (BMC)",
      avgDays: 2.8,
      resolvedRate: 91,
    },
    {
      department: "Cuttack Municipal Corporation (CMC)",
      avgDays: 3.4,
      resolvedRate: 87,
    },
    {
      department: "Odisha Water Corporation",
      avgDays: 2.9,
      resolvedRate: 90,
    },
    {
      department: "TPCODL",
      avgDays: 2.4,
      resolvedRate: 94,
    },
  ],
}

export const ADMIN_QUEUE = COMPLAINTS
  .filter((c) => c.status !== "Resolved")
  .sort((a, b) => {
    const priorityOrder = {
      High: 0,
      Medium: 1,
      Low: 2,
    };

    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (b.supportCount !== a.supportCount) {
      return b.supportCount - a.supportCount;
    }

    if (b.aiConfidence !== a.aiConfidence) {
      return b.aiConfidence - a.aiConfidence;
    }

    return new Date(a.submittedDate) - new Date(b.submittedDate);
  });
