import type { Alert, Zone, CameraPin, ActivityFeedItem, Permit, RiskLevel, DetectionType, AlertReason, PermitCheckResult, DemoCaseResult } from './types';

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Kaveri Basin — Zone A-12 (Permitted)', type: 'permitted', bounds: { x: 40, y: 50, w: 180, h: 100 } },
  { id: 'z2', name: 'Palar Basin — Zone C-04 (Permitted)', type: 'permitted', bounds: { x: 260, y: 100, w: 160, h: 85 } },
  { id: 'z3', name: 'Thamirabarani — Zone B-08 (Restricted)', type: 'restricted', bounds: { x: 120, y: 190, w: 140, h: 80 } },
  { id: 'z4', name: 'Vaigai — Zone X-09 (Restricted)', type: 'restricted', bounds: { x: 320, y: 220, w: 120, h: 70 } },
  { id: 'z5', name: 'Kaveri Delta — Zone A-15 (Permitted)', type: 'permitted', bounds: { x: 50, y: 300, w: 150, h: 60 } },
];

export const CAMERAS: CameraPin[] = [
  { id: 'TN-CAM-01', name: 'CAM-01 Kaveri A-12', x: 120, y: 100, status: 'online' },
  { id: 'TN-CAM-02', name: 'CAM-02 Palar C-04', x: 330, y: 140, status: 'online' },
  { id: 'TN-CAM-03', name: 'CAM-03 Thamirabarani B-08', x: 180, y: 225, status: 'online' },
  { id: 'TN-CAM-04', name: 'CAM-04 Vaigai X-09', x: 370, y: 250, status: 'offline' },
  { id: 'TN-CAM-05', name: 'CAM-05 Kaveri Delta', x: 110, y: 325, status: 'online' },
  { id: 'TN-CAM-06', name: 'CAM-06 Central Relay', x: 250, y: 170, status: 'online' },
];

export const PERMITS: Permit[] = [
  { id: 'TN-PMT-1024', operator: 'Trichy Sand Extraction Co.', zone: 'Kaveri Basin — Zone A-12', scope: 'Sand extraction — 500 cu.m/day', vehicleBound: 'EXC-2024-TN-8841', status: 'Active', validUntil: '2026-12-31' },
  { id: 'TN-PMT-1025', operator: 'Delta Minerals Ltd.', zone: 'Kaveri Delta — Zone A-15', scope: 'Sand extraction — 300 cu.m/day', vehicleBound: 'HUL-2024-TN-3392', status: 'Active', validUntil: '2027-03-15' },
  { id: 'TN-PMT-1026', operator: 'Vellore Aggregate Works', zone: 'Palar Basin — Zone C-04', scope: 'Sand extraction — 200 cu.m/day', vehicleBound: 'EXC-2023-TN-5517', status: 'Expired', validUntil: '2026-08-30' },
  { id: 'TN-PMT-1027', operator: 'Tirunelveli Sands Pvt.', zone: 'Thamirabarani — Zone B-08', scope: 'Sand extraction — 150 cu.m/day', vehicleBound: 'DRE-2024-TN-7723', status: 'Expired', validUntil: '2026-09-01' },
  { id: 'TN-PMT-1028', operator: 'Madurai River Projects', zone: 'Vaigai — Zone X-09', scope: 'No extraction permitted', vehicleBound: 'N/A', status: 'Expired', validUntil: '2026-06-15' },
  { id: 'TN-PMT-1029', operator: 'South Kaveri Mining', zone: 'Kaveri Basin — Zone A-12', scope: 'Sand extraction — 400 cu.m/day', vehicleBound: 'HUL-2024-TN-9981', status: 'Active', validUntil: '2027-01-20' },
];

const LOCATIONS = [
  'Kaveri Basin — Zone A-12',
  'Palar Basin — Zone C-04',
  'Thamirabarani — Zone B-08',
  'Vaigai — Zone X-09',
  'Kaveri Delta — Zone A-15',
];

const TN_COORDS: Record<string, { lat: number; lng: number }> = {
  'Kaveri Basin — Zone A-12': { lat: 10.7905, lng: 78.7047 },
  'Palar Basin — Zone C-04': { lat: 12.9295, lng: 79.1320 },
  'Thamirabarani — Zone B-08': { lat: 8.7139, lng: 77.7567 },
  'Vaigai — Zone X-09': { lat: 9.9195, lng: 78.1197 },
  'Kaveri Delta — Zone A-15': { lat: 10.8388, lng: 79.0882 },
};

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function formatTime(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

let alertCounter = 200;

export function createAlert(overrides?: Partial<Alert>): Alert {
  alertCounter += 1;
  const now = new Date();
  const location = overrides?.location ?? LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const coords = TN_COORDS[location] ?? { lat: 10.79, lng: 78.70 };
  return {
    id: `ALERT-${alertCounter}`,
    zone: location,
    location,
    coordinates: {
      lat: +(coords.lat + (Math.random() - 0.5) * 0.02).toFixed(4),
      lng: +(coords.lng + (Math.random() - 0.5) * 0.02).toFixed(4),
    },
    timestamp: formatTime(now),
    riskLevel: overrides?.riskLevel ?? 'Medium',
    status: overrides?.status ?? 'New',
    detectionType: overrides?.detectionType ?? 'Vehicle',
    confidence: Math.floor(85 + Math.random() * 14),
    camera: `TN-CAM-${pad(Math.floor(Math.random() * 6) + 1)}`,
    reason: overrides?.reason ?? 'Suspicious Activity',
    permitId: overrides?.permitId,
    permitCheck: overrides?.permitCheck,
    ...overrides,
  };
}

export function createActivityFromAlert(alert: Alert): ActivityFeedItem {
  return {
    id: `feed-${alert.id}-${Date.now()}`,
    timestamp: alert.timestamp,
    message: `${alert.detectionType} detected at ${alert.location} (${alert.confidence}% confidence) — ${alert.reason}`,
    type: 'detection',
    riskLevel: alert.riskLevel,
  };
}

function makePermitCheck(zoneType: 'Permitted' | 'Restricted', permitFound: boolean, permitStatus: 'Active' | 'Expired' | 'None'): PermitCheckResult {
  if (zoneType === 'Permitted' && permitFound && permitStatus === 'Active') {
    return {
      zoneType,
      permitFound,
      permitStatus,
      outcome: 'Authorized activity detected — Matching active permit found.',
      recommendation: 'No enforcement alert. Log as routine check.',
    };
  }
  if (zoneType === 'Restricted' && !permitFound) {
    return {
      zoneType,
      permitFound,
      permitStatus,
      outcome: 'Suspicious activity detected — No matching permit on record for restricted zone.',
      recommendation: 'Human verification required. Dispatch field inspector.',
    };
  }
  return {
    zoneType,
    permitFound,
    permitStatus,
    outcome: 'Permit verification required — Matching permit found but status is expired.',
    recommendation: 'Human verification required. Reason: Permit expired.',
  };
}

export const INITIAL_ALERTS: Alert[] = [
  createAlert({ id: 'ALERT-201', location: 'Thamirabarani — Zone B-08', riskLevel: 'High', status: 'New', detectionType: 'Excavator', confidence: 96, camera: 'TN-CAM-03', reason: 'Suspicious Activity', timestamp: '2026-09-20 14:32:08', permitCheck: makePermitCheck('Restricted', false, 'None') }),
  createAlert({ id: 'ALERT-202', location: 'Vaigai — Zone X-09', riskLevel: 'High', status: 'Under Review', detectionType: 'Haul Truck', confidence: 91, camera: 'TN-CAM-04', reason: 'Permit Verification Required', timestamp: '2026-09-20 14:28:41', permitCheck: makePermitCheck('Restricted', false, 'None') }),
  createAlert({ id: 'ALERT-203', location: 'Kaveri Basin — Zone A-12', riskLevel: 'Low', status: 'Verified', detectionType: 'Vehicle', confidence: 88, camera: 'TN-CAM-01', reason: 'Authorized Activity', timestamp: '2026-09-20 14:15:22', permitId: 'TN-PMT-1024', permitCheck: makePermitCheck('Permitted', true, 'Active') }),
  createAlert({ id: 'ALERT-204', location: 'Palar Basin — Zone C-04', riskLevel: 'Medium', status: 'New', detectionType: 'Dredge', confidence: 89, camera: 'TN-CAM-02', reason: 'Permit Expired', timestamp: '2026-09-20 14:10:55', permitId: 'TN-PMT-1026', permitCheck: makePermitCheck('Permitted', true, 'Expired') }),
  createAlert({ id: 'ALERT-205', location: 'Kaveri Delta — Zone A-15', riskLevel: 'Medium', status: 'Dismissed', detectionType: 'Personnel', confidence: 87, camera: 'TN-CAM-05', reason: 'Authorized Activity', timestamp: '2026-09-20 13:58:30', permitId: 'TN-PMT-1025', permitCheck: makePermitCheck('Permitted', true, 'Active') }),
  createAlert({ id: 'ALERT-206', location: 'Thamirabarani — Zone B-08', riskLevel: 'High', status: 'New', detectionType: 'Drone', confidence: 93, camera: 'TN-CAM-03', reason: 'Suspicious Activity', timestamp: '2026-09-20 13:45:12', permitCheck: makePermitCheck('Restricted', false, 'None') }),
  createAlert({ id: 'ALERT-207', location: 'Vaigai — Zone X-09', riskLevel: 'Critical', status: 'Under Review', detectionType: 'Excavator', confidence: 95, camera: 'TN-CAM-04', reason: 'Suspicious Activity', timestamp: '2026-09-20 13:30:00', permitCheck: makePermitCheck('Restricted', false, 'None') }),
  createAlert({ id: 'ALERT-208', location: 'Kaveri Basin — Zone A-12', riskLevel: 'Low', status: 'Verified', detectionType: 'Haul Truck', confidence: 86, camera: 'TN-CAM-01', reason: 'Authorized Activity', timestamp: '2026-09-20 13:12:45', permitId: 'TN-PMT-1029', permitCheck: makePermitCheck('Permitted', true, 'Active') }),
];

export const INITIAL_FEED: ActivityFeedItem[] = [
  { id: 'feed-init-1', timestamp: '2026-09-20 14:32:08', message: 'Excavator detected at Thamirabarani — Zone B-08 (96%) — Suspicious Activity', type: 'detection', riskLevel: 'High' },
  { id: 'feed-init-2', timestamp: '2026-09-20 14:28:41', message: 'Haul Truck detected at Vaigai — Zone X-09 (91%) — Permit Verification Required', type: 'detection', riskLevel: 'High' },
  { id: 'feed-init-3', timestamp: '2026-09-20 14:25:00', message: 'System: TN-CAM-04 connectivity check — offline', type: 'system' },
  { id: 'feed-init-4', timestamp: '2026-09-20 14:20:15', message: 'Permit TN-PMT-1024 verified for Kaveri Basin — Zone A-12', type: 'permit' },
  { id: 'feed-init-5', timestamp: '2026-09-20 14:15:22', message: 'Vehicle detected at Kaveri Basin — Zone A-12 (88%) — Authorized Activity', type: 'detection', riskLevel: 'Low' },
  { id: 'feed-init-6', timestamp: '2026-09-20 14:10:55', message: 'Dredge detected at Palar Basin — Zone C-04 (89%) — Permit Expired', type: 'detection', riskLevel: 'Medium' },
  { id: 'feed-init-7', timestamp: '2026-09-20 13:58:30', message: 'Alert ALERT-205 dismissed by operator', type: 'verification' },
  { id: 'feed-init-8', timestamp: '2026-09-20 13:45:12', message: 'Drone detected at Thamirabarani — Zone B-08 (93%) — Suspicious Activity', type: 'detection', riskLevel: 'High' },
];

export const DEMO_CASES: DemoCaseResult[] = [
  {
    caseNumber: 1,
    title: 'Case 1: Permitted Zone + Valid Permit',
    bannerText: 'Authorized activity detected — Matching active permit found. Status: No enforcement alert.',
    bannerColor: '#10b981',
    generatesAlert: false,
  },
  {
    caseNumber: 2,
    title: 'Case 2: Restricted Zone + No Permit',
    bannerText: 'Suspicious activity detected — Human verification required. Risk: High.',
    bannerColor: '#ef4444',
    generatesAlert: true,
    alertReason: 'Suspicious Activity',
    riskLevel: 'High',
  },
  {
    caseNumber: 3,
    title: 'Case 3: Expired Permit',
    bannerText: 'Permit verification required — Human verification required. Reason: Permit expired.',
    bannerColor: '#f59e0b',
    generatesAlert: true,
    alertReason: 'Permit Expired',
    riskLevel: 'Medium',
  },
];

export function buildDemoAlert(caseNum: number): Alert {
  if (caseNum === 1) {
    return createAlert({
      location: 'Kaveri Basin — Zone A-12',
      riskLevel: 'Low',
      status: 'Verified',
      detectionType: 'Haul Truck',
      confidence: 92,
      camera: 'TN-CAM-01',
      reason: 'Authorized Activity',
      permitId: 'TN-PMT-1024',
      permitCheck: makePermitCheck('Permitted', true, 'Active'),
    });
  }
  if (caseNum === 2) {
    return createAlert({
      location: 'Vaigai — Zone X-09',
      riskLevel: 'High',
      status: 'New',
      detectionType: 'Excavator',
      confidence: 94,
      camera: 'TN-CAM-04',
      reason: 'Suspicious Activity',
      permitCheck: makePermitCheck('Restricted', false, 'None'),
    });
  }
  return createAlert({
    location: 'Palar Basin — Zone C-04',
    riskLevel: 'Medium',
    status: 'New',
    detectionType: 'Dredge',
    confidence: 90,
    camera: 'TN-CAM-02',
    reason: 'Permit Expired',
    permitId: 'TN-PMT-1026',
    permitCheck: makePermitCheck('Permitted', true, 'Expired'),
  });
}
