import { useApp } from '../AppContext';
import { THEME, riskColor, riskBg } from '../theme';
import { ZONES, CAMERAS } from '../mockData';
import type { ActivityFeedItem } from '../types';
import { Camera, AlertTriangle, Map, Radio, Activity, FileCheck } from 'lucide-react';

function CounterCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof Camera;
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg" style={{ backgroundColor: bg, border: `1px solid ${color}30` }}>
          <Icon size={22} style={{ color }} />
        </div>
        <div className="text-3xl font-extrabold text-white">{value}</div>
      </div>
      <div className="mt-3 text-sm text-gray-500">{label}</div>
    </div>
  );
}

function MapCanvas() {
  return (
    <div className="relative overflow-hidden rounded-xl border" style={{ backgroundColor: '#0d0d10', borderColor: THEME.border }}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3" style={{ borderColor: THEME.border }}>
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Map size={16} style={{ color: THEME.emerald }} />
          Tamil Nadu River Monitoring — Live Zone Map
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: THEME.emeraldDim, border: `1px solid ${THEME.emerald}` }} />
            <span style={{ color: THEME.textMuted }}>Permitted</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: THEME.redDim, border: `1px solid ${THEME.red}` }} />
            <span style={{ color: THEME.textMuted }}>Restricted</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Camera size={12} style={{ color: THEME.blue }} />
            <span style={{ color: THEME.textMuted }}>Camera</span>
          </span>
        </div>
      </div>
      <svg viewBox="0 0 500 380" className="w-full" style={{ display: 'block' }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1f" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="380" fill="url(#grid)" />
        <path d="M 0 170 Q 120 200 200 190 T 380 230 T 500 240" fill="none" stroke="#1e3a5f" strokeWidth="3" opacity="0.5" />
        {ZONES.map((zone) => {
          const isRestricted = zone.type === 'restricted';
          const fill = isRestricted ? THEME.redDim : THEME.emeraldDim;
          const stroke = isRestricted ? THEME.red : THEME.emerald;
          return (
            <g key={zone.id}>
              <rect x={zone.bounds.x} y={zone.bounds.y} width={zone.bounds.w} height={zone.bounds.h} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={isRestricted ? '6 3' : 'none'} opacity={0.6} rx="4" />
              <text x={zone.bounds.x + 6} y={zone.bounds.y + 14} fill={stroke} fontSize="8" fontWeight="600">
                {zone.name}
              </text>
            </g>
          );
        })}
        {CAMERAS.map((cam) => (
          <g key={cam.id}>
            {cam.status === 'online' && (
              <circle cx={cam.x} cy={cam.y} r="8" fill={THEME.blue} opacity="0.2">
                <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={cam.x} cy={cam.y} r="5" fill={cam.status === 'online' ? THEME.blue : '#444'} stroke="#fff" strokeWidth="1" />
            <text x={cam.x + 8} y={cam.y + 3} fill={THEME.textMuted} fontSize="7">{cam.id}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function FeedItem({ item }: { item: ActivityFeedItem }) {
  const iconColor = item.type === 'detection' ? riskColor(item.riskLevel) : item.type === 'verification' ? THEME.blue : item.type === 'permit' ? THEME.emerald : THEME.textMuted;
  return (
    <div className="flex items-start gap-3 border-l-2 px-3 py-2.5" style={{ borderColor: iconColor, backgroundColor: item.type === 'detection' ? riskBg(item.riskLevel) : 'transparent' }}>
      <div className="mt-0.5 flex-shrink-0">
        {item.type === 'detection' ? <AlertTriangle size={14} style={{ color: iconColor }} /> : item.type === 'verification' ? <Radio size={14} style={{ color: iconColor }} /> : item.type === 'permit' ? <FileCheck size={14} style={{ color: iconColor }} /> : <Activity size={14} style={{ color: iconColor }} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-300">{item.message}</p>
        <p className="text-xs text-gray-600">{item.timestamp}</p>
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const { alerts, feed, alertsRequiringVerification, activePermits } = useApp();
  const totalZones = ZONES.length;
  const activeCameras = CAMERAS.filter((c) => c.status === 'online').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Demo badge */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: THEME.amberDim, color: THEME.amber, border: `1px solid ${THEME.amber}40` }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: THEME.amber }} />
          Demo Data — Simulated
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="text-sm text-gray-500">Tamil Nadu River Monitoring — Real-time overview of all zones</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CounterCard icon={Map} label="Total Monitored Zones" value={totalZones} color={THEME.emerald} bg={THEME.emeraldDim} />
        <CounterCard icon={Camera} label="Active Cameras" value={activeCameras} color={THEME.blue} bg={THEME.blueDim} />
        <CounterCard icon={FileCheck} label="Active Registry Permits" value={activePermits} color={THEME.emerald} bg={THEME.emeraldDim} />
        <CounterCard icon={AlertTriangle} label="Alerts Requiring Verification" value={alertsRequiringVerification} color={THEME.red} bg={THEME.redDim} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3"><MapCanvas /></div>
        <div className="rounded-xl border lg:col-span-2" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: THEME.border }}>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Activity size={16} style={{ color: THEME.emerald }} />
              Live Telemetry Stream
            </div>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: THEME.emerald }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: THEME.emerald }} />
              LIVE
            </span>
          </div>
          <div className="max-h-[420px] overflow-y-auto py-2">
            {feed.map((item) => <FeedItem key={item.id} item={item} />)}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
        <div className="border-b px-4 py-3 text-sm font-semibold text-white" style={{ borderColor: THEME.border }}>Recent Alerts</div>
        <div className="divide-y" style={{ borderColor: THEME.border }}>
          {alerts.slice(0, 5).map((a) => (
            <div key={a.id} className="flex items-center justify-between px-4 py-3" style={{ borderColor: THEME.border }}>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: riskColor(a.riskLevel) }} />
                <div>
                  <div className="text-sm text-white">{a.detectionType} — {a.location}</div>
                  <div className="text-xs text-gray-600">{a.id} · {a.timestamp} · {a.reason}</div>
                </div>
              </div>
              <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: riskBg(a.riskLevel), color: riskColor(a.riskLevel) }}>{a.riskLevel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
