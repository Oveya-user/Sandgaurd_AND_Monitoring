import { AppProvider, useApp } from './AppContext';
import NavBar from './components/NavBar';
import SimulateButton from './components/SimulateButton';
import DemoBanner from './components/DemoBanner';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CommandCenter from './pages/CommandCenter';
import AIDetectionPage from './pages/AIDetectionPage';
import PermitsPage from './pages/PermitsPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#121214' }}>
      {activeTab !== 'landing' && <NavBar />}
      <main className="tab-enter flex-1" key={activeTab}>
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'dashboard' && <CommandCenter />}
        {activeTab === 'ai-detection' && <AIDetectionPage />}
        {activeTab === 'permits' && <PermitsPage />}
        {activeTab === 'alerts' && <AlertsPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
      </main>
      {activeTab !== 'landing' && <Footer />}
      <DemoBanner />
      <SimulateButton />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
