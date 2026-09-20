import { THEME } from '../theme';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="border-t px-4 py-6"
      style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Shield size={16} style={{ color: THEME.emerald }} />
            <span className="text-sm font-bold text-white">SandGuard</span>
            <span className="text-xs text-gray-600">— Tamil Nadu River Monitoring (Simulated Environment)</span>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed text-gray-600">
            SandGuard combines computer vision, geofencing, and permit verification to prioritize field inspections.
            Automated detections do not independently establish unauthorized activity.
          </p>
          <div
            className="mt-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: THEME.amberDim, color: THEME.amber, border: `1px solid ${THEME.amber}40` }}
          >
            Demo Data — Simulated
          </div>
        </div>
      </div>
    </footer>
  );
}
