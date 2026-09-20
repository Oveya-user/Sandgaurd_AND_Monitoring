export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type VerificationStatus = 'New' | 'Under Review' | 'Verified' | 'Dismissed';
export type DetectionType = 'Excavator' | 'Haul Truck' | 'Dredge' | 'Personnel' | 'Vehicle' | 'Drone';
export type PermitStatus = 'Active' | 'Expired';
export type AlertReason = 'Suspicious Activity' | 'Permit Verification Required' | 'Permit Expired' | 'Authorized Activity';

export interface Alert {
  id: string;
  zone: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  riskLevel: RiskLevel;
  status: VerificationStatus;
  detectionType: DetectionType;
  confidence: number;
  camera: string;
  reason: AlertReason;
  permitId?: string;
  permitCheck?: PermitCheckResult;
  notes?: string;
}

export interface PermitCheckResult {
  zoneType: 'Permitted' | 'Restricted';
  permitFound: boolean;
  permitStatus: PermitStatus | 'None';
  outcome: string;
  recommendation: string;
}

export interface Zone {
  id: string;
  name: string;
  type: 'permitted' | 'restricted';
  bounds: { x: number; y: number; w: number; h: number };
}

export interface CameraPin {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'online' | 'offline';
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  message: string;
  type: 'detection' | 'system' | 'verification' | 'permit';
  riskLevel?: RiskLevel;
}

export interface Permit {
  id: string;
  operator: string;
  zone: string;
  scope: string;
  vehicleBound: string;
  status: PermitStatus;
  validUntil: string;
}

export type TabId = 'landing' | 'dashboard' | 'ai-detection' | 'permits' | 'alerts' | 'analytics';

export interface DemoCaseResult {
  caseNumber: number;
  title: string;
  bannerText: string;
  bannerColor: string;
  generatesAlert: boolean;
  alertReason?: AlertReason;
  riskLevel?: RiskLevel;
}
