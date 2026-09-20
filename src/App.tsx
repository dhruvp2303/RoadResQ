import React from 'react';
import { RoadResQProvider, useRoadResQ } from './context/RoadResQContext';
import RoleNavbar from './components/common/RoleNavbar';
import DemoControlBar from './components/common/DemoControlBar';
import SafetyModeModal from './components/common/SafetyModeModal';
import VehicleManagerModal from './components/common/VehicleManagerModal';

// Role Portals
import UserPortal from './components/user/UserPortal';
import ProviderDashboard from './components/provider/ProviderDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

// Marketing & Platform Sections (Lingua Design System)
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Technicians from './components/Technicians';
import RequestHelp from './components/RequestHelp';
import PricingPlans from './components/PricingPlans';
import Coverage from './components/Coverage';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function MainContent() {
  const { role, setRole, setSafetyModeOpen } = useRoadResQ();

  return (
    <div className="relative min-h-screen pb-24 overflow-x-hidden bg-white">
      <RoleNavbar />

      <main>
        {role === 'landing' && (
          <>
            {/* Section 1 & 2: Navbar & Hero with Ticker */}
            <Hero />
            {/* Quick Metrics */}
            <Stats />
            {/* Section 3: Services Grid */}
            <Services />
            {/* Section 4: How It Works */}
            <HowItWorks />
            {/* Section 5: Meet The Responders */}
            <Technicians />
            {/* Section 6: Interactive Fast Request */}
            <RequestHelp />
            {/* Section 7: Pricing Plans */}
            <PricingPlans />
            {/* Section 8: Pan-India Coverage */}
            <Coverage />
            {/* Section 9: Trustpilot 4.9 Reviews */}
            <Testimonials />
            {/* Section 10: FAQ Accordion */}
            <FAQ />
            {/* Emergency CTA */}
            <CTA
              onOpenSafety={() => setSafetyModeOpen(true)}
              onRequestHelp={() => setRole('user')}
            />
            {/* Section 11: Deep Navy Footer */}
            <Footer />
          </>
        )}

        {role === 'user' && <UserPortal />}
        {role === 'provider' && <ProviderDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals & Demo Controls */}
      <SafetyModeModal />
      <VehicleManagerModal />
      <DemoControlBar />
    </div>
  );
}

export function App() {
  return (
    <RoadResQProvider>
      <MainContent />
    </RoadResQProvider>
  );
}

export default App;
