import { useApp } from '../AppContext';
import { THEME } from '../theme';
import { ScanEye, MapPin, Bell, ArrowRight, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: ScanEye,
    title: 'AI-Based Detection',
    desc: 'Computer vision models identify excavators, haul trucks, and dredges in real time from live camera feeds across Tamil Nadu river basins with confidence scoring.',
    color: THEME.emerald,
    bg: THEME.emeraldDim,
  },
  {
    icon: MapPin,
    title: 'Geofencing',
    desc: 'Digital perimeters define permitted and restricted zones along the Kaveri, Palar, and Thamirabarani basins. Activity inside a restricted boundary triggers a verification alert.',
    color: THEME.amber,
    bg: THEME.amberDim,
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    desc: 'Every detection is logged with GPS coordinates, timestamps, and risk levels — cross-checked against active permits and routed to operators for field verification.',
    color: THEME.red,
    bg: THEME.redDim,
  },
];

export default function LandingPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      {/* Demo badge */}
      <div className="mb-8 flex justify-center">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{ backgroundColor: THEME.amberDim, color: THEME.amber, border: `1px solid ${THEME.amber}40` }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: THEME.amber }} />
          Demo Data — Simulated Environment
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-6 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{ backgroundColor: THEME.emeraldDim, color: THEME.emerald, border: `1px solid ${THEME.emerald}30` }}
        >
          <Shield size={14} />
          Tech for a Better Tomorrow
        </div>

        <h1
          className="text-5xl font-extrabold tracking-tight text-white md:text-7xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          Sand<span style={{ color: THEME.emerald }}>Guard</span>
        </h1>

        <p className="mt-4 text-xl font-light tracking-wide text-gray-400 md:text-2xl">
          Detect. Verify. Protect.
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-500">
          A smart sand mining monitoring and early warning system for Tamil Nadu river basins.
          AI-powered surveillance detects extraction activity, geofencing protects vulnerable riverbeds,
          and permit verification ensures only authorized operations proceed.
        </p>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="group mt-10 flex items-center gap-3 rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${THEME.emerald}, #059669)`,
            boxShadow: `0 8px 32px ${THEME.emerald}30`,
          }}
        >
          [OPEN MONITORING DASHBOARD]
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Feature cards */}
      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="group rounded-2xl border p-6 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: f.bg, border: `1px solid ${f.color}30` }}
              >
                <Icon size={26} style={{ color: f.color }} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Stats strip */}
      <div
        className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border p-8 md:grid-cols-4"
        style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
      >
        {[
          { label: 'Monitored Zones', value: '12' },
          { label: 'Active Cameras', value: '6' },
          { label: 'Active Permits', value: '4' },
          { label: 'Basins Covered', value: '5' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-extrabold text-white">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
