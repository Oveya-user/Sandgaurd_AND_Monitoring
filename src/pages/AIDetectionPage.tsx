import { THEME } from '../theme';
import { useApp } from '../AppContext';
import { ScanEye, Camera, Cpu, AlertTriangle, Info } from 'lucide-react';

export default function AIDetectionPage() {
  const { feed } = useApp();
  const recentDetections = feed.filter((f) => f.type === 'detection').slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Detection</h1>
        <p className="text-sm text-gray-500">Live computer vision analysis — Tamil Nadu river basin camera feeds</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border" style={{ backgroundColor: '#0d0d10', borderColor: THEME.border }}>
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: THEME.border }}>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Camera size={16} style={{ color: THEME.blue }} />
                TN-CAM-03 — Thamirabarani Basin, Zone B-08
              </div>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: THEME.red }}>
                <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: THEME.red }} />
                REC
              </span>
            </div>

            <div className="relative aspect-video w-full" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)' }}>
              <svg viewBox="0 0 800 450" className="absolute inset-0 h-full w-full">
                <path d="M 0 200 Q 200 230 400 220 T 800 240 L 800 280 Q 600 260 400 260 T 0 250 Z" fill="#1e3a5f" opacity="0.6" />
                <path d="M 0 280 Q 200 290 400 285 T 800 290 L 800 450 L 0 450 Z" fill="#3d3522" opacity="0.5" />
                <path d="M 0 150 Q 200 170 400 160 T 800 180 L 800 200 L 0 200 Z" fill="#3d3522" opacity="0.4" />
                {[[80, 120], [180, 100], [320, 110], [520, 90], [680, 120], [740, 100]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="8" fill="#1a4d2e" opacity="0.6" />
                ))}
                <line x1="0" y1="225" x2="800" y2="225" stroke={THEME.emerald} strokeWidth="1" opacity="0.3">
                  <animate attributeName="y1" values="0;450;0" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="0;450;0" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>

              <div className="absolute" style={{ left: '38%', top: '35%', width: '22%', height: '30%', border: `2px solid ${THEME.red}`, borderRadius: '4px', boxShadow: `0 0 12px ${THEME.red}40` }}>
                <div className="absolute -top-7 left-0 flex items-center gap-1.5 rounded px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: THEME.red }}>
                  <AlertTriangle size={11} />
                  EXCAVATOR (96%)
                </div>
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} h-2.5 w-2.5 border-white`} style={{ borderColor: THEME.red }} />
                ))}
              </div>

              <div className="absolute" style={{ left: '12%', top: '55%', width: '18%', height: '22%', border: `2px solid ${THEME.amber}`, borderRadius: '4px', boxShadow: `0 0 12px ${THEME.amber}40` }}>
                <div className="absolute -top-7 left-0 flex items-center gap-1.5 rounded px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: THEME.amber }}>
                  <AlertTriangle size={11} />
                  HAUL TRUCK (91%)
                </div>
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} h-2.5 w-2.5`} style={{ borderColor: THEME.amber }} />
                ))}
              </div>

              <div className="absolute right-3 top-3 flex flex-col gap-1 text-right text-[10px] font-mono text-gray-400">
                <div>LAT: 8.7139° N</div>
                <div>LNG: 77.7567° E</div>
                <div style={{ color: THEME.red }}>GEOFENCE: RESTRICTED — Zone B-08</div>
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-gray-500">
                2026-09-20 14:32:08 · 30fps · 1080p · Thamirabarani Basin
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: 'rgba(245,158,11,0.08)', borderColor: `${THEME.amber}40` }}>
            <Info size={18} className="flex-shrink-0" style={{ color: THEME.amber }} />
            <p className="text-sm leading-relaxed" style={{ color: '#d4a857' }}>
              AI detections are alerts for human verification and do not independently establish unauthorized activity.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Cpu size={16} style={{ color: THEME.emerald }} />
              Model Status
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Model</span><span className="text-white">SandGuard-CV v2.1</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Inference</span><span style={{ color: THEME.emerald }}>42ms / frame</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Classes</span><span className="text-white">6 active</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Confidence Threshold</span><span className="text-white">85%</span></div>
            </div>
          </div>

          <div className="rounded-xl border" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
            <div className="flex items-center gap-2 border-b px-4 py-3 text-sm font-semibold text-white" style={{ borderColor: THEME.border }}>
              <ScanEye size={16} style={{ color: THEME.emerald }} />
              Detection Log
            </div>
            <div className="max-h-80 space-y-1 overflow-y-auto p-2">
              {recentDetections.map((d) => (
                <div key={d.id} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: THEME.surfaceAlt }}>
                  <AlertTriangle size={13} style={{ color: d.riskLevel === 'Critical' ? THEME.red : d.riskLevel === 'High' ? '#f97316' : THEME.amber }} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs text-gray-300">{d.message}</div>
                    <div className="text-[10px] text-gray-600">{d.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
