import { useState } from 'react';
import { useApp } from '../AppContext';
import { THEME, riskColor, riskBg, statusColor, statusBg, reasonColor, reasonBg } from '../theme';
import type { RiskLevel, VerificationStatus } from '../types';
import { Bell, MapPin, Camera, FileText, Eye, CheckCircle, XCircle, ChevronRight, ShieldCheck, FileCheck } from 'lucide-react';

function RiskBadge({ level }: { level: RiskLevel }) {
  return <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: riskBg(level), color: riskColor(level) }}>{level}</span>;
}

function StatusBadge({ status }: { status: VerificationStatus }) {
  return <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: statusBg(status), color: statusColor(status) }}>{status}</span>;
}

function DetailPanel() {
  const { alerts, selectedAlertId, setSelectedAlertId, updateAlertStatus } = useApp();
  const alert = alerts.find((a) => a.id === selectedAlertId);
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelectedAlertId(null)}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full w-full max-w-md overflow-y-auto border-l" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-5 py-4" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div>
            <div className="text-lg font-bold text-white">{alert.id}</div>
            <div className="text-xs text-gray-500">{alert.timestamp}</div>
          </div>
          <button onClick={() => setSelectedAlertId(null)} className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white">
            <XCircle size={20} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={alert.status} />
            <RiskBadge level={alert.riskLevel} />
            <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: reasonBg(alert.reason), color: reasonColor(alert.reason) }}>{alert.reason}</span>
          </div>

          {/* Detection info */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surfaceAlt, borderColor: THEME.border }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><FileText size={16} style={{ color: THEME.emerald }} />Detection Details</div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Type</span><span className="text-white">{alert.detectionType}</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Confidence</span><span style={{ color: THEME.emerald }}>{alert.confidence}%</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Camera</span><span className="text-white">{alert.camera}</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Zone</span><span className="text-white">{alert.location}</span></div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surfaceAlt, borderColor: THEME.border }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><MapPin size={16} style={{ color: THEME.blue }} />GPS Coordinates</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Latitude</span><span className="font-mono text-white">{alert.coordinates.lat}° N</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Longitude</span><span className="font-mono text-white">{alert.coordinates.lng}° E</span></div>
            </div>
          </div>

          {/* Permit Check pipeline */}
          {alert.permitCheck && (
            <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surfaceAlt, borderColor: `${reasonColor(alert.reason)}40` }}>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck size={16} style={{ color: reasonColor(alert.reason) }} />Permit Check — Automated Pipeline</div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Zone Type</span><span className="text-white">{alert.permitCheck.zoneType}</span></div>
                <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Permit Found</span><span style={{ color: alert.permitCheck.permitFound ? THEME.emerald : THEME.red }}>{alert.permitCheck.permitFound ? 'Yes' : 'No'}</span></div>
                <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Permit Status</span><span className="text-white">{alert.permitCheck.permitStatus}</span></div>
                {alert.permitId && <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Permit ID</span><span className="font-mono text-white">{alert.permitId}</span></div>}
                <div className="mt-3 rounded-lg border-l-2 p-3" style={{ borderColor: reasonColor(alert.reason), backgroundColor: reasonBg(alert.reason) }}>
                  <div className="text-xs font-semibold" style={{ color: reasonColor(alert.reason) }}>Outcome</div>
                  <p className="mt-1 text-sm text-gray-300">{alert.permitCheck.outcome}</p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: THEME.surface }}>
                  <div className="text-xs font-semibold text-gray-500">Recommendation</div>
                  <p className="mt-1 text-sm text-gray-300">{alert.permitCheck.recommendation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Evidence slot */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surfaceAlt, borderColor: THEME.border }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Camera size={16} style={{ color: THEME.amber }} />View Evidence</div>
            <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed" style={{ borderColor: THEME.border, backgroundColor: '#0d0d10' }}>
              <div className="text-center">
                <Eye size={28} className="mx-auto mb-2" style={{ color: THEME.textMuted }} />
                <p className="text-xs text-gray-600">Captured frame from {alert.camera}</p>
                <p className="text-[10px] text-gray-700">{alert.location}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => updateAlertStatus(alert.id, 'Verified')}
              disabled={alert.status === 'Verified' || alert.status === 'Dismissed'}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: THEME.emeraldDim, border: `1px solid ${THEME.emerald}40` }}
            >
              <CheckCircle size={16} />VERIFY
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => updateAlertStatus(alert.id, 'Under Review')}
                disabled={alert.status === 'Under Review' || alert.status === 'Verified' || alert.status === 'Dismissed'}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: THEME.amberDim, border: `1px solid ${THEME.amber}40` }}
              >
                <FileCheck size={16} />MARK UNDER REVIEW
              </button>
              <button
                onClick={() => updateAlertStatus(alert.id, 'Dismissed')}
                disabled={alert.status === 'Dismissed' || alert.status === 'Verified'}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: THEME.redDim, border: `1px solid ${THEME.red}40` }}
              >
                <XCircle size={16} />DISMISS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlertsPage() {
  const { alerts, setSelectedAlertId, selectedAlertId } = useApp();
  const [filter, setFilter] = useState<VerificationStatus | 'All'>('All');
  const filtered = filter === 'All' ? alerts : alerts.filter((a) => a.status === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Alerts Queue</h1>
        <p className="text-sm text-gray-500">Detections requiring operator verification — Tamil Nadu zones</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(['All', 'New', 'Under Review', 'Verified', 'Dismissed'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all"
            style={{ backgroundColor: filter === f ? THEME.emeraldDim : THEME.surface, color: filter === f ? THEME.emerald : THEME.textMuted, border: `1px solid ${filter === f ? THEME.emerald + '40' : THEME.border}` }}>
            {f}
            {f !== 'All' && <span className="ml-1.5 text-xs opacity-60">{alerts.filter((a) => a.status === f).length}</span>}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
                {['Alert ID', 'Date/Time', 'Spatial Zone Location', 'Risk Level', 'Status', ''].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: THEME.textMuted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} onClick={() => setSelectedAlertId(a.id)} className="cursor-pointer transition-colors hover:bg-[#212128]" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-4 py-3 text-sm font-mono text-white">{a.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{a.timestamp}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{a.location}</td>
                  <td className="px-4 py-3"><RiskBadge level={a.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3"><ChevronRight size={16} style={{ color: THEME.textMuted }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="py-12 text-center text-sm text-gray-600">No alerts matching this filter</div>}
      </div>

      {selectedAlertId && <DetailPanel />}
    </div>
  );
}
