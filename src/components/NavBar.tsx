import { useApp } from '../AppContext';
import type { TabId } from '../types';
import { THEME } from '../theme';
import { Shield, LayoutDashboard, ScanEye, Bell, BarChart3, FileCheck } from 'lucide-react';

const TABS: { id: TabId; label: string; icon: typeof Shield }[] = [
  { id: 'landing', label: 'Home', icon: Shield },
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
  { id: 'ai-detection', label: 'AI Detection', icon: ScanEye },
  { id: 'permits', label: 'Permits', icon: FileCheck },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function NavBar() {
  const { activeTab, setActiveTab, alertsRequiringVerification } = useApp();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{ backgroundColor: 'rgba(18,18,20,0.88)', borderColor: THEME.border }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: THEME.emeraldDim, border: `1px solid ${THEME.emerald}40` }}
          >
            <Shield size={20} style={{ color: THEME.emerald }} />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold tracking-wide text-white">SandGuard</div>
            <div className="text-[10px] tracking-widest text-gray-500 uppercase">Tamil Nadu River Monitoring</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? THEME.emeraldDim : 'transparent',
                  color: isActive ? THEME.emerald : THEME.textMuted,
                  border: `1px solid ${isActive ? THEME.emerald + '40' : 'transparent'}`,
                }}
              >
                <Icon size={16} />
                {tab.label}
                {tab.id === 'alerts' && alertsRequiringVerification > 0 && (
                  <span
                    className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: THEME.red }}
                  >
                    {alertsRequiringVerification}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <nav className="flex items-center gap-1 lg:hidden">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-all"
                style={{
                  backgroundColor: isActive ? THEME.emeraldDim : 'transparent',
                  color: isActive ? THEME.emerald : THEME.textMuted,
                }}
              >
                <Icon size={18} />
                {tab.id === 'alerts' && alertsRequiringVerification > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                    style={{ backgroundColor: THEME.red }}
                  >
                    {alertsRequiringVerification}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
