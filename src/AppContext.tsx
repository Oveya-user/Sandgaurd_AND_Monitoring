import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Alert, ActivityFeedItem, VerificationStatus, TabId, DemoCaseResult } from './types';
import { INITIAL_ALERTS, INITIAL_FEED, createActivityFromAlert, DEMO_CASES, buildDemoAlert, formatTime } from './mockData';

interface AppContextValue {
  alerts: Alert[];
  feed: ActivityFeedItem[];
  activeTab: TabId;
  selectedAlertId: string | null;
  setActiveTab: (tab: TabId) => void;
  setSelectedAlertId: (id: string | null) => void;
  simulateDetection: () => DemoCaseResult;
  updateAlertStatus: (id: string, status: VerificationStatus) => void;
  alertsRequiringVerification: number;
  activePermits: number;
  demoBanner: DemoCaseResult | null;
  clearDemoBanner: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [feed, setFeed] = useState<ActivityFeedItem[]>(INITIAL_FEED);
  const [activeTab, setActiveTab] = useState<TabId>('landing');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [demoBanner, setDemoBanner] = useState<DemoCaseResult | null>(null);
  const [demoCaseIndex, setDemoCaseIndex] = useState(0);

  const simulateDetection = useCallback(() => {
    const caseResult = DEMO_CASES[demoCaseIndex % 3];
    const caseNum = demoCaseIndex % 3 + 1;
    setDemoBanner(caseResult);

    if (caseResult.generatesAlert) {
      const newAlert = buildDemoAlert(caseNum);
      setAlerts((prev) => [newAlert, ...prev]);
      setFeed((prev) => [createActivityFromAlert(newAlert), ...prev]);
    } else {
      const checkAlert = buildDemoAlert(caseNum);
      setFeed((prev) => [
        {
          id: `feed-auth-${Date.now()}`,
          timestamp: formatTime(new Date()),
          message: `Authorized activity: ${checkAlert.detectionType} at ${checkAlert.location} — Permit ${checkAlert.permitId} valid`,
          type: 'permit',
        },
        ...prev,
      ]);
    }

    setDemoCaseIndex((prev) => prev + 1);
    return caseResult;
  }, [demoCaseIndex]);

  const clearDemoBanner = useCallback(() => setDemoBanner(null), []);

  const updateAlertStatus = useCallback((id: string, status: VerificationStatus) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    setFeed((prev) => [
      {
        id: `feed-action-${id}-${Date.now()}`,
        timestamp: formatTime(new Date()),
        message: `Alert ${id} marked as ${status}`,
        type: 'verification',
      },
      ...prev,
    ]);
  }, []);

  const alertsRequiringVerification = alerts.filter(
    (a) => a.status === 'New' || a.status === 'Under Review'
  ).length;

  const activePermits = 4;

  return (
    <AppContext.Provider
      value={{
        alerts,
        feed,
        activeTab,
        selectedAlertId,
        setActiveTab,
        setSelectedAlertId,
        simulateDetection,
        updateAlertStatus,
        alertsRequiringVerification,
        activePermits,
        demoBanner,
        clearDemoBanner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
