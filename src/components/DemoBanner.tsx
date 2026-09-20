import { useApp } from '../AppContext';
import { THEME } from '../theme';
import { X, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useEffect } from 'react';

export default function DemoBanner() {
  const { demoBanner, clearDemoBanner } = useApp();

  useEffect(() => {
    if (demoBanner) {
      const timer = setTimeout(() => clearDemoBanner(), 8000);
      return () => clearTimeout(timer);
    }
  }, [demoBanner, clearDemoBanner]);

  if (!demoBanner) return null;

  const Icon = demoBanner.caseNumber === 1 ? CheckCircle : demoBanner.caseNumber === 2 ? AlertTriangle : Clock;

  return (
    <div className="fixed top-20 left-1/2 z-[60] w-full max-w-2xl -translate-x-1/2 px-4">
      <div
        className="flex items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: `${demoBanner.bannerColor}15`,
          borderColor: `${demoBanner.bannerColor}60`,
          boxShadow: `0 8px 32px ${demoBanner.bannerColor}30`,
        }}
      >
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${demoBanner.bannerColor}25`, border: `1px solid ${demoBanner.bannerColor}50` }}
        >
          <Icon size={20} style={{ color: demoBanner.bannerColor }} />
        </div>
        <div className="flex-1">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: demoBanner.bannerColor }}>
            {demoBanner.title}
          </div>
          <p className="text-sm leading-relaxed text-white">{demoBanner.bannerText}</p>
        </div>
        <button
          onClick={clearDemoBanner}
          className="flex-shrink-0 rounded-lg p-1 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
