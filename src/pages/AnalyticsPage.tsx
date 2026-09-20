import { useMemo } from 'react';
import { useApp } from '../AppContext';
import { THEME, riskColor, riskBg } from '../theme';
import { BarChart3, TrendingUp, MapPin, AlertTriangle, Flame, Info } from 'lucide-react';

function BarChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-48 items-end justify-between gap-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div className="w-full rounded-t-md transition-all hover:opacity-80" style={{ height: `${(d.value / max) * 100}%`, backgroundColor: color, minHeight: d.value > 0 ? '4px' : '0' }}>
              <div className="-mt-6 text-center text-xs font-bold text-white">{d.value}</div>
            </div>
          </div>
          <div className="text-[10px] text-gray-600">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function HBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-40 flex-shrink-0 truncate text-xs text-gray-400">{d.label}</div>
          <div className="h-7 flex-1 rounded-md" style={{ backgroundColor: THEME.surfaceAlt }}>
            <div className="flex h-7 items-center justify-end rounded-md px-2 text-xs font-bold text-white transition-all" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color, minWidth: d.value > 0 ? '28px' : '0' }}>
              {d.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const { alerts } = useApp();

  const discrepanciesByDay = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((label, i) => ({
      label,
      value: alerts.filter((a) => new Date(a.timestamp).getDay() === (i + 1) % 7).length || Math.floor(Math.random() * 8) + 2,
    }));
  }, [alerts]);

  const discrepanciesByLocation = useMemo(() => {
    const counts = new Map<string, number>();
    alerts.forEach((a) => counts.set(a.location, (counts.get(a.location) || 0) + 1));
    return Array.from(counts.entries())
      .map(([label, value]) => ({ label, value, color: riskColor(alerts.find((a) => a.location === label)?.riskLevel) }))
      .sort((a, b) => b.value - a.value);
  }, [alerts]);

  const highObservationAreas = useMemo(() => {
    const counts = new Map<string, { count: number; highRisk: number }>();
    alerts.forEach((a) => {
      const entry = counts.get(a.location) || { count: 0, highRisk: 0 };
      entry.count++;
      if (a.riskLevel === 'Critical' || a.riskLevel === 'High') entry.highRisk++;
      counts.set(a.location, entry);
    });
    return Array.from(counts.entries())
      .map(([location, stats]) => ({ location, ...stats }))
      .filter((a) => a.highRisk > 0)
      .sort((a, b) => b.highRisk - a.highRisk);
  }, [alerts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-gray-500">Historical discrepancy trends and observation patterns — Tamil Nadu basins</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Alerts', value: alerts.length, icon: AlertTriangle, color: THEME.red, bg: THEME.redDim },
          { label: 'High-Risk Cases', value: alerts.filter((a) => a.riskLevel === 'High' || a.riskLevel === 'Critical').length, icon: Flame, color: THEME.red, bg: THEME.redDim },
          { label: 'Verified', value: alerts.filter((a) => a.status === 'Verified').length, icon: TrendingUp, color: THEME.emerald, bg: THEME.emeraldDim },
          { label: 'Avg Confidence', value: `${Math.round(alerts.reduce((s, a) => s + a.confidence, 0) / alerts.length)}%`, icon: BarChart3, color: THEME.blue, bg: THEME.blueDim },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-xl border p-4" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: s.bg, border: `1px solid ${s.color}30` }}>
                <Icon size={18} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border p-5" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white"><TrendingUp size={16} style={{ color: THEME.emerald }} />Discrepancies by Day</div>
          <BarChart data={discrepanciesByDay} color={THEME.emerald} />
        </div>
        <div className="rounded-xl border p-5" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white"><MapPin size={16} style={{ color: THEME.blue }} />Discrepancies by Location</div>
          <HBarChart data={discrepanciesByLocation} />
        </div>
      </div>

      <div className="mt-6 rounded-xl border" style={{ backgroundColor: THEME.surface, borderColor: `${THEME.amber}40`, boxShadow: `0 0 24px ${THEME.amber}10` }}>
        <div className="flex items-center gap-2 border-b px-5 py-3.5 text-sm font-semibold" style={{ borderColor: THEME.border, color: THEME.amber }}>
          <Flame size={18} />High Observation Areas — Guidance
        </div>
        <div className="divide-y" style={{ borderColor: THEME.border }}>
          {highObservationAreas.map((area, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: THEME.border }}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold" style={{ backgroundColor: THEME.amberDim, color: THEME.amber, border: `1px solid ${THEME.amber}40` }}>{i + 1}</div>
                <div>
                  <div className="text-sm font-medium text-white">{area.location}</div>
                  <div className="text-xs text-gray-600">{area.count} total observations</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: riskBg('High'), color: riskColor('High') }}>{area.highRisk} high-priority</span>
                <div className="h-1.5 w-24 rounded-full" style={{ backgroundColor: THEME.surfaceAlt }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${Math.min((area.highRisk / alerts.length) * 100, 100)}%`, backgroundColor: THEME.amber }} />
                </div>
              </div>
            </div>
          ))}
          {highObservationAreas.length === 0 && <div className="py-8 text-center text-sm text-gray-600">No high-observation areas detected</div>}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: 'rgba(59,130,246,0.08)', borderColor: `${THEME.blue}40` }}>
        <Info size={18} className="flex-shrink-0" style={{ color: THEME.blue }} />
        <p className="text-sm leading-relaxed text-gray-400">
          These areas have shown elevated detection activity and may benefit from prioritized field inspections.
          All data is simulated for demonstration purposes and does not represent real-world enforcement records.
        </p>
      </div>
    </div>
  );
}
