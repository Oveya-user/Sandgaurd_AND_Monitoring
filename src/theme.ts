import type { RiskLevel, VerificationStatus, PermitStatus, AlertReason } from './types';

export const THEME = {
  bg: '#121214',
  surface: '#1a1a1f',
  surfaceAlt: '#212128',
  border: '#2a2a33',
  text: '#e4e4e7',
  textMuted: '#8b8b96',
  emerald: '#10b981',
  emeraldDim: '#064e3b',
  amber: '#f59e0b',
  amberDim: '#78350f',
  red: '#ef4444',
  redDim: '#7f1d1d',
  blue: '#3b82f6',
  blueDim: '#1e3a5f',
};

export function riskColor(risk?: RiskLevel): string {
  switch (risk) {
    case 'Critical': return THEME.red;
    case 'High': return '#f97316';
    case 'Medium': return THEME.amber;
    case 'Low': return THEME.emerald;
    default: return THEME.textMuted;
  }
}

export function riskBg(risk?: RiskLevel): string {
  switch (risk) {
    case 'Critical': return 'rgba(239,68,68,0.12)';
    case 'High': return 'rgba(249,115,22,0.12)';
    case 'Medium': return 'rgba(245,158,11,0.12)';
    case 'Low': return 'rgba(16,185,129,0.12)';
    default: return 'rgba(139,139,150,0.12)';
  }
}

export function statusColor(status: VerificationStatus): string {
  switch (status) {
    case 'New': return THEME.red;
    case 'Under Review': return THEME.amber;
    case 'Verified': return THEME.emerald;
    case 'Dismissed': return THEME.textMuted;
    default: return THEME.textMuted;
  }
}

export function statusBg(status: VerificationStatus): string {
  switch (status) {
    case 'New': return 'rgba(239,68,68,0.12)';
    case 'Under Review': return 'rgba(245,158,11,0.12)';
    case 'Verified': return 'rgba(16,185,129,0.12)';
    case 'Dismissed': return 'rgba(139,139,150,0.12)';
    default: return 'rgba(139,139,150,0.12)';
  }
}

export function permitStatusColor(status: PermitStatus): string {
  return status === 'Active' ? THEME.emerald : THEME.amber;
}

export function permitStatusBg(status: PermitStatus): string {
  return status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)';
}

export function reasonColor(reason: AlertReason): string {
  switch (reason) {
    case 'Authorized Activity': return THEME.emerald;
    case 'Permit Verification Required': return THEME.amber;
    case 'Permit Expired': return THEME.amber;
    case 'Suspicious Activity': return THEME.red;
    default: return THEME.textMuted;
  }
}

export function reasonBg(reason: AlertReason): string {
  switch (reason) {
    case 'Authorized Activity': return 'rgba(16,185,129,0.12)';
    case 'Permit Verification Required': return 'rgba(245,158,11,0.12)';
    case 'Permit Expired': return 'rgba(245,158,11,0.12)';
    case 'Suspicious Activity': return 'rgba(239,68,68,0.12)';
    default: return 'rgba(139,139,150,0.12)';
  }
}
