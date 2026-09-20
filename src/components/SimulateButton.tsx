import { useApp } from '../AppContext';
import { THEME } from '../theme';
import { Zap } from 'lucide-react';

export default function SimulateButton() {
  const { simulateDetection } = useApp();

  return (
    <button
      onClick={simulateDetection}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-5 py-3.5 font-semibold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${THEME.emerald}, #059669)`,
        boxShadow: `0 8px 32px ${THEME.emerald}40, 0 0 0 1px ${THEME.emerald}30`,
      }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: '#fff' }}
        />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <Zap size={18} className="transition-transform group-hover:rotate-12" />
      <span className="text-sm">Simulate New Detection</span>
    </button>
  );
}
