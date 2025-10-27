// Mock data generators for InfAIra Dashboard

// User profiles with role-based access
export const users = {
  admin: {
    id: 1,
    username: 'InfAIra Admin',
    email: 'infaira.admin@infaira.com',
    role: 'Admin',
    avatar: 'https://ui-avatars.com/api/?name=InfAIra+Admin&background=3b82f6&color=fff',
    permissions: ['advisory', 'cvs', 'twin', 'command', 'sustain', 'ops'],
  },
  fmOps: {
    id: 2,
    username: 'InfAIra FM Ops',
    email: 'infaira.fmops@infaira.com',
    role: 'FM Operations',
    avatar: 'https://ui-avatars.com/api/?name=InfAIra+FM+Ops&background=22c55e&color=fff',
    permissions: ['ops', 'command', 'cvs'],
  },
  viewer: {
    id: 3,
    username: 'InfAIra Viewer',
    email: 'infaira.viewer@infaira.com',
    role: 'Viewer',
    avatar: 'https://ui-avatars.com/api/?name=InfAIra+Viewer&background=f59e0b&color=fff',
    permissions: ['sustain', 'command'],
    readOnly: true,
  },
};

// Generate time series data
export const generateTimeSeriesData = (days = 30, baseValue = 100, variance = 20) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const value = baseValue + (Math.random() - 0.5) * variance;
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, Math.round(value * 100) / 100),
      timestamp: date.getTime(),
    });
  }
  
  return data;
};

// Real-time metrics with fluctuation
export const generateRealtimeMetric = (base, range = 10) => {
  return base + (Math.random() - 0.5) * range;
};

// Advisory services
export const advisoryServices = [
  {
    id: 'ai-readiness',
    title: 'AI Readiness Assessment',
    icon: 'brain',
    description: 'Evaluate your organization\'s readiness for AI adoption with comprehensive analysis and strategic recommendations.',
    metrics: { completion: 85, score: 92 },
    color: 'blue',
  },
  {
    id: 'esg-strategy',
    title: 'ESG Strategy Consulting',
    icon: 'leaf',
    description: 'Develop sustainable ESG strategies aligned with global standards and your business objectives.',
    metrics: { completion: 70, score: 88 },
    color: 'green',
  },
  {
    id: 'smart-infrastructure',
    title: 'Smart Infrastructure Roadmap',
    icon: 'building',
    description: 'Design and implement intelligent building systems for optimal efficiency and occupant experience.',
    metrics: { completion: 60, score: 85 },
    color: 'purple',
  },
  {
    id: 'investment-strategy',
    title: 'Investment Strategy Planning',
    icon: 'trending-up',
    description: 'Optimize capital allocation for technology investments with data-driven ROI projections.',
    metrics: { completion: 45, score: 90 },
    color: 'orange',
  },
  {
    id: 'operational-excellence',
    title: 'Operational Excellence Framework',
    icon: 'target',
    description: 'Implement best practices and KPIs to achieve operational excellence across your facilities.',
    metrics: { completion: 75, score: 87 },
    color: 'red',
  },
  {
    id: 'compliance',
    title: 'Standards & Compliance',
    icon: 'shield-check',
    description: 'Ensure compliance with industry standards, regulations, and certification requirements.',
    metrics: { completion: 90, score: 95 },
    color: 'indigo',
  },
];

// CVS Solutions
export const cvsSolutions = [
  {
    id: 'ppe-detection',
    name: 'PPE Detection',
    category: 'Safety',
    description: 'Real-time detection of personal protective equipment compliance',
    accuracy: 99.2,
    benefits: ['Reduce workplace accidents', 'Automated compliance monitoring', 'Real-time alerts'],
    image: require('../assets/ppe-detection.png'),
    status: 'active',
  },
  {
    id: 'intrusion-detection',
    name: 'Intrusion Detection',
    category: 'Security',
    description: 'Advanced perimeter security with AI-powered threat detection',
    accuracy: 99.5,
    benefits: ['24/7 automated monitoring', 'Reduce false alarms', 'Instant notifications'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    status: 'active',
  },
  {
    id: 'crowd-analytics',
    name: 'Crowd Density Analysis',
    category: 'Analytics',
    description: 'Monitor and analyze crowd patterns for safety and optimization',
    accuracy: 99.1,
    benefits: ['Optimize space utilization', 'Prevent overcrowding', 'Heat map visualization'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    status: 'active',
  },
  {
    id: 'fall-detection',
    name: 'Fall Detection',
    category: 'Safety',
    description: 'AI-powered fall detection for elderly care and workplace safety',
    accuracy: 99.4,
    benefits: ['Immediate emergency response', 'Elderly care monitoring', 'Workplace safety'],
    image: require('../assets/Fall Detection.png'),
    status: 'active',
  },
  {
    id: 'license-plate',
    name: 'License Plate Recognition',
    category: 'Security',
    description: 'Automated vehicle identification and access control',
    accuracy: 99.1,
    benefits: ['Seamless access control', 'Parking management', 'Security tracking'],
    image: require('../assets/Number Plate Recognition.jpeg'),
    status: 'active',
  },
  {
    id: 'fire-smoke',
    name: 'Fire & Smoke Detection',
    category: 'Safety',
    description: 'Early detection of fire and smoke for rapid response',
    accuracy: 99.7,
    benefits: ['Early warning system', 'Minimize damage', 'Automated alerts'],
    image: require('../assets/Fire and Smoke Detection.png'),
    status: 'active',
  },
];

// Digital Twin sensor data
export const sensorData = {
  temperature: Array.from({ length: 10 }, (_, i) => ({
    zone: `Zone ${i + 1}`,
    value: 22 + Math.random() * 4,
    status: Math.random() > 0.8 ? 'warning' : 'normal',
  })),
  occupancy: Array.from({ length: 10 }, (_, i) => ({
    zone: `Zone ${i + 1}`,
    current: Math.floor(Math.random() * 50),
    capacity: 50,
    percentage: Math.floor(Math.random() * 100),
  })),
  energy: {
    current: 1250.5,
    peak: 1800,
    average: 1100,
    trend: 'decreasing',
  },
};

// Command Center widgets data
export const commandCenterData = {
  energy: {
    consumption: 1250.5,
    cost: 2847.32,
    efficiency: 87,
    trend: generateTimeSeriesData(24, 1200, 200),
  },
  security: {
    cameras: 48,
    active: 46,
    alerts: 3,
    incidents: [
      { id: 1, type: 'Motion Detected', zone: 'Parking Lot B', time: '2 min ago', severity: 'low' },
      { id: 2, type: 'Door Held Open', zone: 'Main Entrance', time: '15 min ago', severity: 'medium' },
      { id: 3, type: 'Unauthorized Access', zone: 'Server Room', time: '1 hour ago', severity: 'high' },
    ],
  },
  facilities: {
    hvac: { status: 'operational', efficiency: 92, units: 12, active: 12 },
    lighting: { status: 'operational', efficiency: 88, zones: 45, active: 38 },
    access: { status: 'operational', doors: 120, locked: 98, unlocked: 22 },
  },
  sustainability: {
    carbonFootprint: 145.2,
    waterUsage: 12500,
    renewableEnergy: 35,
    wasteRecycled: 68,
  },
  occupancy: {
    current: 456,
    capacity: 800,
    percentage: 57,
    heatmap: Array.from({ length: 20 }, () => Math.random() * 100),
  },
  assets: [
    { id: 1, name: 'Chiller Unit 1', health: 95, status: 'excellent' },
    { id: 2, name: 'Elevator A', health: 88, status: 'good' },
    { id: 3, name: 'Generator 1', health: 72, status: 'fair' },
    { id: 4, name: 'HVAC Zone 3', health: 65, status: 'attention' },
    { id: 5, name: 'Pump System B', health: 45, status: 'critical' },
  ],
  alerts: [
    { id: 1, message: 'HVAC Zone 3 temperature deviation', time: '5 min ago', severity: 'warning' },
    { id: 2, message: 'Pump System B requires maintenance', time: '12 min ago', severity: 'critical' },
    { id: 3, message: 'Energy consumption peak detected', time: '25 min ago', severity: 'info' },
    { id: 4, message: 'Security camera offline - Parking C', time: '1 hour ago', severity: 'warning' },
  ],
  environmental: {
    temperature: 23.5,
    humidity: 55,
    airQuality: 85,
    co2: 420,
  },
};

// Sustainability data
export const sustainabilityData = {
  heroMetrics: {
    carbonSaved: 1247.5,
    efficiencyImprovement: 23.5,
    waterConservation: 458900,
    wasteDiverted: 72.3,
  },
  monthlyTrends: {
    energy: generateTimeSeriesData(7, 1200, 150),
    water: generateTimeSeriesData(7, 15000, 2000),
    carbon: generateTimeSeriesData(7, 150, 20),
    waste: generateTimeSeriesData(7, 500, 50),
  },
  goals: [
    { name: 'Carbon Neutrality', target: 100, current: 68, deadline: '2030' },
    { name: 'Renewable Energy', target: 100, current: 35, deadline: '2028' },
    { name: 'Water Reduction', target: 50, current: 32, deadline: '2026' },
    { name: 'Waste Diversion', target: 90, current: 72, deadline: '2025' },
  ],
  greenMarkScore: 92,
  achievements: [
    { id: 1, title: 'Green Mark Platinum', date: '2024-01', icon: 'award' },
    { id: 2, title: '25% Energy Reduction', date: '2024-03', icon: 'zap' },
    { id: 3, title: 'Zero Waste Week', date: '2024-06', icon: 'recycle' },
    { id: 4, title: 'Solar Installation', date: '2024-08', icon: 'sun' },
  ],
  recommendations: [
    { id: 1, title: 'Upgrade to LED lighting in Zone C', impact: 'High', savings: '₹10,50,000/year' },
    { id: 2, title: 'Install smart thermostats', impact: 'Medium', savings: '₹6,90,000/year' },
    { id: 3, title: 'Optimize HVAC schedules', impact: 'Medium', savings: '₹5,70,000/year' },
    { id: 4, title: 'Implement rainwater harvesting', impact: 'High', savings: '₹12,60,000/year' },
  ],
};

// Operations data
export const operationsData = {
  maintenanceCalendar: [
    { id: 1, task: 'HVAC Filter Replacement', date: '2024-11-15', priority: 'high', status: 'scheduled' },
    { id: 2, task: 'Elevator Annual Inspection', date: '2024-11-18', priority: 'critical', status: 'scheduled' },
    { id: 3, task: 'Fire Alarm Testing', date: '2024-11-20', priority: 'high', status: 'scheduled' },
    { id: 4, task: 'Chiller Maintenance', date: '2024-11-22', priority: 'medium', status: 'scheduled' },
    { id: 5, task: 'Lighting System Check', date: '2024-11-25', priority: 'low', status: 'scheduled' },
  ],
  afddAlerts: [
    { id: 1, type: 'Temperature Deviation', equipment: 'HVAC Zone 3', severity: 'high', rootCause: 'Faulty temperature sensor', detected: '2 hours ago' },
    { id: 2, type: 'Pressure Drop', equipment: 'Pump System B', severity: 'critical', rootCause: 'Possible leak in system', detected: '4 hours ago' },
    { id: 3, type: 'Energy Spike', equipment: 'Chiller Unit 2', severity: 'medium', rootCause: 'Inefficient operation mode', detected: '6 hours ago' },
    { id: 4, type: 'Vibration Anomaly', equipment: 'Fan Coil Unit 12', severity: 'medium', rootCause: 'Bearing wear detected', detected: '1 day ago' },
  ],
  assetPortfolio: {
    hvac: { total: 24, healthy: 20, attention: 3, critical: 1, efficiency: 89 },
    electrical: { total: 156, healthy: 148, attention: 6, critical: 2, efficiency: 92 },
    plumbing: { total: 89, healthy: 82, attention: 5, critical: 2, efficiency: 87 },
    elevators: { total: 8, healthy: 7, attention: 1, critical: 0, efficiency: 95 },
    lighting: { total: 450, healthy: 438, attention: 10, critical: 2, efficiency: 88 },
  },
  workOrders: {
    open: 23,
    inProgress: 15,
    completed: 187,
    overdue: 3,
  },
  optimizationRecommendations: [
    { id: 1, title: 'Optimize chiller sequencing', impact: 92, savings: '₹15,55,000/year', complexity: 'medium' },
    { id: 2, title: 'Implement demand-based ventilation', impact: 88, savings: '₹11,95,000/year', complexity: 'high' },
    { id: 3, title: 'Adjust lighting schedules', impact: 75, savings: '₹8,25,000/year', complexity: 'low' },
    { id: 4, title: 'Upgrade pump VFDs', impact: 85, savings: '₹10,60,000/year', complexity: 'medium' },
  ],
  performanceTrends: generateTimeSeriesData(90, 85, 10),
  costSavings: {
    monthly: 12450,
    yearly: 149400,
    projected: 175000,
  },
};

// Generate random alert
export const generateAlert = () => {
  const types = ['info', 'warning', 'critical', 'success'];
  const messages = [
    'System optimization completed',
    'Temperature threshold exceeded',
    'Maintenance required',
    'Energy efficiency improved',
    'Security alert detected',
    'Equipment performance degraded',
  ];
  
  return {
    id: Date.now(),
    type: types[Math.floor(Math.random() * types.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date().toISOString(),
  };
};

export default {
  users,
  advisoryServices,
  cvsSolutions,
  sensorData,
  commandCenterData,
  sustainabilityData,
  operationsData,
  generateTimeSeriesData,
  generateRealtimeMetric,
  generateAlert,
};
